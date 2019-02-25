'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.inboxMailSchema = exports.collection = undefined;

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _types = require('./types/types');

var _types2 = _interopRequireDefault(_types);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Schema = _mongoose2.default.Schema;
var collection = exports.collection = 'inboxMail';
var inboxMailSchema = exports.inboxMailSchema = Schema({
	to: _types2.default.emailType,
	from: _types2.default.emailType,
	template: String,
	locals: { type: Schema.Types.Mixed },
	attachments: [{ filename: String, content: String }],
	subject: String,
	html: String,
	text: String
}, { collection: collection, timestamps: true });

exports.default = inboxMailSchema;