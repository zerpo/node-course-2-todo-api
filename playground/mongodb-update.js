// const MongoClient = require ('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb')

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db)=>{
  if(err)  {
    return console.log('Unable to connect to database server');
  }
  console.log('Connected to MongoDB server');

// db.collection('Todos')
// .findOneAndUpdate({
//   _id: new ObjectID('5944e9ae6f9ee20c99622b69')
// },{
//   $set: {
//     completed: true
//   }
// },{
//   returnOriginal: false
// }).then((result) => {
//   console.log(result);
// })

  // db.close();

  //Change name to Sebastian, increment age

  db.collection('Users')
  .findOneAndUpdate({
    _id: new ObjectID('5944db3784f30a3480efeb99')
  },{
    $set: {
      name: 'Sebastian'
    },
    $inc: {
      age: 1
    }
  },{
    returnOriginal: false
  }).then((result)=>{
    console.log(result);
  })


});
