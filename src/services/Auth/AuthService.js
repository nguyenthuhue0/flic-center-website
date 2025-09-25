import axios from "../../utils/AxiosCustomize";

const postRegister = (email, password, fullName, phone) => {
    return axios
        .post(`/register`, { email, password, fullName, phone })
}

const postLogin = (email, password) => {
    return axios
        .post(`/login`, { email, password })
}
const changePasswordService = (oldPassword, newPassword, newPasswordConfirm) => {
    return axios
        .put(`/users/change-password`, { oldPassword, newPassword, newPasswordConfirm })
}
export {
    postRegister,
    postLogin,
    changePasswordService
}