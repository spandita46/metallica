const { User } = require("../models/user");
const cote = require("cote");

var authResponder = new cote.Responder({
  name: "AuthenticationResponder",
  namespace: "authz",
  key: "MetallicaAuth_V1",
  respondsTo: ["register", "profile", "login", "logout"]
});

var authenticate = token => {
  return User.findByToken(token).then(user => {
    if (!user) {
      Promise.reject(new Error("Unauthenticated"));
    }
    return Promise.resolve(user);
  });
};

authResponder.on("register", function(req) {
  var user = new User(req.body);
  return user
    .save()
    .then(() => {
      return user.generateAuthToken();
    })
    .then(token => {
      return Promise.resolve({
        token,
        user
      });
    });
});

authResponder.on("profile", function(req) {
  return authenticate(req.token).then(user => {
    if (!user) {
      Promise.reject(new Error("Unauthenticated"));
    }
    return Promise.resolve({
      token: req.token,
      user
    });
  });
});

authResponder.on("login", function(req) {
  var body = req.body;
  return User.findByCredentials(body.email, body.password).then(user => {
    if (!user) {
      return Promise.reject(new Error("Unknown Credentials"));
    }
    return user
      .generateAuthToken()
      .then(token => {
        return Promise.resolve({
          token,
          user
        });
      })
      .catch(e => {
        Promise.reject(e);
      });
  });
});

authResponder.on("logout", function(req) {
  var user = new User(req.user);
  return user
    .removeToken(req.token)
    .then(data => {
      return Promise.resolve(data);
    })
    .catch(e => {
      Promise.reject(e);
    });
});

module.exports = authResponder;
