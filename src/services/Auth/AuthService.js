import axios from "../../utils/AxiosCustomize";

const postRegister = (email, password, fullName, phone) => {
    return axios
        .post(`/register`, { email, password, fullName, phone })
}

const postLogin = (email, password) => {
    return axios
        .post(`/login`, { email, password })
}
export {
    postRegister,
    postLogin
}