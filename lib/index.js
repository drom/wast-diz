'use strict';

var bytecode = require('./bytecode');

function toHex (n, digits) {
  return ('00000000000000' + n.toString(16)).slice(-digits);
}

function sectionFromHeap (lib, HEAP, cursor, optr) {
    var HEAPU8 = new Uint8Array(HEAP);
    var HEAPU32 = new Uint32Array(HEAP);

    var body = [];
    var i, j, index, len, count, nameHash, name, localCount, bodySize, sameTypeLocalCount, valueType, bodyLast;

    function getString (curs, ptr) {
        var res, len, i;
        // len <varuint32> section identifier string length
        curs = lib.unpack_uint32(curs, ptr);
        len = HEAPU32[ptr >> 2];
        // str <bytes> section identifier string
        res = '';
        for (i = 0; i < len; i++) {
            res += String.fromCharCode(HEAPU8[curs]);
            curs += 1;
        }
        HEAPU32[ptr >> 2] = curs;
        return res;
    }

    function onExportEntry (index, cursor, optr) {
        body.push({
            kind: 'export',
            name: { kind: 'literal', value: getString(cursor, optr) },
            id: { kind: 'identifier', name: index }
        });
    }

    function onNameSectionEntry(index, cursor, optr) {
        body.push({
            kind: 'name',
            id: index,
            name: getString(cursor, optr)
        });
    }

    function onByteCode (val) {
        bodyLast += toHex(val, 2);
        if ((i + 1) % 32) {
            bodyLast += ' ';
        } else {
            bodyLast += '\n';
        }
    }

    lib.hash_string(cursor, optr);
    nameHash = HEAPU32[optr >> 2];

    name = getString(cursor, optr);
    cursor = HEAPU32[optr >> 2];

    // payload_len <varuint32> size of this section in bytes
    cursor = lib.unpack_uint32(cursor, optr);
    len = HEAPU32[optr >> 2];

    if (nameHash === 0x4651d1e1) { // export
        cursor = lib.unpack_uint32(cursor, optr);
        count = HEAPU32[optr >> 2];
        for (j = 0; j < count; j++) {
            // func_index <varuint32> index into the function table
            cursor = lib.unpack_uint32(cursor, optr);
            index = HEAPU32[optr >> 2];
            onExportEntry(index, cursor, optr);
            cursor = HEAPU32[optr >> 2];
        }
    } else
    if (nameHash == 0x7c7275a2) { // name
        cursor = lib.unpack_uint32(cursor, optr);
        count = HEAPU32[optr >> 2];
        for (j = 0; j < count; j++) {
            onNameSectionEntry(j, cursor, optr);
            cursor = HEAPU32[optr >> 2];
            cursor = lib.unpack_uint32(cursor, optr);
            localCount = HEAPU32[optr >> 2];
            for (i = 0; i < localCount; i++) {
                body.push({
                    exportEntry: getString(cursor, optr)
                });
                cursor = HEAPU32[optr >> 2];
            }
        }
    } else
    if (nameHash == 0x7c70da68) { // code

        // count of function bodies to follow
        cursor = lib.unpack_uint32(cursor, optr);
        count = HEAPU32[optr >> 2];
        for (j = 0; j < count; j++) {

            // size of function body to follow, in bytes
            cursor = lib.unpack_uint32(cursor, optr);
            bodySize = HEAPU32[optr >> 2];

            // number of local entries
            cursor = lib.unpack_uint32(cursor, optr);
            localCount = HEAPU32[optr >> 2];

            body.push({
                index: j,
                bodySize: bodySize,
                localCount: localCount
            });

            for (i = 0; i < localCount; i++) {

                // number of local variables of the following type
                cursor = lib.unpack_uint32(cursor, optr);
                sameTypeLocalCount = HEAPU32[optr >> 2];

                // type of the variables
                valueType = HEAPU8[cursor >> 0];
                cursor += 1;

                body.push({
                    index: i,
                    sameTypeLocalCount: sameTypeLocalCount,
                    valueType: valueType
                });
            }

            // FIXME Calculate real localCount from varuint length
            bodySize -= ((localCount * 2) + 1);

            bodyLast = '';
            for (i = 0; i < bodySize; i++) {
                onByteCode(HEAPU8[cursor >>0]);
                cursor += 1;
            }
            body.push({
                kind: 'func',
                body: bodyLast
            });
        }
    } else {
        // payload_str <bytes> content of this section, of length payload_len
        bodyLast = '';
        for (i = 0; i < len; i++) {
            bodyLast += toHex(HEAPU8[cursor], 2);
            if ((i + 1) % 32) {
                bodyLast += ' ';
            } else {
                bodyLast += '\n';
            }
            cursor += 1;
        }
        body.push({
            kind: 'section',
            name: name,
            body: bodyLast
        });
    }

    HEAPU32[optr >> 2] = cursor;

    return body;
}

function diz (data) {
    var res = [];

    function onMagicNumber(val) {
        res.push({
            kind: 'Magic',
            data: toHex(val, 8)
        });
    }

    function onVersionNumber(val) {
        res.push({
            kind: 'Version',
            data: val.toString(10)
        });
    }

    var scratchLen = 1024; // Bytes
    var dataLen = data.length;
    var dataLen32 = (dataLen + 0x3) & 0xfffffc;
    var HEAP = new ArrayBuffer(dataLen32 + scratchLen);
    var HEAPU8 = new Uint8Array(HEAP);
    var HEAPU32 = new Uint32Array(HEAP);

    var i;
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
        onMagicNumber(HEAPU32[cursor >> 2]);
        cursor += 4;

        // Version <uint32>
        onVersionNumber(HEAPU32[cursor >> 2]);
        cursor += 4;

        while (cursor < dataLen) {
            res.push(sectionFromHeap(lib, HEAP, cursor, tmp0));
            cursor = HEAPU32[tmp0 >> 2];
        }
    }
    return {
        kind: 'script',
        body: res
    };
}

module.exports = {
    diz: diz
};
