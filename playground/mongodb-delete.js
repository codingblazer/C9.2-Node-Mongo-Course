const {MongoClient,ObjectID} = require('mongodb');


MongoClient.connect('mongodb://localhost:27017/TodoApp',(err,database)=>{
  const db = database.db('TodoApp');
  if(err)
  return console.log('unable to connect');
  console.log('Connected to Mongodb server');
  // db.collection('Todos').deleteMany({text:'Eat'}).then((result)=>{
  //   console.log(result);
  // });

  // db.collection('Todos').deleteOne({text:'Eat'}).then((result)=>{
  //   console.log(result);
  // });

  db.collection('Todos').findOneAndDelete({completed:false}).then((result)=>{
    console.log(result);
  });
  // database.close();
});
