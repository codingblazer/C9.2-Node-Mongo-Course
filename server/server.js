var express = require('express');
var bodyParser = require('body-parser');

var {mongoose} = require('./db/mongoose.js');
var {Todo} = require('./models/todo.js');
var {User} = require('./models/user');

var app = express();



app.listen(3000, ()=>{
  console.log('started on port 3000');
});
