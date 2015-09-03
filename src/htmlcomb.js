/*!
 * HTMLComb v@VERSION
 * https://github.com/fengyuanchen/htmlcomb
 *
 * Copyright (c) 2014-@YEAR Fengyuan Chen
 * Released under the MIT license
 *
 * Date: @DATE
 */

(function () {

  'use strict';

  // Patterns
  var REGEXP_ELEMENT_TAGS = /<(\w+)\s([^<>]+)>/g;
  var REGEXP_ELEMENT_ATTRIBUTES = /\w+(?:\-\w*)*(\=(("[^"]*")|('[^']*')|\w*))?/g;
  var REGEXP_SINGLE_QUOTATION_MARKS = /'([^']*)'/g;
  var REGEXP_DOUBLE_QUOTATION_MARKS = /"/g;
  var REGEXP_EMPTY_VALUES = /^"\s*"$/;
  var REGEXP_NEWLINES = /[\n\r]+/g;
  var REGEXP_MULTIPLE_SPACES = /(\s)\s+/g;

  // Others
  var array = [];
  var slice = array.slice;
  var toString = {}.toString;
  var util;

  function HTMLComb(options) {
    this.initialOptions = util.extend({}, HTMLComb.DEFAULTS);
    this.options = {};
    this.source = '';
    this.result = '';
    this.setup(options);
  }

  // Defaults
  // ---------------------------------------------------------------------------

  HTMLComb.DEFAULTS = {
    requireDoubleQuotationMarks: true,
    replaceSingleQuotationMarks: true,
    removeMultipleSpaces: true,
    removeEmptyValues: true,
    removeNewlines: true,

    // http://codeguide.co/#html-attribute-order
    order: [
      'class',
      'id',
      'name',
      'data',
      'src',
      'for',
      'type',
      'href',
      'value',
      'title',
      'alt',
      'role',
      'aria'
    ]
  };

  // Prototype
  // ---------------------------------------------------------------------------

  HTMLComb.prototype = {
    constructor: HTMLComb,

    setup: function (options, _temporary) {
      if (typeof options === 'object') {
        if (!_temporary) {
          util.extend(this.initialOptions, options);
        }

        util.extend(this.options, this.initialOptions, options);
      } else {
        this.options = util.extend({}, this.initialOptions);
      }

      // Return `this` to allow chain composition
      return this;
    },

    format: function (source, options, callback) {
      var hasOptions = false;
      var result;

      if (typeof source !== 'string') {
        throw new Error('The first parameter for "format" method must be a string.');
      }

      if (typeof options === 'object') {
        hasOptions = true;
        this.setup(options, true);
      } else if (typeof options === 'function' && typeof callback === 'undefined') {
        callback = options;
      }

      this.source = source;

      result = source.replace(REGEXP_ELEMENT_TAGS, util.proxy(function (tag, tagName, attrs) {
        return ('<' + tagName + ' ' + this.sort(attrs) + '>');
      }, this));

      if (hasOptions) {
        this.setup();
      }

      this.result = result;

      if (typeof callback === 'function') {
        callback.call(this, result);
      }

      return result;
    },

    comb: function () {
      return this.format.apply(this, util.toArray(arguments));
    },

    sort: function (attrs) {
      var order = this.options.order;
      var sortedAttrs = [];
      var matchedAttrs = [];
      var others = [];

      // To array
      attrs = this.split(attrs);

      util.each(attrs, function (attr) {
        var matched = false;

        util.each(order, function (attrName, i) {
          if (attr.substr(0, attrName.length) === attrName) {
            matched = true;

            if (typeof matchedAttrs[i] === 'undefined') {
              matchedAttrs[i] = [];
            }

            matchedAttrs[i].push(attr);

            // Breaks loop
            return false;
          }
        });

        if (!matched) {
          others.push(attr);
        }
      });

      // Filters undefined values and sorts matched attrs
      util.each(matchedAttrs, function (attr) {
        if (util.isArray(attr)) {

          if (attr.length > 1) {
            attr.sort();
          }

          sortedAttrs.push(attr.join(' '));
        }
      });

      attrs = sortedAttrs.concat(others.sort());

      return attrs.join(' ');
    },

    split: function (attrs) {
      var options = this.options;
      var matched = [];

      if (typeof attrs === 'string') {

        // Matchs four types of attribute: attr="prop" | attr='prop' | attr=prop | attr
        matched = attrs.match(REGEXP_ELEMENT_ATTRIBUTES);

        if (matched) {
          util.each(matched, function (attr, i) {
            var firstLetter;

            attr = attr.split('=');

            if (typeof attr[1] !== 'undefined') {
              firstLetter = attr[1].charAt(0);


              if (firstLetter === '\'' && options.replaceSingleQuotationMarks) {

                // Replases ' to "
                attr[1] = '"' + attr[1].replace(REGEXP_SINGLE_QUOTATION_MARKS, '$1').replace(REGEXP_DOUBLE_QUOTATION_MARKS, '&quot;') + '"';
              } else if (firstLetter !== '"' && options.requireDoubleQuotationMarks) {

                // Adds "
                attr[1] = '"' + attr[1] + '"';
              }

              // Removes newlines first
              if (options.removeNewlines) {
                attr[1] = attr[1].replace(REGEXP_NEWLINES, '');
              }

              if (options.removeMultipleSpaces) {
                attr[1] = attr[1].replace(REGEXP_MULTIPLE_SPACES, '$1');
              }

              if (REGEXP_EMPTY_VALUES.test(attr[1]) && options.removeEmptyValues) {
                attr.pop();
              }
            }

            matched[i] = attr.join('=');
          });
        } else {
          matched = [];
        }
      }

      return matched;
    }
  };


  // Utilities
  // ---------------------------------------------------------------------------

  util = {
    isArray: Array.isArray || function (arr) {
      return toString.call(arr) === '[object Array]';
    },

    toArray: function (obj, start, end) {
      var args = [];

      if (typeof start === 'number') {
        args.push(start);

        if (typeof end === 'number') {
          args.push(end);
        }
      }

      return slice.apply(obj, args);
    },

    each: function (obj, callback) {
      var length;
      var i;

      if (typeof callback === 'function') {
        if (util.isArray(obj)) {
          for (i = 0, length = obj.length; i < length; i++) {
            if (callback.call(obj, obj[i], i) === false) {
              break;
            }
          }
        } else if (typeof obj === 'object') {
          for (i in obj) {
            if (obj.hasOwnProperty(i)) {
              if (callback.call(obj, obj[i], i) === false) {
                break;
              }
            }
          }
        }
      }

      return obj;
    },

    extend: function (obj) {
      var args = util.toArray(arguments);

      if (args.length > 1) {
        args.shift();
      } else {
        obj = this;
      }

      util.each(args, function (arg) {
        util.each(arg, function (prop, i) {
          obj[i] = prop;
        });
      });

      return obj;
    },

    proxy: function (fn, context) {
      var args = util.toArray(arguments, 2);

      return function () {
        return fn.apply(context, args.concat(util.toArray(arguments)));
      };
    }
  };


  // Register static methods
  // ---------------------------------------------------------------------------

  util.extend(HTMLComb, util);


  // Export
  // ---------------------------------------------------------------------------

  if (typeof window !== 'undefined') {
    window.HTMLComb = HTMLComb;
  }

  if (typeof define === 'function' && define.amd) {
    define('htmlcomb', [], function () {
      return HTMLComb;
    });
  }

  if (typeof module === 'object') {
    module.exports = HTMLComb;
  }

})();
