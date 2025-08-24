import axios from "../../utils/AxiosCustomize";

const createAssignment = (id, title, description, dueDate, fileUrl) => {
    return axios.post(`/assignments/create`, {
        lessonId: id,
        title: title,
        description: description,
        dueDate: dueDate,
        fileUrl: fileUrl
    })
}
export default createAssignment