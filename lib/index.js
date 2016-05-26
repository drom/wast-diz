'use strict';

var bytecode = require('./bytecode');

function toHex (n, digits) {
  return ('00000000000000' + n.toString(16)).slice(-digits);
}

function diz (data) {
  var HEAPU8, HEAPU32, HEAP32;
  HEAPU8 = new global.Uint8Array(data);
  HEAPU32 = new global.Uint32Array(data);
  // HEAP32 = new global.Int32Array(buffer);

  var i;
  var res = '';
  var len = data.length;
  if (len) {
    res += toHex(HEAPU32[0], 8) + '\n';
    res += data.reduce(function (res, e, i) {
      res += ('0' + e.toString(16)).slice(-2);
      if ((i + 1) % 32) {
          return res + ' ';
      }
      return  res + '\n';;
    }, '')
  }

  return res;
}

module.exports = diz;
