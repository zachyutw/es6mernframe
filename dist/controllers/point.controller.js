'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _point = require('../models/point.model');

var _point2 = _interopRequireDefault(_point);

var _appLogger = require('../core/logger/app-logger');

var _appLogger2 = _interopRequireDefault(_appLogger);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _resoruceContorller = require('./Controller/resoruceContorller');

var _resoruceContorller2 = _interopRequireDefault(_resoruceContorller);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Model = _point2.default;
var controller = (0, _resoruceContorller2.default)(Model, Model.collection.name);
exports.default = controller;