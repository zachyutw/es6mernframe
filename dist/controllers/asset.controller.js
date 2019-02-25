'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _asset = require('../models/asset.model');

var _asset2 = _interopRequireDefault(_asset);

var _appLogger = require('../core/logger/app-logger');

var _appLogger2 = _interopRequireDefault(_appLogger);

var _config = require('../core/config/config.dev');

var _config2 = _interopRequireDefault(_config);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _resoruceContorller = require('./Controller/resoruceContorller');

var _resoruceContorller2 = _interopRequireDefault(_resoruceContorller);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ModelName = 'asset';
// inheritance resourceController with Basic CRUD class FortuneClass extends
// ResourcesClass{} const controller = new FortuneClass(Fortune);
var Model = _asset2.default;
var controller = (0, _resoruceContorller2.default)(Model, Model.collection.name);

controller.uploadFiles = function () {
	var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(req, res) {
		var name;
		return _regenerator2.default.wrap(function _callee$(_context) {
			while (1) {
				switch (_context.prev = _context.next) {
					case 0:
						name = 'uploadFiles';

						try {
							res.send({ message: 'success upload' });
						} catch (err) {
							res.status(414).send({ message: 'something is wrong' });
						}

					case 2:
					case 'end':
						return _context.stop();
				}
			}
		}, _callee, undefined);
	}));

	return function (_x, _x2) {
		return _ref.apply(this, arguments);
	};
}();
controller.uploadImages = function () {
	var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3(req, res) {
		var name, images, tagsList, assets;
		return _regenerator2.default.wrap(function _callee3$(_context3) {
			while (1) {
				switch (_context3.prev = _context3.next) {
					case 0:
						name = 'uploadImages';
						_context3.prev = 1;
						images = [];
						tagsList = [];
						_context3.prev = 4;

						if (!_lodash2.default.isArray(req.body.tagsList)) {
							tagsList = [req.body.tagsList];
						} else {
							tagsList = req.body.tagsList;
						}

						if (!(tagsList.length != req.files.length)) {
							_context3.next = 10;
							break;
						}

						res.status(400).send({ message: 'tagsList not mach images files' });
						_context3.next = 13;
						break;

					case 10:
						_context3.next = 12;
						return _promise2.default.all(_lodash2.default.map(req.files, function () {
							var _ref3 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(file, index) {
								var asset, saved;
								return _regenerator2.default.wrap(function _callee2$(_context2) {
									while (1) {
										switch (_context2.prev = _context2.next) {
											case 0:
												asset = (0, _asset2.default)((0, _extends3.default)({}, file, {
													domainName: _config2.default.domainName,
													url: _config2.default.domainName + file.path,
													status: 1
												}));
												_context2.next = 3;
												return _asset2.default.add(asset);

											case 3:
												saved = _context2.sent;

												images.push({
													imageUrl: saved.domainName + saved.path,
													thumbnail: saved.domainName + saved.path,
													tags: tagsList[index]
												});
												return _context2.abrupt('return', saved);

											case 6:
											case 'end':
												return _context2.stop();
										}
									}
								}, _callee2, undefined);
							}));

							return function (_x5, _x6) {
								return _ref3.apply(this, arguments);
							};
						}()));

					case 12:
						assets = _context3.sent;

					case 13:
						_context3.next = 19;
						break;

					case 15:
						_context3.prev = 15;
						_context3.t0 = _context3['catch'](4);

						console.log(_context3.t0);
						return _context3.abrupt('return', res.status(400).send({ message: 'tagsList go wrong', error: _context3.t0 }));

					case 19:
						res.send({ message: 'success upload', images: images });
						_context3.next = 26;
						break;

					case 22:
						_context3.prev = 22;
						_context3.t1 = _context3['catch'](1);

						console.log(_context3.t1);
						res.status(414).send({ message: 'something is wrong' });

					case 26:
					case 'end':
						return _context3.stop();
				}
			}
		}, _callee3, undefined, [[1, 22], [4, 15]]);
	}));

	return function (_x3, _x4) {
		return _ref2.apply(this, arguments);
	};
}();

