const {MongoClient,ObjectID} = require('mongodb');


MongoClient.connect('mongodb://localhost:27017/TodoApp',(err,database)=>{
  const db = database.db('TodoApp');
  if(err)
  return console.log('unable to connect');
  console.log('Connected to Mongodb server');

  db.collection('Todos').find().toArray().then((docs)=>{
    console.log('Todos');
    console.log(JSON.stringify(docs,undefined,2));
  },(err)=>{
    console.log(err);
  });
  database.close();
});
