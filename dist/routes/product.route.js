'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _product = require('../controllers/product.controller');

var _product2 = _interopRequireDefault(_product);

var _resourcesRoutes = require('./Routes/resourcesRoutes');

var _resourcesRoutes2 = _interopRequireDefault(_resourcesRoutes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();
router = (0, _resourcesRoutes2.default)(router, _product2.default);
exports.default = router;