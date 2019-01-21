import AsyncHelper from "../../utils/aynchCallHelper";

export const signIn = (email, password) => {
  if (email && password) {
    return AsyncHelper.postAsync({
      url: "/users/login",
      data: {
        email,
        password
      },
      unAuthenticated: true
    });
  } else {
    throw Error("Provide EmailId & Password for sign in.");
  }
};

export const ssoSignIn = () => {
  return AsyncHelper.getAsync({
    url: "/users/me"
  });
};

export const signOut = () => {
  return AsyncHelper.deleteAsync({
    url: "/users/me/token"
  });
};

export const getCounterParties = () => {
  return AsyncHelper.getAsync({
    url: "/refdata/counterparties"
  });
};

export const getLocations = () => {
  return AsyncHelper.getAsync({
    url: "/refdata/locations"
  });
};

export const getCommodities = () => {
  return AsyncHelper.getAsync({
    url: "/refdata/commodities"
  });
};
