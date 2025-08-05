import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft, FaSave } from "react-icons/fa";

export default function AddLecturer() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    subject: "",
    status: "Đang giảng dạy",
    level: "",
    dob: "",
    address: "",
    gender: "",
    joinDate: new Date().toISOString().slice(0, 16),
    note: ""
  });

  const [avatar, setAvatar] = useState(null);
  const [preview, setPreview] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAvatar(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    console.log("Avatar file:", avatar);
  };

  const inputStyle =
    "w-full border-gray-300 focus:border-blue-400 focus:ring focus:ring-blue-100 text-[16px] p-3 rounded-xl shadow-sm transition-all duration-200 outline-none";

  return (
    <div className="p-6 flex justify-center ml-[250px]">
      <div className="w-full max-w-5xl">
        <h2 className="text-3xl font-bold text-blue-600 mb-2 flex items-center">
          <span className="mr-2">👨‍🏫</span> Chỉnh sửa thông tin giảng viên
        </h2>

        <p className="mb-4 text-gray-600">Nhập thông tin mới của giảng viên vào hệ thống.</p>

        <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-xl p-6 space-y-6">
          {/* Ảnh đại diện */}
          <div className="flex items-center space-x-6 mb-6">
            <div>
              <label htmlFor="avatarUpload" className="block font-medium mb-1 text-gray-700">
                🖼️ Ảnh đại diện
              </label>
              <input id="avatarUpload" type="file" accept="image/*" onChange={handleAvatarChange} className="text-sm" />
            </div>
            {preview && (
              <img
                src={preview}
                alt="Preview"
                className="w-24 h-24 object-cover rounded-full ring-4 ring-blue-300 shadow-md hover:scale-105 transition-transform duration-200"
              />
            )}
          </div>

          {/* Thông tin giảng viên */}
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block font-medium mb-1">👤 Họ tên</label>
              <input name="name" onChange={handleChange} value={formData.name} placeholder="Nhập họ tên" className={inputStyle} required />
            </div>
            <div>
              <label className="block font-medium mb-1">📞 Số điện thoại</label>
              <input name="phone" onChange={handleChange} value={formData.phone} placeholder="VD: 0912345678" className={inputStyle} required />
            </div>
            <div>
              <label className="block font-medium mb-1">📧 Email</label>
              <input name="email" onChange={handleChange} value={formData.email} placeholder="VD: giangvien@gmail.com" className={inputStyle} />
            </div>
            <div>
              <label className="block font-medium mb-1">📘 Môn giảng dạy</label>
              <input name="subject" onChange={handleChange} value={formData.subject} placeholder="VD: Toán, Lập trình C++..." className={inputStyle} />
            </div>
            <div>
              <label className="block font-medium mb-1">🎓 Trình độ chuyên môn</label>
              <input name="level" onChange={handleChange} value={formData.level} placeholder="VD: Thạc sĩ CNTT, Cử nhân Sư phạm..." className={inputStyle} />
            </div>
            <div>
              <label className="block font-medium mb-1">📍 Trạng thái</label>
              <select name="status" onChange={handleChange} value={formData.status} className={inputStyle}>
                <option>Đang giảng dạy</option>
                <option>Đã nghỉ</option>
                <option>Bảo lưu</option>
              </select>
            </div>
            <div>
              <label className="block font-medium mb-1">🎂 Ngày sinh</label>
              <input name="dob" type="date" onChange={handleChange} value={formData.dob} className={inputStyle} />
            </div>
            <div>
              <label className="block font-medium mb-1">🏠 Địa chỉ</label>
              <input name="address" onChange={handleChange} value={formData.address} placeholder="VD: 123 Nguyễn Trãi..." className={inputStyle} />
            </div>
            <div>
              <label className="block font-medium mb-1">🚻 Giới tính</label>
              <select name="gender" onChange={handleChange} value={formData.gender} className={inputStyle}>
                <option value="">-- Chọn --</option>
                <option value="Nam">Nam</option>
                <option value="Nữ">Nữ</option>
                <option value="Khác">Khác</option>
              </select>
            </div>
            <div>
              <label className="block font-medium mb-1">📅 Ngày vào làm</label>
              <input type="datetime-local" name="joinDate" value={formData.joinDate} onChange={handleChange} className={inputStyle} disabled />
            </div>
            <div className="col-span-3">
              <label className="block font-medium mb-1">📝 Ghi chú</label>
              <textarea name="note" onChange={handleChange} value={formData.note} placeholder="Ghi chú thêm (nếu có)" className={inputStyle}></textarea>
            </div>
          </div>

          {/* Nút thao tác */}
          <div className="flex justify-between mt-6">
            <button type="button" onClick={() => navigate("../LecturerManagement")} className="btn-outline">
              <FaArrowLeft className="inline mr-1" /> Quay lại
            </button>
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-xl shadow-md transition-all"
            >
              <FaSave className="inline mr-1" /> Lưu giảng viên
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
