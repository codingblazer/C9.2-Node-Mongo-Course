const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todos');
const {ObjectID} = require('mongodb');


Todo.remove({}).then((result)=>{
  console.log(result);
});

Todo.findOneAndRemove({_id:'5a5cf534e7c92ea5bc7be19c'}).then((todo)=>{

});

Todo.findByIdAndRemove('5a5cf540e7c92ea5bc7be1ad').then((todo)=>{
  console.log(todo);
});
