'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var getToken = function getToken(data, jwtSecrect, expireMinutes) {
	var token = _jsonwebtoken2.default.sign(data, jwtSecrect, {
		expiresIn: 60 * 24 * 3 * expireMinutes
	});
	return token;
};

var decodedToken = function decodedToken(token, jwtSecrect) {
	return _jsonwebtoken2.default.verify(token, jwtSecrect, function (err, decoded) {
		return err ? {} : decoded;
	});
};
var jsonWebToken = {
	getToken: getToken,
	decodedToken: decodedToken
};
exports.default = jsonWebToken;