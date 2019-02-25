'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.ProductSchema = exports.collection = undefined;

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _image = require('./image.schema');

var _image2 = _interopRequireDefault(_image);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Schema = _mongoose2.default.Schema;
var collection = exports.collection = 'Product';
var ProductSchema = exports.ProductSchema = Schema({
	name: { type: String, required: true },
	title: { type: String, required: true },
	label: { type: String, index: true, default: 'default' },
	price: { type: Number, default: 0 },
	desc: { type: String, default: 'We are building more contents for our products' },
	supplier: { type: String, default: 'JSislandClan' },
	photoUrl: { type: String },
	image: _image2.default
}, { collection: collection, timestamps: true });

exports.default = ProductSchema;