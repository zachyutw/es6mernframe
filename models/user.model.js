import mongoose from 'mongoose';
import ResourcesModel from './Model/resourcesModel';
import _ from 'lodash';
import UserSchema, { collection } from '../schemas/user.schema';
let Model = mongoose.model(collection, UserSchema);
Model = ResourcesModel(Model);
/**! New Model method put over here **/

/**! New Model method put over here **/

export default Model;
