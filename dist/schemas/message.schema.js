'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.messageRef = exports.collection = undefined;

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _combineRefs = require('./combineRefs');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Schema = _mongoose2.default.Schema;
var collection = exports.collection = 'Message';

var MessageSchema = Schema({
	text: { type: String, required: true },
	user: (0, _extends3.default)({}, _combineRefs.userRef),
	isRead: { type: Boolean, default: false }
}, { collection: collection, timestamps: true });
exports.default = MessageSchema;
var messageRef = exports.messageRef = { type: Schema.Types.ObjectId, ref: collection };