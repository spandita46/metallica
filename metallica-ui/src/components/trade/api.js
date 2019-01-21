import AsyncHelper from "../../utils/aynchCallHelper";

export const getTrades = () => {
  return AsyncHelper.getAsync({
    url: "/trades"
  });
};

export const searchTrades = searchCriteria => {
  if (searchCriteria) {
    return AsyncHelper.postAsync({
      url: "/trades/search",
      data: { searchCriteria }
    });
  } else {
    throw Error("Provide Search Criteria for searching trades.");
  }
};

export const createTrade = trade => {
  if (trade) {
    return AsyncHelper.postAsync({
      url: "/trades",
      data: { trade }
    });
  } else {
    throw Error("Provide trade data for creating trade.");
  }
};

export const updateTrade = trade => {
  if (trade && trade.tradeId) {
    return AsyncHelper.putAsync({
      url: `/trades/${trade.tradeId}`,
      data: { trade }
    });
  } else {
    throw Error("Provide valid trade to update.");
  }
};

export const deleteTrade = trade => {
  if (trade && trade.tradeId) {
    return AsyncHelper.deleteAsync({
      url: `/trades/${trade.tradeId}`
    });
  } else {
    throw Error("Provide valid trade to delete.");
  }
};


