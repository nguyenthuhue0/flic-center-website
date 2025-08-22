import axios from "../../utils/AxiosCustomize";

const getNew = () => {
    return axios.get(`/admin/news`)
}
const postNew = (title, content, publishedAt, image) => {
  const formData = new FormData();
formData.append("title", title);
formData.append("content", content);
formData.append("publishedAt", publishedAt); // ISO date
formData.append("image", image); // nếu có file

return axios.post("/admin/news", formData, {
  headers: { "Content-Type": "multipart/form-data" },
});

}
const getNewById = (id) => {
    return axios.get(`/admin/news/${id}`)
}
const putNewById = (id, title, content, image, publishedAt) => {
    return axios.put(`/admin/news/${id}`, {
        title: title,
        content: content,
        avatarUrl: image,
        publishedAt: publishedAt
    })
}
const deleteNew = (id) => {
    return axios.delete(`/admin/news/${id}`)
}
export {
    getNew,
    postNew,
    getNewById,
    putNewById,
    deleteNew
}