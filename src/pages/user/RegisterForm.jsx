import React from "react";
import qrcode from "../../assets/images/qrcode.png"
export default function RegisterForm() {
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
                    <form className="space-y-4 max-w-md mx-auto"> {/* Adjusted width here */}
                        <div>
                            <label className="block text-gray-700 font-medium mb-1">Họ và tên đệm <span className="text-red-500">*</span></label>
                            <input
                                type="text"
                                placeholder="Nhập họ và tên đệm"
                                required
                                className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring focus:border-blue-500"
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700 font-medium mb-1">Tên <span className="text-red-500">*</span></label>
                            <input
                                type="text"
                                placeholder="Nhập tên"
                                required
                                className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring focus:border-blue-500"
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700 font-medium mb-1">Email (Yêu cầu nhập đúng địa chỉ email để nhận thông tin khoá học) <span className="text-red-500">*</span></label>
                            <input
                                type="email"
                                placeholder="Email của bạn"
                                required
                                className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring focus:border-blue-500"
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700 font-medium mb-1">Nhập lại Email <span className="text-red-500">*</span></label>
                            <input
                                type="email"
                                placeholder="Email của bạn"
                                required
                                className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring focus:border-blue-500"
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700 font-medium mb-1">Số điện thoại <span className="text-red-500">*</span></label>
                            <input
                                type="text"
                                placeholder="Số điện thoại"
                                required
                                className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring focus:border-blue-500"
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700 font-medium mb-1">Mã sinh viên (Nếu là sinh viên)</label>
                            <input
                                type="email"
                                placeholder="Mã sinh viên"
                                className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring focus:border-blue-500"
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700 font-medium mb-1">CCCD (Nếu không phải là sinh viên)</label>
                            <input
                                type="email"
                                placeholder="CCCD"
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
                                required
                                className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring focus:border-blue-500"
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700 font-medium mb-1">Chọn khoá học <span className="text-red-500">*</span></label>
                            <select required className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring focus:border-blue-500">
                                <option value="">-- Khoá học --</option>
                                <option value="giao-tiep">Tiếng Anh giao tiếp</option>
                                <option value="mos">Luyện thi MOS</option>
                                <option value="a2-b1">Luyện thi A2/B1</option>
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
                                placeholder="Ví dụ: Nguyễn Văn A, Nguyễn Văn B, ..."
                                className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring focus:border-blue-500"
                            />
                        </div>
                        <div className="flex justify-center mt-4">
                            <button
                                type="submit-button"
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
