'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _resourcesRoutes = require('./Routes/resourcesRoutes');

var _resourcesRoutes2 = _interopRequireDefault(_resourcesRoutes);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _googleMap = require('../services/googleMap');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();
router.post('/node/searchGeoInfo', function () {
    var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(req, res) {
        var _req$body$description, description, results, post;

        return _regenerator2.default.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        console.log(req.body);
                        _req$body$description = req.body.description, description = _req$body$description === undefined ? "" : _req$body$description;
                        _context.next = 4;
                        return (0, _googleMap.googleMapGeocode)(description);

                    case 4:
                        results = _context.sent;
                        post = (0, _googleMap.convertPostAddress)(results);

                        if (!_lodash2.default.isEmpty(post)) {
                            res.send({ message: "test Success", post: post });
                        } else {
                            res.status(200).send({ message: "no data avaiable", post: {} });
                        }

                    case 7:
                    case 'end':
                        return _context.stop();
                }
            }
        }, _callee, undefined);
    }));

    return function (_x, _x2) {
        return _ref.apply(this, arguments);
    };
}());
exports.default = router;