(function () {
  'use strict';

  var HTMLComb = require('../src/htmlcomb'),
      htmlcomb = new HTMLComb();

  /*
    ======== A Handy Little Nodeunit Reference ========
    https://github.com/caolan/nodeunit

    Test methods:
      test.expect(numAssertions)
      test.done()
    Test assertions:
      test.ok(value, [message])
      test.equal(actual, expected, [message])
      test.notEqual(actual, expected, [message])
      test.deepEqual(actual, expected, [message])
      test.notDeepEqual(actual, expected, [message])
      test.strictEqual(actual, expected, [message])
      test.notStrictEqual(actual, expected, [message])
      test.throws(block, [error], [message])
      test.doesNotThrow(block, [error], [message])
      test.ifError(value)
  */

  module.exports = {
    defaultOptions: {
      requireDoubleQuotationMarks: function(test) {
        test.expect(1);
        test.equal(htmlcomb.comb('<div id=main></div>'), '<div id="main"></div>');
        test.done();
      },
      replaceSingleQuotationMarks: function(test) {
        test.expect(1);
        test.equal(htmlcomb.comb('<div id=\'main\'></div>'), '<div id="main"></div>');
        test.done();
      },
      removeEmptyValues: function(test) {
        test.expect(1);
        test.equal(htmlcomb.comb('<div id=""></div>'), '<div id></div>');
        test.done();
      },
      removeNewlines: function(test) {
        test.expect(1);
        test.equal(htmlcomb.comb('<div data-foo="{\n\'bar\':\'baz\'\n}"></div>'), '<div data-foo="{\'bar\':\'baz\'}"></div>');
        test.done();
      },
      removeMultipleSpaces: function(test) {
        test.expect(1);
        test.equal(htmlcomb.comb('<div class="foo  bar     baz"></div>'), '<div class="foo bar baz"></div>');
        test.done();
      },
      order: function(test) {
        test.expect(1);
        test.equal(htmlcomb.comb('<div data class id></div>'), '<div class id data></div>');
        test.done();
      }
    },
    customOptions: {
      requireDoubleQuotationMarks: function(test) {
        htmlcomb.setup({
          requireDoubleQuotationMarks: false
        });

        test.expect(1);
        test.equal(htmlcomb.comb('<div id=main></div>'), '<div id=main></div>');
        test.done();
      },
      replaceSingleQuotationMarks: function(test) {
        htmlcomb.setup({
          replaceSingleQuotationMarks: false
        });

        test.expect(1);
        test.equal(htmlcomb.comb('<div id=\'main\'></div>'), '<div id=\'main\'></div>');
        test.done();
      },
      removeEmptyValues: function(test) {
        htmlcomb.setup({
          removeEmptyValues: false
        });

        test.expect(1);
        test.equal(htmlcomb.comb('<div id=""></div>'), '<div id=""></div>');
        test.done();
      },
      removeNewlines: function(test) {
        htmlcomb.setup({
          removeNewlines: false
        });

        test.expect(1);
        test.equal(htmlcomb.comb('<div data-foo="{\n\'bar\':\'baz\'\n}"></div>'), '<div data-foo="{\n\'bar\':\'baz\'\n}"></div>');
        test.done();
      },
      removeMultipleSpaces: function(test) {
        htmlcomb.setup({
          removeMultipleSpaces: false
        });

        test.expect(1);
        test.equal(htmlcomb.comb('<div class="foo  bar     baz"></div>'), '<div class="foo  bar     baz"></div>');
        test.done();
      },
      order: function(test) {
        htmlcomb.setup({
          order: [
            'data',
            'id',
            'class'
          ]
        });

        test.expect(1);
        test.equal(htmlcomb.comb('<div id class data></div>'), '<div data id class></div>');
        test.done();
      }
    }
  };

})();
