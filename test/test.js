'use strict';

var fs = require('fs'),
    path = require('path'),
    expect = require('chai').expect,
    diz = require('../lib');

var src = path.resolve(__dirname, '../wasm/');
var dst = path.resolve(__dirname, '../wast-parser/results/');

var astFileNames = fs.readdirSync(dst);

describe('diz', function () {
    astFileNames.forEach(function (astFileName) {
        var name;
        var matchArr = astFileName.match('^(.*).js$');
        if (matchArr) {
            name = matchArr[1];
            it(name, function (done) {
                fs.readFile(
                    path.resolve(src, name + '.wasm'),
                    function (err, wastData) {
                        if (err) { throw err; }

                        var result;
                        try {
                            result = diz(wastData);
                            console.log(result);
                        } catch (err1) {
                            console.log(err1);
                            throw err1;
                        }

                        fs.readFile(
                            path.resolve(dst, name + '.js'),
                            'utf8',
                            function (err2, astData) {
                                if (err2) { throw err2; }
                                // expect(jsof.s(result) + '\n').to.equal(astData);
                                done();
                            }
                        );
                        // expect(jsof.s(result)).to.equal(jsof.s(require('../results/' + name + '.js')));
                        // done();
                    }
                );
            });
        }
    });
});
