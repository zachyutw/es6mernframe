import passport from 'passport';
import jwt from 'jsonwebtoken';
import faker from 'faker';
import _ from 'lodash';
import moment from 'moment';
import User from '../models/user.model';
export const jwtSecrect = 'qwer1234';
const clientSecrets = {
	lasfuWebsite: true,
	lasfuIos: true,
	lasfuAndroid: true
};

/* POST login. */
export function authorized (req, res, next) {
	passport.authenticate('jwt', { session: true }, (error, token) => {
		console.log(error, 'error check');
		if (error || !token) {
			res.status(401).json({ message: 'Unauthorized' });
		}
		req.token = token;
		next();
	})(req, res, next);
}
export function authorizedOptional (req, res, next) {
	passport.authenticate('jwt', { session: true }, (err, token) => {
		req.token = token || {};
		next();
	})(req, res, next);
}

export function authorizedClientSecret (req, res, next) {
	if (!clientSecrets[`${req.body.clientSecret}`]) {
		res.status(401).json({ message: 'Something went wrong oooooooooo' });
	}
	next();
}

export function passportCustom (req, res, next) {
	const EXPIRE_MINUTES = 60;
	passport.authenticate('custom-strategy', { session: true }, async (err, auth, info) => {
		console.log(auth);
		if (err || !auth) {
			return res.status(400).json({ message: 'Something is not right' });
		}
		const user = await User.findOne({ _id: auth.user });
		const token = jwt.sign({ id: auth._id, userId: auth.user, role: auth.role }, jwtSecrect, {
			expiresIn: 60 * 24 * 3 * EXPIRE_MINUTES
		});
		const tokens = {
			accessToken: token,
			tokenType: 'bearer',
			expiresIn: 60 * 24 * 3 * EXPIRE_MINUTES,
			scope: auth.privilege,
			role: auth.role,
			jti: faker.random.alphaNumeric(100)
		};

		req.login(auth, { session: true }, (err) => {
			if (err) {
				res.status(401).json({ message: 'Unauthorized' });
			}
			req.token = token;
			req.tokens = tokens;
			req.auth = auth;
			req.tokenExpire = EXPIRE_MINUTES + 'mins';

			next();
		});
	})(req, res, next);
}

export function passportOpenId (req, res, next) {
	const EXPIRE_MINUTES = 5;
	passport.authenticate('openId-strategy', { session: true }, (err, auth, info) => {
		if (err || !auth) {
			return res.status(400).json({ message: 'Something is not right' });
		}
		req.login(auth, { session: true }, (err) => {
			try {
				const token = jwt.sign({ id: auth._id, userId: auth.user, role: auth.role }, jwtSecrect, {
					expiresIn: 60 * 24 * 3 * EXPIRE_MINUTES
				});
				const tokens = {
					accessToken: token,
					tokenType: 'bearer',
					expiresIn: 60 * 24 * 3 * EXPIRE_MINUTES,
					scope: auth.privilege,
					role: auth.role,
					jti: faker.random.alphaNumeric(100)
				};

				req.token = token;
				req.tokens = tokens;
				req.tokenExpire = EXPIRE_MINUTES + 'mins';
			} catch (err) {
				next(err);
			}
			next();
		});
	})(req, res, next);
}

export function passportLocal (req, res, next) {
	const EXPIRE_MINUTES = 60;
	passport.authenticate(
		'local',
		{
			session: false
		},
		(err, user, info) => {
			if (err || !user) {
				return res.status(400).json({ message: 'Something is not right' });
			}
			req.login(user, { session: false }, (err) => {
				try {
					const token = jwt.sign({ id: user._id }, jwtSecrect, { expiresIn: 60 * 24 * 3 * EXPIRE_MINUTES });
					const tokens = {
						accessToken: token,
						tokenType: 'bearer',
						expiresIn: 60 * 24 * 3 * EXPIRE_MINUTES,
						scope: 'read write',
						jti: faker.random.alphaNumeric(100)
					};
					req.token = token;
					req.tokens = tokens;
					req.tokenExpire = EXPIRE_MINUTES + 'mins';
				} catch (err) {
					next(err);
				}
				next();
			});
		}
	)(req, res, next);
}

const authorize = {
	authorized,
	authorizedOptional,
	authorizedClientSecret,
	passportLocal,
	passportCustom
};
export default authorize;
