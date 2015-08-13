var express = require('express');
var compress = require('compression');
var app = express();

var oneDay = 86400000;

app.use(compress());

app.use(express.static(__dirname + '/dist', { maxAge: oneDay }));

app.listen(process.env.PORT || 3000);
