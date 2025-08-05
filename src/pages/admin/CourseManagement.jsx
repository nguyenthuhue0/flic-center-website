import React, { useState } from "react";
import { Pencil, Trash2, Eye } from "lucide-react";
import { useNavigate } from "react-router-dom";

const initialCourses = [
  {
    id: 1,
    name: "Lập trình Java",
    description: "Khóa học nhập môn Java",
    studentCount: 25,
    status: "Đang mở",
  },
  {
    id: 2,
    name: "HTML CSS JS",
    description: "Thiết kế web cơ bản",
    studentCount: 30,
    status: "Đã đóng",
  },
  {
    id: 3,
    name: "ReactJS nâng cao",
    description: "Xây dựng SPA bằng React",
    studentCount: 18,
    status: "Đang mở",
  },
  {
    id: 4,
    name: "ReactJS nâng cao",
    description: "Xây dựng SPA bằng React",
    studentCount: 18,
    status: "Đang mở",
  },
  {
    id: 5,
    name: "ReactJS nâng cao",
    description: "Xây dựng SPA bằng React",
    studentCount: 18,
    status: "Đang mở",
  },
  {
    id: 6,
    name: "ReactJS nâng cao",
    description: "Xây dựng SPA bằng React",
    studentCount: 18,
    status: "Đang mở",
  },
  {
    id: 7,
    name: "HTML CSS JS",
    description: "Thiết kế web cơ bản",
    studentCount: 30,
    status: "Đã đóng",
  }
];

const AdminCourse = () => {
  const [courses, setCourses] = useState(initialCourses);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const handleDelete = (id) => {
    const confirm = window.confirm("Bạn có chắc muốn xóa khóa học này?");
    if (confirm) {
      setCourses((prev) => prev.filter((course) => course.id !== id));
    }
  };

  const filteredCourses = courses.filter((course) =>
    course.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6 min-h-screen ml-[250px] bg-gray-50">
      {/* Tiêu đề */}
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-2">
          <span className="text-2xl font-semibold text-[#2B3674]">📘 Quản lý khóa học</span>
        </div>
        <p className="text-sm text-gray-600">Xem và quản lý danh sách khóa học trong hệ thống.</p>
      </div>

      {/* Tìm kiếm + Thêm mới */}
      <div className="flex justify-between mb-4 items-center">
        <input
          type="text"
          placeholder="🔍 Tìm kiếm khóa học theo tên..."
          className="w-1/2 px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button
          className="bg-[#1F5DE2] text-white font-semibold px-5 py-2 rounded-lg hover:bg-blue-700 transition"
          onClick={() => navigate("../AddCourse")}
        >
          ➕ Thêm khóa học
        </button>
      </div>

      {/* Bảng khóa học */}
      <div className="w-full overflow-x-auto">
        <table className="min-w-full bg-white rounded-xl shadow-md overflow-hidden">
          <thead className="bg-[#D52929] text-white text-[15px] uppercase text-left">
            <tr className="h-12">
              <th className="px-5">STT</th>
              <th className="px-5">Tên khóa học</th>
              <th className="px-5">Mô tả</th>
              <th className="px-5">Số học viên</th>
              <th className="px-5">Trạng thái</th>
              <th className="px-5 text-center">Thao tác</th>
            </tr>
          </thead>
          <tbody className="text-[15px] text-gray-700 font-semibold">
            {filteredCourses.length > 0 ? (
              filteredCourses.map((course, index) => (
                <tr key={course.id} className="border-t hover:bg-gray-50 transition">
                  <td className="px-5 py-3 font-semibold">{index + 1}</td>
                  <td className="px-5 py-3">{course.name}</td>
                  <td className="px-5 py-3">{course.description}</td>
                  <td className="px-5 py-3">{course.studentCount}</td>
                  <td className="px-5 py-3">
                    <span
                      className={`px-3 py-1 rounded-full text-white text-sm font-medium ${
                        course.status === "Đang mở" ? "bg-green-500" : "bg-gray-400"
                      }`}
                    >
                      {course.status}
                    </span>
                  </td>
                  <td className="px-5 py-3 text-center">
                    <div className="flex justify-center gap-2">
                      <button
                        className="bg-blue-500 hover:bg-blue-600 p-2 rounded-md text-white"
                        title="Sửa"
                        onClick={() => navigate("../EditCourse")}
                      >
                        <Pencil size={16} />
                      </button>
                      <button
                        className="bg-red-500 hover:bg-red-600 p-2 rounded-md text-white"
                        title="Xóa"
                        onClick={() => handleDelete(course.id)}
                      >
                        <Trash2 size={16} />
                      </button>
                      <button
                        className="bg-gray-500 hover:bg-gray-600 p-2 rounded-md text-white"
                        title="Xem"
                         onClick={() => navigate("../CourseDetailAdmin")}
                      >
                        <Eye size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center py-6 text-gray-500 italic">
                  Không tìm thấy khóa học nào phù hợp.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminCourse;
