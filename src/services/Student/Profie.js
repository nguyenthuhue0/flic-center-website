import axios from "../../utils/AxiosCustomize";

const getProfile = () => {
    return axios.get(`/users/profile`)
}
const updateProfile = (fullName, phone, gender, birthDay, schoolName, ethnicity)  => {
    return axios.put(`/users/profile` , 
        {fullName: fullName, 
            phone: phone,
            gender: gender,
            birthDay: birthDay,
            schoolName: schoolName,
            ethnicity: ethnicity
        }
    )
}
export {
   getProfile,
   updateProfile
}