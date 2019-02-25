import User from '../models/user.model';
import logger from '../core/logger/app-logger';
import _ from 'lodash';
import resourcesController, { errorRes, getAllSources } from './Controller/resoruceContorller';
const Model = User;
const ModelName = _.lowerCase(Model.collection.name);
let controller = resourcesController(Model, Model.collection.name);

controller.getProfile = async (req, res) => {
	const name = 'getProfile';
	try {
		const user = await Model.getItem(req.token.userId, req.controllQuery);
		logger.info(`sending ${ModelName}... + ${user}`);
		res.send({ [ModelName]: user });
	} catch (err) {
		logger.error(`Error in getting ${ModelName} ${name}-  + ${err}`);
		errorRes(res, 400, `Error in getting ${ModelName} ${name}-  + ${err}`);
	}
};

controller.updateProfile = async (req, res) => {
	const name = 'updateProfile';
	try {
		const allSources = getAllSources(req, res, 'user');
		const { email, phone, detail } = allSources;
		let user = await User.updateItem(req.token.userId, { email, phone, detail }, req.controllQuery);
		res.send({ [ModelName]: user });
	} catch (err) {
		logger.error(`Error in  ${ModelName} ${name}- ' + err`);
		errorRes(res, 400, `Error in getting ${ModelName} ${name}-  + ${err}`);
	}
};

export default controller;
