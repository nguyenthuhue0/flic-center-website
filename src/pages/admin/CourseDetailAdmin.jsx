import {
  FaBook,
  FaChalkboardTeacher,
  FaUserGraduate,
  FaCalendarAlt,
  FaClock,
  FaCheck,
  FaListUl,
} from "react-icons/fa";
import { MdOutlineCategory } from "react-icons/md";
import { motion } from "framer-motion";

export default function CourseDetail() {
  const course = {
    id: "C001",
    name: "Lập trình Java nâng cao",
    teacher: "Cô Mai",
    totalStudents: 24,
    duration: "12 tuần",
    schedule: "Thứ 2 - Thứ 4 (18:00 - 20:00)",
    startDate: "2025-08-01",
    status: "Đang diễn ra",
    category: "Lập trình",
    lessons: 36,
    description: `Khóa học tập trung vào lập trình hướng đối tượng, xử lý tập tin, kết nối cơ sở dữ liệu và xây dựng ứng dụng Java thực tế.`,
    note: "Giáo trình đã cập nhật theo chuẩn mới 2025.",
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
          <motion.div
            animate={{ rotate: [0, 5, -5, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="bg-[#CC2B2B] w-24 h-24 flex items-center justify-center rounded-full text-white text-4xl shadow-md"
          >
            <FaBook />
          </motion.div>
          <div>
            <h2 className="text-4xl font-bold text-[#1E2B6A] flex items-center gap-2">
              📘 {course.name}
            </h2>
            <p className="text-gray-500 mt-1">Thông tin chi tiết về khoá học</p>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-6 text-center">
          <StatBox color="blue" label="Sĩ số" value={course.totalStudents} icon={<FaUserGraduate />} />
          <StatBox color="green" label="Thời lượng" value={course.duration} icon={<FaClock />} />
          <StatBox color="yellow" label="Số buổi" value={course.lessons} icon={<FaListUl />} />
        </div>

        {/* Thông tin khóa học */}
        <section className="grid md:grid-cols-2 gap-10">
          <CardGroup title="📖 Thông tin khóa học">
            <Info icon={<FaBook />} label="Tên khóa học" value={course.name} />
            <Info icon={<MdOutlineCategory />} label="Chủ đề" value={course.category} />
            <Info icon={<FaCalendarAlt />} label="Ngày khai giảng" value={course.startDate} />
            <Info icon={<FaClock />} label="Lịch học" value={course.schedule} />
            <StatusPill label="Trạng thái" value={course.status} color="green" />
          </CardGroup>

          <CardGroup title="👩‍🏫 Giảng viên phụ trách">
            <Info icon={<FaChalkboardTeacher />} label="Tên giảng viên" value={course.teacher} />
          </CardGroup>
        </section>

        {/* Mô tả */}
        <section>
          <h3 className="text-md font-semibold text-gray-500 mb-2">📝 Mô tả khóa học</h3>
          <p className="italic text-[#4B5585] bg-gray-50 rounded-xl p-4 border border-gray-200 shadow-inner">
            {course.description}
          </p>
        </section>

        {/* Ghi chú */}
        <section>
          <h3 className="text-md font-semibold text-gray-500 mb-2">📌 Ghi chú</h3>
          <p className="italic text-[#2B3674] bg-yellow-50 rounded-xl p-4 border border-yellow-200 shadow-inner">
            {course.note}
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

function StatBox({ value, label, color, icon }) {
  const bg = {
    blue: "bg-blue-100 text-blue-800",
    green: "bg-green-100 text-green-800",
    yellow: "bg-yellow-100 text-yellow-800",
  }[color];

  return (
    <div className={`p-4 rounded-xl shadow-md ${bg}`}>
      <div className="text-2xl flex justify-center mb-1">{icon}</div>
      <p className="text-xl font-bold">{value}</p>
      <p className="text-sm">{label}</p>
    </div>
  );
}
