import Comment from '../models/comment.model';
import logger from '../core/logger/app-logger';
import _ from 'lodash';
import resourcesController from './Controller/resoruceContorller';
const Model = Comment;
let controller = resourcesController(Model, Model.collection.name);

export default controller;
