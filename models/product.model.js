import mongoose from 'mongoose';
import ResourcesModel from './Model/resourcesModel';
import _ from 'lodash';
import ProductSchema, { collection } from '../schemas/product.schema';
let Model = mongoose.model(collection, ProductSchema);

Model = ResourcesModel(Model);
export default Model;
