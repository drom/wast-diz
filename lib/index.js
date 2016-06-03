'use strict';

var bytecode = require('./bytecode');

function toHex (n, digits) {
  return ('00000000000000' + n.toString(16)).slice(-digits);
}

function sectionFromHeap (lib, HEAP, cursor, optr) {
    var HEAPU8 = new Uint8Array(HEAP);
    var HEAPU32 = new Uint32Array(HEAP);
    var i, len;

    // id_len <varuint32> section identifier string length
    cursor = lib.unpack_uint32(cursor, optr);
    len = HEAPU32[optr >> 2];

    // id_str <bytes> section identifier string of id_len bytes
    var name = '';
    for (i = 0; i < len; i++) {
        name += String.fromCharCode(HEAPU8[cursor]);
        cursor += 1;
    }

    // payload_len <varuint32> size of this section in bytes
    cursor = lib.unpack_uint32(cursor, optr);
    len = HEAPU32[optr >> 2];

    // payload_str <bytes> content of this section, of length payload_len
    var body = '';
    for (i = 0; i < len; i++) {
        body += toHex(HEAPU8[cursor], 2);
        if ((i + 1) % 32) {
            body += ' ';
        } else {
            body += '\n';
        }
        cursor += 1;
    }

    HEAPU32[optr >> 2] = cursor;

    return name + ':\n' + body + '\n\n';
}

function diz (data) {
    var i;
    var res = '';
    var scratchLen = 1024; // Bytes
    var dataLen = data.length;
    var dataLen32 = (dataLen + 0x3) & 0xfffffc;
    var HEAP = new ArrayBuffer(dataLen32 + scratchLen);
    var HEAPU8 = new Uint8Array(HEAP);
    var HEAPU32 = new Uint32Array(HEAP);
    var tmp0 = dataLen32;
    var tmp1 = tmp0 + 4;
    var tmp2 = tmp1 + 4;
    var tmp3 = tmp2 + 4;

    var lib = bytecode(global, null, HEAP);

    var cursor = 0;

    if (dataLen) {
        // copy bytecode to heap
        for (i = 0; i < dataLen; i++) {
            HEAPU8[i] = data[i];
        }

        // Magic number <uint32>
        res += 'Magic:   ' + toHex(HEAPU32[cursor >> 2], 8) + '\n';
        cursor += 4;

        // Version <uint32>
        res += 'Version: ' + HEAPU32[cursor >> 2].toString(10) + '\n';
        cursor += 4;

        while (cursor < dataLen) {
            res += sectionFromHeap(lib, HEAP, cursor, tmp0);
            cursor = HEAPU32[tmp0 >> 2];
        }

    }
    return res;
}

module.exports = {
    diz: diz
};
