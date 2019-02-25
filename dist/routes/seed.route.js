'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _seed = require('../controllers/seed.controller');

var _seed2 = _interopRequireDefault(_seed);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();
router.get('/node/clean', function (req, res) {
    _seed2.default.clean(req, res);
});
router.get('/node/seed', function (req, res) {
    _seed2.default.seed(req, res);
});

exports.default = router;