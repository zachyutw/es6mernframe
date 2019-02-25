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

var _auth = require('../models/auth.model');

var _auth2 = _interopRequireDefault(_auth);

var _jsonWebToken = require('../services/jsonWebToken');

var _jsonWebToken2 = _interopRequireDefault(_jsonWebToken);

var _authorize = require('../services/authorize');

var _appLogger = require('../core/logger/app-logger');

var _appLogger2 = _interopRequireDefault(_appLogger);

var _axios = require('axios');

var _axios2 = _interopRequireDefault(_axios);

var _faker = require('faker');

var _faker2 = _interopRequireDefault(_faker);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _resoruceContorller = require('./Controller/resoruceContorller');

var _resoruceContorller2 = _interopRequireDefault(_resoruceContorller);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Model = _auth2.default;
var ModelName = _lodash2.default.lowerCase(Model.collection.name);
var controller = (0, _resoruceContorller2.default)(Model, ModelName);

/**@override  */
controller.setItem = function () {
	var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(req, res) {
		var name, allSources, user, saved;
		return _regenerator2.default.wrap(function _callee$(_context) {
			while (1) {
				switch (_context.prev = _context.next) {
					case 0:
						name = 'setItem';
						_context.prev = 1;
						allSources = (0, _resoruceContorller.getAllSources)(req, res, ModelName) || {};
						_context.next = 5;
						return _user2.default.setItem({ username: allSources.username }, req.controllQuery);

					case 5:
						user = _context.sent;

						allSources.userId = user._id;
						if (allSources[ModelName]) {
							allSources[ModelName].userId = user._id;
						}
						console.log(allSources);
						_context.next = 11;
						return Model.setItem(allSources, req.controllQuery);

					case 11:
						saved = _context.sent;

						_appLogger2.default.info('Adding ' + ModelName + '... + ' + saved);
						res.send((0, _defineProperty3.default)({}, ModelName, saved));
						_context.next = 20;
						break;

					case 16:
						_context.prev = 16;
						_context.t0 = _context['catch'](1);

						_appLogger2.default.error('Error in getting ' + ModelName + ' ' + name + '-  + ' + _context.t0);
						(0, _resoruceContorller.errorRes)(res, 400, 'Error in getting ' + ModelName + ' ' + name + '-  + ' + _context.t0);

					case 20:
					case 'end':
						return _context.stop();
				}
			}
		}, _callee, undefined, [[1, 16]]);
	}));

	return function (_x, _x2) {
		return _ref.apply(this, arguments);
	};
}();
/**@override  */
controller.dropAll = function () {
	var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(req, res) {
		var name, list;
		return _regenerator2.default.wrap(function _callee2$(_context2) {
			while (1) {
				switch (_context2.prev = _context2.next) {
					case 0:
						name = 'dropAll';
						_context2.prev = 1;

						Model.collection.drop();
						_user2.default.collection.drop();
						_context2.next = 6;
						return Model.find({});

					case 6:
						list = _context2.sent;

						_appLogger2.default.info('Deleted ' + ModelName + '- \' + ' + name);
						res.send((0, _defineProperty3.default)({}, ModelName + 's', list));
						_context2.next = 15;
						break;

					case 11:
						_context2.prev = 11;
						_context2.t0 = _context2['catch'](1);

						_appLogger2.default.error('Error in getting ' + ModelName + ' ' + name + '-  + ' + _context2.t0);
						(0, _resoruceContorller.errorRes)(res, 400, 'Error in getting ' + ModelName + ' ' + name + '-  + ' + _context2.t0);

					case 15:
					case 'end':
						return _context2.stop();
				}
			}
		}, _callee2, undefined, [[1, 11]]);
	}));

	return function (_x3, _x4) {
		return _ref2.apply(this, arguments);
	};
}();

