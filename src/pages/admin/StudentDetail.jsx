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

export default function StudentDetail() {
  const { id } = useParams();

  const student = {
    id,
    name: "Nguyễn Văn A",
    phone: "0988123456",
    email: "vana@gmail.com",
    course: "Lập trình Java",
    status: "Đang học",
    level: "Trung cấp",
    teacher: "Cô Mai",
    parentEmail: "phuhuynh@gmail.com",
    relationship: "Cha",
    favoriteColor: "Xanh dương",
    dob: "2000-01-01",
    address: "123 Đường Lập Trình, Q1, TP.HCM",
    gender: "Nam",
    registrationTime: "2025-08-04T10:00",
    sessionsAttended: "15",
    tuitionStatus: "Đã đóng",
    note: "Học viên chăm chỉ, thường xuyên đặt câu hỏi.",
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="ml-[250px] min-h-screen bg-gradient-to-br from-[#eef2fb] to-[#f6f9ff] p-10 text-[#2B3674] font-sans"
    >
      <div className="max-w-6xl mx-auto bg-white shadow-xl rounded-3xl px-10 py-10 space-y-10 animate-fadeIn">
        {/* Header */}
        <div className="flex items-center gap-6 border-b pb-6">
          <motion.img
  animate={{ scale: [1, 1.1, 1] }}
  transition={{ repeat: Infinity, duration: 1.5 }}
  src={`https://api.dicebear.com/7.x/thumbs/svg?seed=${student.name}`}
  alt="Avatar"
  className="w-24 h-24 rounded-full border shadow-md"
/>

          <div>
            <h2 className="text-4xl font-bold text-[#1E2B6A] flex items-center gap-2">
              <FaUser /> Học viên #{student.id}
            </h2>
            <p className="text-gray-500 mt-1">Thông tin chi tiết của học viên</p>
          </div>
        </div>

        {/* Mini Stats */}
        <div className="grid grid-cols-3 gap-6 text-center">
          <div className="bg-blue-100 p-4 rounded-xl shadow-md">
            <p className="text-xl font-bold text-blue-800">{student.sessionsAttended}</p>
            <p className="text-sm text-blue-700">Buổi đã học</p>
          </div>
          <div className="bg-green-100 p-4 rounded-xl shadow-md">
            <p className="text-xl font-bold text-green-800">{student.status}</p>
            <p className="text-sm text-green-700">Tình trạng học</p>
          </div>
          <div className="bg-yellow-100 p-4 rounded-xl shadow-md">
            <p className="text-xl font-bold text-yellow-800">{student.tuitionStatus}</p>
            <p className="text-sm text-yellow-700">Học phí</p>
          </div>
        </div>

        {/* Timeline */}
        <div className="border-l-4 border-[#CC2B2B] pl-4 ml-2 mt-10 space-y-4">
          <p className="text-sm text-gray-500">📅 01/08/2025 - Đăng ký khoá học</p>
          <p className="text-sm text-gray-500">📘 05/08/2025 - Buổi học đầu tiên</p>
          <p className="text-sm text-gray-500">🏆 10/08/2025 - Đạt thành tích xuất sắc</p>
        </div>

        {/* Info sections */}
        <section className="grid md:grid-cols-2 gap-10">
          <CardGroup title="👤 Thông tin cá nhân">
            <Info icon={<FaUser />} label="Họ tên" value={student.name} />
            <Info icon={<FaPhone />} label="Số điện thoại" value={student.phone} />
            <Info icon={<FaEnvelope />} label="Email" value={student.email} />
            <Info icon={<FaBirthdayCake />} label="Ngày sinh" value={student.dob} />
            <Info icon={<MdColorLens />} label="Màu yêu thích" value={student.favoriteColor} />
            <Info icon={<FaMapMarkerAlt />} label="Địa chỉ" value={student.address} />
            <Info label="Giới tính" value={student.gender} />
          </CardGroup>

          <CardGroup title="🎓 Thông tin học tập">
            <Info icon={<MdSchool />} label="Khoá học" value={student.course} />
            <Info label="Trình độ" value={student.level} />
            <Info icon={<FaChalkboardTeacher />} label="Giáo viên" value={student.teacher} />
            <Info label="Số buổi đã học" value={student.sessionsAttended} />
            <Info label="Thời gian đăng ký" value={student.registrationTime.replace("T", " ")} />
            <StatusPill label="Trạng thái" value={student.status} color="green" />
            <StatusPill label="Học phí" value={student.tuitionStatus} color={student.tuitionStatus === "Đã đóng" ? "blue" : "red"} />
          </CardGroup>

          <CardGroup title="👨‍👩‍👧 Gia đình">
            <Info icon={<HiOutlineUserGroup />} label="Email phụ huynh" value={student.parentEmail} />
            <Info label="Quan hệ phụ huynh" value={student.relationship} />
          </CardGroup>
        </section>

        {/* Note */}
        <section>
          <h3 className="text-md font-semibold text-gray-500 mb-2">📝 Ghi chú</h3>
          <p className="italic text-[#4B5585] bg-gray-50 rounded-xl p-4 border border-gray-200 shadow-inner">
            {student.note}
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

function StatusPill({ label, value, color }) {
  const colorClass = {
    green: "bg-green-500",
    blue: "bg-blue-500",
    red: "bg-red-500",
    gray: "bg-gray-400",
  }[color];

  return (
    <div className="space-y-1">
      <p className="text-xs font-semibold text-gray-500">{label}</p>
      <p className={`inline-block px-4 py-1 rounded-full text-white text-sm font-medium ${colorClass}`}>
        {value}
      </p>
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
