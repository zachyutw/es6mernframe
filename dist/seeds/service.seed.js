'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _service = require('../models/service.model');

var _service2 = _interopRequireDefault(_service);

var _faker = require('faker');

var _faker2 = _interopRequireDefault(_faker);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var fakeService = function fakeService() {
    return {
        price: _faker2.default.commerce.price(),
        name: _faker2.default.commerce.productName(),
        description: _faker2.default.lorem.paragraph(),
        serviceType: 0,
        unitType: 0,
        iconUrl: _faker2.default.image.technics()
    };
};

var createFakeDatas = function createFakeDatas(amount) {
    var fakeDatas = _lodash2.default.times(amount, function () {
        return fakeService();
    });
    return fakeDatas;
};
var seedService = function () {
    var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee() {
        var name, SEED_AMOUNT, OUTSIDE_SEED, ADMINUSER_AMOUNT, savedList, numberCount, fakeDatas, _fakeDatas;

        return _regenerator2.default.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        name = "seedService";
                        SEED_AMOUNT = 10;
                        OUTSIDE_SEED = 5;
                        ADMINUSER_AMOUNT = 5;
                        savedList = [];
                        _context.next = 7;
                        return _service2.default.count();

                    case 7:
                        numberCount = _context.sent;

                        if (!(numberCount === 0)) {
                            _context.next = 18;
                            break;
                        }

                        fakeDatas = createFakeDatas(SEED_AMOUNT);
                        _context.next = 12;
                        return _service2.default.insertMany(fakeDatas);

                    case 12:
                        savedList = _context.sent;

                        savedList = _lodash2.default.chain(savedList).map(function (saved) {
                            return _lodash2.default.pick(saved, ["_id"]);
                        }).value();
                        console.log('seeded new ' + name + ' ' + savedList.length);
                        return _context.abrupt('return', savedList);

                    case 18:
                        if (!(numberCount <= SEED_AMOUNT + OUTSIDE_SEED)) {
                            _context.next = 27;
                            break;
                        }

                        _context.next = 21;
                        return _service2.default.find({});

                    case 21:
                        savedList = _context.sent;

                        savedList = _lodash2.default.chain(savedList).map(function (saved) {
                            return _lodash2.default.pick(saved, ["_id"]);
                        }).value();
                        console.log('already seeded ' + name + ' ' + numberCount);
                        return _context.abrupt('return', savedList);

                    case 27:
                        _service2.default.collection.drop();
                        _fakeDatas = createFakeDatas(SEED_AMOUNT);
                        _context.next = 31;
                        return _service2.default.insertMany(_fakeDatas);

                    case 31:
                        savedList = _context.sent;

                        savedList = _lodash2.default.chain(savedList).map(function (saved) {
                            return _lodash2.default.pick(saved, ["_id"]);
                        }).value();
                        console.log('droped seeded ' + name + ' ' + savedList.length);
                        return _context.abrupt('return', savedList);

                    case 35:
                    case 'end':
                        return _context.stop();
                }
            }
        }, _callee, this);
    }));

    return function seedService() {
        return _ref.apply(this, arguments);
    };
}();

exports.default = seedService;