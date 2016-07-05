#!/usr/bin/env node
'use strict';

var wastSpec = require('wast-spec');

var lut, res;

res = `
'use strict';

var i, val, res, stack;

var codes = {`;

lut = wastSpec.operators.binop;

res += '\n// binop';

Object.keys(lut).forEach(function (key) {
    var keys = key.split('.');
    res += `
    ${lut[key]}: function (val) {
        return {
            kind: 'binop',
            type: '${keys[0]}',
            operator: '${keys[1]}'
        }
    },`;
});

lut = wastSpec.operators.unop;

res += '\n// unop';

Object.keys(lut).forEach(function (key) {
    var keys = key.split('.');
    res += `
    ${lut[key]}: function (val) {
        return {
            kind: 'unop',
            type: '${keys[0]}',
            operator: '${keys[1]}'
        }
    },`;
});

lut = wastSpec.operators.relop;

res += '\n// relop';

Object.keys(lut).forEach(function (key) {
    var keys = key.split('.');
    res += `
    ${lut[key]}: function (val) {
        return {
            kind: 'relop',
            type: '${keys[0]}',
            operator: '${keys[1]}'
        }
    },`;
});

lut = wastSpec.operators.cvtop;

res += '\n// cvtop';

Object.keys(lut).forEach(function (key) {
    var keys = key.split(/[.|\/]/);
    res += `
    ${lut[key]}: function (val) {
        return {
            kind: 'cvtop',
            type: '${keys[0]}',
            type1: '${keys[2]}',
            operator: '${keys[1]}'
        }
    },`;
});

lut = wastSpec.operators.const;

res += '\n// const';

Object.keys(lut).forEach(function (key) {
    var keys = key.split('.');
    res += `
    ${lut[key]}: function (val) {
        return {
            kind: 'const',
            type: '${keys[0]}',
            init: '0'
        }
    },`;
});

res +=`
    ${wastSpec.operators.basic.get_local}: function (val) {
        return {
            kind: 'get_local',
            id: {
                kind: 'literal',
                value: 0,
                raw: '0'
            }
        };
    },
    ${wastSpec.operators.basic.set_local}: function (val) {
        return {
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
        };
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
    res += `
    ${lut[key]}: function (val) {
        return '${key}:' + val;
    },`;
});

res += `
};

function gen (HEAPU8, cursor, bodySize) {
    i = 0;
    val = 0;
    res = [];
    stack = [];

    while (i < bodySize) {
        val = HEAPU8[(cursor + i) >>0];
        if (codes[val] !== undefined) {
            res.push(codes[val]());
        }
        i += 1;
    }

    return res;
}

module.exports = gen;
`;

console.log(res);
