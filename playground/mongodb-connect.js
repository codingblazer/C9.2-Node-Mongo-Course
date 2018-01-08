const MongoClient = require('mongodb').MongoClient;

var user = {name: 'andrew', age:25};
var {name} = user; //this line has done object destructuring
//what this has done is : taken out name property from user object as a variable named 'name'
console.log(name);
name = 'sachin';
console.log(user); // this tells that user is not changed => destructuring is just pulling property out and storing in some var...nothing different




MongoClient.connect('mongodb://localhost:27017/TodoApp',(err,database)=>{
  const db = database.db('TodoApp');
  if(err)
  return console.log('unable to connect');
  console.log('Connected to Mongodb server');

  // db.collection('Todos').insertOne({
  //   text: 'Something to do',
  //   completed: false
  // },(err,result)=>{
  //   if(err)
  //   return console.log('Unable to insert',err);
  //    console.log(JSON.stringify(result.ops,undefined,2));
  // });
  //
  // db.collection('User').insertOne({
  //   name: 'Andrew',
  //   age: 25,
  //   _id: 123,  //this is how we can give our own id
  //   location: 'Philadelphia'
  // },(err,result)=>{
  //   if(err){
  //     return console.log('Unable to insert user');
  //     console.log(result.ops);
  //   }
  // });

  database.close();
});
