import { ITEM_PER_PAGE } from "settings/type";
import callApi from "utils/callApi";

const userApi = {
  fetchUserApi(page) {
    let skip = (page - 1) * ITEM_PER_PAGE;
    let limit = page ? ITEM_PER_PAGE : 0;
    return callApi(`api/users/pagination?skip=${skip}&limit=${limit}`);
  },
  deleteUserApi(user, token) {
    return callApi(`api/users/${user}`, "DELETE", null, token);
  },
  createUserApi(user, token) {
    return callApi(`api/users`, "POST", user, token);
  },
  editUserApi(idUser, user, token) {
    return callApi(`api/users/${idUser}`, "PUT", user, token);
  },
  fetchInformationUser(userId) {
    return callApi(`api/users/${userId}`);
  },
  fetchTicketDetail (idTicket) {
      return callApi(`api/tickets/${idTicket}`)
  }
};

export default userApi;
