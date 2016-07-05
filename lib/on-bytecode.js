
'use strict';

var i, val, res, stack;

var codes = {
// binop
    64: function (val) {
        return {
            kind: 'binop',
            type: 'i32',
            operator: 'add'
        }
    },
    65: function (val) {
        return {
            kind: 'binop',
            type: 'i32',
            operator: 'sub'
        }
    },
    66: function (val) {
        return {
            kind: 'binop',
            type: 'i32',
            operator: 'mul'
        }
    },
    67: function (val) {
        return {
            kind: 'binop',
            type: 'i32',
            operator: 'div_s'
        }
    },
    68: function (val) {
        return {
            kind: 'binop',
            type: 'i32',
            operator: 'div_u'
        }
    },
    69: function (val) {
        return {
            kind: 'binop',
            type: 'i32',
            operator: 'rem_s'
        }
    },
    70: function (val) {
        return {
            kind: 'binop',
            type: 'i32',
            operator: 'rem_u'
        }
    },
    71: function (val) {
        return {
            kind: 'binop',
            type: 'i32',
            operator: 'and'
        }
    },
    72: function (val) {
        return {
            kind: 'binop',
            type: 'i32',
            operator: 'or'
        }
    },
    73: function (val) {
        return {
            kind: 'binop',
            type: 'i32',
            operator: 'xor'
        }
    },
    74: function (val) {
        return {
            kind: 'binop',
            type: 'i32',
            operator: 'shl'
        }
    },
    75: function (val) {
        return {
            kind: 'binop',
            type: 'i32',
            operator: 'shr_u'
        }
    },
    76: function (val) {
        return {
            kind: 'binop',
            type: 'i32',
            operator: 'shr_s'
        }
    },
    182: function (val) {
        return {
            kind: 'binop',
            type: 'i32',
            operator: 'rotr'
        }
    },
    183: function (val) {
        return {
            kind: 'binop',
            type: 'i32',
            operator: 'rotl'
        }
    },
    91: function (val) {
        return {
            kind: 'binop',
            type: 'i64',
            operator: 'add'
        }
    },
    92: function (val) {
        return {
            kind: 'binop',
            type: 'i64',
            operator: 'sub'
        }
    },
    93: function (val) {
        return {
            kind: 'binop',
            type: 'i64',
            operator: 'mul'
        }
    },
    94: function (val) {
        return {
            kind: 'binop',
            type: 'i64',
            operator: 'div_s'
        }
    },
    95: function (val) {
        return {
            kind: 'binop',
            type: 'i64',
            operator: 'div_u'
        }
    },
    96: function (val) {
        return {
            kind: 'binop',
            type: 'i64',
            operator: 'rem_s'
        }
    },
    97: function (val) {
        return {
            kind: 'binop',
            type: 'i64',
            operator: 'rem_u'
        }
    },
    98: function (val) {
        return {
            kind: 'binop',
            type: 'i64',
            operator: 'and'
        }
    },
    99: function (val) {
        return {
            kind: 'binop',
            type: 'i64',
            operator: 'or'
        }
    },
    100: function (val) {
        return {
            kind: 'binop',
            type: 'i64',
            operator: 'xor'
        }
    },
    101: function (val) {
        return {
            kind: 'binop',
            type: 'i64',
            operator: 'shl'
        }
    },
    102: function (val) {
        return {
            kind: 'binop',
            type: 'i64',
            operator: 'shr_u'
        }
    },
    103: function (val) {
        return {
            kind: 'binop',
            type: 'i64',
            operator: 'shr_s'
        }
    },
    184: function (val) {
        return {
            kind: 'binop',
            type: 'i64',
            operator: 'rotr'
        }
    },
    185: function (val) {
        return {
            kind: 'binop',
            type: 'i64',
            operator: 'rotl'
        }
    },
    117: function (val) {
        return {
            kind: 'binop',
            type: 'f32',
            operator: 'add'
        }
    },
    118: function (val) {
        return {
            kind: 'binop',
            type: 'f32',
            operator: 'sub'
        }
    },
    119: function (val) {
        return {
            kind: 'binop',
            type: 'f32',
            operator: 'mul'
        }
    },
    120: function (val) {
        return {
            kind: 'binop',
            type: 'f32',
            operator: 'div'
        }
    },
    121: function (val) {
        return {
            kind: 'binop',
            type: 'f32',
            operator: 'min'
        }
    },
    122: function (val) {
        return {
            kind: 'binop',
            type: 'f32',
            operator: 'max'
        }
    },
    125: function (val) {
        return {
            kind: 'binop',
            type: 'f32',
            operator: 'copysign'
        }
    },
    137: function (val) {
        return {
            kind: 'binop',
            type: 'f64',
            operator: 'add'
        }
    },
    138: function (val) {
        return {
            kind: 'binop',
            type: 'f64',
            operator: 'sub'
        }
    },
    139: function (val) {
        return {
            kind: 'binop',
            type: 'f64',
            operator: 'mul'
        }
    },
    140: function (val) {
        return {
            kind: 'binop',
            type: 'f64',
            operator: 'div'
        }
    },
    141: function (val) {
        return {
            kind: 'binop',
            type: 'f64',
            operator: 'min'
        }
    },
    142: function (val) {
        return {
            kind: 'binop',
            type: 'f64',
            operator: 'max'
        }
    },
    145: function (val) {
        return {
            kind: 'binop',
            type: 'f64',
            operator: 'copysign'
        }
    },
// unop
    87: function (val) {
        return {
            kind: 'unop',
            type: 'i32',
            operator: 'clz'
        }
    },
    88: function (val) {
        return {
            kind: 'unop',
            type: 'i32',
            operator: 'ctz'
        }
    },
    89: function (val) {
        return {
            kind: 'unop',
            type: 'i32',
            operator: 'popcnt'
        }
    },
    90: function (val) {
        return {
            kind: 'unop',
            type: 'i32',
            operator: 'eqz'
        }
    },
    114: function (val) {
        return {
            kind: 'unop',
            type: 'i64',
            operator: 'clz'
        }
    },
    115: function (val) {
        return {
            kind: 'unop',
            type: 'i64',
            operator: 'ctz'
        }
    },
    116: function (val) {
        return {
            kind: 'unop',
            type: 'i64',
            operator: 'popcnt'
        }
    },
    186: function (val) {
        return {
            kind: 'unop',
            type: 'i64',
            operator: 'eqz'
        }
    },
    123: function (val) {
        return {
            kind: 'unop',
            type: 'f32',
            operator: 'abs'
        }
    },
    124: function (val) {
        return {
            kind: 'unop',
            type: 'f32',
            operator: 'neg'
        }
    },
    126: function (val) {
        return {
            kind: 'unop',
            type: 'f32',
            operator: 'ceil'
        }
    },
    127: function (val) {
        return {
            kind: 'unop',
            type: 'f32',
            operator: 'floor'
        }
    },
    128: function (val) {
        return {
            kind: 'unop',
            type: 'f32',
            operator: 'trunc'
        }
    },
    129: function (val) {
        return {
            kind: 'unop',
            type: 'f32',
            operator: 'nearest'
        }
    },
    130: function (val) {
        return {
            kind: 'unop',
            type: 'f32',
            operator: 'sqrt'
        }
    },
    143: function (val) {
        return {
            kind: 'unop',
            type: 'f64',
            operator: 'abs'
        }
    },
    144: function (val) {
        return {
            kind: 'unop',
            type: 'f64',
            operator: 'neg'
        }
    },
    146: function (val) {
        return {
            kind: 'unop',
            type: 'f64',
            operator: 'ceil'
        }
    },
    147: function (val) {
        return {
            kind: 'unop',
            type: 'f64',
            operator: 'floor'
        }
    },
    148: function (val) {
        return {
            kind: 'unop',
            type: 'f64',
            operator: 'trunc'
        }
    },
    149: function (val) {
        return {
            kind: 'unop',
            type: 'f64',
            operator: 'nearest'
        }
    },
    150: function (val) {
        return {
            kind: 'unop',
            type: 'f64',
            operator: 'sqrt'
        }
    },
// relop
    77: function (val) {
        return {
            kind: 'relop',
            type: 'i32',
            operator: 'eq'
        }
    },
    78: function (val) {
        return {
            kind: 'relop',
            type: 'i32',
            operator: 'ne'
        }
    },
    79: function (val) {
        return {
            kind: 'relop',
            type: 'i32',
            operator: 'lt_s'
        }
    },
    80: function (val) {
        return {
            kind: 'relop',
            type: 'i32',
            operator: 'le_s'
        }
    },
    81: function (val) {
        return {
            kind: 'relop',
            type: 'i32',
            operator: 'lt_u'
        }
    },
    82: function (val) {
        return {
            kind: 'relop',
            type: 'i32',
            operator: 'le_u'
        }
    },
    83: function (val) {
        return {
            kind: 'relop',
            type: 'i32',
            operator: 'gt_s'
        }
    },
    84: function (val) {
        return {
            kind: 'relop',
            type: 'i32',
            operator: 'ge_s'
        }
    },
    85: function (val) {
        return {
            kind: 'relop',
            type: 'i32',
            operator: 'gt_u'
        }
    },
    86: function (val) {
        return {
            kind: 'relop',
            type: 'i32',
            operator: 'ge_u'
        }
    },
    104: function (val) {
        return {
            kind: 'relop',
            type: 'i64',
            operator: 'eq'
        }
    },
    105: function (val) {
        return {
            kind: 'relop',
            type: 'i64',
            operator: 'ne'
        }
    },
    106: function (val) {
        return {
            kind: 'relop',
            type: 'i64',
            operator: 'lt_s'
        }
    },
    107: function (val) {
        return {
            kind: 'relop',
            type: 'i64',
            operator: 'le_s'
        }
    },
    108: function (val) {
        return {
            kind: 'relop',
            type: 'i64',
            operator: 'lt_u'
        }
    },
    109: function (val) {
        return {
            kind: 'relop',
            type: 'i64',
            operator: 'le_u'
        }
    },
    110: function (val) {
        return {
            kind: 'relop',
            type: 'i64',
            operator: 'gt_s'
        }
    },
    111: function (val) {
        return {
            kind: 'relop',
            type: 'i64',
            operator: 'ge_s'
        }
    },
    112: function (val) {
        return {
            kind: 'relop',
            type: 'i64',
            operator: 'gt_u'
        }
    },
    113: function (val) {
        return {
            kind: 'relop',
            type: 'i64',
            operator: 'ge_u'
        }
    },
    131: function (val) {
        return {
            kind: 'relop',
            type: 'f32',
            operator: 'eq'
        }
    },
    132: function (val) {
        return {
            kind: 'relop',
            type: 'f32',
            operator: 'ne'
        }
    },
    133: function (val) {
        return {
            kind: 'relop',
            type: 'f32',
            operator: 'lt'
        }
    },
    134: function (val) {
        return {
            kind: 'relop',
            type: 'f32',
            operator: 'le'
        }
    },
    135: function (val) {
        return {
            kind: 'relop',
            type: 'f32',
            operator: 'gt'
        }
    },
    136: function (val) {
        return {
            kind: 'relop',
            type: 'f32',
            operator: 'ge'
        }
    },
    151: function (val) {
        return {
            kind: 'relop',
            type: 'f64',
            operator: 'eq'
        }
    },
    152: function (val) {
        return {
            kind: 'relop',
            type: 'f64',
            operator: 'ne'
        }
    },
    153: function (val) {
        return {
            kind: 'relop',
            type: 'f64',
            operator: 'lt'
        }
    },
    154: function (val) {
        return {
            kind: 'relop',
            type: 'f64',
            operator: 'le'
        }
    },
    155: function (val) {
        return {
            kind: 'relop',
            type: 'f64',
            operator: 'gt'
        }
    },
    156: function (val) {
        return {
            kind: 'relop',
            type: 'f64',
            operator: 'ge'
        }
    },
// cvtop
    157: function (val) {
        return {
            kind: 'cvtop',
            type: 'i32',
            type1: 'f32',
            operator: 'trunc_s'
        }
    },
    158: function (val) {
        return {
            kind: 'cvtop',
            type: 'i32',
            type1: 'f64',
            operator: 'trunc_s'
        }
    },
    159: function (val) {
        return {
            kind: 'cvtop',
            type: 'i32',
            type1: 'f32',
            operator: 'trunc_u'
        }
    },
    160: function (val) {
        return {
            kind: 'cvtop',
            type: 'i32',
            type1: 'f64',
            operator: 'trunc_u'
        }
    },
    161: function (val) {
        return {
            kind: 'cvtop',
            type: 'i32',
            type1: 'i64',
            operator: 'wrap'
        }
    },
    162: function (val) {
        return {
            kind: 'cvtop',
            type: 'i64',
            type1: 'f32',
            operator: 'trunc_s'
        }
    },
    163: function (val) {
        return {
            kind: 'cvtop',
            type: 'i64',
            type1: 'f64',
            operator: 'trunc_s'
        }
    },
    164: function (val) {
        return {
            kind: 'cvtop',
            type: 'i64',
            type1: 'f32',
            operator: 'trunc_u'
        }
    },
    165: function (val) {
        return {
            kind: 'cvtop',
            type: 'i64',
            type1: 'f64',
            operator: 'trunc_u'
        }
    },
    166: function (val) {
        return {
            kind: 'cvtop',
            type: 'i64',
            type1: 'i32',
            operator: 'extend_s'
        }
    },
    167: function (val) {
        return {
            kind: 'cvtop',
            type: 'i64',
            type1: 'i32',
            operator: 'extend_u'
        }
    },
    168: function (val) {
        return {
            kind: 'cvtop',
            type: 'f32',
            type1: 'i32',
            operator: 'convert_s'
        }
    },
    169: function (val) {
        return {
            kind: 'cvtop',
            type: 'f32',
            type1: 'i32',
            operator: 'convert_u'
        }
    },
    170: function (val) {
        return {
            kind: 'cvtop',
            type: 'f32',
            type1: 'i64',
            operator: 'convert_s'
        }
    },
    171: function (val) {
        return {
            kind: 'cvtop',
            type: 'f32',
            type1: 'i64',
            operator: 'convert_u'
        }
    },
    172: function (val) {
        return {
            kind: 'cvtop',
            type: 'f32',
            type1: 'f64',
            operator: 'demote'
        }
    },
    173: function (val) {
        return {
            kind: 'cvtop',
            type: 'f32',
            type1: 'i32',
            operator: 'reinterpret'
        }
    },
    174: function (val) {
        return {
            kind: 'cvtop',
            type: 'f64',
            type1: 'i32',
            operator: 'convert_s'
        }
    },
    175: function (val) {
        return {
            kind: 'cvtop',
            type: 'f64',
            type1: 'i32',
            operator: 'convert_u'
        }
    },
    176: function (val) {
        return {
            kind: 'cvtop',
            type: 'f64',
            type1: 'i64',
            operator: 'convert_s'
        }
    },
    177: function (val) {
        return {
            kind: 'cvtop',
            type: 'f64',
            type1: 'i64',
            operator: 'convert_u'
        }
    },
    178: function (val) {
        return {
            kind: 'cvtop',
            type: 'f64',
            type1: 'f32',
            operator: 'promote'
        }
    },
    179: function (val) {
        return {
            kind: 'cvtop',
            type: 'f64',
            type1: 'i64',
            operator: 'reinterpret'
        }
    },
    180: function (val) {
        return {
            kind: 'cvtop',
            type: 'i32',
            type1: 'f32',
            operator: 'reinterpret'
        }
    },
    181: function (val) {
        return {
            kind: 'cvtop',
            type: 'i64',
            type1: 'f64',
            operator: 'reinterpret'
        }
    },
// const
    16: function (val) {
        return {
            kind: 'const',
            type: 'i32',
            init: '0'
        }
    },
    17: function (val) {
        return {
            kind: 'const',
            type: 'i64',
            init: '0'
        }
    },
    18: function (val) {
        return {
            kind: 'const',
            type: 'f64',
            init: '0'
        }
    },
    19: function (val) {
        return {
            kind: 'const',
            type: 'f32',
            init: '0'
        }
    },
    20: function (val) {
        return {
            kind: 'get_local',
            id: {
                kind: 'literal',
                value: 0,
                raw: '0'
            }
        };
    },
    21: function (val) {
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
        return 'i32.load8_s:' + val;
    },
    33: function (val) {
        return 'i32.load8_u:' + val;
    },
    34: function (val) {
        return 'i32.load16_s:' + val;
    },
    35: function (val) {
        return 'i32.load16_u:' + val;
    },
    36: function (val) {
        return 'i64.load8_s:' + val;
    },
    37: function (val) {
        return 'i64.load8_u:' + val;
    },
    38: function (val) {
        return 'i64.load16_s:' + val;
    },
    39: function (val) {
        return 'i64.load16_u:' + val;
    },
    40: function (val) {
        return 'i64.load32_s:' + val;
    },
    41: function (val) {
        return 'i64.load32_u:' + val;
    },
    42: function (val) {
        return 'i32.load:' + val;
    },
    43: function (val) {
        return 'i64.load:' + val;
    },
    44: function (val) {
        return 'f32.load:' + val;
    },
    45: function (val) {
        return 'f64.load:' + val;
    },
    46: function (val) {
        return 'i32.store8:' + val;
    },
    47: function (val) {
        return 'i32.store16:' + val;
    },
    48: function (val) {
        return 'i64.store8:' + val;
    },
    49: function (val) {
        return 'i64.store16:' + val;
    },
    50: function (val) {
        return 'i64.store32:' + val;
    },
    51: function (val) {
        return 'i32.store:' + val;
    },
    52: function (val) {
        return 'i64.store:' + val;
    },
    53: function (val) {
        return 'f32.store:' + val;
    },
    54: function (val) {
        return 'f64.store:' + val;
    },
    59: function (val) {
        return 'current_memory:' + val;
    },
    57: function (val) {
        return 'grow_memory:' + val;
    },
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

