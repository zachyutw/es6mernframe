'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _user = require('../models/user.model');

var _user2 = _interopRequireDefault(_user);

var _appLogger = require('../core/logger/app-logger');

var _appLogger2 = _interopRequireDefault(_appLogger);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _resoruceContorller = require('./Controller/resoruceContorller');

var _resoruceContorller2 = _interopRequireDefault(_resoruceContorller);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Model = _user2.default;
var ModelName = _lodash2.default.lowerCase(Model.collection.name);
var controller = (0, _resoruceContorller2.default)(Model, Model.collection.name);

controller.getProfile = function () {
	var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(req, res) {
		var name, user;
		return _regenerator2.default.wrap(function _callee$(_context) {
			while (1) {
				switch (_context.prev = _context.next) {
					case 0:
						name = 'getProfile';
						_context.prev = 1;
						_context.next = 4;
						return Model.getItem(req.token.userId, req.controllQuery);

					case 4:
						user = _context.sent;

						_appLogger2.default.info('sending ' + ModelName + '... + ' + user);
						res.send((0, _defineProperty3.default)({}, ModelName, user));
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

controller.updateProfile = function () {
	var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(req, res) {
		var name, allSources, email, phone, detail, user;
		return _regenerator2.default.wrap(function _callee2$(_context2) {
			while (1) {
				switch (_context2.prev = _context2.next) {
					case 0:
						name = 'updateProfile';
						_context2.prev = 1;
						allSources = (0, _resoruceContorller.getAllSources)(req, res, 'user');
						email = allSources.email, phone = allSources.phone, detail = allSources.detail;
						_context2.next = 6;
						return _user2.default.updateItem(req.token.userId, { email: email, phone: phone, detail: detail }, req.controllQuery);

					case 6:
						user = _context2.sent;

						res.send((0, _defineProperty3.default)({}, ModelName, user));
						_context2.next = 14;
						break;

					case 10:
						_context2.prev = 10;
						_context2.t0 = _context2['catch'](1);

						_appLogger2.default.error('Error in  ' + ModelName + ' ' + name + '- \' + err');
						(0, _resoruceContorller.errorRes)(res, 400, 'Error in getting ' + ModelName + ' ' + name + '-  + ' + _context2.t0);

					case 14:
					case 'end':
						return _context2.stop();
				}
			}
		}, _callee2, undefined, [[1, 10]]);
	}));

	return function (_x3, _x4) {
		return _ref2.apply(this, arguments);
	};
}();

exports.default = controller;