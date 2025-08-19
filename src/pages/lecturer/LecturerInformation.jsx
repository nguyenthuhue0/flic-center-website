import { FaInfoCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { getProfileLecturer } from "../../services/Lecturer/Profile";
import { useEffect, useState } from "react";

const LecturerInformation = () => {
  const [dataProfile, setDataProfile] = useState({});
  const navigate = useNavigate();
  useEffect(() => {
    fetchDataProfileLecturer();
  }, []);
  const fetchDataProfileLecturer = async () => {
    let data = await getProfileLecturer();
    if (data) {
      setDataProfile(data);
    }
  };
  const handleEditClick = () => {
    navigate("/lecturer/lecturerinformationEdit");
  };
  return (
    <div className="min-h-screen p-5 font-sans">
      <div className=" mx-auto bg-white rounded-xl shadow-md p-6 space-y-6">
        {/* Avatar + tên + chức vụ */}
        <div className="flex items-center justify-between border-b border-gray-300 pb-4">
          <div className="flex items-center gap-6">
            <div className="relative group">
              <img
                src={dataProfile.profileImage || null}
                alt="Avatar"
                className="w-28 h-28 rounded-full border border-gray-300 object-cover"
              />
            </div>

            <div>
              <h1 className="text-3xl font-bold text-black-800">
                {dataProfile.fullName}
              </h1>
              <p className="text-red-600 font-medium text-xl mt-2">
                Giảng viên
              </p>
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
            <ReadOnlyInput label="Học vị" value={dataProfile.degree} />
            <ReadOnlyInput
              label="Chuyên ngành"
              value={dataProfile.specialization}
            />
            <ReadOnlyInput label="Giới tính" value={dataProfile.gender} />
            <ReadOnlyInput label="Ngày sinh" value={dataProfile.birthday} />
            <ReadOnlyInput label="Nơi sinh" value={dataProfile.birthPlace} />
            <ReadOnlyInput label="Số CCCD" value="" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-1 text-sm">
            <ReadOnlyInput label="Kinh nghiệm" value={dataProfile.bio} />
          </div>
        </div>

        {/* Thông tin liên hệ */}
        <div className="space-y-4 border-t border-gray-300 pt-4">
          <SectionTitle title="Thông tin liên hệ" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <ReadOnlyInput label="Email" value={dataProfile.email} />
            <ReadOnlyInput label="Số điện thoại" value={dataProfile.phone} />
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
      value={value || ""}
      disabled
      className="border border-gray-300 rounded px-3 py-2 bg-gray-100 text-gray-700 cursor-not-allowed"
    />
  </div>
);

const SectionTitle = ({ title }) => (
  <h2 className="text-2xl font-semibold text-blue-700 flex items-center gap-2">
    <span className="text-xl">
      <span className="inline-block">
        <FaInfoCircle />
      </span>
    </span>{" "}
    {title}
  </h2>
);

export default LecturerInformation;
