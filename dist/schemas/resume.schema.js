'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.ResumeSchema = exports.collection = undefined;

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _types = require('./types/types');

var _types2 = _interopRequireDefault(_types);

var _combineRefs = require('./combineRefs');

var _image = require('./image.schema');

var _image2 = _interopRequireDefault(_image);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Schema = _mongoose2.default.Schema;
var collection = exports.collection = 'Resume';
var ResumeSchema = exports.ResumeSchema = Schema({
	user: (0, _extends3.default)({}, _combineRefs.userRef, { required: true, unique: true }),
	appler: {
		firstName: String,
		lastName: String
	},
	info: {
		address: String
	},
	contact: {
		phone: String,
		email: _types2.default.emailType
	},
	websites: [{ name: String, url: String, icon: String }],
	skills: [{ category: String, name: String, experience: String }],
	photoUrl: { type: String },
	image: _image2.default
}, { collection: collection, timestamps: true });

exports.default = ResumeSchema;