'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _chatroom = require('../models/chatroom.model');

var _chatroom2 = _interopRequireDefault(_chatroom);

var _user = require('../models/user.model');

var _user2 = _interopRequireDefault(_user);

var _appLogger = require('../core/logger/app-logger');

var _appLogger2 = _interopRequireDefault(_appLogger);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _resoruceContorller = require('./Controller/resoruceContorller');

var _resoruceContorller2 = _interopRequireDefault(_resoruceContorller);

var _chatroom3 = require('../schemas/chatroom.schema');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ModelName = 'chatroom';
// inheritance resourceController with Basic CRUD class FortuneClass extends
// ResourcesClass{} const controller = new FortuneClass(Fortune);
var Model = _chatroom2.default;
var controller = (0, _resoruceContorller2.default)(Model, Model.collection.name);

controller.removeChatroom = function () {
	var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(req, res) {
		var name, allSources, id, user, chatroom;
		return _regenerator2.default.wrap(function _callee$(_context) {
			while (1) {
				switch (_context.prev = _context.next) {
					case 0:
						name = 'removeChatroom';
						_context.prev = 1;
						allSources = (0, _resoruceContorller.getAllSources)(req, res, 'user');
						id = allSources.id;

						console.log(id, req.token.id);
						_context.next = 7;
						return _user2.default.pullFields(req.token.id, id, 'chatrooms', req.controllQuery);

					case 7:
						user = _context.sent;
						_context.next = 10;
						return Model.delete(id);

					case 10:
						chatroom = _context.sent;

						res.send({ message: 'remove success' });
						_context.next = 18;
						break;

					case 14:
						_context.prev = 14;
						_context.t0 = _context['catch'](1);

						_appLogger2.default.error('Error in  ' + ModelName + ' ' + name + '- \' + ' + _context.t0);
						return _context.abrupt('return', (0, _resoruceContorller.errorRes)(res, 400, 'Error in  ' + ModelName + ' ' + name + '- \' + ' + _context.t0));

					case 18:
					case 'end':
						return _context.stop();
				}
			}
		}, _callee, undefined, [[1, 14]]);
	}));

	return function (_x, _x2) {
		return _ref.apply(this, arguments);
	};
}();
controller.createChatroom = function () {
	var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(req, res) {
		var name, allSources, _allSources, targetUserId, targetUser, saved, updatedUser;

		return _regenerator2.default.wrap(function _callee2$(_context2) {
			while (1) {
				switch (_context2.prev = _context2.next) {
					case 0:
						name = 'createChatroom';
						_context2.prev = 1;
						allSources = (0, _resoruceContorller.getAllSources)(req, res, ModelName) || {};
						_allSources = allSources, targetUserId = _allSources.targetUserId;

						if (targetUserId) {
							_context2.next = 6;
							break;
						}

						return _context2.abrupt('return', (0, _resoruceContorller.errorRes)(res, 406, ' Require foreign key is not exist'));

					case 6:
						if (!(targetUserId == req.token.id)) {
							_context2.next = 8;
							break;
						}

						return _context2.abrupt('return', (0, _resoruceContorller.errorRes)(res, 406, " TargetUser can't the same as hostUser"));

					case 8:
						_context2.next = 10;
						return _user2.default.getItem(targetUserId);

					case 10:
						targetUser = _context2.sent;

						if (!_lodash2.default.isEmpty(targetUser)) {
							_context2.next = 13;
							break;
						}

						return _context2.abrupt('return', (0, _resoruceContorller.errorRes)(res, 406, ' No targetUser targetUser is not corrent'));

					case 13:
						allSources = (0, _extends3.default)({}, allSources, { hostUser: req.token.id });
						_context2.next = 16;
						return Model.add(allSources, req.controllQuery);

					case 16:
						saved = _context2.sent;
						_context2.next = 19;
						return _user2.default.pushFields(req.token.id, saved._id, 'chatrooms');

					case 19:
						updatedUser = _context2.sent;

						console.log(updatedUser);
						_appLogger2.default.info('Adding ' + ModelName + '... + ' + saved);
						return _context2.abrupt('return', res.send((0, _defineProperty3.default)({ message: 'added Success' }, ModelName, saved)));

					case 25:
						_context2.prev = 25;
						_context2.t0 = _context2['catch'](1);

						_appLogger2.default.error('Error in  ' + ModelName + ' ' + name + '- \' + ' + _context2.t0);
						return _context2.abrupt('return', (0, _resoruceContorller.errorRes)(res, 400, 'Error in  ' + ModelName + ' ' + name + '- \' + ' + _context2.t0));

					case 29:
					case 'end':
						return _context2.stop();
				}
			}
		}, _callee2, undefined, [[1, 25]]);
	}));

	return function (_x3, _x4) {
		return _ref2.apply(this, arguments);
	};
}();
exports.default = controller;