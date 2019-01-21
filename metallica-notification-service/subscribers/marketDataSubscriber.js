const cote = require("cote");

const marketDataSubscriber = new cote.Subscriber({
  name: "MarketDataSubscriber",
  namespace: "marketData",
  key: "MetallicaMarketData_V1",
  broadcasts: ["priceUpdated"]
});

module.exports = marketDataSubscriber;


