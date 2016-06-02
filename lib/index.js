'use strict';

var bytecode = require('./bytecode');

function toHex (n, digits) {
  return ('00000000000000' + n.toString(16)).slice(-digits);
}

function diz (data) {
    var i;
    var dataLen = data.length;
    var dataLen32 = (dataLen + 0xf) & 0xfffff0;
    var BUFFER = new ArrayBuffer(dataLen32);
    var HEAPU8 = new Uint8Array(BUFFER);
    var HEAPU32 = new Uint32Array(BUFFER);

    if (dataLen) {
        for (i = 0; i < dataLen; i++) {
            HEAPU8[i] = data[i];
        }
    }

  // HEAP32 = new global.Int32Array(buffer);

    var res = '';
    res += 'Magic:   ' + toHex(HEAPU32[0], 8) + '\n';
    res += 'Version: ' + toHex(HEAPU32[1], 8) + '\n';
    for (i = 0; i < dataLen; i++) {
        res += toHex(HEAPU8[i], 2);
        if ((i + 1) % 32) {
            res += ' ';
        } else {
            res += '\n';
        }
    }
    //   res += ('0' + e.toString(16)).slice(-2);
    //   res += e.toString(16);
    //   if ((i + 1) % 32) {
    //       return res + ' ';
    //   }
    //   return  res + '\n';;
    // }, '')
  // }

  return res;
}

module.exports = {
    diz: diz
};
