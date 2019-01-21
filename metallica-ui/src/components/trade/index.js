import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
  getTrades,
  createTrade,
  updateTrade,
  deleteTrade,
  searchTrades
} from "./actions";
import TradesList from "./tradesList";
import Trade from "./trade";
import TradeSearch from "./tradeSearch";
import { areArraysEqual, getFormattedDateTime } from "../../utils";
import subscribeToTradeUpdates from "./tradeNotifications";
import "./trade.css";

class TradeDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      trades: [],
      selectedTrade: this.getTradeTemplate()
    };
  }

  componentDidMount() {
    this.props.api.getTrades();
    subscribeToTradeUpdates(this.props.dispatch);
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (!areArraysEqual(nextProps.trades, prevState.trades)) {
      return {
        trades: nextProps.trades
      };
    }
    return null;
  }

  getTradeTemplate = () => {
    return {
      tradeDate: getFormattedDateTime(),
      side: "",
      quantity: "",
      price: "",
      counterParty: "",
      commodity: "",
      location: ""
    };
  };

  resetSelectedTrade = () => {
    this.setState({
      selectedTrade: this.getTradeTemplate()
    });
  };

  handleTradeValueChange = name => event => {
    let newSelectedTrade = { ...this.state.selectedTrade };
    newSelectedTrade[name] = event.target.value;
    this.setState({
      selectedTrade: newSelectedTrade
    });
  };

  handleTradeSelection = selectedTrade => {
    if (selectedTrade) {
      this.setState({
        selectedTrade
      });
    } else {
      this.resetSelectedTrade();
    }
  };

  handleSearch = searchCriteria => {
    this.props.api.searchTrades({
      searchCriteria: searchCriteria
    });
  };

  handleSearchReset = () =>{
    this.props.api.getTrades();
  }

  handleTradeSave = () => {
    const { selectedTrade } = this.state;
    if (selectedTrade) {
      if (selectedTrade.tradeId) {
        this.props.api.updateTrade({
          trade: selectedTrade
        });
      } else {
        this.props.api.createTrade({
          trade: selectedTrade
        });
      }
    }
  };

  handleTradeDelete = () => {
    const { selectedTrade } = this.state;
    if (selectedTrade) {
      this.props.api.deleteTrade({
        trade: selectedTrade
      });
      this.resetSelectedTrade();
    }
  };

  render() {
    const { selectedTrade, trades } = this.state;
    return (
      <>
        <div className="row trade-searchbar">
          <div className="Column col-xs-12">
            <TradeSearch
              refData={this.props.refData}
              onSearch={this.handleSearch}
              onSearchReset={this.handleSearchReset}
            />
          </div>
        </div>
        <div className="row">
          <div className="Column col-xs-9">
            <TradesList
              trades={trades || []}
              onTradeSelection={this.handleTradeSelection}
            />
          </div>
          <div className="Column col-xs-3">
            <Trade
              selectedTrade={selectedTrade}
              refData={this.props.refData}
              onTradeValueChange={this.handleTradeValueChange}
              onTradeSave={this.handleTradeSave}
              onTradeDelete={this.handleTradeDelete}
              onTradeReset={this.resetSelectedTrade}
            />
          </div>
        </div>
      </>
    );
  }
}

const mapStateToProps = state => {
  return {
    ...state.tradesState,
    ...state.appState
  };
};

const mapDispatchToProps = dispatch => ({
  dispatch,
  api: bindActionCreators(
    {
      getTrades,
      createTrade,
      updateTrade,
      deleteTrade,
      searchTrades
    },
    dispatch
  )
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TradeDetails);
