import Product from '../models/product.model';
import logger from '../core/logger/app-logger';
import _ from 'lodash';
import resourcesController from './Controller/resoruceContorller';
const Model = Product;
let controller = resourcesController(Model, Model.collection.name);
export default controller;
