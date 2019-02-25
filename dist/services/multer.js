'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.fileUpload = exports.ImagesUpload = undefined;

var _multer = require('multer');

var _multer2 = _interopRequireDefault(_multer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ImagesStorage = _multer2.default.diskStorage({
    destination: function destination(req, file, cb) {
        cb(null, 'public/upload/images');
    },
    filename: function filename(req, file, cb) {
        var names = file.originalname.toLowerCase().split('.');
        var extension = names[names.length - 1];
        var fileName = Buffer.from(Date.now() + '-' + names[0]).toString('base64') + "." + extension;
        cb(null, fileName);
    }
});

var imageFileFilter = function imageFileFilter(req, file, cb) {
    var names = file.originalname.toLowerCase().split('.');
    var extension = names[names.length - 1];
    var whiteList = ["jpg", "png", "jpeg"];
    var found = whiteList.findIndex(function (item) {
        return item === extension;
    });
    // The function should call `cb` with a boolean
    // to indicate if the file should be accepted
    // To reject this file pass `false`, like so:
    if (found !== 0) {
        return cb(null, false);
    } else if (found === 0) {
        return cb(null, true);
    } else {
        return cb(new Error('I don\'t have a clue!'));
    }
    // To accept the file pass `true`, like so:

    // You can always pass an error if something goes wrong:
};

var filesStorage = _multer2.default.diskStorage({
    destination: function destination(req, file, cb) {
        cb(null, 'public/upload/images');
    },
    filename: function filename(req, file, cb) {
        var names = file.originalname.toLowerCase().split('.');
        var extension = names[names.length - 1];
        var fileName = Buffer.from(Date.now() + '-' + names[0]).toString('base64') + "." + extension;
        cb(null, fileName);
    }
});

var ImagesUpload = exports.ImagesUpload = (0, _multer2.default)({ storage: ImagesStorage, imageFileFilter: imageFileFilter });
var fileUpload = exports.fileUpload = (0, _multer2.default)({ storage: filesStorage });