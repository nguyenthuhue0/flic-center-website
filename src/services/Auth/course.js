import axios from "../../utils/AxiosCustomize";

const getCourse = () => {
    return axios.get(`/course`)
}
const getCourseById = async (id) => {
  try {
    const res = await axios.get(`/course/${id}`);
    return res;
  } catch {
    const list = await getCourse();
    return Array.isArray(list) ? list.find((c) => String(c.id) === String(id)) : null;
  }
};
export const getLessonsByCourse = (courseId) =>
  axios.get(`/lesson?courseId=${courseId}`);  // <-- đúng tham số courseId
export { getCourse, getCourseById };