import { useState } from "react";
import { FaCamera } from "react-icons/fa";
const StudentEditProfile = () => {
  const [formData, setFormData] = useState({
    avatar: null,
    fullName: "Nguyễn Văn A",
    role: "Học viên",
    studentId: "22IT333",
    school: "VKU",
    gender: "Nam",
    birthDate: "2002-01-01",
    ethnicity: "Kinh",
    idNumber: "123456789012",
    idIssueDate: "2020-01-01",
    idIssuePlace: "TP. Đà Nẵng",
    email: "sinhvien@vku.udn.vn",
    phone: "0123456789",
    address: "123 Trần Cao Vân",
    city: "Đà Nẵng",
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      setFormData({ ...formData, [name]: URL.createObjectURL(files[0]) });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSave = () => {
    alert("Đã lưu thông tin!");
    // Gửi dữ liệu lên server nếu cần
  };

  return (
    <div className="min-h-screen p-6 font-sans">
      <div className="mx-auto bg-white shadow-lg rounded-2xl p-8 space-y-8">
        <h1 className="text-4xl font-bold text-blue-700 text-center">
          Chỉnh sửa thông tin cá nhân
        </h1>

        {/* Avatar + Thông tin cơ bản */}
        <div className="flex flex-col md:flex-row items-center md:items-start gap-8 border-b border-gray-200 pb-6">
          {/* Avatar */}
          <div className="relative w-32 h-32 group">
            <img
              src={formData.avatar || "https://via.placeholder.com/120"}
              alt="Avatar"
              className="w-full h-full rounded-full object-cover border border-gray-300"
            />

            <div className="absolute inset-0 bg-white/40 bg-opacity-40 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity z-10">
              <span className="text-black text-sm flex items-center gap-1">
                <FaCamera className="w-4 h-4" />
                Sửa ảnh
              </span>
            </div>

            <input
              type="file"
              name="avatar"
              accept="image/*"
              onChange={handleChange}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-20"
              title="Chọn ảnh mới"
            />
          </div>

          {/* Họ tên + chức vụ */}
          <div className="flex-1 w-full grid grid-cols-1 md:grid-cols-2 gap-4">
            <EditableInput
              label="Họ và tên"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
            />
            <EditableInput
              label="Chức vụ"
              name="role"
              value={formData.role}
              onChange={handleChange}
            />
          </div>
        </div>

        {/* Thông tin cá nhân */}
        <Section title="Thông tin cá nhân">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <EditableInput
              label="Mã sinh viên"
              name="studentId"
              value={formData.studentId}
              onChange={handleChange}
            />
            <EditableInput
              label="Trường"
              name="school"
              value={formData.school}
              onChange={handleChange}
            />
            <EditableInput
              label="Giới tính"
              name="gender"
              value={formData.gender}
              onChange={handleChange}
            />
            <EditableInput
              label="Ngày sinh"
              name="birthDate"
              type="date"
              value={formData.birthDate}
              onChange={handleChange}
            />
            <EditableInput
              label="Dân tộc"
              name="ethnicity"
              value={formData.ethnicity}
              onChange={handleChange}
            />
            <EditableInput
              label="Số CCCD"
              name="idNumber"
              value={formData.idNumber}
              onChange={handleChange}
            />
            <EditableInput
              label="Ngày cấp"
              name="idIssueDate"
              type="date"
              value={formData.idIssueDate}
              onChange={handleChange}
            />
            <EditableInput
              label="Nơi cấp"
              name="idIssuePlace"
              value={formData.idIssuePlace}
              onChange={handleChange}
            />
          </div>
        </Section>

        {/* Thông tin liên hệ */}
        <Section title="Thông tin liên hệ">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <EditableInput
              label="Email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
            <EditableInput
              label="Số điện thoại"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
            />
            <EditableInput
              label="Địa chỉ nơi ở"
              name="address"
              value={formData.address}
              onChange={handleChange}
            />
            <EditableInput
              label="Thành phố"
              name="city"
              value={formData.city}
              onChange={handleChange}
            />
          </div>
        </Section>

        {/* Nút điều khiển */}
        <div className="flex justify-end gap-4 pt-4 border-t border-gray-200">
          <button className="bg-gray-300 text-gray-800 px-5 py-2 rounded hover:bg-gray-400 cursor-pointer">
            Hủy bỏ
          </button>
          <button
            onClick={handleSave}
            className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 cursor-pointer"
          >
            Lưu thay đổi
          </button>
        </div>
      </div>
    </div>
  );
};

const EditableInput = ({ label, name, value, onChange, type = "text" }) => (
  <div className="flex flex-col">
    <label className="mb-1 text-gray-700 font-medium">{label}</label>
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      className="border border-gray-300 rounded px-3 py-2 bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
  </div>
);

const Section = ({ title, children }) => (
  <div className="space-y-4">
    <h2 className="text-2xl font-semibold text-blue-700">{title}</h2>
    {children}
  </div>
);

export default StudentEditProfile;
