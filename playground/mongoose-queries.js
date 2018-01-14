const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todos');

var id = '5a5bb6f62b6c36072a1d5f9d';

//simple find command with query asking for specific id
Todo.find({
  _id: id
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
