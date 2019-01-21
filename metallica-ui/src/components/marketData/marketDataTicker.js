import React, { Component } from "react";
import { connect } from "react-redux";
import subscribeToPriceUpdates from "./marketDataNotifications";
import Paper from "@material-ui/core/Paper";
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";

const styles = theme => ({
  paper: {
    padding: "0px 5px",
    marginBottom: "5px"
  },
  tick: {
    borderLeft: "ridge 2px"
  },
  green: {
    color: "green"
  },
  red: {
    color: "red"
  },
  inline:{
    display:"inline"
  }
});

class MarketDataTicker extends Component {
  componentDidMount() {
    subscribeToPriceUpdates(this.props.dispatch);
  }

  render() {
    const { liveTickerData = [], classes } = this.props;
    return (
      <Paper className={classes.paper}>
        <div className="row">
          {liveTickerData.map((ltd, index) => {
            let classToAppend = index > 0 ? classes.tick : " ";
            if (ltd.isUp) {
              classToAppend += " " + classes.green;
            }
            if (ltd.isDown) {
              classToAppend += " " + classes.red;
            }
            return (
              <div
                key={ltd.commodity.code}
                className={" Column col-xs-4 " + classToAppend}
              >
                <div className="row">
                  <div className=" Column col-xs-10 ">
                    {ltd.commodity.description + "(" + ltd.commodity.code + ")"}
                  </div>
                  <div className=" Column col-xs-2 ">
                    {"$" + ltd.price}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </Paper>
    );
  }
}

const mapStateToProps = state => {
  return {
    ...state.marketDataState
  };
};

const mapDispatchToProps = dispatch => ({
  dispatch
});

let connectedMarketDataTicker = connect(
  mapStateToProps,
  mapDispatchToProps
)(MarketDataTicker);

connectedMarketDataTicker.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(connectedMarketDataTicker);
