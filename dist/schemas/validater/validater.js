"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.validateEmail = validateEmail;
var emailReg = exports.emailReg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
function validateEmail(email) {
	var re = emailReg;
	return re.test(email);
}

var validater = { validateEmail: validateEmail };

exports.default = validater;