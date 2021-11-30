import callApi from "utils/callApi";

const loginApi = {
    fetchLoginApi (user) {
        return callApi(`api/auth/login`, "POST", user)
    },
    fetchSignUpApi (user) {
        return callApi(`api/auth/register`, "POST", user)
    }

}

export default loginApi;