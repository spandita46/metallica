import subscribeToNotifications from "../../core/notifications";
import {
  createTradeReqSuccess,
  updateTradeReqSuccess,
  deleteTradeReqSuccess
} from "./actions";

const subscribeToTradeUpdates = (dispatch) => {
  subscribeToNotifications("tradeCreated", data => {
    dispatch(createTradeReqSuccess(data, data.trade));
  });

  subscribeToNotifications("tradeUpdated", data => {
    dispatch(updateTradeReqSuccess(data, data.trade));
  });

  subscribeToNotifications("tradeDeleted", data => {
    dispatch(deleteTradeReqSuccess(data, data.trade));
  });
};

export default subscribeToTradeUpdates;
