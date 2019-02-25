"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
var parseNumber = function parseNumber(num) {
    return _.isNumber(num) ? num : _.toNumber(num);
};

exports.default = function (latitude, longitude, radiusInMeters) {

    var getRandomCoordinates = function getRandomCoordinates(radius, uniform) {
        // Generate two random numbers
        var a = Math.random(),
            b = Math.random();

        // Flip for more uniformity.
        if (uniform) {
            if (b < a) {
                var c = b;
                b = a;
                a = c;
            }
        }

        // It's all triangles.
        return [b * radius * Math.cos(2 * Math.PI * a / b), b * radius * Math.sin(2 * Math.PI * a / b)];
    };

    var randomCoordinates = getRandomCoordinates(radiusInMeters, true);

    // Earths radius in meters via WGS 84 model.
    var earth = 6378137;

    // Offsets in meters.
    var northOffset = randomCoordinates[0],
        eastOffset = randomCoordinates[1];

    // Offset coordinates in radians.
    var offsetLatitude = northOffset / earth,
        offsetLongitude = eastOffset / (earth * Math.cos(Math.PI * (latitude / 180)));

    // Offset position in decimal degrees.
    return {
        lat: latitude + offsetLatitude * (180 / Math.PI),
        lng: longitude + offsetLongitude * (180 / Math.PI)
    };
};