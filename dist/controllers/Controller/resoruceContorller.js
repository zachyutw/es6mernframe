'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.getResError = exports.errorRes = exports.getAllSources = undefined;

var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

exports.checkForeignKeyExist = checkForeignKeyExist;

var _appLogger = require('../../core/logger/app-logger');

var _appLogger2 = _interopRequireDefault(_appLogger);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _config = require('../../core/config/config.dev');

var _config2 = _interopRequireDefault(_config);

var _resourcesModel = require('../../models/Model/resourcesModel');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var getAllSources = exports.getAllSources = function getAllSources(req, res) {
	var ModelCollectionName = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'notDefine';

	var ModelName = _lodash2.default.lowerCase(ModelCollectionName);
	var instance = {};
	if (!_lodash2.default.isEmpty(req.body[ModelName])) {
		instance = req.body[ModelName];
	}
	var allSources = (0, _extends3.default)({}, req.params, req.body, req.query, instance);
	return allSources;
};

var errorRes = exports.errorRes = function errorRes(res) {
	var status = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 500;

	var _errorType;

	var message = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';
	var errors = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : [];

	var errorType = (_errorType = {}, (0, _defineProperty3.default)(_errorType, 500, ''), (0, _defineProperty3.default)(_errorType, 400, 'Bad Request'), (0, _defineProperty3.default)(_errorType, 404, 'Not Found'), (0, _defineProperty3.default)(_errorType, 406, 'Not Acceptable'), (0, _defineProperty3.default)(_errorType, 401, 'Unauthorized'), (0, _defineProperty3.default)(_errorType, 409, 'Conflict'), (0, _defineProperty3.default)(_errorType, 429, '429 Too Many Requests'), _errorType);
	return res.status(status).send({
		sourceServer: _config2.default.domainName,
		timestamp: new Date(),
		status: status,
		error: errorType[status],
		message: message,
		errors: errors
	});
};
var getResError = exports.getResError = function getResError(name) {
	var ModelCollectionName = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'undefine';
	var err = arguments[2];
	var errorMessage = arguments[3];

	var ModelName = _lodash2.default.lowerCase(ModelCollectionName);
	_appLogger2.default.error('Error in getting ' + ModelName + ' ' + name + '-  + ' + err);
	return { error: true, errorMessage: errorMessage ? errorMessage : 'Got error in ' + ModelName + ' ' + name };
};
function checkForeignKeyExist(foreignKey, name, ModelName) {
	var resError = null;
	if (_lodash2.default.isEmpty(foreignKey)) {
		resError = getResError(name, ModelName, 'foreign key is not exist');
	}
	return resError;
}