controller.emailSignUp = function () {
	var _ref3 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3(req, res) {
		var name, allSources, email, password, data, user, saved;
		return _regenerator2.default.wrap(function _callee3$(_context3) {
			while (1) {
				switch (_context3.prev = _context3.next) {
					case 0:
						name = 'emailSignUp';
						_context3.prev = 1;
						allSources = (0, _resoruceContorller.getAllSources)(req, res, 'auth');
						email = allSources.email, password = allSources.password;
						data = { username: email, email: email, password: password };
						_context3.next = 7;
						return _user2.default.setItem(data, req.controllQuery);

					case 7:
						user = _context3.sent;

						allSources.userId = user._id;
						allSources.username = email;
						_context3.next = 12;
						return Model.setItem(allSources, req.controllQuery);

					case 12:
						saved = _context3.sent;

						_appLogger2.default.info('Adding ' + ModelName + '... + ' + saved.id);
						res.send({ message: 'sign up success' });
						_context3.next = 21;
						break;

					case 17:
						_context3.prev = 17;
						_context3.t0 = _context3['catch'](1);

						_appLogger2.default.error('Error in getting ' + ModelName + ' ' + name + '-  + ' + _context3.t0);
						(0, _resoruceContorller.errorRes)(res, 400, 'Error in getting ' + ModelName + ' ' + name + '-  + ' + _context3.t0);

					case 21:
					case 'end':
						return _context3.stop();
				}
			}
		}, _callee3, undefined, [[1, 17]]);
	}));

	return function (_x5, _x6) {
		return _ref3.apply(this, arguments);
	};
}();

controller.signIn = function () {
	var _ref4 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee4(req, res) {
		var name, user, auth, status, resError;
		return _regenerator2.default.wrap(function _callee4$(_context4) {
			while (1) {
				switch (_context4.prev = _context4.next) {
					case 0:
						name = 'signIn';
						_context4.prev = 1;
						_context4.next = 4;
						return _user2.default.getItem(req.user.user, req.controllQuery);

					case 4:
						user = _context4.sent;
						_context4.next = 7;
						return Model.getItem(req.user.id);

					case 7:
						auth = _context4.sent;
						status = Model.getStatus(auth);

						_appLogger2.default.log({ level: 'info', message: ModelName + '/' + name + ' user:' + req.user.id });
						res.send({ message: 'success', user: user, tokens: req.tokens, status: status });
						_context4.next = 18;
						break;

					case 13:
						_context4.prev = 13;
						_context4.t0 = _context4['catch'](1);
						resError = (0, _resoruceContorller.getResError)(name);

						_appLogger2.default.error('Error in  ' + ModelName + ' ' + name + '- \' + err');
						(0, _resoruceContorller.errorRes)(res, 400, 'Error in getting ' + ModelName + ' ' + name + '-  + ' + _context4.t0);

					case 18:
					case 'end':
						return _context4.stop();
				}
			}
		}, _callee4, undefined, [[1, 13]]);
	}));

	return function (_x7, _x8) {
		return _ref4.apply(this, arguments);
	};
}();

controller.updatePassword = function () {
	var _ref5 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee5(req, res) {
		var name, allSources, password, _allSources$newPasswo, newPassword, auth, user;

		return _regenerator2.default.wrap(function _callee5$(_context5) {
			while (1) {
				switch (_context5.prev = _context5.next) {
					case 0:
						name = 'updatePassword';
						_context5.prev = 1;
						allSources = (0, _resoruceContorller.getAllSources)(req, res, 'user');
						password = allSources.password, _allSources$newPasswo = allSources.newPassword, newPassword = _allSources$newPasswo === undefined ? '' : _allSources$newPasswo;
						_context5.next = 6;
						return _auth2.default.getItem(req.token.id);

					case 6:
						auth = _context5.sent;

						if (auth.password != password) {
							(0, _resoruceContorller.errorRes)(res, 400, 'password not correct');
						}
						_context5.next = 10;
						return _auth2.default.updateItem(auth._id, { password: newPassword }, req.controllQuery);

					case 10:
						auth = _context5.sent;
						_context5.next = 13;
						return _user2.default.getItem(auth.user);

					case 13:
						user = _context5.sent;

						res.send({ message: 'Edit password success', user: user });
						_context5.next = 21;
						break;

					case 17:
						_context5.prev = 17;
						_context5.t0 = _context5['catch'](1);

						_appLogger2.default.error('Error in  ' + ModelName + ' ' + name + '- \' + err');
						(0, _resoruceContorller.errorRes)(res, 400, 'Error in getting ' + ModelName + ' ' + name + '-  + ' + _context5.t0);

					case 21:
					case 'end':
						return _context5.stop();
				}
			}
		}, _callee5, undefined, [[1, 17]]);
	}));

	return function (_x9, _x10) {
		return _ref5.apply(this, arguments);
	};
}();

