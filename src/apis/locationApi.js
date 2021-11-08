import callApi from "utils/callApi"

const locationApi = {
    fetchSearchLocationApi(location) {
        return callApi(`api/locations?location=${location}`)
    },

    fetchRoomsApi(location) {
        return  callApi(`api/rooms?locationId=${location}`)
    },

    fetchRoomDetailsApi(roomId) {
        return  callApi(`api/rooms/${roomId}`)
    },

    fetchRoomReviewsApi(roomId) {
        return  callApi(`api/reviews/byRoom?roomId=${roomId}`)
    }
}


export default locationApi;