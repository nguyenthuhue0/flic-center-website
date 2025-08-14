import React, { useEffect, useState } from "react";
import qrcode from "../../assets/images/qrcode.png"
import { getRegisterFormRequets, updateForm, updateFormByLogin } from "../../services/Student/RegisterForm";
import { useNavigate } from "react-router-dom";
import { getCourse } from "../../services/Student/Home";
import axios from "axios";

export default function RegisterForm() {

    useEffect(() => {
        fetchCourse()
    }, []);
    const [dataCourse, setDataCourse] = useState([]);
    const fetchCourse = async () => {
        let courses = await getCourse();
        setDataCourse(courses);
    }


    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const navigate = useNavigate();
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [gender, setGender] = useState("");
    const [birthDate, setBirthDate] = useState("");
    const [job, setJob] = useState("");
    const [idStudent, setIdStudent] = useState("");
    const [schoolName, setSchoolName] = useState("");
    const [idNumber, setIdNumber] = useState("");
    const [idIssuedPlace, setIdIssuedPlace] = useState("");
    const [idIssuedDate, setIdIssuedDate] = useState("");
    const [courseId, setCourseId] = useState("");
    const [paymentMethod, setPaymentMethod] = useState("");
    const [amount, setAmount] = useState("");
    const [billImage, setBillImage] = useState("");
    const [paymentStatus, setPaymentStatus] = useState("");
    const [paidAt, setPaidAt] = useState("");
    const [note, setNote] = useState("");
    const [paymentFor, setPaymentFor] = useState("");
    useEffect(() => {
        const token = sessionStorage.getItem("access_token");
        if (token) {
            setIsLoggedIn(true);
            // Nếu getRegisterFormRequets() là async
            const fetchData = async () => {
                const data = await getRegisterFormRequets();
                if (data) {
                    setFullName(data.fullName || "");
                    setEmail(data.email || "");
                }
            };
            fetchData();
        }
    }, []);




    const handleRegister = async (e) => {
        e.preventDefault();

        const payload = {
            fullName,
            email,
            phone,
            gender,
            birthDate: birthDate || null,
            job,
            idStudent,
            schoolName,
            idNumber,
            idIssuedPlace,
            idIssuedDate: idIssuedDate || null,
            courseId,
            paymentMethod,
            amount,
            billImage,
            paymentStatus,
            paidAt: paidAt || null,
            note,
            paymentFor
        };

        // Log để kiểm tra giá trị trước khi gửi
        console.log("📦 Payload chuẩn bị gửi lên API:", payload);

        try {
            const data = await updateFormByLogin(payload);
            console.log("✅ API Response:", data);

            if (data) {
                toast.success("Đăng ký thành công!");
                navigate("/courses");
            } else {
                toast.error("Đăng ký thất bại!");
            }
        } catch (err) {
            console.error("❌ Lỗi khi gọi API:", err);
            toast.error("Có lỗi khi đăng ký!");
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const token = localStorage.getItem("token");

            if (token) {
                // User đã đăng nhập
                const res = await updateFormByLogin(email, fullName, phone, gender, birthDate, job, idStudent, schoolName, idNumber, idIssuedPlace, idIssuedDate, courseId, paymentMethod, amount, billImage, paymentStatus, paidAt, note, paymentFor);
                if (res.status === 200) {


                    navigate("/SuccessPage");

                }
            } else {
                // User chưa đăng nhập
                const res = await axios.post(
                    "http://localhost:8080/api/enrollments",
                    { email, fullName, phone, gender, birthDate, job, idStudent, schoolName, idNumber, idIssuedPlace, idIssuedDate, courseId, paymentMethod, amount, billImage, paymentStatus, paidAt, note, paymentFor }
                );

                if (res.status === 200) {
                    navigate("/SuccessPage");
                }
            }
        } catch (err) {
            console.error("Lỗi khi gửi đăng ký:", err);
            alert("Đăng ký thất bại, vui lòng thử lại!");
        }
    };





    return (
        <div className="bg-gray-50 min-h-screen py-10 px-4">
            <div className="max-w-4xl mx-auto space-y-10">
                <h1 className="text-red-600 font-bold text-lg text-center md:text-lg">
                    TUYỂN SINH CÁC KHÓA HỌC NGẮN HẠN 2025
                </h1>
                {/* THÔNG TIN TUYỂN SINH + QR */}
                <section className="bg-white rounded-xl shadow-md p-6 md:flex md:justify-between gap-6">
                    <div className="md:w-1/2 space-y-2">
                        <h3 className="font-bold">Bước 1: Điền thông tin cá nhân vào các mục bên dưới:</h3>
                        <ul className="text-sm text-gray-700 list-disc list-inside">
                            <li>Nhóm 3-4 SV: giảm 10% học phí</li>
                            <li>Nhóm 5 SV: giảm 15% học phí</li>
                            <li>Nhóm 10 SV trở lên: giảm 20% học phí</li>
                            <li>
                                Đăng ký nhóm gửi link: <a className="text-blue-500 underline" href="https://by.com.vn/EMxGW">https://by.com.vn/EMxGW</a> & gửi file qua mail: <span className="font-semibold">flic@vku.udn.vn</span>
                            </li>
                            <li>Trung tâm sẽ xác nhận đăng ký hợp lệ và hướng dẫn nộp học phí</li>
                        </ul>
                    </div>
                    <div className="md:w-1/2 text-center mt-6 md:mt-0">
                        <h3 className="font-bold mb-2">Bước 2: Nộp học phí:</h3>
                        <img
                            src={qrcode}
                            alt="QR Code"
                            className="mx-auto w-80 h-80 border"
                        />
                        <p className="text-xs mt-1">
                            Nội dung CK: <strong>HoVaTen, LyDoNop, SĐT</strong><br />
                            (VD: Nguyen Van A, LT C#, 0905123456)
                        </p>
                    </div>
                </section>

                {/* FORM ĐĂNG KÝ */}
                <section className="space-y-8 max-w-md mx-auto bg-white rounded-xl shadow-md p-6 border border-blue-400">
                    <h2 className="text-red-500 font-bold text-center text-lg mb-4">Form đăng ký</h2>
                    <form className="space-y-4 max-w-md mx-auto" onSubmit={handleRegister}> {/* Adjusted width here */}
                        <div>
                            <label className="block text-gray-700 font-medium mb-1">Họ và tên đệm <span className="text-red-500">*</span></label>
                            <input
                                type="text"
                                placeholder="Nhập họ và tên"
                                value={fullName}
                                onChange={(event) => setFullName(event.target.value)}
                                disabled={isLoggedIn}
                                required
                                className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring focus:border-blue-500"
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700 font-medium mb-1">Email (Yêu cầu nhập đúng địa chỉ email để nhận thông tin khoá học) <span className="text-red-500">*</span></label>
                            <input
                                type="email"
                                placeholder="Email của bạn"
                                value={email}
                                onChange={(event) => setEmail(event.target.value)}
                                disabled={isLoggedIn}
                                required
                                className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring focus:border-blue-500"
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700 font-medium mb-1">Nhập lại Email <span className="text-red-500">*</span></label>
                            <input
                                type="email"
                                placeholder="Email của bạn"
                                value={email}
                                onChange={(event) => setEmail(event.target.value)}
                                disabled={isLoggedIn}
                                required
                                className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring focus:border-blue-500"
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700 font-medium mb-1">Mã sinh viên (Nếu là sinh viên)</label>
                            <input
                                type="text"
                                placeholder="Mã sinh viên"
                                value={idStudent}
                                onChange={(event) => setIdStudent(event.target.value)}
                                className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring focus:border-blue-500"
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700 font-medium mb-1">CCCD (Nếu không phải là sinh viên)</label>
                            <input
                                type="email"
                                placeholder="CCCD"
                                value={idNumber}
                                onChange={(event) => setIdNumber(event.target.value)}
                                className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring focus:border-blue-500"
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700 font-medium mb-1">Giới tính <span className="text-red-500">*</span></label>
                            <div className="flex items-center">
                                <div className="mr-4">
                                    <input
                                        type="radio"
                                        id="male"
                                        name="gender"
                                        value="male"
                                        onChange={(event) => setGender(event.target.value)}
                                        required
                                        className="mr-2"
                                    />
                                    <label htmlFor="male" className="text-gray-700">Nam</label>
                                </div>
                                <div>
                                    <input
                                        type="radio"
                                        id="female"
                                        name="gender"
                                        value="female"
                                        onChange={(event) => setGender(event.target.value)}
                                        required
                                        className="mr-2"
                                    />
                                    <label htmlFor="female" className="text-gray-700">Nữ</label>
                                </div>
                            </div>
                        </div>
                        <div>
                            <label className="block text-gray-700 font-medium mb-1">Ngày tháng năm sinh <span className="text-red-500">*</span></label>
                            <input
                                type="date"
                                value={birthDate}
                                onChange={(event) => setBirthDate(event.target.value)}
                                required
                                className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring focus:border-blue-500"
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700 font-medium mb-1">Chọn khoá học <span className="text-red-500">*</span></label>
                            <select
                                value={courseId}
                                onChange={(event) => setCourseId(event.target.value)}
                                required
                                className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring focus:border-blue-500">
                                <option value="">-- Khoá học --</option>
                                {dataCourse.map((course) => (
                                    <option key={course.id} value={course.id}>
                                        {course.title}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label className="block text-gray-700 font-medium mb-1">Hình thức đăng ký <span className="text-red-500">*</span></label>
                            <div className="flex items-center">
                                <div className="mr-4">
                                    <input
                                        type="radio"
                                        id="individual"
                                        name="registrationType"
                                        value="individual"
                                        onChange={(event) => setPaymentFor(event.target.value)}
                                        required
                                        className="mr-2"
                                    />
                                    <label htmlFor="individual" className="text-gray-700">Cá nhân</label>
                                </div>
                                <div>
                                    <input
                                        type="radio"
                                        id="group"
                                        name="registrationType"
                                        value="group"
                                        onChange={(event) => setPaymentFor(event.target.value)}
                                        required
                                        className="mr-2"
                                    />
                                    <label htmlFor="group" className="text-gray-700">Nhóm</label>
                                </div>
                            </div>
                        </div>

                        <div>
                            <label className="block text-gray-700 font-medium mb-1">Tên các thành viên (Nếu ĐK theo nhóm)</label>
                            <input
                                type="email"
                                value={note}
                                onChange={(event) => setNote(event.target.value)}
                                placeholder="Ví dụ: Nguyễn Văn A, Nguyễn Văn B, ..."
                                className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring focus:border-blue-500"
                            />
                        </div>
                        <div>
                            <p className="font-medium">
                                Minh chứng nộp học phí{" "}
                                <span className="font-normal">
                                    (Có thể bỏ qua bước này nếu bạn nộp học phí trực tiếp)
                                </span>
                            </p>
                            <p className="text-sm text-gray-600 mb-2">
                                Tải 1 tệp được hỗ trợ lên. Kích thước tối đa 10 MB.
                            </p>

                            {/* Nút chọn tệp */}
                            <label className="inline-block border rounded px-6 py-2 cursor-pointer hover:bg-gray-50">
                                <span className="text-blue-500">Thêm tệp</span>
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={(event) => {
                                        if (event.target.files.length > 0) {
                                            const file = event.target.files[0];
                                            const maxSize = 10 * 1024 * 1024; // 10MB

                                            if (file.size > maxSize) {
                                                alert("❌ File vượt quá dung lượng tối đa 10MB!");
                                                event.target.value = ""; // reset input
                                                return;
                                            }

                                            setBillImage(file);
                                        }
                                    }}
                                    className="hidden"
                                />
                            </label>

                            {/* Hiển thị thông tin file đã chọn */}
                            {billImage && (
                                <div className="mt-2 text-sm text-gray-700">
                                    <p>📄 <strong>{billImage.name}</strong> ({(billImage.size / 1024).toFixed(2)} KB)</p>

                                    {/* Nếu là ảnh thì preview */}
                                    {billImage.type.startsWith("image/") && (
                                        <img
                                            src={URL.createObjectURL(billImage)}
                                            alt="Preview"
                                            className="mt-2 max-h-48 rounded border"
                                        />
                                    )}
                                </div>
                            )}
                        </div>


                        <div className="flex justify-center mt-4">
                            <button
                                type="submit"
                                onClick={handleSubmit}
                                className="bg-red-600 hover:bg-red-700 text-white font-semibold px-6 py-2 rounded shadow"
                            >
                                Gửi đăng ký
                            </button>
                        </div>

                    </form>
                    <p className="text-xs text-center mt-4 text-gray-600">
                        *Nếu cần được hỗ trợ, hãy liên hệ ngay: <span className="text-red-500 font-semibold">0905-603-504</span> (Cô Ngân) <br />
                        Hoặc trực tiếp tại: <span className="text-blue-600 font-semibold">Phòng KE105</span> – Trường ĐH CNTT&TT Việt – Hàn
                    </p>
                </section>
            </div>
        </div>
    );
}
