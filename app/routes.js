var Todo = require('./models/todo');


/*we need this to be strictly defined within 
sendJSONResponse and sendError functions
So we won't be using ES6 arrow operators */

function sendJSONResponse(response){
  this.json(response);
}

function sendError(error){
  this.error(error);
}


const getTodos = () => {
  return new Promise((resolve, reject)=>{
    Todo.find({},(err, todos) => {
      return err ? reject(err) : resolve(todos);
    });
  });
}

const createTodo = (data) => {
  return new Promise((resolve, reject) => {
    Todo.create({ text: data.text,done: false}, (err, todo) => {
      return err ? reject(err) : resolve(todo);
    });
  });
}

const deleteTodo = (data) => {
  return new Promise((resolve, reject) => {
    Todo.remove({_id: data.todo_id}, (err, todo) => {
      return err ? reject(err) : resolve(todo);
    });
  });
}

module.exports = function(app) {

  app.get('/api/todos', function(req, res) {
    getTodos()
    .then(sendJSONResponse.bind(res))
    .catch(sendError.bind(res));
  });

  app.post('/api/todos', function(req, res) {
    createTodo(req.body)
    .then(getTodos)
    .catch(sendError.bind());
  });

  app.delete('/api/todos/:todo_id', function(req, res) {
    deleteTodo(req.params)
    .then(getTodos)
    .catch(sendError.bind(res));
  });

  app.get('/', function(req, res) {
    res.sendfile('./public/index.html');
  });
};
