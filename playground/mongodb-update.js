const { MongoClient, ObjectID } = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (error, client) => {

if(error) {
  return console.log('Unable to connect MongoDB server.');
}

console.log('Connected to MongoDB server.');
const db = client.db('TodoApp');

// findOneAndUpdate 
// db.collection('Todos').findOneAndUpdate({
//   _id: new ObjectID('5ae877484c95e175bae65030')
// }, {
//   $set: {
//     completed: true
//   }
// }, {
//   returnOriginal: false
// }).then((result) => {
//   console.log(result);
// });

db.collection('Users').findOneAndUpdate({
  _id: new ObjectID('5adf4a3bca941f3d4fe60ffd')
}, {
  $set: {
    name: 'Emirhan'
  }, 
  $inc: {
      age: 1
  }
}, {
  returnOriginal: false
}).then((result) => {
  console.log(result);
})


// db.close();

});