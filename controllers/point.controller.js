import Point from '../models/point.model';
import logger from '../core/logger/app-logger';
import _ from 'lodash';
import resourcesController from './Controller/resoruceContorller';
const Model = Point;
let controller = resourcesController(Model, Model.collection.name);
export default controller;
