import BlogPost from '../models/blogPost.model';
import logger from '../core/logger/app-logger';
import _ from 'lodash';
import resourcesController, { getResError } from './Controller/resoruceContorller';
const Model = BlogPost;
let controller = resourcesController(Model, Model.collection.name);

export default controller;
