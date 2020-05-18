var Todo = require('../models/todo');

module.exports = {
  index,
  show,
  new: newTodo,
  create,
  delete: deleteTodo,
  edit,
  update
};

function update(req, res) {
  // Need to handle the scenario where the checkbox is not checked.
  // checkbox inputs do not send anything in the form at all if they
  // are unchecked, so we need to set req.body.done accordingly.
  req.body.done = req.body.done === 'on';
  // The following will also do the job
  // req.body.done = !!req.body.done;
  Todo.update(req.params.id, req.body);
  res.redirect('/todos');
}

function edit(req, res) {
  res.render('todos/edit', {
    todo: Todo.getOne(req.params.id)
  });
}

function deleteTodo(req, res) {
  Todo.deleteOne(req.params.id);
  res.redirect('/todos');
}

function create(req, res) {
  console.log(req.body);
  req.body.done = false;
  Todo.create(req.body);
  res.redirect('/todos');
}

function newTodo(req, res) {
  res.render('todos/new');
}

function index(req, res) {
  res.render('todos/index', {
    todos: Todo.getAll(),
    time: req.time
  });
}

function show(req, res) {
  res.render('todos/show', {
    todo: Todo.getOne(req.params.id),
    // Would like to display the number of the todo within the list
    todoNum: Todo.getAll().findIndex(todo => todo.id === parseInt(req.params.id)) + 1
  });
}
