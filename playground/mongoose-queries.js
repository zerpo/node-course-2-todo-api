const {ObjectID} = require('mongodb');

const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');

var id = '594651eeb8640c131c40e8a111';

if (!ObjectID.isValid(id)) {
  console.log('ID not valid');

}
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

Todo.findById(id).then((todo)=>{
  console.log('Todo by Id', todo);
}).catch((e)=>{
  console.log(e);
})
