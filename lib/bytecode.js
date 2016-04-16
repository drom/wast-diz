function asmFunc(global, env, buffer) {
  'use asm';
  var HEAPU8 = new global.Uint8Array(buffer);
  var HEAPU32 = new global.Uint32Array(buffer);
  var HEAP32 = new global.Int32Array(buffer);

  function unpack_uint32 (iptr, optr) {
    iptr = iptr |0;
    optr = optr |0;
    var res = 0, dat = 0;

    dat = HEAPU8[iptr >> 0];
    res = res | (dat & 0x7f); // [6:0]
    iptr = (iptr + 1) |0;
    if (dat & 0x80) {
      dat = HEAPU8[iptr >> 0];
      res = res | ((dat & 0x7f) << 7); // [13:0]
      iptr = (iptr + 1) |0;
      if (dat & 0x80) {
        dat = HEAPU8[iptr >> 0];
        res = res | ((dat & 0x7f) << 14); // [20:0]
        iptr = (iptr + 1) |0;
        if (dat & 0x80) {
          dat = HEAPU8[iptr >> 0];
          res = res | ((dat & 0x7f) << 21); // [27:0]
          iptr = (iptr + 1) |0;
          if (dat & 0x80) {
            dat = HEAPU8[iptr >> 0];
            res = res | ((dat & 15) << 28); // [31:0]
            iptr = (iptr + 1) |0;
          }
        }
      }
    }
    HEAPU32[optr >> 2] = res;
    return iptr;
  }

  function unpack_int32 (iptr, optr) {
    iptr = iptr |0;
    optr = optr |0;
    var res = 0, dat = 0;

    dat = HEAPU8[iptr >> 0];
    res = res | (dat & 0x7f); // [6:0]
    iptr = (iptr + 1) |0;
    if (dat & 0x80) {
      dat = HEAPU8[iptr >> 0];
      res = res | ((dat & 0x7f) << 7); // [13:0]
      iptr = (iptr + 1) |0;
      if (dat & 0x80) {
        dat = HEAPU8[iptr >> 0];
        res = res | ((dat & 0x7f) << 14); // [20:0]
        iptr = (iptr + 1) |0;
        if (dat & 0x80) {
          dat = HEAPU8[iptr >> 0];
          res = res | ((dat & 0x7f) << 21); // [27:0]
          iptr = (iptr + 1) |0;
          if (dat & 0x80) {
            dat = HEAPU8[iptr >> 0];
            res = res | ((dat & 15) << 28); // [31:0]
            iptr = (iptr + 1) |0;
          }
        } else if (dat & 0x40) res = res | 0xFFE00000;
      } else   if (dat & 0x40) res = res | 0xFFFFC000;
    } else     if (dat & 0x40) res = res | 0xFFFFFF80;
    HEAP32[optr >> 2] = res;
    return iptr;
  }

  return {
    unpack_uint32: unpack_uint32,
    unpack_int32: unpack_int32
  };
}

module.exports = asmFunc;
