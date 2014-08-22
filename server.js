var express = require('express');
var app     = express();

var imgipsum = require('./index.js');

app.use(imgipsum());

app.listen(8080);
console.log('Listening on ' + 8080);
