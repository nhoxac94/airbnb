import { ITEM_PER_PAGE } from "settings/type";
import callApi from "utils/callApi";

const locationApi = {
  fetchSearchLocationApi(location, limit, skip) {
    return callApi(
      `api/locations?limit=${limit}&skip=${skip}&location=${location}`
    );
  },

  fetchRoomsApi(location, page) {
    let skip = page ? (page - 1) * ITEM_PER_PAGE : 0;
    let limit = page ? ITEM_PER_PAGE : 0;
    return callApi(
      `api/rooms?locationId=${location}&skip=${skip}&limit=${limit}`
    );
  },

  fetchRoomDetailsApi(roomId) {
    return callApi(`api/rooms/${roomId}`);
  },

  fetchRoomReviewsApi(roomId) {
    return callApi(`api/reviews/byRoom?roomId=${roomId}`);
  },

  fetchLocationsApi(page) {
    let skip = (page - 1) * ITEM_PER_PAGE;
    let limit = page ? ITEM_PER_PAGE : 0;
    return callApi(`api/locations?skip=${skip}&limit=${limit}`);
  },
  bookingRoomApi(data, token) {
    return callApi("api/rooms/booking", "POST", data, token);
  },
  createLocationApi(data, token) {
    return callApi("api/locations", "POST", data, token);
  },
  fetchLocationDetails(idLocation) {
    return callApi(`api/locations/${idLocation}`, "GET");
  },
  editLocation(idLocation, data, token) {
    return callApi(`api/locations/${idLocation}`, "PUT", data, token);
  },
  deleteLocation(idLocation, token) {
    return callApi(`api/locations/${idLocation}`, "DELETE", null, token);
  },
  createRoomApi(data, token) {
    return callApi("api/rooms", "POST", data, token);
  },
  editRoomApi(idRoom, data, token) {
    return callApi(`api/rooms/${idRoom}`, "PUT", data, token);
  },
  deleteRoomApi(idRoom, token) {
    return callApi(`api/rooms/${idRoom}`, "DELETE", null, token);
  },
  creatReviewApi(roomId, data, token) {
    return callApi(`api/reviews?roomId=${roomId}`, "POST", data, token);
  },
  fetchReviewDetailApi(reviewId) {
    return callApi(`api/reviews/${reviewId}`);
  },
  editReviewApi(reviewId, data, token) {
    return callApi(`api/reviews/${reviewId}`, "PUT", data, token);
  },
  deleteReviewApi(reviewId, token) {
    return callApi(`api/reviews/${reviewId}`, "DELETE", null, token);
  },
  uploadImg(placeUpdate, IdPlaceUpdate, value, token) {
    return callApi(`api/${placeUpdate}/${IdPlaceUpdate}`, "POST", value, token)
  },
};

export default locationApi;
