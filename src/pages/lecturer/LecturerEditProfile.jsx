import { useEffect, useState } from "react";
import { FaCamera } from "react-icons/fa";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import {
  getProfileLecturer,
  updateAvatarLecturer,
  updateProfileLecturer,
} from "../../services/Lecturer/Profile";
const LecturerEditProfile = () => {
  const navigate = useNavigate();
  const [dataProfile, setDataProfile] = useState({});
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [birthday, setBirthday] = useState("");
  const [birthPlace, setBirthPlace] = useState("");
  const [gender, setGender] = useState("");
  const [email, setEmail] = useState("");
  const [linkImage, setLinkImage] = useState("");
  const [degree, setDegree] = useState("");
  const [specialization, setSpecialization] = useState("");
  const [bio, setBio] = useState("");
  const [idNumber, setIdNumber] = useState("");
  useEffect(() => {
    fetchLecturerProfile();
  }, []);

  const fetchLecturerProfile = async () => {
    let data = await getProfileLecturer();
    setDataProfile(data);
  };
  useEffect(() => {
    if (dataProfile) {
      setFullName(dataProfile.fullName || "");
      setPhone(dataProfile.phone || "");
      setBirthday(dataProfile.birthDate || "");
      setBirthPlace(dataProfile.birthPlace || "");
      setGender(dataProfile.gender || "");
      setEmail(dataProfile.email || "");
      setLinkImage(dataProfile.profileImage || "");
      setDegree(dataProfile.degree || "");
      setSpecialization(dataProfile.specialization || "");
      setBio(dataProfile.bio || "");
    }
  }, [dataProfile]);

  const handleSave = async () => {
    let data = await updateProfileLecturer(
      fullName,
      phone,
      birthday,
      birthPlace,
      gender,
      email,
      linkImage,
      degree,
      specialization,
      bio
    );
    if (data) {
      toast.success("Cập nhật thông tin thành công!");
      navigate("/lecturer/lecturerinformation");
    }
  };
  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    let data = await updateAvatarLecturer(file);
    if (data) {
      toast.success("Cập nhật ảnh thành công!");
      setLinkImage(data.imageUrl);
    }
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
              src={linkImage || null}
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
            <EditableInput label="Chức vụ" name="role" value="Giảng viên" />
          </div>
        </div>

        {/* Thông tin cá nhân */}
        <Section title="Thông tin cá nhân">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <EditableInput
              label="Học vị"
              name="degree"
              value={degree}
              onChange={(event) => setDegree(event.target.value)}
            />
            <EditableInput
              label="Chuyên ngành"
              name="specialization"
              value={specialization}
              onChange={(event) => setSpecialization(event.target.value)}
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
              label="Nơi sinh"
              name="birthPlace"
              value={birthPlace}
              onChange={(event) => setBirthPlace(event.target.value)}
            />
            <EditableInput
              label="Số CCCD"
              name="idNumber"
              value={idNumber}
              onChange={(event) => setIdNumber(event.target.value)}
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-1">
            <EditableInput
              label="Kinh nghiệm"
              name="bio"
              value={bio}
              onChange={(event) => setBio(event.target.value)}
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
        <div className="flex justify-end gap-4 pt-4 border-t border-gray-200">
          <button
            className="bg-gray-300 text-gray-800 px-5 py-2 rounded hover:bg-gray-400 cursor-pointer"
            onClick={() => navigate("/student/studentprofile")}
          >
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
export default LecturerEditProfile;
