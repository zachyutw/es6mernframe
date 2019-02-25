'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _user = require('../controllers/user.controller');

var _user2 = _interopRequireDefault(_user);

var _resourcesRoutes = require('./Routes/resourcesRoutes');

var _resourcesRoutes2 = _interopRequireDefault(_resourcesRoutes);

var _RESTPlugins = require('../services/RESTPlugins');

var _RESTPlugins2 = _interopRequireDefault(_RESTPlugins);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();
router.use(_RESTPlugins2.default.allFunctionsPlugin);
router = (0, _resourcesRoutes2.default)(router, _user2.default);
exports.default = router;