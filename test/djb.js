'use strict';

var bytecode = require('../lib/bytecode'),
    expect = require('chai').expect;

var dat = {
    'type': 0x7c737f9d,
    'import': 0x5fc4f278,
    'function': 0x5f0e0227,
    'table': 0xae7ac7b,
    'memory': 0x57831d84,
    'export': 0x4651d1e1,
    'start': 0xb9fef85,
    'code': 0x7c70da68,
    'data': 0x7c6adc15,
    'name': 0x7c7275a2
};

describe('hash_test', function () {
    var HEAP = new ArrayBuffer(1024);
    var HEAPU8 = new Uint8Array(HEAP);
    var HEAPU32 = new Uint32Array(HEAP);
    var lib = bytecode(global, null, HEAP);
    Object.keys(dat).forEach(function (key) {
        it(key, function (done) {
            var i, len, cursor = 0, res, resPtr = 512;
            len = key.length;
            HEAPU8[0] = len;
            for (i = 0; i < len; i++) {
                HEAPU8[i + 1] = key.charCodeAt(i);
            }
            cursor = lib.hash_string(cursor, resPtr);
            res = HEAPU32[resPtr >> 2];
            console.log('0x' + res.toString(16));
            expect(res).to.eq(dat[key]);
            done();
        });
    });
});
