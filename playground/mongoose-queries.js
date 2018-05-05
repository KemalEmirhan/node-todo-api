const {mongoose} = require('./../server/db/mongoose');  
const {Todo} = require('./../server/models/todo');

let id = '5aeda0e3400a100d8f75baae';

Todo.find({
  _id: id
}).then((todos) => {
  if (!todos) {
    return console.log('Id not found.');
  } else {
    console.log('Todos', todos);
  }
});

Todo.findOne({
  _id: id
}).then((todo) => {
  if (!todo) {
    console.log('Id not found.');
  } else {
    console.log('Todo', todo);
  }
});

Todo.findById(id)
  .then((todo) => {
    if (!todo) {
      return console.log('Id not found.');
    } else {
      console.log('Todo', todo);
    }
  });


