import { useEffect, useState } from "react";
import { FaCamera } from "react-icons/fa";
import { getProfile, updateProfile, uploadAvatar } from "../../services/Student/Profie";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
const StudentEditProfile = () => {
  const navigate = useNavigate()
const [dataProfile, setDataProfile] = useState({});
const [fullName, setFullName] = useState("");
const [role, setRole] = useState("");
const [studentId, setStudentId] = useState("");
const [schoolName, setSchoolName] = useState("");
const [gender, setGender] = useState("");
const [birthday, setBirthday] = useState("");
const [ethnicity, setEthnicity] = useState("");
const [idNumber, setIdNumber] = useState("");
const [idIssueDay, setIdIssueDay] = useState("");
const [idIssuePlace, setIdIssuePlace] = useState("");
const [email, setEmail] = useState("");
const [phone, setPhone] = useState("");
const [linkImage, setLinkImage] = useState("")
// Lấy dataProfile từ API
useEffect(() => {
  fetchStudentProfile();
}, []);

const fetchStudentProfile = async () => {
  let data = await getProfile();
  setDataProfile(data);
};

// Khi dataProfile thay đổi => cập nhật các state liên quan
useEffect(() => {
  if (dataProfile) {
    setFullName(dataProfile.fullName || "");
    setRole(getRoleName(dataProfile.role) || "");
    setStudentId(dataProfile.studentId || "");
    setSchoolName(dataProfile.schoolName || "");
    setGender(dataProfile.gender || "");
    setBirthday(dataProfile.birthDate || "");
    setEthnicity(dataProfile.ethnicity || ""); 
    setIdNumber(dataProfile.idNumber || "");
    setIdIssueDay(dataProfile.idIssueDate || "");
    setIdIssuePlace(dataProfile.idIssuePlace || "");
    setEmail(dataProfile.email || "");
    setPhone(dataProfile.phone || "");
    setLinkImage(dataProfile.avatarUrl || "");
  }
}, [dataProfile]);

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

  const handleSave = async() => {
    console.log(birthday);
    
    let data = await updateProfile(fullName, phone, gender, birthday, schoolName, ethnicity)
    console.log(data);
    
    if(data){
      toast.success("Cập nhật thông tin học viên thành công!")
      navigate('/student/studentprofile')
    }

  };
const handleFileChange = async (e) => {
  const file = e.target.files[0];
  if (!file) return;

      let data = await uploadAvatar(file);
    if (data) {
          toast.success("Cập nhật ảnh thành công!");
      setLinkImage(data.imageUrl)
    }
};

  return (
    <div className="min-h-screen p-6 font-sans bg-gray-50 dark:bg-[#18181b] transition-colors duration-300">
      <div className="mx-auto bg-white dark:bg-[#232326] shadow-lg rounded-2xl p-8 space-y-8 transition-colors">
        <h1 className="text-4xl font-bold text-blue-700 dark:text-blue-300 text-center">
          Chỉnh sửa thông tin cá nhân
        </h1>

        {/* Avatar + Thông tin cơ bản */}
        <div className="flex flex-col md:flex-row items-center md:items-start gap-8 border-b border-gray-200 dark:border-gray-700 pb-6">
          {/* Avatar */}
          <div className="relative w-32 h-32 group">
            <img
              src={linkImage || null}
              alt="Avatar"
              className="w-full h-full rounded-full object-cover border border-gray-300 dark:border-gray-600"
            />

            <div className="absolute inset-0 bg-white/40 dark:bg-black/40 bg-opacity-40 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity z-10">
              <span className="text-black dark:text-gray-200 text-sm flex items-center gap-1">
                <FaCamera className="w-4 h-4" />
                Sửa ảnh
              </span>
            </div>

            <input
              type="file"
              name="avatar"
              accept="image/*"
              onChange={handleFileChange}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-20"
              title="Chọn ảnh mới"
            />
          </div>

          {/* Họ tên + chức vụ */}
          <div className="flex-1 w-full grid grid-cols-1 md:grid-cols-2 gap-4">
            <EditableInput
              label="Họ và tên"
              name="fullName"
              value={fullName}
              onChange={(event) => setFullName(event.target.value)}
            />
            <EditableInput
              label="Chức vụ"
              name="role"
              value={role}
              onChange={(event) => setRole(event.target.value)}
            />
          </div>
        </div>

        {/* Thông tin cá nhân */}
        <Section title="Thông tin cá nhân">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <EditableInput
              label="Mã sinh viên"
              name="studentId"
              value={studentId}
              onChange={(event) => setStudentId(event.target.value)}
            />
            <EditableInput
              label="Trường"
              name="school"
              value={schoolName}
              onChange={(event) => setSchoolName(event.target.value)}
            />
            <EditableInput
              label="Giới tính"
              name="gender"
              value={gender}
              onChange={(event) => setGender(event.target.value)}
            />
            <EditableInput
              label="Ngày sinh"
              name="birthDate"
              type="date"
              value={birthday}
              onChange={(event) => setBirthday(event.target.value)}
            />
            <EditableInput
              label="Dân tộc"
              name="ethnicity"
              value={ethnicity}
              onChange={(event) => setEthnicity(event.target.value)}
            />
            <EditableInput
              label="Số CCCD"
              name="idNumber"
              value={idNumber}
              onChange={(event) => setIdNumber(event.target.value)}
            />
            <EditableInput
              label="Ngày cấp"
              name="idIssueDate"
              type="date"
              value={idIssueDay}
              onChange={(event) => setIdIssueDay(event.target.value)}
            />
            <EditableInput
              label="Nơi cấp"
              name="idIssuePlace"
              value={idIssuePlace}
              onChange={(event) => setIdIssuePlace(event.target.value)}
            />
          </div>
        </Section>

        {/* Thông tin liên hệ */}
        <Section title="Thông tin liên hệ">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <EditableInput
              label="Email"
              name="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
            <EditableInput
              label="Số điện thoại"
              name="phone"
              value={phone}
              onChange={(event) => setPhone(event.target.value)}
            />
          </div>
        </Section>

        {/* Nút điều khiển */}
        <div className="flex justify-end gap-4 pt-4 border-t border-gray-200 dark:border-gray-700">
          <button
            className="bg-gray-300 dark:bg-gray-700 text-gray-800 dark:text-gray-100 px-5 py-2 rounded hover:bg-gray-400 dark:hover:bg-gray-600 cursor-pointer"
            onClick={() => navigate('/student/studentprofile')}
          >
            Hủy bỏ
          </button>
          <button
            onClick={handleSave}
            className="bg-blue-600 dark:bg-blue-700 text-white px-6 py-2 rounded hover:bg-blue-700 dark:hover:bg-blue-800 cursor-pointer"
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
    <label className="mb-1 text-gray-700 dark:text-gray-200 font-medium">{label}</label>
    <input
      type={type}
      name={name}
      value={value}
      disabled={name === "role"} // nếu name là role thì readonly
      onChange={onChange}
      className="border border-gray-300 dark:border-gray-600 rounded px-3 py-2 bg-white dark:bg-[#232326] text-gray-800 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
    />
  </div>
);

const Section = ({ title, children }) => (
  <div className="space-y-4">
    <h2 className="text-2xl font-semibold text-blue-700 dark:text-blue-300">{title}</h2>
    {children}
  </div>
);

export default StudentEditProfile;
