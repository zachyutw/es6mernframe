import Message from '../models/message.model';
import logger from '../core/logger/app-logger';
import _ from 'lodash';
import resourcesController from './Controller/resoruceContorller';
const Model = Message;
let controller = resourcesController(Model, Model.collection.name);

export default controller;
