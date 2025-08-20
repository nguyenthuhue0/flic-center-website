import axios from "../../utils/AxiosCustomize";

const publicEnrollment = (data, file) => {
  const formData = new FormData();

  formData.append("data", JSON.stringify(data));

  if (file) {
    formData.append("file", file);
  }

  return axios.post("/public/enroll", formData);
};

const privateEnrollment = (data, file) => {
  const formData = new FormData();

  formData.append("data", JSON.stringify(data));

  if (file) {
    formData.append("file", file);
  }

  return axios.post("/enrollments", formData);
};

export { privateEnrollment, publicEnrollment };
