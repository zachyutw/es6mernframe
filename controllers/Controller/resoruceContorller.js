import logger from '../../core/logger/app-logger';
import _ from 'lodash';
import config from '../../core/config/config.dev';
import { omitBasic } from '../../models/Model/resourcesModel';

export const getAllSources = (req, res, ModelCollectionName = 'notDefine') => {
	const ModelName = _.lowerCase(ModelCollectionName);
	let instance = {};
	if (!_.isEmpty(req.body[ModelName])) {
		instance = req.body[ModelName];
	}
	let allSources = { ...req.params, ...req.body, ...req.query, ...instance };
	return allSources;
};

export const errorRes = (res, status = 500, message = '', errors = []) => {
	const errorType = {
		[500]: '',
		[400]: 'Bad Request',
		[404]: 'Not Found',
		[406]: 'Not Acceptable',
		[401]: 'Unauthorized',
		[409]: 'Conflict',
		[429]: '429 Too Many Requests'
	};
	return res.status(status).send({
		sourceServer: config.domainName,
		timestamp: new Date(),
		status,
		error: errorType[status],
		message,
		errors
	});
};
export const getResError = (name, ModelCollectionName = 'undefine', err, errorMessage) => {
	const ModelName = _.lowerCase(ModelCollectionName);
	logger.error(`Error in getting ${ModelName} ${name}-  + ${err}`);
	return { error: true, errorMessage: errorMessage ? errorMessage : `Got error in ${ModelName} ${name}` };
};
export function checkForeignKeyExist (foreignKey, name, ModelName) {
	let resError = null;
	if (_.isEmpty(foreignKey)) {
		resError = getResError(name, ModelName, `foreign key is not exist`);
	}
	return resError;
}

