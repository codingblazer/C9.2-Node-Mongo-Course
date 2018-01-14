const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todos');
const {ObjectID} = require('mongodb');

var id = '5a5bb6f62b6c36072a1d5f9d';

if(!ObjectID.isValid(id))
console.log('id is not valid');


//simple find command with query asking for specific id
Todo.find({
  _id: id //mongoose doesn't need us to create new ID()
}).then((todos)=>{
  console.log('Todos',todos);
})

Todo.findOne({
  _id: id
}).then((todo)=>{
  console.log(todo);
});

Todo.findById(id).then((todo)=>{
  if(!todo)
  return console.log('ID not found');

  console.log(todo);
}).catch((e)=>console.log(e));
