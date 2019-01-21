export default (state = {}, action) => {
  switch (action.type) {
    case "LOGIN_REQ_SUC":
      return {
        userDetails: action.data
      };
    case "LOGOUT_REQ_SUC":
      return {
        userDetails: action.data
      };
    case "REFDATA_COMMODITIES_REQ_SUC":
      return {
        ...state,
        refData: { ...state.refData, commodities: action.data }
      };
    case "REFDATA_LOCATIONS_REQ_SUC":
      return {
        ...state,
        refData: { ...state.refData, locations: action.data }
      };
    case "REFDATA_COUNTERPARTIES_REQ_SUC":
      return {
        ...state,
        refData: { ...state.refData, counterParties: action.data }
      };
    default:
      return state;
  }
};
