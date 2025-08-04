import axios from "../utils/AxiosCustomize";

const postRegister = (email, password,fullName, phone ) => {
    return axios.post(`/register`, 
        {email: email, password: password, fullName: fullName, phone: phone}
    )
}
const postLogin = (email, password) => {
    return axios.post(`/login`, 
        {email: email, password: password}
    )
}
export {
    postRegister,
    postLogin
}