const airbnbUserLocalStorage = localStorage.getItem("AIRBNB_USER")
  ? JSON.parse(localStorage.getItem("AIRBNB_USER"))
  : "";

const initialState = {
  airbnbUser: airbnbUserLocalStorage,
};

const airbnbUserReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case "LOGIN":
      return { ...state, airbnbUser : payload };
    case "LOGOUT":
      return { ...state, airbnbUser: "" };
    default:
      return state;
  }
};

export default airbnbUserReducer;
