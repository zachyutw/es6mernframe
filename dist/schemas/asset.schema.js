'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.AssetSchema = exports.collection = undefined;

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _config = require('../core/config/config.dev');

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Schema = _mongoose2.default.Schema;
var collection = exports.collection = 'Asset';
var AssetSchema = exports.AssetSchema = new _mongoose2.default.Schema({
	fieldname: String,
	originalname: String,
	encoding: String,
	mimetype: String,
	destination: String,
	filename: { type: String, required: true, unique: true },
	path: String,
	size: Number,
	status: { type: Number, default: 0 },
	domainName: { type: String, default: _config2.default.domainName },
	url: { type: String, unique: true }
}, { collection: collection, timestamps: true });

exports.default = AssetSchema;