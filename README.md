# [HTMLComb](https://github.com/fengyuanchen/htmlcomb)

A simple tool for combing HTML attributes.


# Main

```
dist/
├── dist/htmlcomb.js      (6 KB)
└── dist/htmlcomb.min.js  (3 KB)
```


# Getting started

## Quick start

Four quick start options are available:

- [Download the latest release](https://github.com/fengyuanchen/htmlcomb/archive/master.zip).
- Clone the repository: `git clone https://github.com/fengyuanchen/htmlcomb.git`.
- Install with [NPM](http://npmjs.org): `npm install htmlcomb`.


## Usage

### Browser

```html
<script src="/path/to/htmlcomb.js"></script>
```

```javascript
var htmlcomb = new HTMLComb(options);

htmlcomb.format(source, function (result) {
  console.log(result);
});
```


### NodeJS

```javascript
var fs = require("fs"),
    HTMLComb = require("htmlcomb"),
    htmlcomb = new HTMLComb(options);

fs.readFile("/path/to/source.html", function(err, data) {
  if (err) {
    throw err;
  }

  fs.writeFile("/path/to/result.html", htmlcomb.format(data.toString()), function (err) {
    if (err) {
      throw err;
    }

    console.log("Done, without errors.");
  });
});
```


## Options

#### requireDoubleQuotationMarks

- Type: `Boolean`
- Default: `true`

For example:
```html
<!-- Source -->
<div id=main></div>

<!-- Result -->
<div id="main"></div>
```


#### replaceSingleQuotationMarks

- Type: `Boolean`
- Default: `true`

For example:
```html
<!-- Source -->
<div id='main'></div>

<!-- Result -->
<div id="main"></div>
```


#### removeEmptyValue

- Type: `Boolean`
- Default: `true`

For example:
```html
<!-- Source -->
<div id=""></div>

<!-- Result -->
<div id></div>
```


#### order

- Type: `Array`
- Default:
```javascript
[
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
```

The default order references to the [Code Guide](http://codeguide.co/)'s [attribute order](http://codeguide.co/#html-attribute-order).

For example:
```html
<!-- Source -->
<input value="example@mail.com" required class="input-email" type="email" id="inputEmail" name="email">

<!-- Result -->
<input class="input-email" id="inputEmail" name="email" type="email" value="example@mail.com" required>
```


## Methods

#### setup(options)

- Param: object

Change the default options.


#### format(source[, options[, callback]])

- Alias: comb
- Usage: `format(source)` or `format(source, options)` or `format(source, callback)` or `format(source, options, callback)`

Format source HTML attributes.


## [License](https://github.com/fengyuanchen/htmlcomb/blob/master/LICENSE.md)

Released under the [MIT](http://opensource.org/licenses/mit-license.html) license.
