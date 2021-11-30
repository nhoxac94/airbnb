const initialState = {
  location: "",
  locationId: "",
};

const locationReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case "LOCATION_BOOKING":
      return { ...state, ...payload };
    default:
      return state;
  }
};

export default locationReducer;
