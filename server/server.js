var express = require('express');
var bodyParser = require('body-parser');

var {mongoose} = require('./db/mongoose.js');
var {Todo} = require('./models/todos.js');
var {User} = require('./models/users');

var app = express();

app.use(bodyParser.json());

app.post('/todos',(req,res)=>{
console.log(req.body);
});

app.listen(3000, ()=>{
  console.log('started on port 3000');
});
