import {motion  } from "framer-motion";
import React, { useState } from "react";
import { Pencil, Trash2, Eye } from "lucide-react";
import { useNavigate } from "react-router-dom";


const initialStudents = [
  { id: 1, name: "Nguyễn Văn A", phone: "0988123456", email: "vana@gmail.com", className: "Lập trình Java", status: "Đang học" },
  { id: 2, name: "Trần Thị B", phone: "0912345678", email: "tranb@gmail.com", className: "Lập trình C++", status: "Đã nghỉ" },
  { id: 3, name: "Lê Văn C", phone: "0912349999", email: "levanc@gmail.com", className: "Lập trình Python", status: "Đang học" },
  { id: 4, name: "Phạm Minh D", phone: "0911111111", email: "minhd@gmail.com", className: "HTML CSS JS", status: "Đã nghỉ" },
  { id: 5, name: "Nguyễn Văn A", phone: "0988123456", email: "vana@gmail.com", className: "Lập trình Java", status: "Đang học" },
  { id: 6, name: "Trần Thị B", phone: "0912345678", email: "tranb@gmail.com", className: "Lập trình C++", status: "Đã nghỉ" },
  { id: 7, name: "Lê Văn C", phone: "0912349999", email: "levanc@gmail.com", className: "Lập trình Python", status: "Đang học" },
  { id: 8, name: "Phạm Minh D", phone: "0911111111", email: "minhd@gmail.com", className: "HTML CSS JS", status: "Đã nghỉ" },
  { id: 9, name: "Nguyễn Văn A", phone: "0988123456", email: "vana@gmail.com", className: "Lập trình Java", status: "Đang học" },
  { id: 10, name: "Trần Thị B", phone: "0912345678", email: "tranb@gmail.com", className: "Lập trình C++", status: "Đã nghỉ" },
  { id: 11, name: "Lê Văn C", phone: "0912349999", email: "levanc@gmail.com", className: "Lập trình Python", status: "Đang học" },
  { id: 12, name: "Phạm Minh D", phone: "0911111111", email: "minhd@gmail.com", className: "HTML CSS JS", status: "Đã nghỉ" }
];

const AdminStudent = () => {
  const [students, setStudents] = useState(initialStudents);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const handleDelete = (id) => {
    if (window.confirm("Bạn có chắc muốn xóa học viên này?")) {
      setStudents((prev) => prev.filter((student) => student.id !== id));
    }
  };

  const filteredStudents = students.filter((student) =>
    student.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6 min-h-screen ml-[250px] bg-gradient-to-br from-gray-100 to-white">
      {/* Tiêu đề */}
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-2">
          <span className="text-2xl font-bold text-[#2B3674]">📚 Quản lý học viên</span>
        </div>
        <p className="text-sm text-gray-600">Xem và quản lý danh sách học viên trong hệ thống.</p>
      </div>

      {/* Thanh tìm kiếm + Nút thêm */}
      <div className="flex justify-between mb-4 items-center">
        <input
          type="text"
          placeholder="🔍 Tìm kiếm học viên theo tên..."
          className="w-1/2 px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button
          onClick={() => navigate("../AddStudent")}
          className="relative overflow-hidden bg-[#1F5DE2] text-white font-semibold px-5 py-2 rounded-lg hover:bg-blue-700 transition-all duration-300"
        >
          <span className="relative z-10">➕ Thêm học viên</span>
          <span className="absolute inset-0 bg-white opacity-10 rounded-full scale-0 origin-center transition-transform duration-500 ease-out hover:scale-150" />
        </button>
      </div>

      {/* Bảng học viên */}
      <div className="w-full overflow-x-auto">
        <table className="min-w-full bg-white rounded-xl shadow-lg overflow-hidden">
          <thead className="bg-[#D52929] text-white text-[15px] uppercase text-left">
            <tr className="h-12">
              <th className="px-5">STT</th>
              <th className="px-5">Họ tên</th>
              <th className="px-5">SĐT</th>
              <th className="px-5">Lớp</th>
              <th className="px-5">Trạng thái</th>
              <th className="px-5 text-center">Thao tác</th>
            </tr>
          </thead>
          <tbody className="text-[15px] text-gray-700 font-semibold">
            {filteredStudents.length > 0 ? (
              filteredStudents.map((student, index) => (
                <motion.tr
                  key={student.id}
                  className="border-t hover:bg-gray-50"
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                >
                  <td className="px-5 py-3">{index + 1}</td>
                  <td className="px-5 py-3">{student.name}</td>
                  <td className="px-5 py-3">{student.phone}</td>
                  <td className="px-5 py-3">{student.className}</td>
                  <td className="px-5 py-3">
                    <span
                      className={`px-3 py-1 rounded-full text-white text-sm font-medium ${
                        student.status === "Đang học" ? "bg-green-500" : "bg-gray-400"
                      }`}
                    >
                      {student.status}
                    </span>
                  </td>
                  <td className="px-5 py-3 text-center">
                    <div className="flex justify-center gap-2">
                      <button
                        className="bg-blue-500 hover:bg-blue-600 p-2 rounded-md text-white transition-all duration-200"
                        title="Sửa"
                        onClick={() => navigate("../EditStudent")}
                      >
                        <Pencil size={16} />
                      </button>
                      <button
                        className="bg-red-500 hover:bg-red-600 p-2 rounded-md text-white transition-all duration-200"
                        title="Xóa"
                        onClick={() => handleDelete(student.id)}
                      >
                        <Trash2 size={16} />
                      </button>
                      <button
                        className="bg-gray-500 hover:bg-gray-600 p-2 rounded-md text-white transition-all duration-200"
                        title="Xem"
                        onClick={() => navigate("../StudentDetail")}
                      >
                        <Eye size={16} />
                      </button>
                    </div>
                  </td>
                </motion.tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center py-6 text-gray-500 italic">
                  Không tìm thấy học viên nào phù hợp.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminStudent;
