# HTMLComb

> A simple tool for combing HTML attributes.

- [Website](https://fengyuanchen.github.io/htmlcomb)



## Main

```
dist/
├── htmlcomb.js      (8 KB)
└── htmlcomb.min.js  (4 KB)
```



## Getting started

### Quick start

Three quick start options are available:

- [Download the latest release](https://github.com/fengyuanchen/htmlcomb/archive/master.zip).
- Clone the repository: `git clone https://github.com/fengyuanchen/htmlcomb.git`.
- Install with [NPM](http://npmjs.org): `npm install htmlcomb`.


### Usage

#### Browser

```html
<script src="/path/to/htmlcomb.js"></script>
```

```js
var htmlcomb = new HTMLComb(options);

htmlcomb.format(source, function (result) {
  console.log(result);
});
```


#### NodeJS

```js
var fs = require("fs");
var HTMLComb = require("htmlcomb");
var htmlcomb = new HTMLComb(options);

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
```js
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
  "role",
  "aria"
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

Parameters  | Type     | Description
----------- | -------- | --------------
options     | `Object` | Custom options

Change the default options.


#### format(source[, options[, callback]])

- Alias: comb

Parameters          | Type       | Description
------------------- | ---------- | --------------------------------------
source              | `String`   | The source text for combing
options (optional)  | `Object`   | Change the default options temporarily
callback (optional) | `Function` | e.g: `function (result) {}`

Format source HTML attributes.



## Browser support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Opera (latest)
- Edge (latest)
- Internet Explorer 8+



## Versioning

Maintained under the [Semantic Versioning guidelines](http://semver.org/).



## License

[MIT](http://opensource.org/licenses/MIT) © [Fengyuan Chen](http://chenfengyuan.com)
