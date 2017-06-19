const expect = require('expect');
const request = require('supertest');
const {ObjectID} = require('mongodb');

const {app} = require('./../server');
const {Todo} = require('./../models/todo');

const todos = [{
  _id: new ObjectID(),
  text: 'First test todo'
},{
  _id: new ObjectID(),
  text: 'Second test todo'
}];


beforeEach((done) => {
  Todo.remove({}).then(()=>{
    return Todo.insertMany(todos);
  }).then(() => done());
})

// Testcases for POST Routes
describe('POST Routes', ()=>{
  describe('POST /todos', () =>{
    it('should create a new todo', (done) => {
      var text = 'Testcase Sting';

      request(app)
      .post('/todos')
      .send({text})
      .expect(200)
      .expect((res) => {
        expect(res.body.text).toBe(text);
      })
      .end((err, res) => {
        if (err) {
          return done(err);
        }

        Todo.find({text}).then((todos)=>{
          expect(todos.length).toBe(1);
          expect(todos[0].text).toBe(text);
          done()
        }).catch((e) => done(e));
      })
    });

    it('should not create todo with invalid data', () =>{
      request(app)
      .post('/todos')
      .send({text: ''})
      .expect(400)
      .end((err,res) =>{
        if (err) {
          return done(err);
        }

        Todo.find().then((todos) => {
          expect(todos.length).toBe(2)
          done()
        }).catch((e) => done(e))
      })
    })
  });
})

// Testcastes for GET Routes
describe('GET Routes', ()=>{
  describe('GET /todos', () =>{
    it('should get all todos', (done) =>{
      request(app)
      .get('/todos')
      .expect(200)
      .expect((res)=>{
        expect(res.body.todos.length).toBe(2);
      }).end(done);
    })
  })
  describe('Get /todos/:id', ()=>{
    it('should return todo doc', (done) => {
      request(app)
        .get(`/todos/${todos[0]._id.toHexString()}`)
        .expect(200)
        .expect((res) => {
          expect(res.body.todo.text).toBe(todos[0].text)
        })
        .end(done)
    })
    it('should return 404 todo not found', (done) => {
      var unknownId = new ObjectID
      request(app)
        .get(`/todos/${unknownId.toHexString()}`)
        .expect(404)
        .end(done)
    })
    it('should return 404 for non object ids', (done) => {
      request(app)
        .get('/todos/123')
        .expect(404)
        .end(done)
    })
  })
})