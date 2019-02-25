'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.ImageSchema = exports.collection = undefined;

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _default = require('../seeds/default');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Schema = _mongoose2.default.Schema;
var collection = exports.collection = 'Image';
var ImageSchema = exports.ImageSchema = Schema({
	photoUrl: { type: String, default: _default.DEFAULT_IMAGE },
	thumUrl: { type: String, default: _default.DEFAULT_IMAGE },
	tag: String
}, { collection: collection, timestamps: true });
exports.default = ImageSchema;