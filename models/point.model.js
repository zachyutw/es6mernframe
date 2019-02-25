import mongoose from 'mongoose';
import ResourcesModel from './Model/resourcesModel';
import _ from 'lodash';
import ResourceSchema, { collection } from '../schemas/point.schema';
let Model = mongoose.model(collection, ResourceSchema);
Model = ResourcesModel(Model);
export default Model;
