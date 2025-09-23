import axios from "../../utils/AxiosCustomize";

const lessonAPI = {
    // Lấy lesson theo id
    getById: (id) => axios.get(`/lessons/${id}`),

    // Lấy danh sách lessons theo courseId (đúng endpoint backend của bạn)
    getByCourseId: (courseId) =>
        axios.get(`/lesson`, { params: { courseId } }),

    // Tạo mới lesson
    create: (data) => axios.post(`/lesson/create`, data),

    // Cập nhật lesson
    update: (id, data) => axios.put(`/lesson/${id}`, data),

    // Xóa lesson
    remove: (id) => axios.delete(`/lessons/${id}`),
      updateV2: (dto) => axios.post(`/lesson/update`, dto)
};

export default lessonAPI;
