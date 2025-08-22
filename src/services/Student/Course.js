import axios from "../../utils/AxiosCustomize";


const getCourseById = (id) => {
    return axios.get(`/course/${id}`)
}
const getLessonByCourseId = (courseId) => {
    return axios.get(`/lesson?courseId=${courseId}`,)
}
const getAssignmentByLessonId = (lessonId) => {
    return axios.get(`/assignments/${lessonId}`)
}
const getCourseByUserRegistered = () => {
    return axios.get(`/course/registered`)
}
const getDocumentByCourseId = (courseId) => {
    return axios.get(`/lesson/materials`, {
        params: { courseId: courseId }
    });
}
const getAllCourse = () => {
    return axios.get(`/course`)
}
const getAllProgress = () => {
    return axios.get(`/courses/progress`)
}
export {
    getCourseById,
    getLessonByCourseId,
    getAssignmentByLessonId,
    getCourseByUserRegistered,
    getDocumentByCourseId,
    getAllCourse,
    getAllProgress
}