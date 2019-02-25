'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _chatroom = require('../controllers/chatroom.controller');

var _chatroom2 = _interopRequireDefault(_chatroom);

var _resourcesRoutes = require('./Routes/resourcesRoutes');

var _resourcesRoutes2 = _interopRequireDefault(_resourcesRoutes);

var _RESTPlugins = require('../services/RESTPlugins');

var _RESTPlugins2 = _interopRequireDefault(_RESTPlugins);

var _authorize = require('../services/authorize');

var _authorize2 = _interopRequireDefault(_authorize);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

router.post('/item', _authorize2.default.authorized, function (req, res) {
	_chatroom2.default.createChatroom(req, res);
});
router.delete('/item/:id?', _authorize2.default.authorized, function (req, res) {
	_chatroom2.default.removeChatroom(req, res);
});
router.get('/list/my', _authorize2.default.authorized, function (req, res) {
	_chatroom2.default.getMyChatroom(req, res);
});
//! New router sould be above resourcesRoutes
//* The request will go to the top route first
router = (0, _resourcesRoutes2.default)(router, _chatroom2.default);
exports.default = router;