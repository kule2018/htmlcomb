# [HTMLComb](https://github.com/fengyuanchen/htmlcomb)

A simple tool for combing HTML attributes.

- [Demo](http://fengyuanchen.github.io/htmlcomb)


# Getting started

## Quick start

Three quick start options are available:

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


#### removeEmptyValues

- Type: `Boolean`
- Default: `true`

For example:
```html
<!-- Source -->
<div class="     " id=""></div>

<!-- Result -->
<div class id></div>
```


#### removeNewlines

- Type: `Boolean`
- Default: `true`

Also removes the indentation after the newline.

For example:
```html
<!-- Source -->
<div data-search="{
  'url': 'https://github.com/search',
  'q': 'htmlcomb'
}"></div>

<!-- Result -->
<div data-search="{ 'url': 'https://github.com/search', 'q': 'htmlcomb'}"></div>
```


#### removeMultipleSpaces

- Type: `Boolean`
- Default: `true`

For example:
```html
<!-- Source -->
<div class="foo   bar     baz"></div>

<!-- Result -->
<div class="foo bar baz"></div>
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
<input required class="input-email" type="email" id="inputEmail" name="email">

<!-- Result -->
<input class="input-email" id="inputEmail" name="email" type="email" required>
```


## Methods

#### setup(options)

Params | Type | Description
------ | ---- | -----------
options | `Object` | Custom options

Change the default options.


#### format(source[, callback]])

- Alias: comb

Params | Type | Description
------ | ---- | -----------
source | `String` | The source text for combing,
callback | `Function` | For example: `function (result) {}`

Format source HTML attributes.


## Browser Support

- Chrome 36+
- Firefox 31+
- Internet Explorer 8+
- Opera 21+
- Safari 5.1+


## [License](https://github.com/fengyuanchen/htmlcomb/blob/master/LICENSE.md)

Released under the [MIT](http://opensource.org/licenses/mit-license.html) license.
