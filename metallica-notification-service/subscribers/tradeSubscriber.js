const cote = require("cote");
const tradeSubscriber = new cote.Subscriber({
  name: "TradeSubscriber",
  namespace: "trades",
  key: "MetallicaTrade_V1",
  subscribesTo: ["tradeCreated", "tradeUpdated", "tradeDeleted"]
});

module.exports = tradeSubscriber;
