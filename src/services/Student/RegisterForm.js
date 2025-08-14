import axios from "../../utils/AxiosCustomize";

const getRegisterForm = () => {
    return axios.get(`/public/enroll`);
}
const updateForm = (email, fullName, phone, gender, birthDate, job, idStudent, schoolName, idNumber, idIssuedPlace, idIssuedDate, courseId, paymentMethod, amount, billImage, paymentStatus, paidAt, note, paymentFor) => {
    return axios.post(`/public/enroll`, {
        fullName: fullName,
        email: email,
        phone: phone,
        gender: gender,
        birthDate: birthDate,
        job: job,
        idStudent: idStudent,
        schoolName: schoolName,
        idNumber: idNumber,
        idIssuedPlace: idIssuedPlace,
        idIssuedDate: idIssuedDate,
        courseId: courseId,
        paymentMethod: paymentMethod,
        amount: amount,
        billImage: billImage,
        paymentStatus: paymentStatus,
        paidAt: paidAt,
        note: note,
        paymentFor: paymentFor
    }
    )
}

const getRegisterFormRequets = () => {
    return axios.get(`/users/profile`);
}
const updateFormByLogin = (email, fullName, phone, gender, birthDate, job, idStudent, schoolName, idNumber, idIssuedPlace, idIssuedDate, courseId, paymentMethod, amount, billImage, paymentStatus, paidAt, note, paymentFor) => {
    return axios.post(`/enrollments`, {
        fullName: fullName,
        email: email,
        phone: phone,
        gender: gender,
        birthDate: birthDate,
        job: job,
        idStudent: idStudent,
        schoolName: schoolName,
        idNumber: idNumber,
        idIssuedPlace: idIssuedPlace,
        idIssuedDate: idIssuedDate,
        courseId: courseId,
        paymentMethod: paymentMethod,
        amount: amount,
        billImage: billImage,
        paymentStatus: paymentStatus,
        paidAt: paidAt,
        note: note,
        paymentFor: paymentFor
    }
    )
}
export {
    getRegisterForm,
    updateForm,
    getRegisterFormRequets,
    updateFormByLogin
}