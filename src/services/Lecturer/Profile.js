import axios from "../../utils/AxiosCustomize";


const getProfileLecturer = () => {
    return axios.get(`/lecturer/profile`)
}
const updateAvatarLecturer = (file) => {
     const formData = new FormData();
  formData.append("file", file); 

  return axios.post(`/lecturer/avatar`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
}
const updateProfileLecturer = ( fullName, phone, birthday, birthPlace, gender, email, profileImage, degree, specialization, bio) => {
    return axios.put(`/lecturer/profile`, {
        fullName: fullName,
        phone: phone,
        birthday: birthday,
        birthPlace: birthPlace,
        gender: gender,
        email: email,
        profileImage: profileImage,
        degree: degree,
        specialization: specialization,
        bio: bio
    })
}
export {
    getProfileLecturer,
    updateAvatarLecturer,
    updateProfileLecturer
}
