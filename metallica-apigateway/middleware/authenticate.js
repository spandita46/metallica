const cote = require("cote");

const userRequester = new cote.Requester({
  name: "AuthenticationResponder",
  namespace: "authz",
  key: "MetallicaAuth_V1",
  requests: ["profile"]
});

const makeRequest = req => userRequester.send(req);

var authenticate = (req, res, next) => {
  var token = req.header("Authorization");
  if (!token) {
    res.status(401).send("Unauthorised");
  }
  var tokenParts = token.split("Bearer");
  if (tokenParts.length > 1) {
    token = tokenParts[1];
  } else {
    token = tokenParts[0];
  }
  token = token && token.trim();

  makeRequest({
    type: "profile",
    token: token
  })
    .then(user => {
      if (!user) {
        throw new Error("Unauthorised");
      }
      req.user = user;
      req.token = token;
      next();
    })
    .catch(e => {
      res.status(401).send(e.message || "Unauthorised");
    });
};

module.exports = { authenticate };
