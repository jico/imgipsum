# imgipsum

Dynamic placeholder images in Node. Inspired by [Dummy
Image](http://dummyimage.com/), [Placehold.it](http://placehold.it/), and the
like.


## Requirements

* Node.js >= 0.10.0
* [Express](http://expressjs.com/) >= 4.0
* [Cairo](http://cairographics.org/) (required by [node-canvas](https://github.com/Automattic/node-canvas))

## Installation

Download `imgipsum` and save it as a dependency.

```bash
$ npm install imgipsum --save
```

Use it as middleware in your Express app.

```javascript
var express = require('express');
var app     = express();

var imgipsum = require('imgipsum');

app.use(imgipsum());

app.listen(8080);
console.log('Listening on ' + 8080);
```

### Settings

You can enable the middleware passing in optional parameters. The defaults are
listed below.

```javascript
app.use(imgipsum({
  colorBg:     '999',      // Default image background color
  colorFg:     'fff',      // Default image text color
  maxFontSize: 120,        // Max font size
  maxHeight:   1600,       // Max image height
  maxWidth:    1600,       // Max image width
  route:       'imgipsum', // Route endpoint to  respond to
  textPadding: 0.1         // Text padding (left/right) in percentage
}));
```

## Usage

The imgipsum middleware responds to requests at the route `/imgipsum`. The route
parameters, detailed through examples below, are similar to the [Dummy
Image](http://dummyimage.com/) and [Placehold.it](http://placehold.it/)
services.

The only required parameter is the image dimensions. All parameters following that are optional.

### Examples

`http://localhost:8080/imgipsum/300`

Generates a 300px wide by 300px wide square image with the default gray background and text of "300x200".

`http://localhost:8080/imgipsum/300x200`

Generates a 300px wide by 200px wide image with the default gray background and text of "300x200".

`http://localhost:8080/imgipsum/300x200/225378`

Generates a 300x200 image with a background color of `#225378` and text of "300x200".

`http://localhost:8080/imgipsum/300x200/225378/EB7F00`

Generates a 300x200 image with a background color of `#225378`, foreground (text) color of `#EB7F00`, and text of "300x200".

`http://localhost:8080/imgipsum/300x200?text=hello+world`

Generates a 300x200 image with the text "hello world", in default background and foreground colors.

### License

The MIT License (MIT)

Copyright (c) 2014 Jico Baligod.

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
