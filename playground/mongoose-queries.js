const {ObjectID} = require('mongodb');

const {mongoose} = require('./../server/db/mongoose');  
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');

// let id = '5aeda0e3400a100d8f75baae';

// if(!ObjectID.isValid(id)) {
//   console.log('ID not valid');
// }

// Todo.find({
//   _id: id
// }).then((todos) => {
//   if (!todos) {
//     return console.log('Id not found.');
//   } else {
//     console.log('Todos', todos);
//   }
// });

// Todo.findOne({
//   _id: id
// }).then((todo) => {
//   if (!todo) {
//     console.log('Id not found.');
//   } else {
//     console.log('Todo', todo);
//   }
// });

// Todo.findById(id)
//   .then((todo) => {
//     if (!todo) {
//       return console.log('Id not found.');
//     } else {
//       console.log('Todo', todo);
//     }
//   });
const id = '5ae9c1b819941e065a079792';

if (ObjectID.isValid(id)) {
  User.findById(id).then((user) => {
    console.log(JSON.stringify(user, undefined, 2));
  });
} else {
  console.log('ID is not valid!');
};
