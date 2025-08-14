import axios from "../../utils/AxiosCustomize";

const getNews = () => {
    return axios.get(`/news`, { skipAuth: true })
        .then((response) => response.data)
        .catch((error) => {
            console.error('Error in getNews:', error);
            throw error;
        });
}

const getNewsDetail = (id) => {
    return axios.get(`/news/${id}`, { skipAuth: true })
        .then((response) => response.data)
        .catch((error) => {
            console.error('Error in getNewsDetail:', error);
            throw error;
        });
}

export {
    getNews,
    getNewsDetail
}