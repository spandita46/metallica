const cote = require("cote");
const _ = require("lodash");

var refDataRequester = new cote.Requester({
  name: "ReferenceDataResponder",
  namespace: "refData",
  key: "MetallicaRefData_V1",
  respondsTo: ["fetchCommodities", "fetchLocation", "fetchCounterParties"]
});

const makeRequest = req => refDataRequester.send(req);

const getCommodities = (req, res) => {
  makeRequest({
    type: "fetchCommodities"
  })
    .then(commodities => {
      res.send(commodities);
    })
    .catch(e => {
      console.log(e);
      res.status(500).send();
    });
};

const getLocations = (req, res) => {
  makeRequest({
    type: "fetchLocation"
  })
    .then(locations => {
      res.send(locations);
    })
    .catch(e => {
      console.log(e);
      res.status(500).send();
    });
};

const getCounterparties = (req, res) => {
  makeRequest({
    type: "fetchCounterParties"
  })
    .then(counterParties => {
      res.send(counterParties);
    })
    .catch(e => {
      console.log(e);
      res.status(500).send();
    });
};

module.exports = {
  getCommodities,
  getCounterparties,
  getLocations
};
