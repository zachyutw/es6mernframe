'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.validPassword = exports.generateHash = undefined;

var _bcryptNodejs = require('bcrypt-nodejs');

var _bcryptNodejs2 = _interopRequireDefault(_bcryptNodejs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var generateHash = exports.generateHash = function generateHash(password) {
    return _bcryptNodejs2.default.hashSync(password, _bcryptNodejs2.default.genSaltSync(8), null);
};
var validPassword = exports.validPassword = function validPassword(password, hashPassword) {
    return _bcryptNodejs2.default.compareSync(password, hashPassword);
};

var bcryptCode = {
    generateHash: generateHash,
    validPassword: validPassword
};

exports.default = bcryptCode;