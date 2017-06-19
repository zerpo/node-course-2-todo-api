var express = require('express');
var bodyParser = require('body-parser');
const {ObjectID} = require('mongodb');

var {mongoose} = require('./db/mongoose');
var {Todo} = require('./models/todo');
var {User} = require('./models/user');

var app = express();

app.use(bodyParser.json());

app.post('/todos', (req, res) => {
  var todo = new Todo({
    text: req.body.text
  });

  todo.save().then((doc) =>{
    res.send(doc)
    res.status(200)
  }, (e)=>{
    res.status(400);
    res.send(e);

  })
});

app.get('/todos', (req, res) => {
  Todo.find().then((todos)=> {
    res.send({todos});
  }, (e)=>{
    res.status(400).send(e);
  })
});

app.listen(3000, () =>{
  console.log('Server up on port 3000');
});

app.get('/', (req, res) => {
  res.sendStatus(401);
});



app.get('/todos/:id', (req, res) => {
  var id = req.params.id
  if (!ObjectID.isValid(id)){
    res.sendStatus(404)
    res.send()
    return
  } else {
    Todo.findById(id)
    .then((todo) => {
      if(todo){
        res.send({todo})
      } else {
        res.sendStatus(404)
        res.send()
      }
      
    }, (e)=> {
      res.status(500).send(e)
    })
  }


})
module.exports={app};