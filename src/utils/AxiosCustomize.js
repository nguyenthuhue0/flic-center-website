import axios from "axios";

const instance = axios.create({
    baseURL: 'http://localhost:8080/api',
    timeout: 10000, // 10 seconds timeout
});

instance.interceptors.request.use(function (config) {
    const access_token = sessionStorage.getItem("access_token");
    const skipAuth = config.skipAuth === true;

    if (!skipAuth && !config.url?.includes("/login") && access_token) {
        config.headers["Authorization"] = "Bearer " + access_token;
    }
    // Debug minimal info for news endpoints
    if (config.url?.startsWith('/news')) {
        console.debug('API Request', {
            url: config.url,
            skipAuth,
            hasToken: Boolean(access_token),
            attachingAuth: !skipAuth && Boolean(access_token)
        });
    }
    // strip custom flag before sending
    if ("skipAuth" in config) {
        delete config.skipAuth;
    }
    return config;
}, function (error) {
    return Promise.reject(error);
});

// Add a response interceptor
instance.interceptors.response.use(function (response) {
    // Return the full response object, not just response.data
    return response;
}, function (error) {
    // Better error handling
    if (error.response) {
        // Server responded with error status
        console.error('API Error Response:', {
            status: error.response.status,
            data: error.response.data,
            headers: error.response.headers
        });
    } else if (error.request) {
        // Request was made but no response received
        console.error('API No Response:', error.request);
        error.message = "Không thể kết nối đến server";
    } else {
        // Something else happened
        console.error('API Error:', error.message);
    }
    return Promise.reject(error);
});

export default instance;