'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.convertPostAddress = exports.googleMapGeocode = undefined;

var _stringify = require('babel-runtime/core-js/json/stringify');

var _stringify2 = _interopRequireDefault(_stringify);

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _maps = require('@google/maps');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var googleMapsClient = (0, _maps.createClient)({ key: "AIzaSyD5kYQt-5AWnQi-CKkPJIP0S3GBBdyhNGc", Promise: _promise2.default });
var googleMapGeocode = exports.googleMapGeocode = function googleMapGeocode(address) {
    var filtedStr = _lodash2.default.chain(address).replace(/[^A-Za-z0-9]/ig, " ").lowerCase().split(' ').compact().uniq().join('+').value();
    var results = googleMapsClient.geocode({
        address: filtedStr,
        components: { country: "CA" }
    }).asPromise().then(function (response) {
        return response.json.results;
    }).catch(function (err) {
        return console.log(err);
    });
    return results;
};

var convertPostAddress = exports.convertPostAddress = function convertPostAddress(results) {
    var _result = {};
    if (!_lodash2.default.isEmpty(results)) {
        var _results$ = results[0],
            _results$$address_com = _results$.address_components,
            address_components = _results$$address_com === undefined ? [] : _results$$address_com,
            _results$$formatted_a = _results$.formatted_address,
            formatted_address = _results$$formatted_a === undefined ? "" : _results$$formatted_a,
            _results$$geometry = _results$.geometry,
            geometry = _results$$geometry === undefined ? {} : _results$$geometry;

        if (!_lodash2.default.isEmpty(address_components)) {
            address_components.map(function (_ref) {
                var types = _ref.types,
                    short_name = _ref.short_name;

                if (types[0] == "administrative_area_level_1" && short_name == "BC") {
                    console.log("in BC");
                    var addressComponent = (0, _stringify2.default)(address_components);

                    _result.formattedAddress = formatted_address;
                    _result.addressComponent = addressComponent;
                    _result.lat = geometry.location.lat;
                    _result.lng = geometry.location.lng;

                    return;
                } else if (types[0] == "administrative_area_level_1") {
                    console.log("not in BC");
                    console.log(types[0]);
                    console.log(short_name);
                    console.log(response.json.results);
                    _result = {};
                }
            });
        }
    }
    return _result;
};