exports.default = function (Model) {
	var ModelCollectionName = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'unDefine';

	var controller = {};
	var ModelName = _lodash2.default.lowerCase(ModelCollectionName);
	controller.getList = function () {
		var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(req, res) {
			var name, datas;
			return _regenerator2.default.wrap(function _callee$(_context) {
				while (1) {
					switch (_context.prev = _context.next) {
						case 0:
							name = 'getList';
							_context.prev = 1;
							_context.next = 4;
							return Model.getList(req.controllQuery);

						case 4:
							datas = _context.sent;

							_appLogger2.default.info('sending ' + ModelName + '... + ' + datas);
							res.send((0, _defineProperty3.default)({}, ModelName + 's', datas));
							_context.next = 13;
							break;

						case 9:
							_context.prev = 9;
							_context.t0 = _context['catch'](1);

							_appLogger2.default.error('Error in getting ' + ModelName + ' ' + name + '-  + ' + _context.t0);
							errorRes(res, 400, 'Error in getting ' + ModelName + ' ' + name + '-  + ' + _context.t0);

						case 13:
						case 'end':
							return _context.stop();
					}
				}
			}, _callee, undefined, [[1, 9]]);
		}));

		return function (_x7, _x8) {
			return _ref.apply(this, arguments);
		};
	}();
	controller.getIds = function () {
		var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(req, res) {
			var name, ids, datas;
			return _regenerator2.default.wrap(function _callee2$(_context2) {
				while (1) {
					switch (_context2.prev = _context2.next) {
						case 0:
							name = 'getIds';
							_context2.prev = 1;
							ids = req.body.ids;
							_context2.next = 5;
							return Model.findManyByIds(ids, req.controllQuery);

						case 5:
							datas = _context2.sent;

							_appLogger2.default.info('sending ' + ModelName + '... + ' + datas);
							res.send((0, _defineProperty3.default)({}, ModelName + 's', datas));
							_context2.next = 14;
							break;

						case 10:
							_context2.prev = 10;
							_context2.t0 = _context2['catch'](1);

							_appLogger2.default.error('Error in getting ' + ModelName + ' ' + name + '-  + ' + _context2.t0);
							errorRes(res, 400, 'Error in getting ' + ModelName + ' ' + name + '-  + ' + _context2.t0);

						case 14:
						case 'end':
							return _context2.stop();
					}
				}
			}, _callee2, undefined, [[1, 10]]);
		}));

		return function (_x9, _x10) {
			return _ref2.apply(this, arguments);
		};
	}();

	controller.getItem = function () {
		var _ref3 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3(req, res) {
			var name, allSources, id, data;
			return _regenerator2.default.wrap(function _callee3$(_context3) {
				while (1) {
					switch (_context3.prev = _context3.next) {
						case 0:
							name = 'getItem';
							_context3.prev = 1;
							allSources = (0, _extends3.default)({}, req.params, req.body, req.query);
							id = allSources.id;
							_context3.next = 6;
							return Model.getItem(id, req.controllQuery);

						case 6:
							data = _context3.sent;

							if (_lodash2.default.isEmpty(data)) {
								errorRes(res, 406, 'No data found ' + ModelName + ' ' + name);
							}
							_appLogger2.default.info('sending ' + ModelName + '... + ' + data);
							res.send((0, _defineProperty3.default)({}, ModelName, data));
							_context3.next = 16;
							break;

						case 12:
							_context3.prev = 12;
							_context3.t0 = _context3['catch'](1);

							_appLogger2.default.error('Error in getting ' + ModelName + ' ' + name + '-  + ' + _context3.t0);
							errorRes(res, 400, 'Error in getting ' + ModelName + ' ' + name + '-  + ' + _context3.t0);

						case 16:
						case 'end':
							return _context3.stop();
					}
				}
			}, _callee3, undefined, [[1, 12]]);
		}));

		return function (_x11, _x12) {
			return _ref3.apply(this, arguments);
		};
	}();

	controller.update = function () {
		var _ref4 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee4(req, res) {
			var name, instance, allSources, data;
			return _regenerator2.default.wrap(function _callee4$(_context4) {
				while (1) {
					switch (_context4.prev = _context4.next) {
						case 0:
							name = 'update';
							_context4.prev = 1;
							instance = req.body[ModelName] ? req.body[ModelName] : req.body;
							allSources = (0, _extends3.default)({}, req.params, req.body, req.query, instance);
							_context4.next = 6;
							return Model.updateItem(allSources.id, allSources, req.controllQuery);

						case 6:
							data = _context4.sent;

							if (_lodash2.default.isNull(data)) {
								errorRes(res, 406, 'Not find  ' + ModelName + ' ' + name);
							}
							_appLogger2.default.info('sending ' + ModelName + ' ' + name);
							res.send((0, _defineProperty3.default)({}, ModelName, data));
							_context4.next = 16;
							break;

						case 12:
							_context4.prev = 12;
							_context4.t0 = _context4['catch'](1);

							_appLogger2.default.error('Error in getting ' + ModelName + ' ' + name + '-  + ' + _context4.t0);
							errorRes(res, 400, 'Error in getting ' + ModelName + ' ' + name + '-  + ' + _context4.t0);

						case 16:
						case 'end':
							return _context4.stop();
					}
				}
			}, _callee4, undefined, [[1, 12]]);
		}));

		return function (_x13, _x14) {
			return _ref4.apply(this, arguments);
		};
	}();

	controller.setItem = function () {
		var _ref5 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee5(req, res) {
			var name, allSources, saved;
			return _regenerator2.default.wrap(function _callee5$(_context5) {
				while (1) {
					switch (_context5.prev = _context5.next) {
						case 0:
							name = 'setItem';
							_context5.prev = 1;
							allSources = getAllSources(req, res, ModelName) || {};
							_context5.next = 5;
							return Model.setItem(allSources, req.controllQuery);

						case 5:
							saved = _context5.sent;

							_appLogger2.default.info('Adding ' + ModelName + '... + ' + saved);
							res.send((0, _defineProperty3.default)({}, ModelName, saved));
							_context5.next = 14;
							break;

						case 10:
							_context5.prev = 10;
							_context5.t0 = _context5['catch'](1);

							_appLogger2.default.error('Error in getting ' + ModelName + ' ' + name + '-  + ' + _context5.t0);
							errorRes(res, 400, 'Error in getting ' + ModelName + ' ' + name + '-  + ' + _context5.t0);

						case 14:
						case 'end':
							return _context5.stop();
					}
				}
			}, _callee5, undefined, [[1, 10]]);
		}));

		return function (_x15, _x16) {
			return _ref5.apply(this, arguments);
		};
	}();

	controller.delete = function () {
		var _ref6 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee6(req, res) {
			var name, allSources, id, removed;
			return _regenerator2.default.wrap(function _callee6$(_context6) {
				while (1) {
					switch (_context6.prev = _context6.next) {
						case 0:
							name = 'delete';
							_context6.prev = 1;
							allSources = (0, _extends3.default)({}, req.params, req.query, req.body);
							id = allSources.id;
							_context6.next = 6;
							return Model.delete(id);

						case 6:
							removed = _context6.sent;

							_appLogger2.default.info('Deleted ' + ModelName + '- \' + ' + removed);
							res.send({ id: id });
							_context6.next = 15;
							break;

						case 11:
							_context6.prev = 11;
							_context6.t0 = _context6['catch'](1);

							_appLogger2.default.error('Error in getting ' + ModelName + ' ' + name + '-  + ' + _context6.t0);
							errorRes(res, 400, 'Error in getting ' + ModelName + ' ' + name + '-  + ' + _context6.t0);

						case 15:
						case 'end':
							return _context6.stop();
					}
				}
			}, _callee6, undefined, [[1, 11]]);
		}));

		return function (_x17, _x18) {
			return _ref6.apply(this, arguments);
		};
	}();

	controller.addMany = function () {
		var _ref7 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee7(req, res) {
			var name, instances, datas;
			return _regenerator2.default.wrap(function _callee7$(_context7) {
				while (1) {
					switch (_context7.prev = _context7.next) {
						case 0:
							name = 'addMany';
							_context7.prev = 1;
							instances = req.body[ModelName + 's'] ? req.body[ModelName + 's'] : req.body;
							_context7.next = 5;
							return Model.addMany(instances, req.controllQuery);

						case 5:
							datas = _context7.sent;

							if (_lodash2.default.isError(datas)) {
								errorRes(res, 406, 'Duplicate Key ' + ModelName + ' ' + name);
							}
							res.send((0, _defineProperty3.default)({}, ModelName + 's', datas));
							_context7.next = 14;
							break;

						case 10:
							_context7.prev = 10;
							_context7.t0 = _context7['catch'](1);

							_appLogger2.default.error('Error in getting ' + ModelName + ' ' + name + '-  + ' + _context7.t0);
							errorRes(res, 400, 'Error in getting ' + ModelName + ' ' + name + '-  + ' + _context7.t0);

						case 14:
						case 'end':
							return _context7.stop();
					}
				}
			}, _callee7, undefined, [[1, 10]]);
		}));

		return function (_x19, _x20) {
			return _ref7.apply(this, arguments);
		};
	}();

	controller.dropAll = function () {
		var _ref8 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee8(req, res) {
			var name, list;
			return _regenerator2.default.wrap(function _callee8$(_context8) {
				while (1) {
					switch (_context8.prev = _context8.next) {
						case 0:
							name = 'dropAll';
							_context8.prev = 1;

							Model.collection.drop();
							_context8.next = 5;
							return Model.find({});

						case 5:
							list = _context8.sent;

							_appLogger2.default.info('Deleted ' + ModelName + '- \' + ' + name);
							res.send((0, _defineProperty3.default)({}, ModelName + 's', list));
							_context8.next = 14;
							break;

						case 10:
							_context8.prev = 10;
							_context8.t0 = _context8['catch'](1);

							_appLogger2.default.error('Error in getting ' + ModelName + ' ' + name + '-  + ' + _context8.t0);
							errorRes(res, 400, 'Error in getting ' + ModelName + ' ' + name + '-  + ' + _context8.t0);

						case 14:
						case 'end':
							return _context8.stop();
					}
				}
			}, _callee8, undefined, [[1, 10]]);
		}));

		return function (_x21, _x22) {
			return _ref8.apply(this, arguments);
		};
	}();

	controller.updateList = function () {
		var _ref9 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee9(req, res) {
			var name, instances, datas, list;
			return _regenerator2.default.wrap(function _callee9$(_context9) {
				while (1) {
					switch (_context9.prev = _context9.next) {
						case 0:
							name = 'updateList';
							_context9.prev = 1;
							instances = req.body[ModelName + 's'] ? req.body[ModelName + 's'] : req.body;
							datas = instances || [];
							_context9.next = 6;
							return _promise2.default.all(_lodash2.default.map(datas, function (_ref10) {
								var id = _ref10.id,
								    updatedAt = _ref10.updatedAt,
								    createdAt = _ref10.createdAt,
								    _id = _ref10._id,
								    rest = (0, _objectWithoutProperties3.default)(_ref10, ['id', 'updatedAt', 'createdAt', '_id']);

								return Model.update(id, rest, req.controllQuery);
							}));

						case 6:
							list = _context9.sent;

							_appLogger2.default.info('updated List ' + ModelName + '- \' + ' + name);
							res.send((0, _defineProperty3.default)({}, ModelName + 's', list));
							_context9.next = 15;
							break;

						case 11:
							_context9.prev = 11;
							_context9.t0 = _context9['catch'](1);

							_appLogger2.default.error('Error in getting ' + ModelName + ' ' + name + '-  + ' + _context9.t0);
							errorRes(res, 400, 'Error in getting ' + ModelName + ' ' + name + '-  + ' + _context9.t0);

						case 15:
						case 'end':
							return _context9.stop();
					}
				}
			}, _callee9, undefined, [[1, 11]]);
		}));

		return function (_x23, _x24) {
			return _ref9.apply(this, arguments);
		};
	}();
	controller.getSchema = function () {
		var _ref11 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee10(req, res) {
			var name, keys, schema;
			return _regenerator2.default.wrap(function _callee10$(_context10) {
				while (1) {
					switch (_context10.prev = _context10.next) {
						case 0:
							name = 'getSchema';

							try {
								keys = _lodash2.default.keys(Model.schema.paths);
								schema = {};

								keys.map(function (key) {
									schema[key] = {
										type: Model.schema.paths[key].instance,
										isRequired: Model.schema.paths[key].isRequired,
										defaultValue: Model.schema.paths[key].defaultValue
									};
								});
								res.send((0, _defineProperty3.default)({}, ModelName + 'Schema', schema));
							} catch (err) {
								_appLogger2.default.error('Error in getting ' + ModelName + ' ' + name + '-  + ' + err);
								errorRes(res, 400, 'Error in getting ' + ModelName + ' ' + name + '-  + ' + err);
							}

						case 2:
						case 'end':
							return _context10.stop();
					}
				}
			}, _callee10, undefined);
		}));

		return function (_x25, _x26) {
			return _ref11.apply(this, arguments);
		};
	}();
	return controller;
};