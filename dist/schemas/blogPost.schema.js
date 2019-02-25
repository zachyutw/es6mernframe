'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.blogPostRef = exports.collection = undefined;

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _combineRefs = require('./combineRefs');

var _point = require('./point.schema');

var _point2 = _interopRequireDefault(_point);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Schema = _mongoose2.default.Schema;
var collection = exports.collection = 'BlogPost';
var BlogPostSchema = Schema({
	user: (0, _extends3.default)({}, _combineRefs.userRef, { required: true, index: true }),
	title: String,
	desc: String,
	innerHtml: String,
	tag: String,
	schedule: Date,
	link: String,
	loc: { type: _point2.default, index: true },
	isCommented: Boolean,
	comments: [_combineRefs.commentRef]
}, { collection: collection, timestamps: true });

exports.default = BlogPostSchema;
var blogPostRef = exports.blogPostRef = { type: Schema.Types.ObjectId, ref: collection };