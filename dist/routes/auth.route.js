'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _auth = require('../controllers/auth.controller');

var _auth2 = _interopRequireDefault(_auth);

var _authorize = require('../services/authorize');

var _authorize2 = _interopRequireDefault(_authorize);

var _RESTPlugins = require('../services/RESTPlugins');

var _RESTPlugins2 = _interopRequireDefault(_RESTPlugins);

var _resourcesRoutes = require('./Routes/resourcesRoutes');

var _resourcesRoutes2 = _interopRequireDefault(_resourcesRoutes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//routes/auth.js
var router = _express2.default.Router();
router = (0, _resourcesRoutes2.default)(router, _auth2.default);
router.put('/password', _authorize2.default.authorized, function (req, res) {
	_auth2.default.updatePassword(req, res);
});
router.post('/signIn', _authorize2.default.passportCustom, function (req, res) {
	_auth2.default.signIn(req, res);
});
router.post('/email/verify', function (req, res) {
	_auth2.default.sendEmailVerifyCode(req, res);
});
router.get('/email/verify', function (req, res) {
	_auth2.default.decodedEmailToken(req, res);
});
router.post('/signUp/email', function (req, res) {
	_auth2.default.emailSignUp(req, res);
});

router.post('/signUp', function (req, res) {
	_auth2.default.setItem(req, res);
});

exports.default = router;