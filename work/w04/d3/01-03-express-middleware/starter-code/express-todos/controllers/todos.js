var Todo = require('../models/todo');

module.exports = {
  index,
  show
};

function index(req, res) {
  res.render('todos/index', {
    todos: Todo.getAll()
  });
}

function show(req, res) {
  res.render('todos/show', {
    todo: Todo.getOne(req.params.id),
    // Would like to display the number of the todo within the list
    todoNum: Todo.getAll().findIndex(todo => todo.id === parseInt(req.params.id)) + 1
  });
}
