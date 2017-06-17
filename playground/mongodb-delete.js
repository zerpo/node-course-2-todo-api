// const MongoClient = require ('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb')

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db)=>{
  if(err)  {
    return console.log('Unable to connect to database server');
  }
  console.log('Connected to MongoDB server');

  //delteMany
  db.collection('Users')
  .deleteMany({name: 'Sebastian'})
  .then((result) =>{
    console.log(result);
  })

  // delteOne
  // db.collection('Todos')
  // .deleteOne({text: 'Eat lunch'})
  // .then((result) => {
  //   console.log(result);
  // })

  // findOndAndDelete
  // db.collection('Users')
  // .findOneAndDelete({_id: new ObjectID("5944d94a4dfc742930eab627")})
  // .then((result)=>{
  //   console.log(result);
  // })

  // db.close();
});
