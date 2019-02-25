'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.basicClient = undefined;

var _axios = require('axios');

var _axios2 = _interopRequireDefault(_axios);

var _config = require('../core/config/config.dev');

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var proxyToAuth = _axios2.default.create({ baseURL: _config2.default.authBaseUrl, timeout: 1000 });
var basicClient = exports.basicClient = { "Authorization": "Basic YWNtZTphY21lc2VjcmV0" };
exports.default = proxyToAuth;