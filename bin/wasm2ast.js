#!/usr/bin/env node

'use strict';

var fs = require('fs-extra'),
    path = require('path'),
    jsof = require('jsof'),
    lib = require('../lib');

function runner (name) {
    return function (err, data) {
        var result;
        if (err) { throw err; }
        console.log(name);
        try {
            result = lib.diz(data);
        } catch (err1) {
            console.log(err1);
            return;
        }
        fs.outputFile(
            path.resolve(dst, name + '.js'),
            jsof.s(result) + '\n',
            function (err2) {
                if (err2) { throw err2; }
            }
        );
    };
}

var src = path.resolve(__dirname, '../wasm/');
var dst = path.resolve(__dirname, '../results/');

var wasmFileNames = fs.readdirSync(src);

wasmFileNames.forEach(function (wasmFileName) {
    var matchArr = wasmFileName.match('^(.*).wasm$');
    if (matchArr) {
        fs.readFile(
            path.resolve(src, wasmFileName),
            runner(matchArr[1])
        );
    }
});
