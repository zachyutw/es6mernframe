'use strict';

var _fortune = require('../models/fortune.model');

var _fortune2 = _interopRequireDefault(_fortune);

var _chai = require('chai');

var _chai2 = _interopRequireDefault(_chai);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var expect = _chai2.default.expect;
describe('加法函数的测试', function () {
  it('1 加 1 应该等于 2', function () {
    expect(_fortune2.default.getTestNum()).to.be.equal(123);
  });
});