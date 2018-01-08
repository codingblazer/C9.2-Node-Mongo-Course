//now lets use object destructuing in this project => here we will pull out a function named ObjectID from mongodb library to override it

// const MongoClient = require('mongodb').MongoClient;
// const {MongoClient} = require('mongodb'); //above statement and this are exactly statement
const {MongoClient,ObjectID} = require('mongodb');
var obj = new ObjectID(); //this will give random id that mongo was automatically adding everytime we created record => if you make call to this, it will give different id everytime => you can get this random id, append anything to it and then add it to record
console.log(obj);

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
