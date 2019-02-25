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

var _product = require('../schemas/product.schema');

var _product2 = _interopRequireDefault(_product);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Model = _mongoose2.default.model(_product.collection, _product2.default);

Model = (0, _resourcesModel2.default)(Model);
exports.default = Model;