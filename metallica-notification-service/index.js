// Calls & Initiate Trade Subscriber
const tradeSubscriber = require("./subscribers/tradeSubscriber");
const marketDataSubscriber = require("./subscribers/marketDataSubscriber");

const _configs = require("./configs");

const io = require("socket.io")();

io.on("connection", client => {
  tradeSubscriber.on("tradeUpdated", req => {
    console.log("Emitting tradeUpdated - ", req);
    client.emit("tradeUpdated", req);
  });

  tradeSubscriber.on("tradeCreated", req => {
    console.log("Emitting tradeCreated - ", req);
    client.emit("tradeCreated", req);
  });

  tradeSubscriber.on("tradeDeleted", req => {
    console.log("Emitting tradeDeleted - ", req);
    client.emit("tradeDeleted", req);
  });

  marketDataSubscriber.on("priceUpdated", req => {
    console.log("Emitting priceUpdated - ", req);
    client.emit("priceUpdated", req);
  });
});

io.listen(_configs.PORT);
console.log("Socket IO Channel Listening At Port ", _configs.PORT);


