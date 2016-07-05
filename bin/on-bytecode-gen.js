#!/usr/bin/env node
'use strict';

var wastSpec = require('wast-spec');

var lut, res;

res = `
'use strict';

var bytecode = require('./bytecode');

var i, val, res, stack;

function gen (HEAP, cursor, bodySize, optr) {

var HEAPU8 = new Uint8Array(HEAP);
var HEAPU32 = new Uint32Array(HEAP);

var lib = bytecode(global, null, HEAP);

var codes = {`;

lut = wastSpec.operators.binop;

res += '\n// binop';

Object.keys(lut).forEach(function (key) {
    var keys = key.split('.');
    res += `
    ${lut[key]}: function (val) {
        var right = stack.pop();
        var left = stack.pop();
        stack.push({
            kind: 'binop',
            type: '${keys[0]}',
            operator: '${keys[1]}',
            left: left,
            right: right
        });
    },`;
});

lut = wastSpec.operators.unop;

res += '\n// unop';

Object.keys(lut).forEach(function (key) {
    var keys = key.split('.');
    res += `
    ${lut[key]}: function (val) {
        var expr = stack.pop();
        stack.push({
            kind: 'unop',
            type: '${keys[0]}',
            operator: '${keys[1]}',
            expr: expr
        });
    },`;
});

lut = wastSpec.operators.relop;

res += '\n// relop';

Object.keys(lut).forEach(function (key) {
    var keys = key.split('.');
    res += `
    ${lut[key]}: function (val) {
        var right = stack.pop();
        var left = stack.pop();
        stack.push({
            kind: 'relop',
            type: '${keys[0]}',
            operator: '${keys[1]}',
            left: left,
            right: right
        });
    },`;
});

lut = wastSpec.operators.cvtop;

res += '\n// cvtop';

Object.keys(lut).forEach(function (key) {
    var keys = key.split(/[.|\/]/);
    res += `
    ${lut[key]}: function (val) {
        var expr = stack.pop();
        stack.push({
            kind: 'cvtop',
            type: '${keys[0]}',
            type1: '${keys[2]}',
            operator: '${keys[1]}',
            expr: expr
        });
    },`;
});

lut = wastSpec.operators.const;

res += '\n// const';

Object.keys(lut).forEach(function (key) {
    var keys = key.split('.');
    res += `
    ${lut[key]}: function (val) {
        cursor = lib.unpack_int32(cursor, optr);
        var imm = HEAPU32[optr >> 2];
        stack.push({
            kind: 'const',
            type: '${keys[0]}',
            init: imm + ''
        });
    },`;
});

res +=`
    ${wastSpec.operators.basic.get_local}: function (val) {
        cursor = lib.unpack_uint32(cursor, optr);
        var imm = HEAPU32[optr >> 2];
        stack.push({
            kind: 'get_local',
            id: {
                kind: 'literal',
                value: imm,
                raw: imm + ''
            }
        });
    },
    ${wastSpec.operators.basic.set_local}: function (val) {
        stack.push({
            kind: 'set_local',
            id: {
                kind: 'literal',
                value: 0,
                raw: '0'
            },
            // init: {
            //     kind: 'const',
            //     type: 'i32',
            //     init: '0'
            // }
        });
    },
    ${wastSpec.operators.basic.call_import}: function (val) {
        var expr = stack.pop();
        stack.push({
            kind: 'call_import',
            expr: expr
        });
    },
`;

lut = wastSpec.operators.control;

res += '\n// control';

Object.keys(lut).forEach(function (key) {
    res += `
    ${lut[key]}: function (val) {
        return '${key}:${lut[key]}';
    },`;
});

lut = wastSpec.operators.memory;

res += '\n// memory';

Object.keys(lut).forEach(function (key) {
    var keys = key.match(/(\w+).load(\d*)_(\w*)/);
    if (keys) {
        res += `
        ${lut[key]}: function (val) {
            cursor = lib.unpack_uint32(cursor, optr);
            var flags = HEAPU32[optr >> 2];

            cursor = lib.unpack_uint32(cursor, optr);
            var offset = HEAPU32[optr >> 2];

            var expr = stack.pop();
            stack.push({
                kind: 'load',
                type: '${keys[1]}',
                size: ${keys[2]},
                sign: ${(keys[3] === 'u') ? false : true},
                offset: offset,
                align: flags,
                expr: expr
            });
        },`;
    } else {
        res += `
        ${lut[key]}: function (val) {
            stack.push({
            });
        },`;
    }
});

res += `
};

    val = 0;
    res = [];
    stack = [];
    bodySize += cursor;

    while (cursor < bodySize) {
        val = HEAPU8[cursor >>0];
        cursor += 1;
        if (codes[val] !== undefined) {
            codes[val]();
        }
    }
    res = stack;

    return res;
}

module.exports = gen;
`;

console.log(res);
