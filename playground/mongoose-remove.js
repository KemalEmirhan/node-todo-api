const {ObjectID} = require('mongodb');

const {mongoose} = require('./../server/db/mongoose');  
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');

// Todo.remove({}).then((result) => {
//   console.log(result);
// });

// Todo.findByIdAndRemove
// Todo.findOneAndRemove

Todo.findOneAndRemove({_id: '5aef5e30488c991462c6d5ff'}).then((todo) => {

});

Todo.findByIdAndRemove('5aef5e30488c991462c6d5ff').then((todo) => {
  console.log(todo);
});

