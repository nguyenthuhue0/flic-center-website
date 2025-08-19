import axios from "../../utils/AxiosCustomize";

const getNews = () => {
    return axios.get(`/news`, { skipAuth: true })
        .then((response) => {
            // Axios interceptor đã trả về response.data rồi
            console.log('getNews - Raw response:', response);
            return response;
        })
        .catch((error) => {
            console.error('Error in getNews:', error);
            throw error;
        });
}

const getNewsDetail = (id) => {
    return axios.get(`/news/${id}`, { skipAuth: true })
        .then((response) => {
            // Axios interceptor đã trả về response.data rồi
            console.log('getNewsDetail - Raw response:', response);
            return response;
        })
        .catch((error) => {
            console.error('Error in getNewsDetail:', error);
            throw error;
        });
}

export {
    getNews,
    getNewsDetail
}