/* eslint-env mocha */
// import { expect } from 'chai';
import { createSourceMapTransformer } from '../src';
import streamToString from 'stream-to-string';
import browserify from 'browserify';
// import browserifyTest from 'browserify-test';

import path from 'path';
import util from 'util';

import Mocha from 'mocha';
import {Readable} from 'stream';
import v8Transformers from './v8Transformers';

// import can't currently be properly browserified: https://github.com/babel/babelify/issues/81
const fs = require('fs');

describe('sourcemap-transformer', () => {
  describe('Examples', () => {
    it('Transforms a file', (done) => {
        /*
        import stringToStream from 'string-to-stream';
        const input = `1) App renders:
       AssertionError: expected 1 to equal 2
        at file:///tmp/testBundle.js:15315
        at file:///tmp/testBundle.js:17432
        at file:///tmp/testBundle.js:56073
        at callFn (:4202)
        at :4195
        at :4661
        at :4790
        at next (:4581)
        at :4591
        at next (:4523)
        at :4559
        at timeslice (:12326)
        `;
        stringToStream(input)

      const expected = `1) App renders:
     AssertionError: expected 1 to equal 2
      webpack:///~/chai/lib/chai/assertion.js:111
      webpack:///~/chai/lib/chai/interface/assert.js:126
      webpack:///test/components/App_test.js:31
      webpack:///~/samsam/lib/samsam.js:73
      at :4195
      webpack:///~/sinon/lib/sinon/spy.js:127
      webpack:///~/sinon/lib/sinon/spy.js:256
      webpack:///~/sinon/lib/sinon/spy.js:47
      webpack:///~/sinon/lib/sinon/spy.js:57
      webpack:///~/samsam/lib/samsam.js:394
      webpack:///~/sinon/lib/sinon/spy.js:25
      at timeslice (:12326)
`;
*/

      const sourceMapTransformer = createSourceMapTransformer(v8Transformers);

      const mocha = new Mocha();
      const bundlePath = path.join(__dirname, 'bundle.js');
      const ws = browserify({debug: true, entries: path.join(__dirname, './src/main.js')}).bundle().pipe(fs.createWriteStream(bundlePath));
      ws.on('finish', function () {
        mocha.addFile(bundlePath);

        const stream = new Readable();
        stream._read = function noop () {};

        const _log = console.log;
        console.log = function (...args) {
          stream.push(util.format.apply(util, args) + '\n');
        };
        mocha.run(function (failures) {
          console.log = _log;
          stream.push(null);
        });
        streamToString(stream.pipe(sourceMapTransformer)).then((output) => {
          console.log('OUTPUT:' + output + ' ENDDDDD');
          // expect(output).to.equal(expected);
          done();
        });
      });
    });
  });
});
