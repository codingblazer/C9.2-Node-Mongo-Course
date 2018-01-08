const MongoClient = require('mongodb').MongoClient;

MongoClient.connect('mongodb://localhost:27017/TodoApp',(err,database)=>{
  const db = database.db('TodoApp');
  if(err)
  return console.log('unable to connect');
  console.log('Connected to Mongodb server');

  db.collection('Todos').insertOne({
    text: 'Something to do',
    completed: false
  },(err,result)=>{
    if(err)
    return console.log('Unable to insert',err);
     console.log(JSON.stringify(result.ops,undefined,2));
  });

  db.collection('User').insertOne({
    name: 'Andrew',
    age: 25,
    location: 'Philadelphia'
  },(err,result)=>{
    if(err){
      return console.log('Unable to insert user');
      console.log(result.ops);
    }
  });

  database.close();
});
