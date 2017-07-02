var express = require('express');
var bodyParser = require('body-parser');
const {ObjectID} = require('mongodb');

var {mongoose} = require('./db/mongoose');
var {Todo} = require('./models/todo');
var {User} = require('./models/user');

var app = express();
const port = process.env.PORT ||3000;


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
      res.status(404).send(e)
    })
  }
})

app.delete('/todos/:id', (req, res) =>{
  //get the id
  var id = req.params.id;

  //validate id -> return 404
  if (!ObjectID.isValid(id)){
    return res.sendStatus(404).send()
  } else {
    Todo.findByIdAndRemove(id)
    .then((todo) => {
      if(todo){
        res.send({todo})
        res.sendStatus(200)
      } else {
        res.sendStatus(404)
        res.send()
      }
    }).catch((e) => {return res.status(404).send()})
  }
});


app.listen(port, () =>{
  console.log(`Server up on port ${port}`);
});

module.exports={app};