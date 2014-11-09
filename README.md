# HTMLComb

HTML attributes formatter.


# Main

```
dist/
├── dist/htmlcomb.js      (6 KB)
└── dist/htmlcomb.min.js  (2 KB)
```


# Getting started

## Quick start

Four quick start options are available:

- [Download the latest release](https://github.com/fengyuanchen/htmlcomb/archive/master.zip).
- Clone the repository: `git clone https://github.com/fengyuanchen/htmlcomb.git`.
- Install with [NPM](http://npmjs.org): `npm install htmlcomb`.
- Install with [Bower](http://bower.io): `bower install htmlcomb`.


## Usage

```javascript
var fs = require("fs"),
    HTMLComb = require("htmlcomb"),
    htmlcomb = new HTMLComb();

fs.readFile("/path/to/source.html", function(err, data) {
  if (err) {
    throw err;
  }

  fs.writeFile("/path/to/result.html", htmlcomb.format(data.toString(), function () {
    console.log("Done, without errors.");
  }), function (err) {
    if (err) {
      throw err;
    }
  });
});
```


## Options

#### requireDoubleQuotationMarks

- type: boolean
- default: `true`

For example:
```html
<!-- Source -->
<div id=main></div>

<!-- Result -->
<div id="main"></div>
```


#### replaceSingleQuotationMarks

- type: boolean
- default: `true`

For example:
```html
<!-- Source -->
<div id='main'></div>

<!-- Result -->
<div id="main"></div>
```


#### removeEmptyValue

- type: boolean
- default: `true`

For example:
```html
<!-- Source -->
<div id=""></div>

<!-- Result -->
<div id></div>
```


#### order

- type: array
- default:
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
<input value="example@mail.com" required class="input-email" type="email" id="inputEmail" data-remote="validate.php" name="email">

<!-- Result -->
<input class="input-email" id="inputEmail" name="email" data-remote="validate.php" type="email" value="example@mail.com" required>
```


## Methods

#### .format(html[, options[, callback]])

Format html source.


## [License](https://github.com/fengyuanchen/htmlcomb/blob/master/LICENSE.md)

Released under the [MIT](http://opensource.org/licenses/mit-license.html) license.
