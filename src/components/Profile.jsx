import { useState } from "react";
import { FaInfoCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const [avatar, setAvatar] = useState(null);
  const navigate = useNavigate()
  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) setAvatar(URL.createObjectURL(file));
  };

  const handleEditClick = () => {
    navigate("/student/studentprofile/1")
  };

  return (
    <div className="min-h-screen p-5 font-sans">
      <div className=" mx-auto bg-white rounded-xl shadow-md p-6 space-y-6">

        {/* Avatar + tên + chức vụ */}
        <div className="flex items-center justify-between border-b border-gray-300 pb-4">
          <div className="flex items-center gap-6">
            <div className="relative group">
              <img
                src={avatar || "https://via.placeholder.com/120"}
                alt="Avatar"
                className="w-28 h-28 rounded-full border border-gray-300 object-cover"
              />
              <input
                type="text"
                accept="image/*"
                onChange={handleAvatarChange}
                className="absolute bottom-0 left-0 w-full h-full opacity-0 cursor-pointer"
                title="Thay đổi ảnh đại diện"
              />
              {/* <div className="absolute bottom-0 left-0 right-0 text-xs text-center bg-black bg-opacity-50 text-white py-1 rounded-b opacity-0 group-hover:opacity-100 transition">
                Thay ảnh
              </div> */}
            </div>

            <div>
              <h1 className="text-3xl font-bold text-black-800">Nguyễn Văn A</h1>
              <p className="text-red-600 font-medium text-xl mt-2">Học viên</p>
            </div>
          </div>

          <button
            onClick={handleEditClick}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 text-sm cursor-pointer"
          >
            Sửa thông tin
          </button>
        </div>

        {/* Thông tin cá nhân */}
        <div className="space-y-4">
          <SectionTitle title="Thông tin cá nhân" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <ReadOnlyInput label="Mã sinh viên" value="22IT333" />
            <ReadOnlyInput label="Trường" value="VKU" />
            <ReadOnlyInput label="Giới tính" value="Nam" />
            <ReadOnlyInput label="Ngày sinh" value="01/01/2002" />
            <ReadOnlyInput label="Dân tộc" value="Kinh" />
            <ReadOnlyInput label="Số CCCD" value="123456789012" />
            <ReadOnlyInput label="Ngày cấp" value="01/01/2020" />
            <ReadOnlyInput label="Nơi cấp" value="TP. Đà Nẵng" />
          </div>
        </div>

        {/* Thông tin liên hệ */}
        <div className="space-y-4 border-t border-gray-300 pt-4">
          <SectionTitle title="Thông tin liên hệ" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <ReadOnlyInput label="Email" value="sinhvien@vku.udn.vn" />
            <ReadOnlyInput label="Số điện thoại" value="0123456789" />
            <ReadOnlyInput label="Địa chỉ nơi ở" value="123 Trần Cao Vân" />
            <ReadOnlyInput label="Thành phố" value="Đà Nẵng" />
          </div>
        </div>
      </div>
    </div>
  );
};

const ReadOnlyInput = ({ label, value }) => (
  <div className="flex flex-col">
    <label className="mb-1 text-gray-700 font-medium">{label}</label>
    <input
      type="text"
      value={value}
      disabled
      className="border border-gray-300 rounded px-3 py-2 bg-gray-100 text-gray-700 cursor-not-allowed"
    />
  </div>
);

const SectionTitle = ({ title }) => (
  <h2 className="text-2xl font-semibold text-blue-700 flex items-center gap-2">
    <span className="text-xl"><span className="inline-block"><FaInfoCircle/></span></span> {title}
  </h2>
);

export default Profile;
