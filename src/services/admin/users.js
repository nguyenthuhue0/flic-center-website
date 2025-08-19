import axios from "../../utils/AxiosCustomize";

const getUsers = () => {
  return axios.get(`/admin/users`);
};

const getUserDetail = (id) => {
  return axios.get(`/admin/users/${id}`);
};
const createUser = (payload) => axios.post(`/admin/lecturer`, payload);
const updateUser = (id, payload) => {
  // payload đã được normalize ở EditStudent.jsx
  return axios.put(`/admin/users/${id}`, payload);
};
const uploadAvatar = (id, file) => {
  const form = new FormData();
  form.append("file", file);
  return axios.post(`/admin/users/${id}/avatar`, form, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};
const deleteUser = (id) => {
  return axios.delete(`/admin/users/${id}`);
};
const getLecturerDetail = (id) => {
  return axios.get(`/admin/lecturer/${id}`);
};

const updateLecturer = (id, payload) => {
  // JSON only
  return axios.put(`/admin/lecturer/${id}`, payload, {
    headers: { "Content-Type": "application/json" },
  });
};

const uploadLecturerAvatar = (id, file) => {
  const form = new FormData();
  form.append("file", file);
  return axios.post(`/admin/lecturer/${id}/avatar`, form, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};
export { getUsers, getUserDetail, updateUser, uploadAvatar, deleteUser, createUser, updateLecturer, getLecturerDetail, uploadLecturerAvatar };
