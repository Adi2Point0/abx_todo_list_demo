var Todo = require('./models/todo');

function getTodos() {
  return new Promise(function(resolve, reject){
    Todo.find(function(err, todos) {
      return err ? reject(err) : resolve(todos);
    });
  });
}

function createTodos(data){
  return new Promise(function(resolve, reject){
    Todo.create({text:data.text,done:false}, function(err, todos){
      return err ? reject(err) : resolve(todos);
    })
  });
}


module.exports = function(app) {

  app.get('/api/todos', function(req, res) {
    getTodos(res);
  });

  app.post('/api/todos', function(req, res){
    createTodos(req.body)
    .then(getTodos)
    .then(sendResponse.bind(res))
    .catch(sendError.bind(res));
  });

  function sendResponse(data){
    this.json(data);
  }

  function sendError(error){
    this.error(err);
  }

  app.delete('/api/todos/:todo_id', function(req, res) {
    Todo.remove({
      _id: req.params.todo_id
    }, function(err, todo) {
      if (err)
        res.send(err);

      getTodos(res);
    });
  });

  app.get('/', function(req, res) {
    res.sendfile('./public/index.html');
  });
};
