const cote = require("cote");
const commodities = [
  {
    code: "AL",
    description: "Aluminum"
  },
  {
    code: "ZN",
    description: "Zinc"
  },
  {
    code: "CU",
    description: "Copper"
  },
  {
    code: "AU",
    description: "Gold"
  },
  {
    code: "AG",
    description: "Silver"
  }
];

const marketDataPublisher = new cote.Publisher({
  name: "MarketDataPublisher",
  namespace: "marketData",
  key: "MetallicaMarketData_V1",
  broadcasts: ["priceUpdated"]
});

const randomIndex = () => {
  return Math.floor(Math.random() * (commodities.length - 1 + 1)) + 1;
};

setInterval(() => {
  const commodity = commodities[randomIndex()];
  if (commodity) {
    marketDataPublisher.publish("priceUpdated", {
      commodity,
      price: Math.floor(Math.random() * Math.random() * 1000),
      updatedAt: new Date(),
    });
  }
}, 3000);

module.exports = marketDataPublisher;
