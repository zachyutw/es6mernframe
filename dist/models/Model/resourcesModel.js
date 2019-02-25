'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _queryRESTFulPlugin = require('../queryHelper/queryRESTFulPlugin');

var _queryRESTFulPlugin2 = _interopRequireDefault(_queryRESTFulPlugin);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (Model) {
	Model.getList = function (controllQuery) {
		var query = Model.find({});
		query = (0, _queryRESTFulPlugin2.default)(query, controllQuery);
		return query.exec();
	};
	Model.findManyByIds = function (propIds, controllQuery) {
		var ids = _lodash2.default.map(propIds, function (id) {
			return _mongoose2.default.Types.ObjectId(id);
		});
		console.log(propIds);
		var query = Model.find({
			_id: {
				$in: ids
			}
		}, function (err, doc) {
			return doc;
		});
		query = (0, _queryRESTFulPlugin2.default)(query, controllQuery);
		return query.exec();
	};
	Model.addMany = function () {
		var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(datas) {
			var controllQuery = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
			var newDatas, listSaved;
			return _regenerator2.default.wrap(function _callee$(_context) {
				while (1) {
					switch (_context.prev = _context.next) {
						case 0:
							_context.next = 2;
							return _promise2.default.all(_lodash2.default.map(datas, function (data) {
								return Model(data);
							}));

						case 2:
							newDatas = _context.sent;
							_context.next = 5;
							return Model.insertMany(newDatas);

						case 5:
							listSaved = _context.sent;

							if (!_lodash2.default.isError(listSaved)) {
								_context.next = 10;
								break;
							}

							return _context.abrupt('return', listSaved);

						case 10:
							listSaved = _lodash2.default.map(listSaved, function (saved) {
								if (_lodash2.default.isEmpty(controllQuery.selects)) {
									return saved;
								} else {
									return _lodash2.default.pick(saved, controllQuery.selects);
								}
							});
							return _context.abrupt('return', listSaved);

						case 12:
						case 'end':
							return _context.stop();
					}
				}
			}, _callee, undefined);
		}));

		return function (_x) {
			return _ref.apply(this, arguments);
		};
	}();
	Model.setItem = function () {
		var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(source, controllQuery) {
			var mapKeysSource, data, result, query;
			return _regenerator2.default.wrap(function _callee2$(_context2) {
				while (1) {
					switch (_context2.prev = _context2.next) {
						case 0:
							_context2.prev = 0;
							mapKeysSource = _lodash2.default.mapKeys(source, function (value, key) {
								var replaceKey = key;
								if (key.endsWith('Id')) {
									replaceKey = key.replace('Id', '');
								}
								return replaceKey;
							});
							data = Model(mapKeysSource);
							_context2.next = 5;
							return data.save();

						case 5:
							result = _context2.sent;
							query = Model.findOne({ _id: result._id });

							query = (0, _queryRESTFulPlugin2.default)(query, controllQuery);
							return _context2.abrupt('return', query.exec());

						case 11:
							_context2.prev = 11;
							_context2.t0 = _context2['catch'](0);
							throw _context2.t0;

						case 14:
						case 'end':
							return _context2.stop();
					}
				}
			}, _callee2, undefined, [[0, 11]]);
		}));

		return function (_x3, _x4) {
			return _ref2.apply(this, arguments);
		};
	}();
	Model.getItem = function (_id, controllQuery) {
		var query = Model.findOne({ _id: _id });
		query = (0, _queryRESTFulPlugin2.default)(query, controllQuery);
		return query.exec();
	};
	Model.updateItem = function () {
		var _ref3 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3(_id, data, controllQuery) {
			var id, updatedAt, createdAt, rest, result, query;
			return _regenerator2.default.wrap(function _callee3$(_context3) {
				while (1) {
					switch (_context3.prev = _context3.next) {
						case 0:
							id = data.id, updatedAt = data.updatedAt, createdAt = data.createdAt, rest = (0, _objectWithoutProperties3.default)(data, ['id', 'updatedAt', 'createdAt']);
							_context3.next = 3;
							return Model.findByIdAndUpdate(_id, rest, { new: true }).then(function (data) {
								return data;
							}).catch(function (err) {
								throw new Error('' + err);
							});

						case 3:
							result = _context3.sent;
							query = Model.findOne({ _id: result._id });

							query = (0, _queryRESTFulPlugin2.default)(query, controllQuery);
							return _context3.abrupt('return', query.exec());

						case 7:
						case 'end':
							return _context3.stop();
					}
				}
			}, _callee3, undefined);
		}));

		return function (_x5, _x6, _x7) {
			return _ref3.apply(this, arguments);
		};
	}();

	Model.pushFields = function () {
		var _ref4 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee4(id, feildId, fieldName, controllQuery) {
			var result, query;
			return _regenerator2.default.wrap(function _callee4$(_context4) {
				while (1) {
					switch (_context4.prev = _context4.next) {
						case 0:
							_context4.next = 2;
							return Model.findByIdAndUpdate(id, { $push: (0, _defineProperty3.default)({}, fieldName, feildId) });

						case 2:
							result = _context4.sent;
							query = Model.findOne({ _id: result._id });

							query = (0, _queryRESTFulPlugin2.default)(query, controllQuery);
							return _context4.abrupt('return', query.exec());

						case 6:
						case 'end':
							return _context4.stop();
					}
				}
			}, _callee4, undefined);
		}));

		return function (_x8, _x9, _x10, _x11) {
			return _ref4.apply(this, arguments);
		};
	}();
	Model.pullFields = function () {
		var _ref5 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee5(id, feildId, fieldName, controllQuery) {
			var result, query;
			return _regenerator2.default.wrap(function _callee5$(_context5) {
				while (1) {
					switch (_context5.prev = _context5.next) {
						case 0:
							_context5.next = 2;
							return Model.findByIdAndUpdate(id, { $pull: (0, _defineProperty3.default)({}, fieldName, feildId) });

						case 2:
							result = _context5.sent;
							query = Model.findOne({ _id: result._id });

							query = (0, _queryRESTFulPlugin2.default)(query, controllQuery);
							return _context5.abrupt('return', query.exec());

						case 6:
						case 'end':
							return _context5.stop();
					}
				}
			}, _callee5, undefined);
		}));

		return function (_x12, _x13, _x14, _x15) {
			return _ref5.apply(this, arguments);
		};
	}();
	Model.delete = function (_id) {
		return Model.remove({ _id: _id }, function (err) {
			return console.log(err);
		});
	};
	Model.dropAll = function () {
		return Model.collection.drop();
	};
	Model.schema.set('toJSON', {
		transform: function transform(doc, ret, options) {
			ret.id = ret._id;
			delete ret._id;
			delete ret.__v;
		}
	});
	Model.schema.set('toObject', { getters: true });
	return Model;
};