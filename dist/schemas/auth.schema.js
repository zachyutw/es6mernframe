'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.authRef = exports.collection = undefined;

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _types = require('./types/types');

var _types2 = _interopRequireDefault(_types);

var _combineRefs = require('./combineRefs');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Schema = _mongoose2.default.Schema;
var collection = exports.collection = 'Auth';
var enumRoles = ['guest', 'primary', 'admin'];
var enumPrivilege = ['Read Only', 'Read and Write', 'Write Only'];
var AuthSchema = Schema({
	user: (0, _extends3.default)({}, _combineRefs.userRef, { required: true, unique: true }),
	username: { type: String, required: true, unique: true },
	password: { type: String },
	email: _types2.default.emailType,
	provider: {
		google: _types2.default.providerType,
		wechat: _types2.default.providerType,
		phone: _types2.default.providerType
	},
	isVerify: { type: Boolean, default: false },
	role: { type: String, enum: enumRoles, default: 'guest' },
	level: { type: Number, default: 0 },
	privilege: { type: String, enum: enumPrivilege, default: 'Read Only' },
	isActived: { type: Boolean, default: true }
}, { collection: collection, timestamps: true });
exports.default = AuthSchema;
var authRef = exports.authRef = { type: Schema.Types.ObjectId, ref: collection };