const {User} = require('./../models/user');


let authenticate = (request, response, next) => {
  let token = request.header('x-auth');
  
    User.findByToken(token).then((user) => {
      if (!user) {
        return Promise.reject();
      }

      request.user = user;
      request.token = token;
      next();
    }).catch((error) => {
      response.status(401).send(error);
    }); 
};

module.exports = {authenticate};
