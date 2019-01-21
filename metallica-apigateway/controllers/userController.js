const cote = require("cote");
const _ = require("lodash");

const userRequester = new cote.Requester({
  name: "AuthenticationResponder",
  namespace: "authz",
  key: "MetallicaAuth_V1",
  requests: ["register", "login", "logout"]
});

const makeRequest = req => userRequester.send(req);

const registerUser = (req, res) => {
  makeRequest({
    type: "register",
    body: _.pick(req.body, ["email", "password", "name"])
  })
    .then(userDetails => {
      if (!userDetails || !userDetails.user) {
        throw new Error("Can not Register User");
      }

      res.send(userDetails.user);
    })
    .catch(e => {
      console.log(e);
      res.status(400).send(e.message || "Bad Request : Failed To Register User");
    });
};

const profile = (req, res) => {
  res.send(req.user);
};

const login = (req, res) => {
  makeRequest({
    type: "login",
    body: _.pick(req.body, ["email", "password"])
  })
    .then(userDetails => {
      if (!userDetails || !userDetails.user || !userDetails.token) {
        throw new Error("Bad Credentials");
      }

      res.send(userDetails);
    })
    .catch(e => {
      console.log(e);
      res.status(400).send(e.message || "Bad Credentials : Failed To Login User");
    });
};

const logout = (req, res) => {
  makeRequest({
    type: "logout",
    user: req.user,
    token: req.token
  })
    .then((data) => {
      res.status(200).send(data);
    })
    .catch(e => {
      console.log(e);
      res.status(400).send(e);
    });
};

module.exports = {
  registerUser,
  profile,
  login,
  logout
};