controller.deleteImages = function () {
	var _ref4 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee6(req, res) {
		var _req$body, images, ids, assets;

		return _regenerator2.default.wrap(function _callee6$(_context6) {
			while (1) {
				switch (_context6.prev = _context6.next) {
					case 0:
						_context6.prev = 0;
						_req$body = req.body, images = _req$body.images, ids = _req$body.ids;
						assets = [];

						if (!ids) {
							_context6.next = 9;
							break;
						}

						_context6.next = 6;
						return _promise2.default.all(_lodash2.default.map(ids, function () {
							var _ref5 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee4(id) {
								var asset, deleted;
								return _regenerator2.default.wrap(function _callee4$(_context4) {
									while (1) {
										switch (_context4.prev = _context4.next) {
											case 0:
												_context4.next = 2;
												return _asset2.default.findById(id);

											case 2:
												asset = _context4.sent;

												if (asset) {
													_fs2.default.stat(asset.path, function (err, stats) {
														console.log(stats); //here we got all information of file in stats variable
														if (err) {
															return console.error(err);
														}
														_fs2.default.unlink(asset.path, function (err) {
															if (err) return console.log(err);
															console.log('file deleted successfully');
														});
													});
												}
												_context4.next = 6;
												return _asset2.default.findByIdAndRemove(id);

											case 6:
												deleted = _context4.sent;
												return _context4.abrupt('return', asset);

											case 8:
											case 'end':
												return _context4.stop();
										}
									}
								}, _callee4, undefined);
							}));

							return function (_x9) {
								return _ref5.apply(this, arguments);
							};
						}()));

					case 6:
						assets = _context6.sent;
						_context6.next = 16;
						break;

					case 9:
						if (!images) {
							_context6.next = 15;
							break;
						}

						_context6.next = 12;
						return _promise2.default.all(_lodash2.default.map(images, function () {
							var _ref6 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee5(image) {
								var asset, deleted;
								return _regenerator2.default.wrap(function _callee5$(_context5) {
									while (1) {
										switch (_context5.prev = _context5.next) {
											case 0:
												_context5.next = 2;
												return _asset2.default.findOne({ url: image.imageUrl });

											case 2:
												asset = _context5.sent;

												if (!asset) {
													_context5.next = 8;
													break;
												}

												_fs2.default.stat(asset.path, function (err, stats) {
													console.log(stats); //here we got all information of file in stats variable
													if (err) {
														return console.error(err);
													}
													_fs2.default.unlink(asset.path, function (err) {
														if (err) return console.log(err);
														console.log('file deleted successfully');
													});
												});
												_context5.next = 7;
												return _asset2.default.findByIdAndRemove(asset.id);

											case 7:
												deleted = _context5.sent;

											case 8:
												return _context5.abrupt('return', asset);

											case 9:
											case 'end':
												return _context5.stop();
										}
									}
								}, _callee5, undefined);
							}));

							return function (_x10) {
								return _ref6.apply(this, arguments);
							};
						}()));

					case 12:
						assets = _context6.sent;
						_context6.next = 16;
						break;

					case 15:
						res.status(400).send({ message: 'Faulty operation' });

					case 16:

						assets = _lodash2.default.map(assets, function (asset) {
							return _lodash2.default.pick(asset, ['id', 'url']);
						});
						assets = _lodash2.default.filter(assets, function (asset) {
							return !_lodash2.default.isEmpty(asset);
						});
						if (_lodash2.default.isEmpty(assets)) {
							res.status(400).send({ error: true, errorMessage: 'assets not found' });
						}
						res.send({ message: 'deleted', assets: assets });
						_context6.next = 26;
						break;

					case 22:
						_context6.prev = 22;
						_context6.t0 = _context6['catch'](0);

						console.log(_context6.t0);
						res.status(414).send({ message: 'something is wrong' });

					case 26:
					case 'end':
						return _context6.stop();
				}
			}
		}, _callee6, undefined, [[0, 22]]);
	}));

	return function (_x7, _x8) {
		return _ref4.apply(this, arguments);
	};
}();

exports.default = controller;