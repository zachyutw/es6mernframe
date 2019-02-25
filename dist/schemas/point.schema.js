'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.collection = undefined;

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var collection = exports.collection = 'Point';
var PointSchema = new _mongoose2.default.Schema({
	type: {
		type: String,
		enum: ['Point'],
		required: true
	},
	coordinates: {
		type: [Number],
		required: true
	}
}, { collection: collection, timestamps: true });
exports.default = PointSchema;