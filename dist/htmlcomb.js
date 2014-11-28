/*!
 * htmlcomb v0.1.2
 * https://github.com/fengyuanchen/htmlcomb
 *
 * Copyright 2014 Fengyuan Chen
 * Released under the MIT license
 */

(function () {

  "use strict";

  var HTMLComb = function (options) {
        this.defaults = util.extend({}, HTMLComb.DEFAULTS, options);
        this.source = "";
        this.result = "";
      },

      util;

  // Defaults
  // ---------------------------------------------------------------------------

  HTMLComb.DEFAULTS = {
    requireDoubleQuotationMarks: true,
    replaceSingleQuotationMarks: true,
    removeEmptyValue: true,
    order: [
      "class",
      "id",
      "name",
      "data",
      "src",
      "for",
      "type",
      "href",
      "value",
      "title",
      "alt",
      "aria",
      "role"
    ]
  };

  // Prototype
  // ---------------------------------------------------------------------------

  HTMLComb.prototype = {
    constructor: HTMLComb,

    setup: function (options) {
      if (typeof options === "object") {
        util.extend(this.defaults, options);
      }
    },

    format: function (source, options, callback) {
      var result;

      if (typeof source !== "string") {
        throw new Error("The first parameter for `format` method must be a string.");
      }

      this.source = source;

      if (typeof options === "object") {
        util.extend(this.defaults, options);
      } else if (typeof options === "function" && typeof callback === "undefined") {
        callback = options;
      }

      result = source.replace(/<(\w+)\s([^<>]+)>/g, util.proxy(function (tag, tagName, attrs) {
        return ("<" + tagName + " " + this.sort(attrs) + ">");
      }, this));

      this.result = result;

      if (typeof callback === "function") {
        callback.call(this, result);
      }

      return result;
    },

    comb: function () {
      return this.format.apply(this, util.toArray(arguments));
    },

    sort: function (attrs) {
      var order = this.defaults.order,
          sortedAttrs = [],
          matchedAttrs = [],
          others = [];

      attrs = this.split(attrs); // To array

      util.each(attrs, function (attr) {
        var matched = false;

        util.each(order, function (attrName, i) {
          if (attr.substr(0, attrName.length) === attrName) {
            matched = true;

            if (typeof matchedAttrs[i] === "undefined") {
              matchedAttrs[i] = [];
            }

            matchedAttrs[i].push(attr);

            return false; // Breaks loop
          }
        });

        if (!matched) {
          others.push(attr);
        }
      });

      // Filters undefined values and sorts matched attrs
      util.each(matchedAttrs, function (attr) {
        if (Array.isArray(attr)) {

          if (attr.length > 1) {
            attr.sort();
          }

          sortedAttrs.push(attr.join(" "));
        }
      });

      attrs = sortedAttrs.concat(others.sort());

      return attrs.join(" ");
    },

    split: function (attrs) {
      var defaults = this.defaults,
          matched = [];

      if (typeof attrs === "string") {

        // Matchs four types of attribute: attr="prop" | attr='prop' | attr=prop | attr
        matched = attrs.match(/\w+(?:\-\w*)*(\=(("[^"]*")|('[^']*')|\w*))?/g);

        if (matched) {
          util.each(matched, function (attr, i) {
            var firstLetter;

            attr = attr.split("=");

            if (typeof attr[1] !== "undefined") {
              firstLetter = attr[1].charAt(0);

              if (firstLetter === "'" && defaults.replaceSingleQuotationMarks) { // Replases ' to "
                attr[1] = '"' + attr[1].replace(/'([^']*)'/g, "$1").replace(/"/g, "&quot;") + '"';
              } else if (firstLetter !== '"' && defaults.requireDoubleQuotationMarks) { // Adds "
                attr[1] = '"' + attr[1] + '"';
              }

              if (attr[1] === '""' && defaults.removeEmptyValue) { // Removes empty value
                attr.pop();
              }
            }

            matched[i] = attr.join("=");
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
    toArray: function (obj, srart, end) {
      return Array.prototype.slice.call(obj, srart, end);
    },

    each: function (obj, callback) {
      var length,
          i;

      if (typeof callback === "function") {
        if (Array.isArray(obj)) {
          for (i = 0, length = obj.length; i < length; i++) {
            if (callback.call(obj, obj[i], i) === false) {
              break;
            }
          }
        } else if (typeof obj === "object") {
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


  // Extend prototype
  // ---------------------------------------------------------------------------

  util.extend(HTMLComb.prototype, util);


  // Define and export
  // ---------------------------------------------------------------------------

  if (typeof window !== "undefined") {
    window.HTMLComb = HTMLComb;
  }

  if (typeof define === "function" && define.amd) {
    define("htmlcomb", [], function () {
      return HTMLComb;
    });
  }

  if (typeof module === "object") {
    module.exports = HTMLComb;
  }

})();
