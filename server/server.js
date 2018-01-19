const _ = require('lodash');
var express = require('express');
var bodyParser = require('body-parser');
var {ObjectID} = require('mongodb');

var {mongoose} = require('./db/mongoose.js');
var {Todo} = require('./models/todos.js');
var {User} = require('./models/users');
var {authenticate} = require('./middlewares/authenticate');
const bcrypt = require('bcryptjs');

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

  user.save().then(()=>{
    return user.generateAuthToken();
  }).then((token)=>{
    res.header('x-auth',token).send(user)
  }).catch((e)=>{
    console.log(e);
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

app.post('/users/login',(req,res)=>{
  var body = _.pick(req.body,['email','password']);
  User.findByCredentials(body.email,body.password).then((user)=>{
    return user.generateAuthToken().then((token)=>{
      res.header('x-auth',token).send(user);
    });
  }).catch((e)=>{
    res.status(400).send();
  });
});

app.get('/users/me',authenticate,(req,res)=>{
  res.send(req.user);
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
