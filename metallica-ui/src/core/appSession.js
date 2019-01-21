import { setCookie, getCookie } from "../utils";

const _appSession = {
  userDetails: undefined,
  // TODO: Replace with your backend host IP
  apiBaseURL: "http://localhost:32086",
  notifyServiceURL: "http://localhost:42086"
};

export const setUserDetails = userDetails => {
  _appSession.userDetails = userDetails;
  if (userDetails && userDetails.token) {
    setCookie("auth-token", userDetails.token, 3);
  }
};

export const getUserSessionToken = () => {
  if (_appSession.userDetails && _appSession.userDetails.token) {
    return _appSession.userDetails.token;
  } else {
    return getCookie("auth-token");
  }
};

export const getApiBaseUrl = () => {
  return _appSession.apiBaseURL;
};

export const getNotificationServiceURL = () => {
  return _appSession.notifyServiceURL;
};
