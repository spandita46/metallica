const { Commodity } = require("../models/commodity");
const { Location } = require("../models/location");
const { CounterParty } = require("../models/counterParty");
const cote = require("cote");

var refDataResponder = new cote.Responder({
  name: "ReferenceDataResponder",
  namespace: "refData",
  key: "MetallicaRefData_V1",
  respondsTo: ["fetchCommodities", "fetchLocation", "fetchCounterParties"]
});

refDataResponder.on("fetchCommodities", function(req) {
  return Commodity.find();
});

refDataResponder.on("fetchLocation", function(req) {
  return Location.find();
});

refDataResponder.on("fetchCounterParties", function(req) {
  return CounterParty.find();
});

module.exports = refDataResponder;
