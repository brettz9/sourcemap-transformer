/* eslint-env mocha */
import { expect } from 'chai';
import { createSourceMapTransformer } from '../src';
import stringToStream from 'string-to-stream';
import streamToString from 'stream-to-string';

describe('sourcemap-transformer', () => {
  describe('Examples', () => {
    it('Transforms a file', (done) => {
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

      const sourceMapTransformer = createSourceMapTransformer();

      streamToString(stringToStream(input).pipe(sourceMapTransformer)).then((output) => {
        expect(output).to.equal(expected);
        done();
      });
    });
  });
});
