import * as API from "./api";
import { setUserDetails } from "../../core/appSession";
import { eraseCookie } from "../../utils";

const getSignInReqSuccess = (req, data) => {
  return {
    type: "LOGIN_REQ_SUC",
    req,
    data
  };
};

const getSignOutReqSuccess = () => {
  return {
    type: "LOGOUT_REQ_SUC",
    data: undefined
  };
};

const getCommoditiesReqSuccess = data => {
  return {
    type: "REFDATA_COMMODITIES_REQ_SUC",
    data
  };
};

const getCounterPartiesReqSuccess = data => {
  return {
    type: "REFDATA_COUNTERPARTIES_REQ_SUC",
    data
  };
};

const getLocationsReqSuccess = data => {
  return {
    type: "REFDATA_LOCATIONS_REQ_SUC",
    data
  };
};

const getCounterParties = dispatch => {
  API.getCounterParties()
    .then(counterParties => {
      dispatch(getCounterPartiesReqSuccess(counterParties));
    })
    .catch(error => {
      console.log(error);
    });
};

const getLocations = dispatch => {
  API.getLocations()
    .then(locations => {
      dispatch(getLocationsReqSuccess(locations));
    })
    .catch(error => {
      console.log(error);
    });
};

const getCommodities = dispatch => {
  API.getCommodities()
    .then(commodities => {
      dispatch(getCommoditiesReqSuccess(commodities));
    })
    .catch(error => {
      console.log(error);
    });
};

export const signIn = req => dispatch => {
  const { email, password } = req;
  return API.signIn(email, password)
    .then(userDetails => {
      setUserDetails(userDetails);
      dispatch(getSignInReqSuccess(req, userDetails));
      return Promise.resolve();
    })
    .catch(error => {
      console.log(error);
    });
};

export const ssoSignIn = () => dispatch => {
  return API.ssoSignIn()
    .then(userDetails => {
      setUserDetails(userDetails);
      dispatch(getSignInReqSuccess(null, userDetails));
      return Promise.resolve();
    })
    .catch(error => {
      console.log(error);
    });
};

export const signOut = () => dispatch => {
  return API.signOut()
    .then(data => {
      setUserDetails(undefined);
      eraseCookie("auth-token");
      dispatch(getSignOutReqSuccess());
    })
    .catch(error => {
      console.log(error);
    });
};

export const getRefData = () => dispatch => {
  getCommodities(dispatch);
  getLocations(dispatch);
  getCounterParties(dispatch);
};
