const initialState = {
  bgHeader: false,
};

const bgHeaderReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case "BG_HEADER":
      return { ...state, bgHeader : payload };
    default:
      return state;
  }
};

export default bgHeaderReducer;
