// services/admin/courses.js
import axios from "../../utils/AxiosCustomize";

// Lấy danh sách khoá học (có phân trang)
export const getAdminCourses = (page = 0, size = 20, q = "") => {
  // BE nên có /api/admin/courses, filter q (tùy backend)
  return axios.get(`/admin/courses`, { params: { page, size, q } });
};

// Xoá khoá học (nếu BE có)
export const deleteCourse = (id) => {
  return axios.delete(`/admin/courses/${id}`);
};

// DETAIL admin
export const getCourseDetailAdmin = (id) => {
  return axios.get(`/admin/courses/${id}`);
};

// DETAIL public (nhiều backend dùng /courses/:id hoặc /course/:id)
export const getCourseDetailPublic = (id) => {
  return axios.get(`/courses/${id}`);
};
export const createCourse = (payload) => {
  console.log("Payload trước khi gửi:", payload);

  const formData = new FormData();
  Object.entries(payload).forEach(([key, value]) => {
    if (value !== null && value !== undefined) {
      formData.append(key, value);
    }
  });
  return axios.post("/admin/courses", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const updateCourse = (id, payload) =>
  axios.put(`/admin/courses/${id}`, payload);