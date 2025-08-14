import axios from "../../utils/AxiosCustomize";

const postRegister = (email, password, fullName, phone) => {
    return axios
        .post(`/register`, { email, password, fullName, phone })
        .then((response) => response.data);
}

const postLogin = (email, password) => {
    return axios
        .post(`/login`, { email, password })
        .then((response) => response.data);
}
export {
    postRegister,
    postLogin
}