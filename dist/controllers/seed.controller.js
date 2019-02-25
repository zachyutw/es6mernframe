'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _appLogger = require('../core/logger/app-logger');

var _appLogger2 = _interopRequireDefault(_appLogger);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _user = require('../models/user.model');

var _user2 = _interopRequireDefault(_user);

var _combineSeeds = require('../db/seed/combineSeeds');

var _combineSeeds2 = _interopRequireDefault(_combineSeeds);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//inheritance resourceController with Basic CRUD
// class FortuneClass extends ResourcesClass{}
// const controller = new FortuneClass(Fortune);

var controller = {};
var ModelName = "seed function";

controller.clean = function () {
    var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(req, res) {
        var name, user;
        return _regenerator2.default.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        name = "clean";
                        _context.prev = 1;

                        _user2.default.collection.drop();
                        _context.next = 5;
                        return _user2.default.find({});

                    case 5:
                        user = _context.sent;

                        // console.log(newDatas)
                        _appLogger2.default.info('clean all Modals posts num:' + posts.length + ' users num:' + user.length + '...');
                        res.send({ message: "clean success" });
                        _context.next = 14;
                        break;

                    case 10:
                        _context.prev = 10;
                        _context.t0 = _context['catch'](1);

                        _appLogger2.default.error('Error in getting ' + ModelName + ' ' + name + '-  + ' + _context.t0);
                        res.send('Got error in ' + ModelName + ' ' + name);

                    case 14:
                    case 'end':
                        return _context.stop();
                }
            }
        }, _callee, undefined, [[1, 10]]);
    }));

    return function (_x, _x2) {
        return _ref.apply(this, arguments);
    };
}();
controller.seed = function () {
    var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(req, res) {
        var name, user;
        return _regenerator2.default.wrap(function _callee2$(_context2) {
            while (1) {
                switch (_context2.prev = _context2.next) {
                    case 0:
                        name = "seed";
                        _context2.prev = 1;

                        (0, _combineSeeds2.default)();
                        _context2.next = 5;
                        return _user2.default.find({});

                    case 5:
                        user = _context2.sent;

                        // console.log(newDatas)
                        _appLogger2.default.info('get all Modals posts num:' + posts.length + ' users num:' + user.length + '...');
                        res.send({ message: "seed success" });
                        _context2.next = 14;
                        break;

                    case 10:
                        _context2.prev = 10;
                        _context2.t0 = _context2['catch'](1);

                        _appLogger2.default.error('Error in getting ' + ModelName + ' ' + name + '-  + ' + _context2.t0);
                        res.send('Got error in ' + ModelName + ' ' + name);

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