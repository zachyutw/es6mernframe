'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _validater = require('../validater/validater');

var emailType = {
	type: String,
	validate: [_validater.validateEmail, 'Please fill a valid email address'],
	match: [_validater.emailReg, 'Please fill a match email address']
};
var providerType = {
	email: emailType,
	photoURL: { type: String },
	displayName: { type: String }
};

var types = { emailType: emailType, providerType: providerType };

exports.default = types;