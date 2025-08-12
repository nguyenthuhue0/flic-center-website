import axios from "../../utils/AxiosCustomize";

const getNews = () => {
    return axios.get(`/news`)
        .then(response => {
            // AxiosCustomize now returns full response, so we need to extract data
            return response.data;
        })
        .catch(error => {
            console.error('Error in getNews:', error);
            throw error;
        });
}

const getNewsDetail = (id) => {
    return axios.get(`/news/${id}`)
        .then(response => {
            // AxiosCustomize now returns full response, so we need to extract data
            return response.data;
        })
        .catch(error => {
            console.error('Error in getNewsDetail:', error);
            throw error;
        });
}

export {
    getNews,
    getNewsDetail
}