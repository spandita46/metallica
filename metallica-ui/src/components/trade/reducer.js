const getUpdatedTrade = (oldStateTrades, updatedTrade) => {
  let newTrades = [...oldStateTrades];
  let index = newTrades.findIndex(
    trade => updatedTrade.tradeId === trade.tradeId
  );
  if (index >= 0) {
    newTrades[index] = updatedTrade;
  }
  return newTrades;
};

const deleteTrade = (oldStateTrades, deleteTrade) => {
  return oldStateTrades.filter(trade => trade.tradeId !== deleteTrade.tradeId);
};

export default (state = {}, action) => {
  switch (action.type) {
    case "SEARCH_TRADES_REQ_SUC":
    case "LIST_TRADES_REQ_SUC":
      return {
        trades: action.data ? [...action.data] : []
      };
    case "CREATE_TRADES_REQ_SUC":
      return {
        trades: [{ ...action.data }, ...state.trades]
      };
    case "UPDATE_TRADES_REQ_SUC":
      return {
        trades: getUpdatedTrade(state.trades, action.data)
      };
    case "DELETE_TRADES_REQ_SUC":
      return {
        trades: deleteTrade(state.trades, action.req.trade)
      };
    default:
      return state;
  }
};
