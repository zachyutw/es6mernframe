'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.jwtSecrect = undefined;

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

exports.authorized = authorized;
exports.authorizedOptional = authorizedOptional;
exports.authorizedClientSecret = authorizedClientSecret;
exports.passportCustom = passportCustom;
exports.passportOpenId = passportOpenId;
exports.passportLocal = passportLocal;

var _passport = require('passport');

var _passport2 = _interopRequireDefault(_passport);

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _faker = require('faker');

var _faker2 = _interopRequireDefault(_faker);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _user = require('../models/user.model');

var _user2 = _interopRequireDefault(_user);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var jwtSecrect = exports.jwtSecrect = 'qwer1234';
var clientSecrets = {
	lasfuWebsite: true,
	lasfuIos: true,
	lasfuAndroid: true
};

/* POST login. */
function authorized(req, res, next) {
	_passport2.default.authenticate('jwt', { session: true }, function (error, token) {
		console.log(error, 'error check');
		if (error || !token) {
			res.status(401).json({ message: 'Unauthorized' });
		}
		req.token = token;
		next();
	})(req, res, next);
}
function authorizedOptional(req, res, next) {
	_passport2.default.authenticate('jwt', { session: true }, function (err, token) {
		req.token = token || {};
		next();
	})(req, res, next);
}

function authorizedClientSecret(req, res, next) {
	if (!clientSecrets['' + req.body.clientSecret]) {
		res.status(401).json({ message: 'Something went wrong oooooooooo' });
	}
	next();
}

function passportCustom(req, res, next) {
	var _this = this;

	var EXPIRE_MINUTES = 60;
	_passport2.default.authenticate('custom-strategy', { session: true }, function () {
		var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(err, auth, info) {
			var user, token, tokens;
			return _regenerator2.default.wrap(function _callee$(_context) {
				while (1) {
					switch (_context.prev = _context.next) {
						case 0:
							console.log(auth);

							if (!(err || !auth)) {
								_context.next = 3;
								break;
							}

							return _context.abrupt('return', res.status(400).json({ message: 'Something is not right' }));

						case 3:
							_context.next = 5;
							return _user2.default.findOne({ _id: auth.user });

						case 5:
							user = _context.sent;
							token = _jsonwebtoken2.default.sign({ id: auth._id, userId: auth.user, role: auth.role }, jwtSecrect, {
								expiresIn: 60 * 24 * 3 * EXPIRE_MINUTES
							});
							tokens = {
								accessToken: token,
								tokenType: 'bearer',
								expiresIn: 60 * 24 * 3 * EXPIRE_MINUTES,
								scope: auth.privilege,
								role: auth.role,
								jti: _faker2.default.random.alphaNumeric(100)
							};


							req.login(auth, { session: true }, function (err) {
								if (err) {
									res.status(401).json({ message: 'Unauthorized' });
								}
								req.token = token;
								req.tokens = tokens;
								req.auth = auth;
								req.tokenExpire = EXPIRE_MINUTES + 'mins';

								next();
							});

						case 9:
						case 'end':
							return _context.stop();
					}
				}
			}, _callee, _this);
		}));

		return function (_x, _x2, _x3) {
			return _ref.apply(this, arguments);
		};
	}())(req, res, next);
}

function passportOpenId(req, res, next) {
	var EXPIRE_MINUTES = 5;
	_passport2.default.authenticate('openId-strategy', { session: true }, function (err, auth, info) {
		if (err || !auth) {
			return res.status(400).json({ message: 'Something is not right' });
		}
		req.login(auth, { session: true }, function (err) {
			try {
				var token = _jsonwebtoken2.default.sign({ id: auth._id, userId: auth.user, role: auth.role }, jwtSecrect, {
					expiresIn: 60 * 24 * 3 * EXPIRE_MINUTES
				});
				var tokens = {
					accessToken: token,
					tokenType: 'bearer',
					expiresIn: 60 * 24 * 3 * EXPIRE_MINUTES,
					scope: auth.privilege,
					role: auth.role,
					jti: _faker2.default.random.alphaNumeric(100)
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

function passportLocal(req, res, next) {
	var EXPIRE_MINUTES = 60;
	_passport2.default.authenticate('local', {
		session: false
	}, function (err, user, info) {
		if (err || !user) {
			return res.status(400).json({ message: 'Something is not right' });
		}
		req.login(user, { session: false }, function (err) {
			try {
				var token = _jsonwebtoken2.default.sign({ id: user._id }, jwtSecrect, { expiresIn: 60 * 24 * 3 * EXPIRE_MINUTES });
				var tokens = {
					accessToken: token,
					tokenType: 'bearer',
					expiresIn: 60 * 24 * 3 * EXPIRE_MINUTES,
					scope: 'read write',
					jti: _faker2.default.random.alphaNumeric(100)
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

var authorize = {
	authorized: authorized,
	authorizedOptional: authorizedOptional,
	authorizedClientSecret: authorizedClientSecret,
	passportLocal: passportLocal,
	passportCustom: passportCustom
};
exports.default = authorize;