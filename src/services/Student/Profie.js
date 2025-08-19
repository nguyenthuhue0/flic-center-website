import axios from "../../utils/AxiosCustomize";

const getProfile = () => {
    return axios.get(`/users/profile`)
}
const updateProfile = (fullName, phone, gender, birthDay, schoolName, ethnicity)  => {
    return axios.put(`/users/profile` , 
        {fullName: fullName, 
            phone: phone,
            gender: gender,
            birthDate: birthDay,
            schoolName: schoolName,
            ethnicity: ethnicity
        }
    )
}
const uploadAvatar = (file) => {
  const formData = new FormData();
  formData.append("file", file); 

  return axios.post(`/users/profile/avatar`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
}
export {
   getProfile,
   updateProfile,
   uploadAvatar
}