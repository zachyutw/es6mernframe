'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _user = require('../controllers/user.controller');

var _user2 = _interopRequireDefault(_user);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router(); //routes/auth.js

router.get('/profile', function (req, res) {
	_user2.default.getProfile(req, res);
});
router.put('/profile', function (req, res) {
	_user2.default.updateProfile(req, res);
});

exports.default = router;