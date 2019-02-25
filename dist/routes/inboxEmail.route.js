'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _inboxEmail = require('../controllers/inboxEmail.controller');

var _inboxEmail2 = _interopRequireDefault(_inboxEmail);

var _resourcesRoutes = require('./Routes/resourcesRoutes');

var _resourcesRoutes2 = _interopRequireDefault(_resourcesRoutes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();
router.post('/send', function (req, res) {
	_inboxEmail2.default.send(req, res);
});
router.get('/verify', function (req, res) {
	console.log(req.query);
	_inboxEmail2.default.verify(req, res);
	// res.redirect('/');
});
exports.default = router;