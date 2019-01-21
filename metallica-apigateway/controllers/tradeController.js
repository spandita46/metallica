const cote = require("cote");
const _ = require("lodash");

var tradeRequester = new cote.Requester({
  name: "TradesResponder",
  namespace: "trades",
  key: "MetallicaTrade_V1",
  respondsTo: ["create", "list", "fetchByTradeId", "update", "delete", "search"]
});

const tradePublisher = new cote.Publisher({
  name: "TradePublisher",
  namespace: "trades",
  key: "MetallicaTrade_V1",
  broadcasts: ["tradeCreated", "tradeUpdated", "tradeDeleted"]
});

const makeRequest = req => tradeRequester.send(req);

const createTrade = (req, res) => {
  makeRequest({
    type: "create",
    trade: req.body.trade
  })
    .then(trade => {
      if (!trade) {
        throw new Error("Can not create trade");
      }

      tradePublisher.publish("tradeCreated", {
        trade,
        userToken: req.token
      });
      res.send(trade);
    })
    .catch(e => {
      console.log(e);
      res.status(500).send();
    });
};

const searchTrades = (req, res) => {
  makeRequest({
    type: "search",
    searchCriteria: req.body.searchCriteria
  })
    .then(trades => {
      res.send(trades);
    })
    .catch(e => {
      console.log(e);
      res.status(500).send();
    });
};

const listTrades = (req, res) => {
  makeRequest({
    type: "list"
  })
    .then(trades => {
      res.send(trades);
    })
    .catch(e => {
      console.log(e);
      res.status(500).send();
    });
};

const fetchTrade = (req, res) => {
  const { tradeId } = req.params;
  makeRequest({
    type: "fetchByTradeId",
    tradeId
  })
    .then(trade => {
      if (!trade) {
        throw new Error("Bad Request - Can not find trade");
      }

      res.send(trade);
    })
    .catch(e => {
      console.log(e);
      res.status(400).send(e.message || "Bad Request");
    });
};

const updateTrade = (req, res) => {
  const { tradeId } = req.params;
  makeRequest({
    type: "update",
    tradeId,
    trade: req.body.trade
  })
    .then(trade => {
      if (!trade) {
        throw new Error("Can not update trade");
      }

      tradePublisher.publish("tradeUpdated", {
        trade,
        userToken: req.token
      });
      res.send(trade);
    })
    .catch(e => {
      console.log(e);
      res.status(400).send(e.message || "Bad Request");
    });
};

const deleteTrade = (req, res) => {
  const { tradeId } = req.params;
  makeRequest({
    type: "delete",
    tradeId
  })
    .then(trade => {
      if (!trade) {
        throw new Error("Can not delete trade");
      }
      tradePublisher.publish("tradeDeleted", {
        trade,
        userToken: req.token
      });
      res.send(trade);
    })
    .catch(e => {
      console.log(e);
      res.status(400).send(e.message || "Bad Request");
    });
};

module.exports = {
  createTrade,
  searchTrades,
  listTrades,
  fetchTrade,
  updateTrade,
  deleteTrade
};
