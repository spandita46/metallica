const getUpdatedLiveTickerData = (priceUpdate, { liveTickerData = [] }) => {
  let newLiveTickerData = [...liveTickerData];
  let index = liveTickerData.findIndex(data => {
    return data.commodity.code === priceUpdate.commodity.code;
  });

  if (index >= 0) {
    priceUpdate.isUp = priceUpdate.price > newLiveTickerData[index].price;
    priceUpdate.isDown = priceUpdate.price < newLiveTickerData[index].price;
    priceUpdate.isSame = priceUpdate.price === newLiveTickerData[index].price;
    newLiveTickerData[index] = priceUpdate;
  } else {
    // Restricting Ticker To Show Only 3 Ticks
    if (newLiveTickerData.length >= 3) {
      newLiveTickerData.shift();
      newLiveTickerData.push(priceUpdate);
    } else {
      newLiveTickerData.push(priceUpdate);
    }
  }
  return newLiveTickerData;
};

export default (state = {}, action) => {
  switch (action.type) {
    case "PRICE_UPDATED":
      return {
        liveTickerData: getUpdatedLiveTickerData(action.data, state)
      };
    default:
      return state;
  }
};
