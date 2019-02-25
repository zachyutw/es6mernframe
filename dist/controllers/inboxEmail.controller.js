'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _nodemailer = require('nodemailer');

var _nodemailer2 = _interopRequireDefault(_nodemailer);

var _inboxMail = require('../models/inboxMail.model');

var _inboxMail2 = _interopRequireDefault(_inboxMail);

var _appLogger = require('../core/logger/app-logger');

var _appLogger2 = _interopRequireDefault(_appLogger);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _resoruceContorller = require('./Controller/resoruceContorller');

var _resoruceContorller2 = _interopRequireDefault(_resoruceContorller);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var controller = {};
var Model = _inboxMail2.default;
var ModelName = 'Email';

var transporter = _nodemailer2.default.createTransport({
	service: 'gmail',
	auth: {
		user: 'jslandclan@gmail.com',
		pass: '1117Yubizach'
	}
});

var mailOptions = {
	from: 'jslandclan@gmail.com',
	to: 'flyboring@gmail.com',
	subject: 'Sending Email using Node.js',
	text: 'That was easy!'
};
controller.send = function () {
	var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(req, res) {
		var name, sourceData, originalMessage;
		return _regenerator2.default.wrap(function _callee$(_context) {
			while (1) {
				switch (_context.prev = _context.next) {
					case 0:
						name = 'send';
						_context.prev = 1;
						sourceData = _lodash2.default.isEmpty(req.body) ? mailOptions : req.body;
						_context.next = 5;
						return _inboxMail2.default.getOriginalMessage(sourceData);

					case 5:
						originalMessage = _context.sent;

						transporter.sendMail(originalMessage, function (err, info) {
							err ? console.log(err) : console.log(info);
							if (!err) {
								res.send({ message: 'send email', messageId: info.messageId });
							} else {
								(0, _resoruceContorller.errorRes)(res, 400, 'Error in getting ' + ModelName + ' ' + name + '-  + ' + err);
							}
						});
						_context.next = 13;
						break;

					case 9:
						_context.prev = 9;
						_context.t0 = _context['catch'](1);

						_appLogger2.default.error('Error in getting ' + ModelName + ' ' + name + '-  + ' + _context.t0);
						(0, _resoruceContorller.errorRes)(res, 400, 'Error in getting ' + ModelName + ' ' + name + '-  + ' + _context.t0);

					case 13:
					case 'end':
						return _context.stop();
				}
			}
		}, _callee, undefined, [[1, 9]]);
	}));

	return function (_x, _x2) {
		return _ref.apply(this, arguments);
	};
}();
exports.default = controller;