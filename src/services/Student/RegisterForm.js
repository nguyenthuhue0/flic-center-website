import axios from "../../utils/AxiosCustomize";

const publicEnrollment = (
    email,
    fullName,
    phone,
    gender,
    birthDate,
    job,
    idStudent,
    schoolName,
    idNumber,
    idIssuedPlace,
    idIssuedDate,
    courseId,
    paymentMethod,
    amount,
    billImage,
    paymentStatus,
    paidAt,
    note,
    paymentFor
) => {
    return axios.post(`public/enroll`, {
        email: email,
        fullName: fullName,
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
        paymentFor: paymentFor,
    });
};

const privateEnrollment = (
    fullName,
    phone,
    gender,
    birthDate,
    job,
    idStudent,
    schoolName,
    idNumber,
    courseId,
    paymentMethod,
    amount,
    billImage,
    paymentStatus,
    paidAt,
    note,
    paymentFor
) => {
    return axios.post(`/enrollments`, {
        fullName: fullName,
        phone: phone,
        gender: gender,
        birthDate: birthDate,
        job: job,
        idStudent: idStudent,
        schoolName: schoolName,
        idNumber: idNumber,
        courseId: courseId,
        paymentMethod: paymentMethod,
        amount: amount,
        billImage: billImage,
        paymentStatus: paymentStatus,
        paidAt: paidAt,
        note: note,
        paymentFor: paymentFor
    })
}
export {
    privateEnrollment,
    publicEnrollment
}