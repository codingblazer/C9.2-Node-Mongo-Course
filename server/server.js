var mongoose = require('mongoose');
mongoose.Promise = global.Promise;

mongoose.connect('mongodb://localhost:27017/TodoApp');

var Todo = mongoose.model('Todo',{
  text : {
    type: String,
    required : true,
    minlength : 1,
    trim : true
  },
  completed: {
    type : Boolean,
    default : false
  },
  completedAt: {
    type: Number,
    default : null
  }
});

var newTodo = new Todo({
  text : '  sachin  '
});

newTodo.save().then((savedDoc)=>{
  console.log(savedDoc);
}, (e)=>{
console.log(e);
});
