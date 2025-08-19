import axios from "../../utils/AxiosCustomize";

const getScheduleOfStudent = () => {
    return axios.get(`/user/timetable`)
}
export {
    getScheduleOfStudent
}