import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import TradeDetails from "../trade";
import MarketDataTicker from "../marketData/marketDataTicker";
import { signIn, ssoSignIn, signOut, getRefData } from "./actions";
import "./App.css";
import SignIn from "./signin";
import AppHeader from "./appHeader";

class App extends Component {
  componentDidMount() {
    if (!this.isUserSignedIn()) {
      this.singleSignOn();
    }
  }

  singleSignOn = () => {
    this.props.api.ssoSignIn().then(data => {
      this.props.api.getRefData();
    });
  };

  isUserSignedIn = () => {
    return (
      this.props.userDetails &&
      this.props.userDetails.token &&
      this.props.userDetails.user
    );
  };

  getUserInitials = () => {
    const { userDetails } = this.props;
    let initials = "??";
    if (userDetails && userDetails.user && userDetails.user.name) {
      const name = userDetails.user.name;
      const nameParts = name.trim().split(" ");

      initials = nameParts.reduce(
        (initialValue = "", currentValue) =>
          initialValue.charAt(0).trim() + currentValue.charAt(0).trim()
      );
    }
    return initials;
  };

  handleLogin = (email, password) => {
    if (email && password) {
      this.props.api.signIn({ email, password }).then(data => {
        this.props.api.getRefData();
      });
    }
  };

  handleLogout = () => {
    this.props.api.signOut();
  };

  render() {
    let element = null;
    if (this.isUserSignedIn()) {
      element = (
        <div>
          <AppHeader
            userInitials={this.getUserInitials()}
            onLogOut={this.handleLogout}
          />
          <div className="container-fluid">
            <MarketDataTicker />
            <TradeDetails />
          </div>
        </div>
      );
    } else {
      element = <SignIn onLogin={this.handleLogin} />;
    }
    return <div>{element}</div>;
  }
}

const mapStateToProps = state => {
  return {
    ...state.appState
  };
};

const mapDispatchToProps = dispatch => ({
  dispatch,
  api: bindActionCreators(
    {
      signIn,
      signOut,
      ssoSignIn,
      getRefData
    },
    dispatch
  )
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
