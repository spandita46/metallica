import * as API from "./api";

const getTradesReqSuccess = data => {
  return {
    type: "LIST_TRADES_REQ_SUC",
    data
  };
};

const searchTradeReqSuccess = (req, data) => {
  return {
    type: "SEARCH_TRADES_REQ_SUC",
    data,
    req
  };
};

export const createTradeReqSuccess = (req, data) => {
  return {
    type: "CREATE_TRADES_REQ_SUC",
    data,
    req
  };
};

export const updateTradeReqSuccess = (req, data) => {
  return {
    type: "UPDATE_TRADES_REQ_SUC",
    data,
    req
  };
};

export const deleteTradeReqSuccess = req => {
  return {
    type: "DELETE_TRADES_REQ_SUC",
    req
  };
};

export const getTrades = () => dispatch => {
  API.getTrades()
    .then(trades => {
      dispatch(getTradesReqSuccess(trades));
    })
    .catch(error => {
      console.log(error);
    });
};

export const createTrade = req => dispatch => {
  API.createTrade(req.trade)
    .then(trade => {
      dispatch(createTradeReqSuccess(req, trade));
    })
    .catch(error => {
      console.log(error);
    });
};

export const updateTrade = req => dispatch => {
  API.updateTrade(req.trade)
    .then(trade => {
      dispatch(updateTradeReqSuccess(req, trade));
    })
    .catch(error => {
      console.log(error);
    });
};

export const deleteTrade = req => dispatch => {
  API.deleteTrade(req.trade)
    .then(() => {
      dispatch(deleteTradeReqSuccess(req));
    })
    .catch(error => {
      console.log(error);
    });
};

export const searchTrades = req => dispatch => {
  API.searchTrades(req.searchCriteria)
    .then(trades => {
      dispatch(searchTradeReqSuccess(req, trades));
    })
    .catch(error => {
      console.log(error);
    });
};
