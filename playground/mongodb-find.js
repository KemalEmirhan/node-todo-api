//const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (error, client) => {
  if(error) {
    return console.log('Unable to connect to MongoDB server');
  } 
  console.log('Connected to MongoDB server');
  const db = client.db('TodoApp');


  // ------------- Fetch Data --------------
  // if we want to fetch the data by id property, 
  // just we need to write "_id: new ObjectID('object_id_we_want_to_fetch')" in find() method
  // db.collection('Users').find({location: 'Ankara'}).toArray().then((docs) => {
  //   console.log('Users');
  //   console.log(JSON.stringify(docs, undefined, 2));

  // }, (error) => {
  //   console.log('Unable to fetch todos', error);
  // });

  // ------------- Fetch Count od Data -----
  // db.collection('Todos')
  //   .find()
  //   .count()
  //   .then((count) => {
  //     console.log(`Todos count: ${count}`);
  //   }, (err) => {
  //     console.log('Unable to fetch todos', err);
  // });


  db.collection('Users').find({ name: 'Emirhan'}).toArray().then((docs) => {
    console.log(JSON.stringify(docs, undefined, 2));
  }, (err) => {
    console.log('Unable to fetch data');
  });


  //client.close();
});