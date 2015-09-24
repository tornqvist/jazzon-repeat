'use strict';

let resolve = require('path').resolve;
let test = require('tape');
let jazzon = require('jazzon');
let pkg = require('../package.json');
let plugin = require(resolve(__dirname, '..', pkg.main));

let filler = function (value, helper) {
  switch (helper) {
  case 'string': return 'string';
  case 'object': return {};
  case 'array': return [];
  case 'fn': return function () { return 'fn'; };
  case 'promise': return Promise.resolve('promise');
  case 'generator': return (function * () { return 'generator'; }());
  default: return value;
  }
};

test('does repeat any type', assert => {
  let instance = jazzon.create();
  let json = {
    string: '@{ string | repeat(2) }',
    object: '@{ object | repeat(2) }',
    array: '@{ array | repeat(2) }',
    fn: '@{ fn | repeat(2) }',
    promise: '@{ promise | repeat(2) }',
    generator: '@{ generator | repeat(2) }'
  };

  instance
    .use(plugin())
    .use(filler)
    .compile(json)
    .then((result) => {
      assert.deepLooseEqual(result.string, ['string', 'string'], 'string was repeated');
      assert.deepLooseEqual(result.object, [{}, {}], 'object was repeated');
      assert.deepLooseEqual(result.array, [[], []], 'array was repeated');
      assert.deepLooseEqual(result.fn, ['fn', 'fn'], 'fn was repeated');
      assert.deepLooseEqual(result.promise, ['promise', 'promise'], 'promise was repeated');
      assert.deepLooseEqual(result.generator, ['generator', 'generator'], 'generator was repeated');
      assert.end();
    }, assert.end);
});

test('does nothing when args are invalid', assert => {
  let instance = jazzon.create();
  let json = { test: '@{ string | repeat }' };

  instance
    .use(plugin())
    .use(filler)
    .compile(json)
    .then((result) => {
      assert.equal(result.test, 'string', 'string was not repeated');
      assert.end();
    }, assert.end);
});
