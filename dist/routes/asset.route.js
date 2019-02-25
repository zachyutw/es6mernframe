'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _resourcesRoutes = require('./Routes/resourcesRoutes');

var _resourcesRoutes2 = _interopRequireDefault(_resourcesRoutes);

var _asset = require('../controllers/asset.controller');

var _asset2 = _interopRequireDefault(_asset);

var _multer = require('../services/multer');

var _RESTPlugins = require('../services/RESTPlugins');

var _RESTPlugins2 = _interopRequireDefault(_RESTPlugins);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();
router = (0, _resourcesRoutes2.default)(router, _asset2.default);
router.post('/files', _multer.fileUpload.array('files'), function (req, res) {
	_asset2.default.uploadFiles(req, res);
});
router.post('/images', _multer.ImagesUpload.array('images'), function (req, res) {
	_asset2.default.uploadImages(req, res);
});
router.delete('/images', function (req, res) {
	_asset2.default.deleteImages(req, res);
});

exports.default = router;