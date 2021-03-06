'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _resourcesModel = require('./Model/resourcesModel');

var _resourcesModel2 = _interopRequireDefault(_resourcesModel);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _message = require('../schemas/message.schema');

var _message2 = _interopRequireDefault(_message);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Model = _mongoose2.default.model(_message.collection, _message2.default);
Model = (0, _resourcesModel2.default)(Model);
exports.default = Model;