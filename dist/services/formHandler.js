'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.multipartMiddleware = undefined;

var _formidable = require('formidable');

var _formidable2 = _interopRequireDefault(_formidable);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _connectMultiparty = require('connect-multiparty');

var _connectMultiparty2 = _interopRequireDefault(_connectMultiparty);

var _formData = require('form-data');

var _formData2 = _interopRequireDefault(_formData);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _objectToFormdata = require('object-to-formdata');

var _objectToFormdata2 = _interopRequireDefault(_objectToFormdata);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var streamFormDataFile = function streamFormDataFile(formData, fileKey, file) {
    var filePath = file.path,
        originalFilename = file.originalFilename;


    var newPath = _path2.default.join(_path2.default.dirname(filePath), originalFilename);
    _fs2.default.rename(filePath, newPath, function (err) {
        if (err) {
            console.log(err, "err");
            return;
        } else {
            console.log(formData);
            var _file = _fs2.default.createReadStream(newPath);
            formData.append("123", _file);
            console.log(formData);
            return formData;
        }
    });
};
var formHandler = function formHandler(req, res, next) {
    // console.log(req.body);
    // console.log(req.files);
    var bodyKeys = _lodash2.default.keys(req.body);
    var formData = new _formData2.default();
    // bodyKeys.map( (key)=> { formData.append(key,req.body[`${key}`])});
    //? handle multi files
    var fileKey = "images";
    if (_lodash2.default.isArray(req.files['' + fileKey])) {
        req.files['' + fileKey].map(function (readFile) {
            formData = streamFormDataFile(formData, fileKey, readFile) || formData;
        });
    } else {
        var readFile = req.files['' + fileKey];
        formData = streamFormDataFile(formData, fileKey, readFile) || formData;
    }

    req.form = formData;
    return next();
};
var multipartMiddleware = exports.multipartMiddleware = (0, _connectMultiparty2.default)();
exports.default = formHandler;