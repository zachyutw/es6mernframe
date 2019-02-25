import mongoose from 'mongoose';
import ResourcesModel from './Model/resourcesModel';
import _ from 'lodash';
import ResourceSchema, { collection } from '../schemas/auth.schema';

let Model = mongoose.model(collection, ResourceSchema);
Model = ResourcesModel(Model);
Model.getStatus = (auth) => {
	const isPasswordSet = _.isEmpty(auth.password) ? false : true;
	const isEmailSet = _.isEmpty(auth.email) ? false : true;
	const isVerify = auth.isVerify;
	return {
		isPasswordSet,
		isEmailSet,
		isVerify
	};
};

export default Model;
