/* This is the server code */

var http = require('http');
var fs = require('fs');
var express = require('express');

var app = express();
var router = express.Router();

const PORT = process.env.PORT || 80; 

/* Load the homepage */
app.use(express.static('public'));


app.listen(PORT, function() {
    console.log('Example app listening on port 3000!');
  });
  