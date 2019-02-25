'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray');

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _user = require('../../models/user.model');

var _user2 = _interopRequireDefault(_user);

var _faker = require('faker');

var _faker2 = _interopRequireDefault(_faker);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var createFakeUser = function createFakeUser() {

    var fakerEmail = _faker2.default.internet.email();
    var fakerName = _faker2.default.name.findName();
    var data = {
        avatar: _faker2.default.image.avatar(),
        provider: "faker",
        displayName: fakerName,
        name: fakerName,
        username: fakerEmail,
        password: "1234",
        role: 1,
        phone: _faker2.default.phone.phoneNumber(),
        email: _faker2.default.internet.email(),
        yearOfBirth: _faker2.default.date.past(),
        verify: _faker2.default.random.boolean(),
        isVerifiedLandlord: _faker2.default.random.boolean(),
        isVerifiedTenant: _faker2.default.random.boolean(),
        clientSecret: "lasfuWebsite"
    };
    return data;
};

var AdminUser = function AdminUser(n) {
    var data = {
        avatar: _faker2.default.image.avatar(),
        provider: "admin",
        displayName: 'roro' + n,
        name: 'roro' + n,
        username: 'roro' + n + '@roro.com',
        password: "1234",
        phone: _faker2.default.phone.phoneNumber(),
        email: 'roro' + n + '@roro.com',
        yearOfBirth: _faker2.default.date.past(),
        verify: true,
        role: 3,
        isVerifiedLandlord: true,
        isVerifiedTenant: true,
        clientSecret: "lasfuWebsite"
    };
    return data;
};
var add = function () {
    var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(user) {
        var data, saved;
        return _regenerator2.default.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        _context.prev = 0;
                        data = (0, _user2.default)(user);
                        _context.next = 4;
                        return _user2.default.add(data);

                    case 4:
                        saved = _context.sent;
                        return _context.abrupt('return', saved);

                    case 8:
                        _context.prev = 8;
                        _context.t0 = _context['catch'](0);

                        console.log(_context.t0, "error");

                    case 11:
                    case 'end':
                        return _context.stop();
                }
            }
        }, _callee, undefined, [[0, 8]]);
    }));

    return function add(_x) {
        return _ref.apply(this, arguments);
    };
}();

var seedUser = function () {
    var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2() {
        var name, SEED_AMOUNT, OUTSIDE_SEED, ADMINUSER_AMOUNT, savedList, numberCount, adminUsers, fakeUsers, fakeDatas, _adminUsers, _fakeUsers, _fakeDatas;

        return _regenerator2.default.wrap(function _callee2$(_context2) {
            while (1) {
                switch (_context2.prev = _context2.next) {
                    case 0:
                        name = "seedUser";
                        SEED_AMOUNT = 25;
                        OUTSIDE_SEED = 5;
                        ADMINUSER_AMOUNT = 5;
                        savedList = [];
                        _context2.next = 7;
                        return _user2.default.count();

                    case 7:
                        numberCount = _context2.sent;

                        if (!(numberCount === 0)) {
                            _context2.next = 20;
                            break;
                        }

                        adminUsers = _lodash2.default.times(ADMINUSER_AMOUNT, function (n) {
                            return AdminUser(n + 1);
                        });
                        fakeUsers = _lodash2.default.times(SEED_AMOUNT - ADMINUSER_AMOUNT, function () {
                            return createFakeUser();
                        });
                        fakeDatas = [].concat((0, _toConsumableArray3.default)(adminUsers), (0, _toConsumableArray3.default)(fakeUsers));
                        _context2.next = 14;
                        return _user2.default.insertMany(fakeDatas);

                    case 14:
                        savedList = _context2.sent;

                        savedList = _lodash2.default.chain(savedList).map(function (saved) {
                            return _lodash2.default.pick(saved, ["_id"]);
                        }).value();
                        console.log('seeded new ' + name + ' ' + savedList.length);
                        return _context2.abrupt('return', savedList);

                    case 20:
                        if (!(numberCount <= SEED_AMOUNT + OUTSIDE_SEED)) {
                            _context2.next = 29;
                            break;
                        }

                        _context2.next = 23;
                        return _user2.default.find({});

                    case 23:
                        savedList = _context2.sent;

                        savedList = _lodash2.default.chain(savedList).map(function (saved) {
                            return _lodash2.default.pick(saved, ["_id"]);
                        }).value();
                        console.log('already seeded ' + name + ' ' + numberCount);
                        return _context2.abrupt('return', savedList);

                    case 29:
                        _user2.default.collection.drop();
                        _adminUsers = _lodash2.default.times(ADMINUSER_AMOUNT, function (n) {
                            return AdminUser(n + 1);
                        });
                        _fakeUsers = _lodash2.default.times(SEED_AMOUNT - ADMINUSER_AMOUNT, function () {
                            return createFakeUser();
                        });
                        _fakeDatas = [].concat((0, _toConsumableArray3.default)(_adminUsers), (0, _toConsumableArray3.default)(_fakeUsers));
                        _context2.next = 35;
                        return _user2.default.insertMany(_fakeDatas);

                    case 35:
                        savedList = _context2.sent;

                        savedList = _lodash2.default.chain(savedList).map(function (saved) {
                            return _lodash2.default.pick(saved, ["_id"]);
                        }).value();
                        console.log('droped seeded ' + name + ' ' + savedList.length);
                        return _context2.abrupt('return', savedList);

                    case 39:
                    case 'end':
                        return _context2.stop();
                }
            }
        }, _callee2, this);
    }));

    return function seedUser() {
        return _ref2.apply(this, arguments);
    };
}();

exports.default = seedUser;