controller.sendEmailVerifyCode = function () {
	var _ref6 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee6(req, res) {
		var name, allSources, email, auth, token, inboxEmail;
		return _regenerator2.default.wrap(function _callee6$(_context6) {
			while (1) {
				switch (_context6.prev = _context6.next) {
					case 0:
						name = 'sendEmailVerifyCode';
						_context6.prev = 1;
						allSources = (0, _resoruceContorller.getAllSources)(req, res, 'user');
						email = allSources.email;
						_context6.next = 6;
						return Model.findOne({ email: email });

					case 6:
						auth = _context6.sent;
						token = _jsonWebToken2.default.getToken({ id: auth._id, userId: auth.user, role: auth.role }, _authorize.jwtSecrect, 5);
						_context6.next = 10;
						return _axios2.default.post('http://localhost:5000/api/inboxEmail/send', {
							from: 'jsislandclan@gmail.com',
							to: 'flyboring@gmail.com',
							locals: {
								name: 'Zach',
								hyperlink: {
									href: 'http://localhost:5000/api/auth/account/email/verify?verifyCode=' + token,
									innerText: 'Reset Password'
								}
							},
							template: 'jsislandclan'
						});

					case 10:
						inboxEmail = _context6.sent;

						console.log(inboxEmail);

						res.send({ message: 'Edit password success', auth: auth, token: token, decodeToken: decodeToken });
						_context6.next = 19;
						break;

					case 15:
						_context6.prev = 15;
						_context6.t0 = _context6['catch'](1);

						_appLogger2.default.error('Error in  ' + ModelName + ' ' + name + '- \' + err');
						(0, _resoruceContorller.errorRes)(res, 400, 'Error in getting ' + ModelName + ' ' + name + '-  + ' + _context6.t0);

					case 19:
					case 'end':
						return _context6.stop();
				}
			}
		}, _callee6, undefined, [[1, 15]]);
	}));

	return function (_x11, _x12) {
		return _ref6.apply(this, arguments);
	};
}();
controller.decodedEmailToken = function () {
	var _ref7 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee7(req, res) {
		var name, allSources, verifyCode, _decodeToken, auth;

		return _regenerator2.default.wrap(function _callee7$(_context7) {
			while (1) {
				switch (_context7.prev = _context7.next) {
					case 0:
						name = 'decodedEmailToken';
						_context7.prev = 1;
						allSources = (0, _resoruceContorller.getAllSources)(req, res, 'user');
						verifyCode = allSources.verifyCode;
						_decodeToken = _jsonWebToken2.default.decodedToken(verifyCode, _authorize.jwtSecrect);

						console.log(_decodeToken);
						_context7.next = 8;
						return Model.findOne({ _id: _decodeToken.id });

					case 8:
						auth = _context7.sent;

						req.user = auth;
						console.log(req.user);
						controller.signIn(req, res);
						// res.send({ message: 'Edit password success', auth });
						_context7.next = 18;
						break;

					case 14:
						_context7.prev = 14;
						_context7.t0 = _context7['catch'](1);

						_appLogger2.default.error('Error in  ' + ModelName + ' ' + name + '- \' + err');
						(0, _resoruceContorller.errorRes)(res, 400, 'Error in getting ' + ModelName + ' ' + name + '-  + ' + _context7.t0);

					case 18:
					case 'end':
						return _context7.stop();
				}
			}
		}, _callee7, undefined, [[1, 14]]);
	}));

	return function (_x13, _x14) {
		return _ref7.apply(this, arguments);
	};
}();

exports.default = controller;