'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.chatroomRef = exports.FKs = exports.collection = undefined;

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _combineRefs = require('./combineRefs');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Schema = _mongoose2.default.Schema;
var collection = exports.collection = 'Chatroom';
var ChatroomSchema = Schema({
	hostUser: (0, _extends3.default)({}, _combineRefs.userRef, { required: true }),
	targetUser: (0, _extends3.default)({}, _combineRefs.userRef),
	groupUsers: [(0, _extends3.default)({}, _combineRefs.userRef)],
	messages: [_combineRefs.messageRef],
	isRead: { type: Boolean, default: false },
	isGroupChat: { type: Boolean, default: false }
}, { collection: collection, timestamps: true });

exports.default = ChatroomSchema;
var FKs = exports.FKs = ['hostUser', 'targetUser', 'groupUsers'];
var chatroomRef = exports.chatroomRef = { type: Schema.Types.ObjectId, ref: collection };