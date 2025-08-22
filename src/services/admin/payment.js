import axios from "../../utils/AxiosCustomize";

const getAllPayment = () => {
    return axios.get(`/admin/payment`)
}
const getPaymentById = (id) => {
    return axios.get(`/admin/payment/${id}`)
}
const changeStatus = (id, status) => {
    return axios.put(`/admin/payment/${id}`, {
        status: status
    })
}
export {
    getAllPayment,
    getPaymentById,
    changeStatus
}