import axios from "axios";
import { BASE_URL, TOKEN_BY_CLASS } from "settings/apiConfig";

const callApi = (
  endpoint,
  method = "GET",
  data = null,
  tokenType,
  tokenClass = TOKEN_BY_CLASS
) => {
  return axios({
    url: `${BASE_URL}/${endpoint}`,
    method,
    data,
    headers: { tokenByClass: tokenClass, token : tokenType  },
  });
};

export default callApi;
