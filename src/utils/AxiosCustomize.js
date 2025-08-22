import axios from "axios";
import nProgress from "nprogress";
nProgress.configure ({
  showSpinner:false,
  speed: 500,     
  trickleSpeed: 100, 
})
const instance = axios.create({
    baseURL: 'http://localhost:8080/api',

});

instance.interceptors.request.use(function (config) {
const access_token = sessionStorage.getItem("access_token");

if (!config.url?.includes("/login") && access_token) {
  config.headers["Authorization"] = "Bearer " + access_token;
}
  //trc khi gửi request đi thì bật thanh loading
  nProgress.start();
    return config;
  }, function (error) {
    return Promise.reject(error);
  });

// Add a response interceptor
instance.interceptors.response.use(function (response) {
    nProgress.done();
    return response && response.data ? response.data : response;
  }, function (error) {
    return Promise.reject(error);
  });
export default instance; 