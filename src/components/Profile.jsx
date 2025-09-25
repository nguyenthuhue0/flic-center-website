import { FaInfoCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Profile = ({
  fullName,
  role,
  avatar_url,
  studentId,
  school,
  gender,
  birthday,
  ethnicity,
  idNumber,
  idIssueDay,
  idIssuePlace,
  email,
  phone,
}) => {
  const navigate = useNavigate();

  const handleEditClick = () => {
    navigate("/student/studentprofileEdit");
  };
  const getRoleName = (role) => {
    switch (role) {
      case "STUDENT":
        return "Học viên";
      case "LECTURER":
        return "Giảng viên";
      case "ADMIN":
        return "Quản trị viên";
      case "USER":
        return "Người dùng";
      default:
        return "Không xác định";
    }
  };
  return (
    <div className="min-h-screen p-5 font-sans bg-gray-50 dark:bg-[#18181b] transition-colors duration-300">
      <div className="mx-auto bg-white dark:bg-[#232326] rounded-xl shadow-md p-6 space-y-6 transition-colors">
        {/* Avatar + tên + chức vụ */}
        <div className="flex items-center justify-between border-b border-gray-300 dark:border-gray-700 pb-4">
          <div className="flex items-center gap-6">
            <div className="relative group">
              <img
                src={avatar_url || null}
                alt="Avatar"
                className="w-28 h-28 rounded-full border border-gray-300 dark:border-gray-600 object-cover"
              />
            </div>

            <div>
              <h1 className="text-3xl font-bold text-black-800 dark:text-gray-100">{fullName}</h1>
              <p className="text-red-600 dark:text-red-400 font-medium text-xl mt-2">
                {getRoleName(role)}
              </p>
            </div>
          </div>

          <button
            onClick={handleEditClick}
            className="bg-blue-600 dark:bg-blue-700 text-white px-4 py-2 rounded hover:bg-blue-700 dark:hover:bg-blue-800 text-sm cursor-pointer transition-colors"
          >
            Sửa thông tin
          </button>
        </div>

        {/* Thông tin cá nhân */}
        <div className="space-y-4">
          <SectionTitle title="Thông tin cá nhân" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <ReadOnlyInput label="Mã sinh viên" value={studentId} />
            <ReadOnlyInput label="Trường" value={school} />
            <ReadOnlyInput label="Giới tính" value={gender} />
            <ReadOnlyInput label="Ngày sinh" value={birthday} />
            <ReadOnlyInput label="Dân tộc" value={ethnicity} />
            <ReadOnlyInput label="Số CCCD" value={idNumber} />
            <ReadOnlyInput label="Ngày cấp" value={idIssueDay} />
            <ReadOnlyInput label="Nơi cấp" value={idIssuePlace} />
          </div>
        </div>

        {/* Thông tin liên hệ */}
        <div className="space-y-4 border-t border-gray-300 dark:border-gray-700 pt-4">
          <SectionTitle title="Thông tin liên hệ" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <ReadOnlyInput label="Email" value={email} />
            <ReadOnlyInput label="Số điện thoại" value={phone} />
          </div>
        </div>
      </div>
    </div>
  );
};

const ReadOnlyInput = ({ label, value }) => (
  <div className="flex flex-col">
    <label className="mb-1 text-gray-700 dark:text-gray-200 font-medium">{label}</label>
    <input
      type="text"
      value={value}
      disabled
      className="border border-gray-300 dark:border-gray-600 rounded px-3 py-2 bg-gray-100 dark:bg-[#232326] text-gray-700 dark:text-gray-100 cursor-not-allowed"
    />
  </div>
);

const SectionTitle = ({ title }) => (
  <h2 className="text-2xl font-semibold text-blue-700 dark:text-blue-300 flex items-center gap-2">
    <span className="text-xl">
      <span className="inline-block">
        <FaInfoCircle />
      </span>
    </span>{" "}
    {title}
  </h2>
);

export default Profile;
