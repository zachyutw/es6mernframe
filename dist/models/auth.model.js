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

var _auth = require('../schemas/auth.schema');

var _auth2 = _interopRequireDefault(_auth);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Model = _mongoose2.default.model(_auth.collection, _auth2.default);
Model = (0, _resourcesModel2.default)(Model);
Model.getStatus = function (auth) {
	var isPasswordSet = _lodash2.default.isEmpty(auth.password) ? false : true;
	var isEmailSet = _lodash2.default.isEmpty(auth.email) ? false : true;
	var isVerify = auth.isVerify;
	return {
		isPasswordSet: isPasswordSet,
		isEmailSet: isEmailSet,
		isVerify: isVerify
	};
};

exports.default = Model;