export default (Model, ModelCollectionName = 'unDefine') => {
	const controller = {};
	const ModelName = _.lowerCase(ModelCollectionName);
	controller.getList = async (req, res) => {
		const name = 'getList';
		try {
			const datas = await Model.getList(req.controllQuery);
			logger.info(`sending ${ModelName}... + ${datas}`);
			res.send({ [`${ModelName}s`]: datas });
		} catch (err) {
			logger.error(`Error in getting ${ModelName} ${name}-  + ${err}`);
			errorRes(res, 400, `Error in getting ${ModelName} ${name}-  + ${err}`);
		}
	};
	controller.getIds = async (req, res) => {
		const name = 'getIds';
		try {
			const { ids } = req.body;
			const datas = await Model.findManyByIds(ids, req.controllQuery);
			logger.info(`sending ${ModelName}... + ${datas}`);
			res.send({ [`${ModelName}s`]: datas });
		} catch (err) {
			logger.error(`Error in getting ${ModelName} ${name}-  + ${err}`);
			errorRes(res, 400, `Error in getting ${ModelName} ${name}-  + ${err}`);
		}
	};

	controller.getItem = async (req, res) => {
		const name = 'getItem';
		try {
			const allSources = { ...req.params, ...req.body, ...req.query };
			const { id } = allSources;
			const data = await Model.getItem(id, req.controllQuery);
			if (_.isEmpty(data)) {
				errorRes(res, 406, `No data found ${ModelName} ${name}`);
			}
			logger.info(`sending ${ModelName}... + ${data}`);
			res.send({ [ModelName]: data });
		} catch (err) {
			logger.error(`Error in getting ${ModelName} ${name}-  + ${err}`);
			errorRes(res, 400, `Error in getting ${ModelName} ${name}-  + ${err}`);
		}
	};

	controller.update = async (req, res) => {
		const name = 'update';
		try {
			let instance = req.body[ModelName] ? req.body[ModelName] : req.body;
			let allSources = { ...req.params, ...req.body, ...req.query, ...instance };
			const data = await Model.updateItem(allSources.id, allSources, req.controllQuery);
			if (_.isNull(data)) {
				errorRes(res, 406, `Not find  ${ModelName} ${name}`);
			}
			logger.info(`sending ${ModelName} ${name}`);
			res.send({ [ModelName]: data });
		} catch (err) {
			logger.error(`Error in getting ${ModelName} ${name}-  + ${err}`);
			errorRes(res, 400, `Error in getting ${ModelName} ${name}-  + ${err}`);
		}
	};

	controller.setItem = async (req, res) => {
		const name = 'setItem';
		try {
			let allSources = getAllSources(req, res, ModelName) || {};
			const saved = await Model.setItem(allSources, req.controllQuery);
			logger.info(`Adding ${ModelName}... + ${saved}`);
			res.send({ [ModelName]: saved });
		} catch (err) {
			logger.error(`Error in getting ${ModelName} ${name}-  + ${err}`);
			errorRes(res, 400, `Error in getting ${ModelName} ${name}-  + ${err}`);
		}
	};

	controller.delete = async (req, res) => {
		const name = 'delete';
		try {
			const allSources = { ...req.params, ...req.query, ...req.body };
			const { id } = allSources;
			const removed = await Model.delete(id);
			logger.info(`Deleted ${ModelName}- ' + ${removed}`);
			res.send({ id });
		} catch (err) {
			logger.error(`Error in getting ${ModelName} ${name}-  + ${err}`);
			errorRes(res, 400, `Error in getting ${ModelName} ${name}-  + ${err}`);
		}
	};

	controller.addMany = async (req, res) => {
		const name = 'addMany';
		try {
			const instances = req.body[`${ModelName}s`] ? req.body[`${ModelName}s`] : req.body;
			const datas = await Model.addMany(instances, req.controllQuery);
			if (_.isError(datas)) {
				errorRes(res, 406, `Duplicate Key ${ModelName} ${name}`);
			}
			res.send({ [`${ModelName}s`]: datas });
		} catch (err) {
			logger.error(`Error in getting ${ModelName} ${name}-  + ${err}`);
			errorRes(res, 400, `Error in getting ${ModelName} ${name}-  + ${err}`);
		}
	};

	controller.dropAll = async (req, res) => {
		const name = 'dropAll';
		try {
			Model.collection.drop();
			const list = await Model.find({});
			logger.info(`Deleted ${ModelName}- ' + ${name}`);
			res.send({ [`${ModelName}s`]: list });
		} catch (err) {
			logger.error(`Error in getting ${ModelName} ${name}-  + ${err}`);
			errorRes(res, 400, `Error in getting ${ModelName} ${name}-  + ${err}`);
		}
	};

	controller.updateList = async (req, res) => {
		const name = 'updateList';
		try {
			const instances = req.body[`${ModelName}s`] ? req.body[`${ModelName}s`] : req.body;
			const datas = instances || [];
			const list = await Promise.all(
				_.map(datas, ({ id, updatedAt, createdAt, _id, ...rest }) => {
					return Model.update(id, rest, req.controllQuery);
				})
			);
			logger.info(`updated List ${ModelName}- ' + ${name}`);
			res.send({ [`${ModelName}s`]: list });
		} catch (err) {
			logger.error(`Error in getting ${ModelName} ${name}-  + ${err}`);
			errorRes(res, 400, `Error in getting ${ModelName} ${name}-  + ${err}`);
		}
	};
	controller.getSchema = async (req, res) => {
		const name = 'getSchema';
		try {
			const keys = _.keys(Model.schema.paths);
			let schema = {};
			keys.map((key) => {
				schema[key] = {
					type: Model.schema.paths[key].instance,
					isRequired: Model.schema.paths[key].isRequired,
					defaultValue: Model.schema.paths[key].defaultValue
				};
			});
			res.send({ [`${ModelName}Schema`]: schema });
		} catch (err) {
			logger.error(`Error in getting ${ModelName} ${name}-  + ${err}`);
			errorRes(res, 400, `Error in getting ${ModelName} ${name}-  + ${err}`);
		}
	};
	return controller;
};
