require('./config/config');

// Importing Libraries
const _ = require('lodash');
const express = require('express');
const bodyParser = require('body-parser');
const {ObjectID} = require('mongodb');

// Importing Local Files
const {mongoose} = require('./db/mongoose');
const {Todo} = require('./models/todo');
const {User} = require('./models/user');
const {authenticate} = require('./middleware/authenticate');

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

// POST /users
app.post('/users', (request, response) => {
  let body = _.pick(request.body, ['email', 'password']);
  let user = new User(body);
  
  user.save().then(() => {
    return user.generateAuthToken();
  }).then((token) => {
    response.header('x-auth', token).send(user);
  }).catch((error) => {
    response.status(400).send(error);
  });
});

app.get('/users/me', authenticate, (request, response) => {
  response.send(request.user);
});

app.post('/users/login', (request, response) => {
  var body = _.pick(request.body, ['email', 'password']);

  User.findByCredentials(body.email, body.password).then((user) => {
    return user.generateAuthToken().then((token) => {
      response.header('x-auth', token).send(user);
    });
  }).catch((e) => {
    response.status(400).send();
  });
});

app.delete('/users/me/token', authenticate, (request, response) => {
  request.user.removeToken(request.token).then(() => {
    response.status(200).send();
  }, () => {
    response.status(400).send();
  })
});


app.listen(port, () => {
  console.log(`Started on port ${port}`);
});

module.exports = {app};