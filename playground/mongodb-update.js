const {MongoClient,ObjectID} = require('mongodb');


MongoClient.connect('mongodb://localhost:27017/TodoApp',(err,database)=>{
  const db = database.db('TodoApp');
  if(err)
  return console.log('unable to connect');
  console.log('Connected to Mongodb server');

db.collection('Todos').findOneAndUpdate({
  _id: new ObjectID('5a53cb022ad7731f83916faf')
},{
  $set:{
    completed: true
  }
},{
  returnOriginal: false //tells not to return the original object back
}).then((result)=>{
  console.log(result);
});
  // database.close();
});
