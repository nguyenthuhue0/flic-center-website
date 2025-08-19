import axios from "../../utils/AxiosCustomize";

const getCourse = () => {
    return axios.get(`/course`)
}
export {
    getCourse
}