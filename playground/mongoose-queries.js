const {ObjectID} = require('mongodb');

const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');


//  var id = '5947dabe54394e489ccdfce3';

var id = '59462d832fd2413048523c88';

// if (!ObjectID.isValid(id)) {
//   console.log('ID not valid');

// }
// Todo.find({
//   _id: id
// }).then((todos)=>{
//   console.log('todos', todos);
// })
//
// Todo.findOne({
//   _id: id
// }).then((todo)=>{
//   console.log('Todo:', todo);
// })

// Todo.findById(id).then((todo)=>{
//   console.log('Todo by Id', todo);
// }).catch((e)=>{
//   console.log(e);
// })


User.findById(id)
.then((user) => {
  if (user){
    console.log(JSON.stringify(user, undefined, 2))
  } else {
    return console.log('User not found')
  }
}).catch((e)=> {
  console.log(e)
})
//User find by ID
// user not found
// print user
// print error message