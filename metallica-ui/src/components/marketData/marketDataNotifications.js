import subscribeToNotifications from "../../core/notifications";

const subscribeToPriceUpdates = dispatch => {
  subscribeToNotifications(
    "priceUpdated",
    data => {
      dispatch({
        type: "PRICE_UPDATED",
        data
      });
    },
    true
  );
};

export default subscribeToPriceUpdates;
