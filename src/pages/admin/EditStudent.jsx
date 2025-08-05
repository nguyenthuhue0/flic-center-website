import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft, FaSave } from "react-icons/fa";

export default function EditStudent() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    course: "",
    status: "Đang học",
    level: "",
    teacher: "",
    parentEmail: "",
    relationship: "",
    favoriteColor: "",
    dob: "",
    address: "",
    gender: "",
    registrationTime: new Date().toISOString().slice(0, 16),
    sessionsAttended: "",
    tuitionStatus: "Đã đóng",
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
  "w-full  border-gray-300 focus:border-pink-400 focus:ring focus:ring-pink-100 text-[16px] p-3 rounded-xl shadow-sm transition-all duration-200 outline-none";

  return (
    <div className="p-6 flex justify-center ml-[250px]">
      <div className="w-full max-w-6xl">
        <h2 className="text-3xl font-bold text-pink-600 mb-2 flex items-center">
  <span className="mr-2">🌸</span> Chỉnh sửa thông tin học viên
</h2>

        <p className="mb-4 text-gray-600">Nhập lại thông tin học viên mới.</p>

        <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-xl p-6 space-y-6">

          {/* Tải ảnh đại diện */}
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
  className="w-24 h-24 object-cover rounded-full ring-4 ring-pink-300 shadow-md hover:scale-105 transition-transform duration-200"
/>

            )}
          </div>

          {/* Thông tin học viên */}
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
              <input name="email" onChange={handleChange} value={formData.email} placeholder="VD: ten@gmail.com" className={inputStyle} />
            </div>

            <div>
              <label className="block font-medium mb-1">📘 Lớp học</label>
              <input name="course" onChange={handleChange} value={formData.course} placeholder="VD: Lập trình C++" className={inputStyle} />
            </div>
            <div>
              <label className="block font-medium mb-1">🎓 Trình độ đầu vào</label>
              <input name="level" onChange={handleChange} value={formData.level} placeholder="VD: Lớp 1, Mẫu giáo..." className={inputStyle} />
            </div>
            <div>
              <label className="block font-medium mb-1">👨‍🏫 Giáo viên phụ trách</label>
              <input name="teacher" onChange={handleChange} value={formData.teacher} placeholder="VD: Cô Lan, Thầy Hùng..." className={inputStyle} />
            </div>

            <div>
              <label className="block font-medium mb-1">📍 Trạng thái</label>
              <select name="status" onChange={handleChange} value={formData.status} className={inputStyle}>
                <option>Đang học</option>
                <option>Đã nghỉ</option>
                <option>Bảo lưu</option>
              </select>
            </div>
            <div>
              <label className="block font-medium mb-1">🎨 Màu yêu thích</label>
              <input name="favoriteColor" onChange={handleChange} value={formData.favoriteColor} placeholder="VD: Xanh dương, Hồng..." className={inputStyle} />
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
              <label className="block font-medium mb-1">⏰ Thời gian đăng ký</label>
              <input type="datetime-local" name="registrationTime" value={formData.registrationTime} onChange={handleChange} className={inputStyle} disabled />
            </div>
            <div>
              <label className="block font-medium mb-1">🧮 Số buổi đã học</label>
              <input name="sessionsAttended" onChange={handleChange} value={formData.sessionsAttended} placeholder="VD: 10" type="number" className={inputStyle} />
            </div>
            <div>
              <label className="block font-medium mb-1">💰 Tình trạng học phí</label>
              <select name="tuitionStatus" value={formData.tuitionStatus} onChange={handleChange} className={inputStyle}>
                <option>Đã đóng</option>
                <option>Còn nợ</option>
                <option>Đang xem xét</option>
              </select>
            </div>

            <div className="col-span-3">
              <label className="block font-medium mb-1">📝 Ghi chú</label>
              <textarea name="note" onChange={handleChange} value={formData.note} placeholder="Ghi chú thêm (nếu có)" className={inputStyle}></textarea>
            </div>
          </div>

          {/* Thông tin phụ huynh */}
          <hr className="my-4" />
          <h4 className="text-lg font-semibold text-gray-700">👨‍👩‍👧 Thông tin phụ huynh</h4>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block font-medium mb-1">📧 Email phụ huynh</label>
              <input name="parentEmail" onChange={handleChange} value={formData.parentEmail} placeholder="VD: phuhuynh@gmail.com" className={inputStyle} />
            </div>
            <div>
              <label className="block font-medium mb-1">🤝 Mối quan hệ</label>
              <input name="relationship" onChange={handleChange} value={formData.relationship} placeholder="VD: Cha, Mẹ, Anh/Chị..." className={inputStyle} />
            </div>
          </div>

          {/* Nút thao tác */}
          <div className="flex justify-between mt-6">
            <button type="button" onClick={() => navigate(-1)} className="btn-outline">
              <FaArrowLeft className="inline mr-1" /> Quay lại
            </button>
            <button
  type="submit"
  className="bg-pink-500 hover:bg-pink-600 text-white font-semibold py-2 px-4 rounded-xl shadow-md transition-all"
>
  <FaSave className="inline mr-1" /> Lưu học viên
</button>

          </div>
        </form>
      </div>
    </div>
  );
}
