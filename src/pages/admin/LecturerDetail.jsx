import { useParams } from "react-router-dom";
import {
  FaUser,
  FaPhone,
  FaEnvelope,
  FaChalkboardTeacher,
  FaBirthdayCake,
  FaMapMarkerAlt,
  FaCheckCircle,
} from "react-icons/fa";
import { MdSchool, MdColorLens } from "react-icons/md";
import { HiOutlineUserGroup } from "react-icons/hi";
import { motion } from "framer-motion";

export default function LecturerDetail() {
  const { id } = useParams();

  const lecturer = {
    id,
    name: "Trần Thị B",
    phone: "0912345678",
    email: "tranb@gmail.com",
    dob: "1985-05-10",
    gender: "Nữ",
    address: "456 Đường Giảng Dạy, Q5, TP.HCM",
    favoriteColor: "Tím",
    department: "Công nghệ thông tin",
    courses: ["Lập trình Java", "Cơ sở dữ liệu", "Thiết kế Web"],
    experience: "10 năm giảng dạy",
    note: "Giảng viên nhiệt huyết, yêu thích đổi mới phương pháp giảng dạy.",
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="ml-[250px] min-h-screen bg-gradient-to-br from-[#eef2fb] to-[#f6f9ff] p-10 text-[#2B3674] font-sans"
    >
      <div className="max-w-6xl mx-auto bg-white shadow-xl rounded-3xl px-10 py-10 space-y-10 animate-fadeIn">
        <div className="flex items-center gap-6 border-b pb-6">
          <motion.img
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
            src={`https://api.dicebear.com/7.x/thumbs/svg?seed=${lecturer.name}`}
            alt="Avatar"
            className="w-24 h-24 rounded-full border shadow-md"
          />

          <div>
            <h2 className="text-4xl font-bold text-[#1E2B6A] flex items-center gap-2">
              <FaChalkboardTeacher /> Giảng viên #{lecturer.id}
            </h2>
            <p className="text-gray-500 mt-1">Thông tin chi tiết của giảng viên</p>
          </div>
        </div>

        <section className="grid md:grid-cols-2 gap-10">
          <CardGroup title="👤 Thông tin cá nhân">
            <Info icon={<FaUser />} label="Họ tên" value={lecturer.name} />
            <Info icon={<FaPhone />} label="Số điện thoại" value={lecturer.phone} />
            <Info icon={<FaEnvelope />} label="Email" value={lecturer.email} />
            <Info icon={<FaBirthdayCake />} label="Ngày sinh" value={lecturer.dob} />
            <Info icon={<MdColorLens />} label="Màu yêu thích" value={lecturer.favoriteColor} />
            <Info icon={<FaMapMarkerAlt />} label="Địa chỉ" value={lecturer.address} />
            <Info label="Giới tính" value={lecturer.gender} />
          </CardGroup>

          <CardGroup title="🎓 Thông tin giảng dạy">
            <Info icon={<MdSchool />} label="Bộ môn" value={lecturer.department} />
            <Info label="Kinh nghiệm" value={lecturer.experience} />
            <div className="col-span-2">
              <p className="text-xs font-semibold text-gray-500">Khoá học phụ trách:</p>
              <ul className="list-disc list-inside text-[#2B3674] font-medium ml-4">
                {lecturer.courses.map((course, i) => (
                  <li key={i}>{course}</li>
                ))}
              </ul>
            </div>
          </CardGroup>
        </section>

        <section>
          <h3 className="text-md font-semibold text-gray-500 mb-2">📝 Ghi chú</h3>
          <p className="italic text-[#4B5585] bg-gray-50 rounded-xl p-4 border border-gray-200 shadow-inner">
            {lecturer.note}
          </p>
        </section>
      </div>
    </motion.div>
  );
}

function Info({ label, value, icon }) {
  return (
    <div className="space-y-1 hover:bg-gray-50 rounded-md p-2 transition">
      <p className="text-xs font-semibold text-gray-500 flex items-center gap-1">
        {icon} {label}
      </p>
      <p className="text-[#2B3674] font-medium">{value}</p>
    </div>
  );
}

function CardGroup({ title, children }) {
  return (
    <div className="bg-[#F9FAFB] border border-gray-200 rounded-xl p-6 shadow-sm space-y-4">
      <h3 className="text-lg font-semibold text-[#1E2B6A]">{title}</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">{children}</div>
    </div>
  );
}
