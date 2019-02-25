'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _faker = require('faker');

var _faker2 = _interopRequireDefault(_faker);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();
router.use(RESTPlugins.allFunctionsPlugin);
router.get('/node/serialId', function (req, res) {
    res.send({ serialId: _faker2.default.finance.bitcoinAddress() });
});
router.get('/node/gst', function (req, res) {
    res.send({ gst: 0.05 });
});
router.get('/node/pst', function (req, res) {
    res.send({ pst: 0.02 });
});
exports.default = router;