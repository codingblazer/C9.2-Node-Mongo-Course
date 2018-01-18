const _ = require('lodash');
var express = require('express');
var bodyParser = require('body-parser');
var {ObjectID} = require('mongodb');

var {mongoose} = require('./db/mongoose.js');
var {Todo} = require('./models/todos.js');
var {User} = require('./models/users');

var app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

app.post('/todos',(req,res)=>{
var todo = new Todo({
  text : req.body.text
});

todo.save().then((doc)=>{
  res.send(doc);
},(e)=>{
  res.status(400).send(e);
});
});

app.get('/todos',(req,res)=>{
Todo.find().then(
  (todos)=>{
  res.send({todos})},
  (e)=>{
  res.status(400).send(e);
})
});

app.post('/users',(req,res)=>{
  var body = _.pick(req.body,['email','password']);
  var user = new User(body);

  user.save().then((user)=>{
    res.send(user);
  }).catch((e)=>{
    console.log('sachin this is error :'+e);
    res.status(400).send(e);
  })
});

app.get('/todos/:id',(req,res)=>{
  var id = req.params.id;
  if(!ObjectID.isValid(id)){
    return res.status(404).send("Object id");
  }

  Todo.findById(id).then((todo)=>{
    if(!todo)
    return res.status(404).send("not present");
    else
    res.send({todo});
  }).catch((e)=>{
    res.status(400).send(e);
  });
}
);

app.delete('/todos/:id',(req,res)=>{
  var id = req.params.id;

  if(!ObjectID.isValid(id))
  return res.status(404).send();

  Todo.findByIdAndRemove(id).then((todo)=>{
  if(!todo)
  return res.status(404).send();
  res.send(todo);
}).catch((e)=>{
  res.status(400).send();
});
});

app.patch('/todos/:id',(req,res)=>{
  var id = req.params.id;

  if(!ObjectID.isValid(id))
  return res.status(404).send();

  var body = _.pick(req.body,['text','completed']);

  Todo.findByIdAndUpdate(id,{$set: body},{new:true}).then((todo)=>{
    if(!todo)
    return res.status(404).send();
    else
    res.send({todo});
  }).catch((e)=>{
    res.status(400).send();
  });
});

app.listen(port, ()=>{
  console.log('started on port port');
});


module.exports = {app};
