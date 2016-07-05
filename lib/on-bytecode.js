
'use strict';

var bytecode = require('./bytecode');

var i, val, res, stack;

function gen (HEAP, cursor, bodySize, optr) {

var HEAPU8 = new Uint8Array(HEAP);
var HEAPU32 = new Uint32Array(HEAP);

var lib = bytecode(global, null, HEAP);

var codes = {
// binop
    64: function (val) {
        var right = stack.pop();
        var left = stack.pop();
        stack.push({
            kind: 'binop',
            type: 'i32',
            operator: 'add',
            left: left,
            right: right
        });
    },
    65: function (val) {
        var right = stack.pop();
        var left = stack.pop();
        stack.push({
            kind: 'binop',
            type: 'i32',
            operator: 'sub',
            left: left,
            right: right
        });
    },
    66: function (val) {
        var right = stack.pop();
        var left = stack.pop();
        stack.push({
            kind: 'binop',
            type: 'i32',
            operator: 'mul',
            left: left,
            right: right
        });
    },
    67: function (val) {
        var right = stack.pop();
        var left = stack.pop();
        stack.push({
            kind: 'binop',
            type: 'i32',
            operator: 'div_s',
            left: left,
            right: right
        });
    },
    68: function (val) {
        var right = stack.pop();
        var left = stack.pop();
        stack.push({
            kind: 'binop',
            type: 'i32',
            operator: 'div_u',
            left: left,
            right: right
        });
    },
    69: function (val) {
        var right = stack.pop();
        var left = stack.pop();
        stack.push({
            kind: 'binop',
            type: 'i32',
            operator: 'rem_s',
            left: left,
            right: right
        });
    },
    70: function (val) {
        var right = stack.pop();
        var left = stack.pop();
        stack.push({
            kind: 'binop',
            type: 'i32',
            operator: 'rem_u',
            left: left,
            right: right
        });
    },
    71: function (val) {
        var right = stack.pop();
        var left = stack.pop();
        stack.push({
            kind: 'binop',
            type: 'i32',
            operator: 'and',
            left: left,
            right: right
        });
    },
    72: function (val) {
        var right = stack.pop();
        var left = stack.pop();
        stack.push({
            kind: 'binop',
            type: 'i32',
            operator: 'or',
            left: left,
            right: right
        });
    },
    73: function (val) {
        var right = stack.pop();
        var left = stack.pop();
        stack.push({
            kind: 'binop',
            type: 'i32',
            operator: 'xor',
            left: left,
            right: right
        });
    },
    74: function (val) {
        var right = stack.pop();
        var left = stack.pop();
        stack.push({
            kind: 'binop',
            type: 'i32',
            operator: 'shl',
            left: left,
            right: right
        });
    },
    75: function (val) {
        var right = stack.pop();
        var left = stack.pop();
        stack.push({
            kind: 'binop',
            type: 'i32',
            operator: 'shr_u',
            left: left,
            right: right
        });
    },
    76: function (val) {
        var right = stack.pop();
        var left = stack.pop();
        stack.push({
            kind: 'binop',
            type: 'i32',
            operator: 'shr_s',
            left: left,
            right: right
        });
    },
    182: function (val) {
        var right = stack.pop();
        var left = stack.pop();
        stack.push({
            kind: 'binop',
            type: 'i32',
            operator: 'rotr',
            left: left,
            right: right
        });
    },
    183: function (val) {
        var right = stack.pop();
        var left = stack.pop();
        stack.push({
            kind: 'binop',
            type: 'i32',
            operator: 'rotl',
            left: left,
            right: right
        });
    },
    91: function (val) {
        var right = stack.pop();
        var left = stack.pop();
        stack.push({
            kind: 'binop',
            type: 'i64',
            operator: 'add',
            left: left,
            right: right
        });
    },
    92: function (val) {
        var right = stack.pop();
        var left = stack.pop();
        stack.push({
            kind: 'binop',
            type: 'i64',
            operator: 'sub',
            left: left,
            right: right
        });
    },
    93: function (val) {
        var right = stack.pop();
        var left = stack.pop();
        stack.push({
            kind: 'binop',
            type: 'i64',
            operator: 'mul',
            left: left,
            right: right
        });
    },
    94: function (val) {
        var right = stack.pop();
        var left = stack.pop();
        stack.push({
            kind: 'binop',
            type: 'i64',
            operator: 'div_s',
            left: left,
            right: right
        });
    },
    95: function (val) {
        var right = stack.pop();
        var left = stack.pop();
        stack.push({
            kind: 'binop',
            type: 'i64',
            operator: 'div_u',
            left: left,
            right: right
        });
    },
    96: function (val) {
        var right = stack.pop();
        var left = stack.pop();
        stack.push({
            kind: 'binop',
            type: 'i64',
            operator: 'rem_s',
            left: left,
            right: right
        });
    },
    97: function (val) {
        var right = stack.pop();
        var left = stack.pop();
        stack.push({
            kind: 'binop',
            type: 'i64',
            operator: 'rem_u',
            left: left,
            right: right
        });
    },
    98: function (val) {
        var right = stack.pop();
        var left = stack.pop();
        stack.push({
            kind: 'binop',
            type: 'i64',
            operator: 'and',
            left: left,
            right: right
        });
    },
    99: function (val) {
        var right = stack.pop();
        var left = stack.pop();
        stack.push({
            kind: 'binop',
            type: 'i64',
            operator: 'or',
            left: left,
            right: right
        });
    },
    100: function (val) {
        var right = stack.pop();
        var left = stack.pop();
        stack.push({
            kind: 'binop',
            type: 'i64',
            operator: 'xor',
            left: left,
            right: right
        });
    },
    101: function (val) {
        var right = stack.pop();
        var left = stack.pop();
        stack.push({
            kind: 'binop',
            type: 'i64',
            operator: 'shl',
            left: left,
            right: right
        });
    },
    102: function (val) {
        var right = stack.pop();
        var left = stack.pop();
        stack.push({
            kind: 'binop',
            type: 'i64',
            operator: 'shr_u',
            left: left,
            right: right
        });
    },
    103: function (val) {
        var right = stack.pop();
        var left = stack.pop();
        stack.push({
            kind: 'binop',
            type: 'i64',
            operator: 'shr_s',
            left: left,
            right: right
        });
    },
    184: function (val) {
        var right = stack.pop();
        var left = stack.pop();
        stack.push({
            kind: 'binop',
            type: 'i64',
            operator: 'rotr',
            left: left,
            right: right
        });
    },
    185: function (val) {
        var right = stack.pop();
        var left = stack.pop();
        stack.push({
            kind: 'binop',
            type: 'i64',
            operator: 'rotl',
            left: left,
            right: right
        });
    },
    117: function (val) {
        var right = stack.pop();
        var left = stack.pop();
        stack.push({
            kind: 'binop',
            type: 'f32',
            operator: 'add',
            left: left,
            right: right
        });
    },
    118: function (val) {
        var right = stack.pop();
        var left = stack.pop();
        stack.push({
            kind: 'binop',
            type: 'f32',
            operator: 'sub',
            left: left,
            right: right
        });
    },
    119: function (val) {
        var right = stack.pop();
        var left = stack.pop();
        stack.push({
            kind: 'binop',
            type: 'f32',
            operator: 'mul',
            left: left,
            right: right
        });
    },
    120: function (val) {
        var right = stack.pop();
        var left = stack.pop();
        stack.push({
            kind: 'binop',
            type: 'f32',
            operator: 'div',
            left: left,
            right: right
        });
    },
    121: function (val) {
        var right = stack.pop();
        var left = stack.pop();
        stack.push({
            kind: 'binop',
            type: 'f32',
            operator: 'min',
            left: left,
            right: right
        });
    },
    122: function (val) {
        var right = stack.pop();
        var left = stack.pop();
        stack.push({
            kind: 'binop',
            type: 'f32',
            operator: 'max',
            left: left,
            right: right
        });
    },
    125: function (val) {
        var right = stack.pop();
        var left = stack.pop();
        stack.push({
            kind: 'binop',
            type: 'f32',
            operator: 'copysign',
            left: left,
            right: right
        });
    },
    137: function (val) {
        var right = stack.pop();
        var left = stack.pop();
        stack.push({
            kind: 'binop',
            type: 'f64',
            operator: 'add',
            left: left,
            right: right
        });
    },
    138: function (val) {
        var right = stack.pop();
        var left = stack.pop();
        stack.push({
            kind: 'binop',
            type: 'f64',
            operator: 'sub',
            left: left,
            right: right
        });
    },
    139: function (val) {
        var right = stack.pop();
        var left = stack.pop();
        stack.push({
            kind: 'binop',
            type: 'f64',
            operator: 'mul',
            left: left,
            right: right
        });
    },
    140: function (val) {
        var right = stack.pop();
        var left = stack.pop();
        stack.push({
            kind: 'binop',
            type: 'f64',
            operator: 'div',
            left: left,
            right: right
        });
    },
    141: function (val) {
        var right = stack.pop();
        var left = stack.pop();
        stack.push({
            kind: 'binop',
            type: 'f64',
            operator: 'min',
            left: left,
            right: right
        });
    },
    142: function (val) {
        var right = stack.pop();
        var left = stack.pop();
        stack.push({
            kind: 'binop',
            type: 'f64',
            operator: 'max',
            left: left,
            right: right
        });
    },
    145: function (val) {
        var right = stack.pop();
        var left = stack.pop();
        stack.push({
            kind: 'binop',
            type: 'f64',
            operator: 'copysign',
            left: left,
            right: right
        });
    },
// unop
    87: function (val) {
        var expr = stack.pop();
        stack.push({
            kind: 'unop',
            type: 'i32',
            operator: 'clz',
            expr: expr
        });
    },
    88: function (val) {
        var expr = stack.pop();
        stack.push({
            kind: 'unop',
            type: 'i32',
            operator: 'ctz',
            expr: expr
        });
    },
    89: function (val) {
        var expr = stack.pop();
        stack.push({
            kind: 'unop',
            type: 'i32',
            operator: 'popcnt',
            expr: expr
        });
    },
    90: function (val) {
        var expr = stack.pop();
        stack.push({
            kind: 'unop',
            type: 'i32',
            operator: 'eqz',
            expr: expr
        });
    },
    114: function (val) {
        var expr = stack.pop();
        stack.push({
            kind: 'unop',
            type: 'i64',
            operator: 'clz',
            expr: expr
        });
    },
    115: function (val) {
        var expr = stack.pop();
        stack.push({
            kind: 'unop',
            type: 'i64',
            operator: 'ctz',
            expr: expr
        });
    },
    116: function (val) {
        var expr = stack.pop();
        stack.push({
            kind: 'unop',
            type: 'i64',
            operator: 'popcnt',
            expr: expr
        });
    },
    186: function (val) {
        var expr = stack.pop();
        stack.push({
            kind: 'unop',
            type: 'i64',
            operator: 'eqz',
            expr: expr
        });
    },
    123: function (val) {
        var expr = stack.pop();
        stack.push({
            kind: 'unop',
            type: 'f32',
            operator: 'abs',
            expr: expr
        });
    },
    124: function (val) {
        var expr = stack.pop();
        stack.push({
            kind: 'unop',
            type: 'f32',
            operator: 'neg',
            expr: expr
        });
    },
    126: function (val) {
        var expr = stack.pop();
        stack.push({
            kind: 'unop',
            type: 'f32',
            operator: 'ceil',
            expr: expr
        });
    },
    127: function (val) {
        var expr = stack.pop();
        stack.push({
            kind: 'unop',
            type: 'f32',
            operator: 'floor',
            expr: expr
        });
    },
    128: function (val) {
        var expr = stack.pop();
        stack.push({
            kind: 'unop',
            type: 'f32',
            operator: 'trunc',
            expr: expr
        });
    },
    129: function (val) {
        var expr = stack.pop();
        stack.push({
            kind: 'unop',
            type: 'f32',
            operator: 'nearest',
            expr: expr
        });
    },
    130: function (val) {
        var expr = stack.pop();
        stack.push({
            kind: 'unop',
            type: 'f32',
            operator: 'sqrt',
            expr: expr
        });
    },
    143: function (val) {
        var expr = stack.pop();
        stack.push({
            kind: 'unop',
            type: 'f64',
            operator: 'abs',
            expr: expr
        });
    },
    144: function (val) {
        var expr = stack.pop();
        stack.push({
            kind: 'unop',
            type: 'f64',
            operator: 'neg',
            expr: expr
        });
    },
    146: function (val) {
        var expr = stack.pop();
        stack.push({
            kind: 'unop',
            type: 'f64',
            operator: 'ceil',
            expr: expr
        });
    },
    147: function (val) {
        var expr = stack.pop();
        stack.push({
            kind: 'unop',
            type: 'f64',
            operator: 'floor',
            expr: expr
        });
    },
    148: function (val) {
        var expr = stack.pop();
        stack.push({
            kind: 'unop',
            type: 'f64',
            operator: 'trunc',
            expr: expr
        });
    },
    149: function (val) {
        var expr = stack.pop();
        stack.push({
            kind: 'unop',
            type: 'f64',
            operator: 'nearest',
            expr: expr
        });
    },
    150: function (val) {
        var expr = stack.pop();
        stack.push({
            kind: 'unop',
            type: 'f64',
            operator: 'sqrt',
            expr: expr
        });
    },
// relop
    77: function (val) {
        var right = stack.pop();
        var left = stack.pop();
        stack.push({
            kind: 'relop',
            type: 'i32',
            operator: 'eq',
            left: left,
            right: right
        });
    },
    78: function (val) {
        var right = stack.pop();
        var left = stack.pop();
        stack.push({
            kind: 'relop',
            type: 'i32',
            operator: 'ne',
            left: left,
            right: right
        });
    },
    79: function (val) {
        var right = stack.pop();
        var left = stack.pop();
        stack.push({
            kind: 'relop',
            type: 'i32',
            operator: 'lt_s',
            left: left,
            right: right
        });
    },
    80: function (val) {
        var right = stack.pop();
        var left = stack.pop();
        stack.push({
            kind: 'relop',
            type: 'i32',
            operator: 'le_s',
            left: left,
            right: right
        });
    },
    81: function (val) {
        var right = stack.pop();
        var left = stack.pop();
        stack.push({
            kind: 'relop',
            type: 'i32',
            operator: 'lt_u',
            left: left,
            right: right
        });
    },
    82: function (val) {
        var right = stack.pop();
        var left = stack.pop();
        stack.push({
            kind: 'relop',
            type: 'i32',
            operator: 'le_u',
            left: left,
            right: right
        });
    },
    83: function (val) {
        var right = stack.pop();
        var left = stack.pop();
        stack.push({
            kind: 'relop',
            type: 'i32',
            operator: 'gt_s',
            left: left,
            right: right
        });
    },
    84: function (val) {
        var right = stack.pop();
        var left = stack.pop();
        stack.push({
            kind: 'relop',
            type: 'i32',
            operator: 'ge_s',
            left: left,
            right: right
        });
    },
    85: function (val) {
        var right = stack.pop();
        var left = stack.pop();
        stack.push({
            kind: 'relop',
            type: 'i32',
            operator: 'gt_u',
            left: left,
            right: right
        });
    },
    86: function (val) {
        var right = stack.pop();
        var left = stack.pop();
        stack.push({
            kind: 'relop',
            type: 'i32',
            operator: 'ge_u',
            left: left,
            right: right
        });
    },
    104: function (val) {
        var right = stack.pop();
        var left = stack.pop();
        stack.push({
            kind: 'relop',
            type: 'i64',
            operator: 'eq',
            left: left,
            right: right
        });
    },
    105: function (val) {
        var right = stack.pop();
        var left = stack.pop();
        stack.push({
            kind: 'relop',
            type: 'i64',
            operator: 'ne',
            left: left,
            right: right
        });
    },
    106: function (val) {
        var right = stack.pop();
        var left = stack.pop();
        stack.push({
            kind: 'relop',
            type: 'i64',
            operator: 'lt_s',
            left: left,
            right: right
        });
    },
    107: function (val) {
        var right = stack.pop();
        var left = stack.pop();
        stack.push({
            kind: 'relop',
            type: 'i64',
            operator: 'le_s',
            left: left,
            right: right
        });
    },
    108: function (val) {
        var right = stack.pop();
        var left = stack.pop();
        stack.push({
            kind: 'relop',
            type: 'i64',
            operator: 'lt_u',
            left: left,
            right: right
        });
    },
    109: function (val) {
        var right = stack.pop();
        var left = stack.pop();
        stack.push({
            kind: 'relop',
            type: 'i64',
            operator: 'le_u',
            left: left,
            right: right
        });
    },
    110: function (val) {
        var right = stack.pop();
        var left = stack.pop();
        stack.push({
            kind: 'relop',
            type: 'i64',
            operator: 'gt_s',
            left: left,
            right: right
        });
    },
    111: function (val) {
        var right = stack.pop();
        var left = stack.pop();
        stack.push({
            kind: 'relop',
            type: 'i64',
            operator: 'ge_s',
            left: left,
            right: right
        });
    },
    112: function (val) {
        var right = stack.pop();
        var left = stack.pop();
        stack.push({
            kind: 'relop',
            type: 'i64',
            operator: 'gt_u',
            left: left,
            right: right
        });
    },
    113: function (val) {
        var right = stack.pop();
        var left = stack.pop();
        stack.push({
            kind: 'relop',
            type: 'i64',
            operator: 'ge_u',
            left: left,
            right: right
        });
    },
    131: function (val) {
        var right = stack.pop();
        var left = stack.pop();
        stack.push({
            kind: 'relop',
            type: 'f32',
            operator: 'eq',
            left: left,
            right: right
        });
    },
    132: function (val) {
        var right = stack.pop();
        var left = stack.pop();
        stack.push({
            kind: 'relop',
            type: 'f32',
            operator: 'ne',
            left: left,
            right: right
        });
    },
    133: function (val) {
        var right = stack.pop();
        var left = stack.pop();
        stack.push({
            kind: 'relop',
            type: 'f32',
            operator: 'lt',
            left: left,
            right: right
        });
    },
    134: function (val) {
        var right = stack.pop();
        var left = stack.pop();
        stack.push({
            kind: 'relop',
            type: 'f32',
            operator: 'le',
            left: left,
            right: right
        });
    },
    135: function (val) {
        var right = stack.pop();
        var left = stack.pop();
        stack.push({
            kind: 'relop',
            type: 'f32',
            operator: 'gt',
            left: left,
            right: right
        });
    },
    136: function (val) {
        var right = stack.pop();
        var left = stack.pop();
        stack.push({
            kind: 'relop',
            type: 'f32',
            operator: 'ge',
            left: left,
            right: right
        });
    },
    151: function (val) {
        var right = stack.pop();
        var left = stack.pop();
        stack.push({
            kind: 'relop',
            type: 'f64',
            operator: 'eq',
            left: left,
            right: right
        });
    },
    152: function (val) {
        var right = stack.pop();
        var left = stack.pop();
        stack.push({
            kind: 'relop',
            type: 'f64',
            operator: 'ne',
            left: left,
            right: right
        });
    },
    153: function (val) {
        var right = stack.pop();
        var left = stack.pop();
        stack.push({
            kind: 'relop',
            type: 'f64',
            operator: 'lt',
            left: left,
            right: right
        });
    },
    154: function (val) {
        var right = stack.pop();
        var left = stack.pop();
        stack.push({
            kind: 'relop',
            type: 'f64',
            operator: 'le',
            left: left,
            right: right
        });
    },
    155: function (val) {
        var right = stack.pop();
        var left = stack.pop();
        stack.push({
            kind: 'relop',
            type: 'f64',
            operator: 'gt',
            left: left,
            right: right
        });
    },
    156: function (val) {
        var right = stack.pop();
        var left = stack.pop();
        stack.push({
            kind: 'relop',
            type: 'f64',
            operator: 'ge',
            left: left,
            right: right
        });
    },
// cvtop
    157: function (val) {
        var expr = stack.pop();
        stack.push({
            kind: 'cvtop',
            type: 'i32',
            type1: 'f32',
            operator: 'trunc_s',
            expr: expr
        });
    },
    158: function (val) {
        var expr = stack.pop();
        stack.push({
            kind: 'cvtop',
            type: 'i32',
            type1: 'f64',
            operator: 'trunc_s',
            expr: expr
        });
    },
    159: function (val) {
        var expr = stack.pop();
        stack.push({
            kind: 'cvtop',
            type: 'i32',
            type1: 'f32',
            operator: 'trunc_u',
            expr: expr
        });
    },
    160: function (val) {
        var expr = stack.pop();
        stack.push({
            kind: 'cvtop',
            type: 'i32',
            type1: 'f64',
            operator: 'trunc_u',
            expr: expr
        });
    },
    161: function (val) {
        var expr = stack.pop();
        stack.push({
            kind: 'cvtop',
            type: 'i32',
            type1: 'i64',
            operator: 'wrap',
            expr: expr
        });
    },
    162: function (val) {
        var expr = stack.pop();
        stack.push({
            kind: 'cvtop',
            type: 'i64',
            type1: 'f32',
            operator: 'trunc_s',
            expr: expr
        });
    },
    163: function (val) {
        var expr = stack.pop();
        stack.push({
            kind: 'cvtop',
            type: 'i64',
            type1: 'f64',
            operator: 'trunc_s',
            expr: expr
        });
    },
    164: function (val) {
        var expr = stack.pop();
        stack.push({
            kind: 'cvtop',
            type: 'i64',
            type1: 'f32',
            operator: 'trunc_u',
            expr: expr
        });
    },
    165: function (val) {
        var expr = stack.pop();
        stack.push({
            kind: 'cvtop',
            type: 'i64',
            type1: 'f64',
            operator: 'trunc_u',
            expr: expr
        });
    },
    166: function (val) {
        var expr = stack.pop();
        stack.push({
            kind: 'cvtop',
            type: 'i64',
            type1: 'i32',
            operator: 'extend_s',
            expr: expr
        });
    },
    167: function (val) {
        var expr = stack.pop();
        stack.push({
            kind: 'cvtop',
            type: 'i64',
            type1: 'i32',
            operator: 'extend_u',
            expr: expr
        });
    },
    168: function (val) {
        var expr = stack.pop();
        stack.push({
            kind: 'cvtop',
            type: 'f32',
            type1: 'i32',
            operator: 'convert_s',
            expr: expr
        });
    },
    169: function (val) {
        var expr = stack.pop();
        stack.push({
            kind: 'cvtop',
            type: 'f32',
            type1: 'i32',
            operator: 'convert_u',
            expr: expr
        });
    },
    170: function (val) {
        var expr = stack.pop();
        stack.push({
            kind: 'cvtop',
            type: 'f32',
            type1: 'i64',
            operator: 'convert_s',
            expr: expr
        });
    },
    171: function (val) {
        var expr = stack.pop();
        stack.push({
            kind: 'cvtop',
            type: 'f32',
            type1: 'i64',
            operator: 'convert_u',
            expr: expr
        });
    },
    172: function (val) {
        var expr = stack.pop();
        stack.push({
            kind: 'cvtop',
            type: 'f32',
            type1: 'f64',
            operator: 'demote',
            expr: expr
        });
    },
    173: function (val) {
        var expr = stack.pop();
        stack.push({
            kind: 'cvtop',
            type: 'f32',
            type1: 'i32',
            operator: 'reinterpret',
            expr: expr
        });
    },
    174: function (val) {
        var expr = stack.pop();
        stack.push({
            kind: 'cvtop',
            type: 'f64',
            type1: 'i32',
            operator: 'convert_s',
            expr: expr
        });
    },
    175: function (val) {
        var expr = stack.pop();
        stack.push({
            kind: 'cvtop',
            type: 'f64',
            type1: 'i32',
            operator: 'convert_u',
            expr: expr
        });
    },
    176: function (val) {
        var expr = stack.pop();
        stack.push({
            kind: 'cvtop',
            type: 'f64',
            type1: 'i64',
            operator: 'convert_s',
            expr: expr
        });
    },
    177: function (val) {
        var expr = stack.pop();
        stack.push({
            kind: 'cvtop',
            type: 'f64',
            type1: 'i64',
            operator: 'convert_u',
            expr: expr
        });
    },
    178: function (val) {
        var expr = stack.pop();
        stack.push({
            kind: 'cvtop',
            type: 'f64',
            type1: 'f32',
            operator: 'promote',
            expr: expr
        });
    },
    179: function (val) {
        var expr = stack.pop();
        stack.push({
            kind: 'cvtop',
            type: 'f64',
            type1: 'i64',
            operator: 'reinterpret',
            expr: expr
        });
    },
    180: function (val) {
        var expr = stack.pop();
        stack.push({
            kind: 'cvtop',
            type: 'i32',
            type1: 'f32',
            operator: 'reinterpret',
            expr: expr
        });
    },
    181: function (val) {
        var expr = stack.pop();
        stack.push({
            kind: 'cvtop',
            type: 'i64',
            type1: 'f64',
            operator: 'reinterpret',
            expr: expr
        });
    },
// const
    16: function (val) {
        cursor = lib.unpack_int32(cursor, optr);
        var imm = HEAPU32[optr >> 2];
        stack.push({
            kind: 'const',
            type: 'i32',
            init: imm + ''
        });
    },
    17: function (val) {
        cursor = lib.unpack_int32(cursor, optr);
        var imm = HEAPU32[optr >> 2];
        stack.push({
            kind: 'const',
            type: 'i64',
            init: imm + ''
        });
    },
    18: function (val) {
        cursor = lib.unpack_int32(cursor, optr);
        var imm = HEAPU32[optr >> 2];
        stack.push({
            kind: 'const',
            type: 'f64',
            init: imm + ''
        });
    },
    19: function (val) {
        cursor = lib.unpack_int32(cursor, optr);
        var imm = HEAPU32[optr >> 2];
        stack.push({
            kind: 'const',
            type: 'f32',
            init: imm + ''
        });
    },
    20: function (val) {
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
    21: function (val) {
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
    24: function (val) {
        var expr = stack.pop();
        stack.push({
            kind: 'call_import',
            expr: expr
        });
    },

// control
    0: function (val) {
        return 'nop:0';
    },
    1: function (val) {
        return 'block:1';
    },
    2: function (val) {
        return 'loop:2';
    },
    3: function (val) {
        return 'if:3';
    },
    4: function (val) {
        return 'else:4';
    },
    5: function (val) {
        return 'select:5';
    },
    6: function (val) {
        return 'br:6';
    },
    7: function (val) {
        return 'br_if:7';
    },
    8: function (val) {
        return 'br_table:8';
    },
    9: function (val) {
        return 'return:9';
    },
    10: function (val) {
        return 'unreachable:10';
    },
    15: function (val) {
        return 'end:15';
    },
// memory
        32: function (val) {
            cursor = lib.unpack_uint32(cursor, optr);
            var flags = HEAPU32[optr >> 2];

            cursor = lib.unpack_uint32(cursor, optr);
            var offset = HEAPU32[optr >> 2];

            var expr = stack.pop();
            stack.push({
                kind: 'load',
                type: 'i32',
                size: 8,
                sign: true,
                offset: offset,
                align: flags,
                expr: expr
            });
        },
        33: function (val) {
            cursor = lib.unpack_uint32(cursor, optr);
            var flags = HEAPU32[optr >> 2];

            cursor = lib.unpack_uint32(cursor, optr);
            var offset = HEAPU32[optr >> 2];

            var expr = stack.pop();
            stack.push({
                kind: 'load',
                type: 'i32',
                size: 8,
                sign: false,
                offset: offset,
                align: flags,
                expr: expr
            });
        },
        34: function (val) {
            cursor = lib.unpack_uint32(cursor, optr);
            var flags = HEAPU32[optr >> 2];

            cursor = lib.unpack_uint32(cursor, optr);
            var offset = HEAPU32[optr >> 2];

            var expr = stack.pop();
            stack.push({
                kind: 'load',
                type: 'i32',
                size: 16,
                sign: true,
                offset: offset,
                align: flags,
                expr: expr
            });
        },
        35: function (val) {
            cursor = lib.unpack_uint32(cursor, optr);
            var flags = HEAPU32[optr >> 2];

            cursor = lib.unpack_uint32(cursor, optr);
            var offset = HEAPU32[optr >> 2];

            var expr = stack.pop();
            stack.push({
                kind: 'load',
                type: 'i32',
                size: 16,
                sign: false,
                offset: offset,
                align: flags,
                expr: expr
            });
        },
        36: function (val) {
            cursor = lib.unpack_uint32(cursor, optr);
            var flags = HEAPU32[optr >> 2];

            cursor = lib.unpack_uint32(cursor, optr);
            var offset = HEAPU32[optr >> 2];

            var expr = stack.pop();
            stack.push({
                kind: 'load',
                type: 'i64',
                size: 8,
                sign: true,
                offset: offset,
                align: flags,
                expr: expr
            });
        },
        37: function (val) {
            cursor = lib.unpack_uint32(cursor, optr);
            var flags = HEAPU32[optr >> 2];

            cursor = lib.unpack_uint32(cursor, optr);
            var offset = HEAPU32[optr >> 2];

            var expr = stack.pop();
            stack.push({
                kind: 'load',
                type: 'i64',
                size: 8,
                sign: false,
                offset: offset,
                align: flags,
                expr: expr
            });
        },
        38: function (val) {
            cursor = lib.unpack_uint32(cursor, optr);
            var flags = HEAPU32[optr >> 2];

            cursor = lib.unpack_uint32(cursor, optr);
            var offset = HEAPU32[optr >> 2];

            var expr = stack.pop();
            stack.push({
                kind: 'load',
                type: 'i64',
                size: 16,
                sign: true,
                offset: offset,
                align: flags,
                expr: expr
            });
        },
        39: function (val) {
            cursor = lib.unpack_uint32(cursor, optr);
            var flags = HEAPU32[optr >> 2];

            cursor = lib.unpack_uint32(cursor, optr);
            var offset = HEAPU32[optr >> 2];

            var expr = stack.pop();
            stack.push({
                kind: 'load',
                type: 'i64',
                size: 16,
                sign: false,
                offset: offset,
                align: flags,
                expr: expr
            });
        },
        40: function (val) {
            cursor = lib.unpack_uint32(cursor, optr);
            var flags = HEAPU32[optr >> 2];

            cursor = lib.unpack_uint32(cursor, optr);
            var offset = HEAPU32[optr >> 2];

            var expr = stack.pop();
            stack.push({
                kind: 'load',
                type: 'i64',
                size: 32,
                sign: true,
                offset: offset,
                align: flags,
                expr: expr
            });
        },
        41: function (val) {
            cursor = lib.unpack_uint32(cursor, optr);
            var flags = HEAPU32[optr >> 2];

            cursor = lib.unpack_uint32(cursor, optr);
            var offset = HEAPU32[optr >> 2];

            var expr = stack.pop();
            stack.push({
                kind: 'load',
                type: 'i64',
                size: 32,
                sign: false,
                offset: offset,
                align: flags,
                expr: expr
            });
        },
        42: function (val) {
            stack.push({
            });
        },
        43: function (val) {
            stack.push({
            });
        },
        44: function (val) {
            stack.push({
            });
        },
        45: function (val) {
            stack.push({
            });
        },
        46: function (val) {
            stack.push({
            });
        },
        47: function (val) {
            stack.push({
            });
        },
        48: function (val) {
            stack.push({
            });
        },
        49: function (val) {
            stack.push({
            });
        },
        50: function (val) {
            stack.push({
            });
        },
        51: function (val) {
            stack.push({
            });
        },
        52: function (val) {
            stack.push({
            });
        },
        53: function (val) {
            stack.push({
            });
        },
        54: function (val) {
            stack.push({
            });
        },
        59: function (val) {
            stack.push({
            });
        },
        57: function (val) {
            stack.push({
            });
        },
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

