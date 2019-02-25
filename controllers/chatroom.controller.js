import Chatroom from '../models/chatroom.model';
import User from '../models/user.model';
import logger from '../core/logger/app-logger';
import _ from 'lodash';
import resourcesController, {
	getResError,
	getAllSources,
	checkForeignKeyExist,
	errorRes
} from './Controller/resoruceContorller';
import { FKs } from '../schemas/chatroom.schema';

const ModelName = 'chatroom';
// inheritance resourceController with Basic CRUD class FortuneClass extends
// ResourcesClass{} const controller = new FortuneClass(Fortune);
const Model = Chatroom;
let controller = resourcesController(Model, Model.collection.name);

controller.removeChatroom = async (req, res) => {
	const name = 'removeChatroom';
	try {
		const allSources = getAllSources(req, res, 'user');
		const { id } = allSources;
		console.log(id, req.token.id);
		let user = await User.pullFields(req.token.id, id, 'chatrooms', req.controllQuery);
		let chatroom = await Model.delete(id);
		res.send({ message: 'remove success' });
	} catch (err) {
		logger.error(`Error in  ${ModelName} ${name}- ' + ${err}`);
		return errorRes(res, 400, `Error in  ${ModelName} ${name}- ' + ${err}`);
	}
};
controller.createChatroom = async (req, res) => {
	const name = 'createChatroom';
	try {
		let allSources = getAllSources(req, res, ModelName) || {};
		const { targetUserId } = allSources;

		if (!targetUserId) {
			return errorRes(res, 406, ' Require foreign key is not exist');
		}
		if (targetUserId == req.token.id) {
			return errorRes(res, 406, " TargetUser can't the same as hostUser");
		}

		const targetUser = await User.getItem(targetUserId);
		if (_.isEmpty(targetUser)) {
			return errorRes(res, 406, ' No targetUser targetUser is not corrent');
		}
		allSources = { ...allSources, hostUser: req.token.id };
		const saved = await Model.add(allSources, req.controllQuery);

		const updatedUser = await User.pushFields(req.token.id, saved._id, 'chatrooms');
		console.log(updatedUser);
		logger.info(`Adding ${ModelName}... + ${saved}`);
		return res.send({ message: 'added Success', [ModelName]: saved });
	} catch (err) {
		logger.error(`Error in  ${ModelName} ${name}- ' + ${err}`);
		return errorRes(res, 400, `Error in  ${ModelName} ${name}- ' + ${err}`);
	}
};
export default controller;
