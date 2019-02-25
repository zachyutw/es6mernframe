'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var PORT = 5000;
var config = {};

config.logFileDir = _path2.default.join(__dirname, '../../log');
config.logFileName = 'app.log';
config.dbHost = process.env.dbHost || 'localhost';
config.dbPort = process.env.dbPort || '27017';
config.dbName = process.env.dbName || 'mernFrame1';
config.PORT = process.env.PORT || PORT;
config.twilio = process.env.twilio || '6f6b83fb780e60152882e4b3fecb11a0';
config.domainName = process.env.domainName || 'http://localhost:' + PORT + '/api/';
exports.default = config;