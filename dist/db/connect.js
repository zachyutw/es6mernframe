'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _appLogger = require('../core/logger/app-logger');

var _appLogger2 = _interopRequireDefault(_appLogger);

var _config = require('../core/config/config.dev');

var _config2 = _interopRequireDefault(_config);

var _combineSeeds = require('./seed/combineSeeds');

var _combineSeeds2 = _interopRequireDefault(_combineSeeds);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_mongoose2.default.Promise = global.Promise;

var connectToDb = function () {
    var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee() {
        var dbHost, dbPort, dbName, mongoDBConnection;
        return _regenerator2.default.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        dbHost = _config2.default.dbHost;
                        dbPort = _config2.default.dbPort;
                        dbName = _config2.default.dbName;
                        mongoDBConnection = _config2.default.mongoDBConnection;
                        _context.prev = 4;
                        _context.next = 7;
                        return _mongoose2.default.connect(mongoDBConnection);

                    case 7:
                        _appLogger2.default.info('Connected to mongo!!!');
                        // combineSeeds();
                        _context.next = 13;
                        break;

                    case 10:
                        _context.prev = 10;
                        _context.t0 = _context['catch'](4);

                        _appLogger2.default.error('Could not connect to MongoDB');

                    case 13:
                    case 'end':
                        return _context.stop();
                }
            }
        }, _callee, undefined, [[4, 10]]);
    }));

    return function connectToDb() {
        return _ref.apply(this, arguments);
    };
}();

exports.default = connectToDb;