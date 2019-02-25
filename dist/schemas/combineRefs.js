'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.assetRef = exports.authRef = exports.blogPostRef = exports.chatroomRef = exports.commentRef = exports.imageRef = exports.messageRef = exports.userRef = undefined;

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Schema = _mongoose2.default.Schema;
var userRef = exports.userRef = { type: Schema.Types.ObjectId, ref: 'User' };
var messageRef = exports.messageRef = { type: Schema.Types.ObjectId, ref: 'Message' };
var imageRef = exports.imageRef = { type: Schema.Types.ObjectId, ref: 'Image' };
var commentRef = exports.commentRef = { type: Schema.Types.ObjectId, ref: 'Comment' };
var chatroomRef = exports.chatroomRef = { type: Schema.Types.ObjectId, ref: 'Chatroom' };
var blogPostRef = exports.blogPostRef = { type: Schema.Types.ObjectId, ref: 'BlogPost' };
var authRef = exports.authRef = { type: Schema.Types.ObjectId, ref: 'auth' };
var assetRef = exports.assetRef = { type: Schema.Types.ObjectId, ref: 'asset' };

var combineRefs = {
	userRef: userRef,
	messageRef: messageRef,
	imageRef: imageRef,
	commentRef: commentRef,
	chatroomRef: chatroomRef,
	blogPostRef: blogPostRef,
	authRef: authRef,
	assetRef: assetRef
};

exports.default = combineRefs;