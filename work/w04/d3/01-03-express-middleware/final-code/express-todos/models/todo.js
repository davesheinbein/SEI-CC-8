// The ids can be generated using:
// Date.now() % 1000000
const todos = [
  {id: 125223, todo: 'Feed Dogs', done: true},
  {id: 127904, todo: 'Learn Express', done: false},
  {id: 139608, todo: 'Buy Milk', done: false}
];

module.exports = {
  getAll,
  getOne,
  create,
  deleteOne,
  update
};

function update(id, todo) {
  // Find the index based on the id of the todo object
  const idx = todos.findIndex(todo => todo.id === parseInt(id));
  // Ensure the id is copied over
  todo.id = parseInt(id);
  todos.splice(idx, 1, todo);
}

function deleteOne(id) {
  // Find the index based on the id of the todo object
  const idx = todos.findIndex(todo => todo.id === parseInt(id));
  todos.splice(idx, 1);
}

function create(todo) {
  // Add the id
  todo.id = Date.now() % 1000000;
  // New todos wouldn't be done :)
  todo.done = false;
  todos.push(todo);
}

function getOne(id) {
  // Use the Array.prototype.find iterator method
  return todos.find(todo => todo.id === parseInt(id));
}

function getAll() {
  return todos;
}