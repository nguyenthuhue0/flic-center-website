import axios from "../../utils/AxiosCustomize";

const getLessonById = (id) => {
    return axios.get(`/lesson/${id}`);
}
const updateLesson = (id, data) => {
    return axios.put(`/lesson/${id}`, data);
}
const deleteLesson = (id) => {
    return axios.delete(`/lesson/${id}`);
}
const createLesson = (data) => {
    return axios.post(`/lesson/create`, data);
}
const getLessonByCourseId = (courseId) => {
    return axios.get(`/lesson?courseId=${courseId}`);
}

export {
    getLessonById,
    updateLesson,
    deleteLesson,
    createLesson,
    getLessonByCourseId
}

