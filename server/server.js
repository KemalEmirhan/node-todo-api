// Importing Libraries
const _ = require('lodash');
const express = require('express');
const bodyParser = require('body-parser');
const {ObjectID} = require('mongodb');

// Importing Local Files
const {mongoose} = require('./db/mongoose');
const {Todo} = require('./models/todo');
const {User} = require('./models/user');

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

app.post('/todos', (request, response) => {
  let todo = new Todo({
    text: request.body.text
  });

  todo.save().then((doc) => {
    response.send(doc);
  }, (error) => {
    response.status(400).send(error);
  });
});
  

app.get('/todos', (request, response) => {
  Todo.find().then((todos) => {
    response.send({todos});
  }, (error) => {
    response.status(400).send(error);
  });
});

// GET /todos/:id
app.get('/todos/:id', (request, response) => {
  let id = request.params.id;

  if (!ObjectID.isValid(id)) {
    return response.status(404).send();
  } else {
    Todo.findById(id).then((todo) => {
      if(!todo) {
        response.status(404).send();
      } 
      response.send({todo});
      
    }).catch((error) => {
      console.log(error);
      response.status(400).send();
    });
  }

});

app.delete('/todos/:id', (request, response) => {
  let id = request.params.id;

  if(!ObjectID.isValid(id)) {
    return response.status(404).send();
  }

  Todo.findByIdAndRemove(id).then((todo) => {
    if (!todo) {
      return response.status(404).send();
    }

    response.send({todo});
  }).catch((error) => {
    response.status(400).send();
  }); 
});

app.patch('/todos/:id', (request, response) => {
  let id = request.params.id;
  let body = _.pick(request.body, ['text', 'completed']);

  if(!ObjectID.isValid(id)) {
    return response.status(404).send();
  }

  if (_.isBoolean(body.completed) && body.completed) {
    body.completedAt = new Date().getTime();
  } else {
    body.completed = false;
    body.completedAt = null;
  }

  Todo.findByIdAndUpdate(id, {$set: body}, {new: true}).then((todo) => {
    if (!todo) {
      return response.status(404).send();
    }
    response.send({todo});
  }).catch((error) => {
    response.status(400).send();
  })

});

app.listen(port, () => {
  console.log(`Started on port ${port}`);
});

module.exports = {app};