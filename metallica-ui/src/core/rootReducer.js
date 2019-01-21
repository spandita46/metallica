import { combineReducers } from "redux";
import appState from "../components/app/reducer";
import tradesState from "../components/trade/reducer";
import marketDataState from "../components/marketData/reducer";

export default combineReducers({
  appState,
  tradesState,
  marketDataState
});
