import User from '../models/user.model';
import Auth from '../models/auth.model';

import jsonWebToken from '../services/jsonWebToken';
import { jwtSecrect } from '../services/authorize';
import logger from '../core/logger/app-logger';
import axios from 'axios';
import faker from 'faker';
import _ from 'lodash';
import resourcesController, { getResError, getAllSources, errorRes } from './Controller/resoruceContorller';
const Model = Auth;
const ModelName = _.lowerCase(Model.collection.name);
let controller = resourcesController(Model, ModelName);

/**@override  */
controller.setItem = async (req, res) => {
	const name = 'setItem';
	try {
		let allSources = getAllSources(req, res, ModelName) || {};
		const user = await User.setItem({ username: allSources.username }, req.controllQuery);
		allSources.userId = user._id;
		if (allSources[ModelName]) {
			allSources[ModelName].userId = user._id;
		}
		console.log(allSources);
		const saved = await Model.setItem(allSources, req.controllQuery);
		logger.info(`Adding ${ModelName}... + ${saved}`);
		res.send({ [ModelName]: saved });
	} catch (err) {
		logger.error(`Error in getting ${ModelName} ${name}-  + ${err}`);
		errorRes(res, 400, `Error in getting ${ModelName} ${name}-  + ${err}`);
	}
};
/**@override  */
controller.dropAll = async (req, res) => {
	const name = 'dropAll';
	try {
		Model.collection.drop();
		User.collection.drop();
		const list = await Model.find({});
		logger.info(`Deleted ${ModelName}- ' + ${name}`);
		res.send({ [`${ModelName}s`]: list });
	} catch (err) {
		logger.error(`Error in getting ${ModelName} ${name}-  + ${err}`);
		errorRes(res, 400, `Error in getting ${ModelName} ${name}-  + ${err}`);
	}
};

controller.emailSignUp = async (req, res) => {
	const name = 'emailSignUp';
	try {
		let allSources = getAllSources(req, res, 'auth');
		const { email, password } = allSources;
		let data = { username: email, email, password };
		const user = await User.setItem(data, req.controllQuery);
		allSources.userId = user._id;
		allSources.username = email;
		const saved = await Model.setItem(allSources, req.controllQuery);
		logger.info(`Adding ${ModelName}... + ${saved.id}`);
		res.send({ message: 'sign up success' });
	} catch (err) {
		logger.error(`Error in getting ${ModelName} ${name}-  + ${err}`);
		errorRes(res, 400, `Error in getting ${ModelName} ${name}-  + ${err}`);
	}
};

controller.signIn = async (req, res) => {
	const name = 'signIn';
	try {
		const user = await User.getItem(req.user.user, req.controllQuery);
		const auth = await Model.getItem(req.user.id);
		const status = Model.getStatus(auth);
		logger.log({ level: 'info', message: `${ModelName}/${name} user:${req.user.id}` });
		res.send({ message: 'success', user, tokens: req.tokens, status });
	} catch (err) {
		let resError = getResError(name);
		logger.error(`Error in  ${ModelName} ${name}- ' + err`);
		errorRes(res, 400, `Error in getting ${ModelName} ${name}-  + ${err}`);
	}
};

controller.updatePassword = async (req, res) => {
	const name = 'updatePassword';
	try {
		const allSources = getAllSources(req, res, 'user');
		const { password, newPassword = '' } = allSources;
		let auth = await Auth.getItem(req.token.id);
		if (auth.password != password) {
			errorRes(res, 400, `password not correct`);
		}
		auth = await Auth.updateItem(auth._id, { password: newPassword }, req.controllQuery);
		const user = await User.getItem(auth.user);
		res.send({ message: 'Edit password success', user });
	} catch (err) {
		logger.error(`Error in  ${ModelName} ${name}- ' + err`);
		errorRes(res, 400, `Error in getting ${ModelName} ${name}-  + ${err}`);
	}
};

controller.sendEmailVerifyCode = async (req, res) => {
	const name = 'sendEmailVerifyCode';
	try {
		const allSources = getAllSources(req, res, 'user');
		const { email } = allSources;
		const auth = await Model.findOne({ email });
		const token = jsonWebToken.getToken({ id: auth._id, userId: auth.user, role: auth.role }, jwtSecrect, 5);

		const inboxEmail = await axios.post('http://localhost:5000/api/inboxEmail/send', {
			from: 'jsislandclan@gmail.com',
			to: 'flyboring@gmail.com',
			locals: {
				name: 'Zach',
				hyperlink: {
					href: `http://localhost:5000/api/auth/account/email/verify?verifyCode=${token}`,
					innerText: 'Reset Password'
				}
			},
			template: 'jsislandclan'
		});
		console.log(inboxEmail);

		res.send({ message: 'Edit password success', auth, token, decodeToken });
	} catch (err) {
		logger.error(`Error in  ${ModelName} ${name}- ' + err`);
		errorRes(res, 400, `Error in getting ${ModelName} ${name}-  + ${err}`);
	}
};
controller.decodedEmailToken = async (req, res) => {
	const name = 'decodedEmailToken';
	try {
		const allSources = getAllSources(req, res, 'user');
		const { verifyCode } = allSources;
		const decodeToken = jsonWebToken.decodedToken(verifyCode, jwtSecrect);
		console.log(decodeToken);
		const auth = await Model.findOne({ _id: decodeToken.id });
		req.user = auth;
		console.log(req.user);
		controller.signIn(req, res);
		// res.send({ message: 'Edit password success', auth });
	} catch (err) {
		logger.error(`Error in  ${ModelName} ${name}- ' + err`);
		errorRes(res, 400, `Error in getting ${ModelName} ${name}-  + ${err}`);
	}
};

export default controller;
