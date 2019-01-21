const { Trade } = require("../models/trade");
const cote = require("cote");

let tradeResponder = new cote.Responder({
  name: "TradesResponder",
  namespace: "trades",
  key: "MetallicaTrade_V1",
  respondsTo: ["create", "list", "fetchByTradeId", "update", "delete", "search"]
});

// tradeDate, side, quantity, price, counterParty, commodity, location, status, currency

tradeResponder.on("search", function(req) {
  console.log(req);
  var { searchCriteria } = req;
  var query = Trade.find();
  if (searchCriteria) {
    if (searchCriteria.tradeFromDate) {
      query.where("tradeDate").gt(searchCriteria.tradeFromDate);
    }
    if (searchCriteria.tradeToDate) {
      query.where("tradeDate").lt(searchCriteria.tradeToDate);
    }
    if (searchCriteria.price) {
      query.where("price").equals(searchCriteria.price);
    }
    if (searchCriteria.quantity) {
      query.where("quantity").equals(searchCriteria.quantity);
    }
    if (!(searchCriteria.buySide && searchCriteria.sellSide)) {
      if (searchCriteria.buySide) {
        query.where("side").equals("BUY");
      }
      if (searchCriteria.sellSide) {
        query.where("side").equals("SELL");
      }
    }
  }
  if (searchCriteria.commodity && searchCriteria.commodity !== "ALL") {
    query.where("commodity").equals(searchCriteria.commodity);
  }
  if (searchCriteria.location && searchCriteria.location !== "ALL") {
    query.where("location").equals(searchCriteria.location);
  }
  if (searchCriteria.counterParty && searchCriteria.counterParty !== "ALL") {
    query.where("counterParty").equals(searchCriteria.counterParty);
  }
  return query.exec();
});

tradeResponder.on("create", function(req) {
  let trade = new Trade(req.trade);
  return trade.save();
});

tradeResponder.on("list", function(req) {
  return Trade.find();
});

tradeResponder.on("fetchByTradeId", function(req) {
  const { tradeId } = req;
  return Trade.findOne({
    tradeId: tradeId
  });
});

tradeResponder.on("update", function(req) {
  const { tradeId, trade } = req;
  return Trade.findOneAndUpdate(
    {
      tradeId
    },
    {
      $set: trade
    },
    {
      new: true
    }
  );
});

tradeResponder.on("delete", function(req) {
  const { tradeId } = req;
  return Trade.findOneAndRemove({
    tradeId: tradeId
  });
});

module.exports = tradeResponder;
