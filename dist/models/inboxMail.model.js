'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _emailTemplates = require('email-templates');

var _emailTemplates2 = _interopRequireDefault(_emailTemplates);

var _resourcesModel = require('./Model/resourcesModel');

var _resourcesModel2 = _interopRequireDefault(_resourcesModel);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _inboxMail = require('../schemas/inboxMail.schema');

var _inboxMail2 = _interopRequireDefault(_inboxMail);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Model = _mongoose2.default.model(_inboxMail.collection, _inboxMail2.default);
Model = (0, _resourcesModel2.default)(Model);
Model.getOriginalMessage = function (mailTemplate) {
	var from = mailTemplate.from,
	    to = mailTemplate.to,
	    template = mailTemplate.template,
	    locals = mailTemplate.locals;

	var email = new _emailTemplates2.default({ message: { from: from } });
	return email.send({
		template: template,
		message: { to: to },
		transport: {
			jsonTransport: true
		},
		locals: locals
	}).then(function (res) {
		return res.originalMessage;
	}).catch(function (err) {
		return err;
	});
};
exports.default = Model;