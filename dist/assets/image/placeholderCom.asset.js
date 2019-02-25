'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
var placeholderComUrl = 'https://via.placeholder.com';
var DEFAULT_IMAGE = 'https://via.placeholder.com/300/09f/fff.png';
var getPlaceholderImage = function getPlaceholderImage(text) {
	var size = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '300x300';
	var background = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '09f';
	var color = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 'fff';
	var ext = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : '.png';
	return text ? placeholderComUrl + '/' + size + '/' + background + '/' + color + ext + '?text=' + text : placeholderComUrl + '/' + size + '/' + background + '/' + color + ext;
};

exports.default = DEFAULT_IMAGE;
var placeholderImage = exports.placeholderImage = getPlaceholderImage();