'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.collection = undefined;

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _types = require('./types/types');

var _types2 = _interopRequireDefault(_types);

var _combineRefs = require('./combineRefs');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Schema = _mongoose2.default.Schema;
var collection = exports.collection = 'User';


var UserSchema = Schema({
	username: { type: String, required: true, unique: true },
	email: _types2.default.emailType,
	image: _combineRefs.imageRef,
	displayName: { type: String, default: 'New User' },
	phone: { type: String },
	chatrooms: [_combineRefs.chatroomRef],
	detail: {
		familyName: String,
		givenName: String,
		middleName: String,
		gender: String,
		region: String,
		yearOfBirth: { type: String }
	}
}, { collection: collection, timestamps: true });

exports.default = UserSchema;