'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
var whitelist = ['http://localhost:8080', 'http://localhost:3000'];
var corsOptionsDelegate = exports.corsOptionsDelegate = function corsOptionsDelegate(req, callback) {
    var corsOptions = void 0;
    if (whitelist.indexOf(req.header('Origin')) !== -1) {
        corsOptions = {
            origin: true // reflect (enable) the requested origin in the CORS response
        };
    } else {
        corsOptions = {
            origin: false // disable CORS for this request
        };
    }
    callback(null, corsOptions); // callback expects two parameters: error and options
};