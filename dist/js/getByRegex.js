'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = function (model, colum, str) {
    var whereStr = { 'username': { $regex: /m/i } };
    var r = RegExp('' + str, 'i');
    var whereNewStr = {};
    whereNewStr[colum] = r;

    model.find(whereNewStr, function (err, res) {
        if (err) {
            console.log('Error:' + err);
        } else {
            console.log('Res:' + res);
        }
    });
};