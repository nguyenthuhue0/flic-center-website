import React, { useState } from "react";
import { Pencil, Trash2, Eye } from "lucide-react";
import { useNavigate } from "react-router-dom";

const initialLecturers = [
  {
    id: 1,
    name: "Nguyễn Văn An",
    phone: "0901122334",
    email: "an.gv@gmail.com",
    subject: "Cơ sở dữ liệu",
    status: "Đang dạy",
  },
  {
    id: 2,
    name: "Trần Thị Bình",
    phone: "0911222333",
    email: "binh.tran@gmail.com",
    subject: "Kỹ thuật lập trình",
    status: "Đã nghỉ",
  },
  {
    id: 3,
    name: "Lê Minh Tuấn",
    phone: "0988776655",
    email: "tuan.le@gmail.com",
    subject: "Phân tích hệ thống",
    status: "Đang dạy",
  },
  {
    id: 4,
    name: "Nguyễn Văn An",
    phone: "0901122334",
    email: "an.gv@gmail.com",
    subject: "Cơ sở dữ liệu",
    status: "Đang dạy",
  },
  {
    id: 5,
    name: "Trần Thị Bình",
    phone: "0911222333",
    email: "binh.tran@gmail.com",
    subject: "Kỹ thuật lập trình",
    status: "Đã nghỉ",
  },
  {
    id: 6,
    name: "Lê Minh Tuấn",
    phone: "0988776655",
    email: "tuan.le@gmail.com",
    subject: "Phân tích hệ thống",
    status: "Đang dạy",
  },{
    id: 7,
    name: "Nguyễn Văn An",
    phone: "0901122334",
    email: "an.gv@gmail.com",
    subject: "Cơ sở dữ liệu",
    status: "Đang dạy",
  },
  {
    id: 8,
    name: "Trần Thị Bình",
    phone: "0911222333",
    email: "binh.tran@gmail.com",
    subject: "Kỹ thuật lập trình",
    status: "Đã nghỉ",
  },
  {
    id: 9,
    name: "Lê Minh Tuấn",
    phone: "0988776655",
    email: "tuan.le@gmail.com",
    subject: "Phân tích hệ thống",
    status: "Đang dạy",
  },{
    id: 10,
    name: "Nguyễn Văn An",
    phone: "0901122334",
    email: "an.gv@gmail.com",
    subject: "Cơ sở dữ liệu",
    status: "Đang dạy",
  },
  {
    id: 11,
    name: "Trần Thị Bình",
    phone: "0911222333",
    email: "binh.tran@gmail.com",
    subject: "Kỹ thuật lập trình",
    status: "Đã nghỉ",
  },
  {
    id: 12,
    name: "Lê Minh Tuấn",
    phone: "0988776655",
    email: "tuan.le@gmail.com",
    subject: "Phân tích hệ thống",
    status: "Đang dạy",
  },
];

const AdminLecturer = () => {
  const [lecturers, setLecturers] = useState(initialLecturers);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const handleDelete = (id) => {
    const confirm = window.confirm("Bạn có chắc muốn xóa giảng viên này?");
    if (confirm) {
      setLecturers((prev) => prev.filter((lecturer) => lecturer.id !== id));
    }
  };

  const filteredLecturers = lecturers.filter((lecturer) =>
    lecturer.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6 min-h-screen ml-[250px] bg-gray-50">
      {/* Tiêu đề */}
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-2">
          <span className="text-2xl font-semibold text-[#2B3674]">👨‍🏫 Quản lý giảng viên</span>
        </div>
        <p className="text-sm text-gray-600">Xem và quản lý danh sách giảng viên trong hệ thống.</p>
      </div>

      {/* Tìm kiếm + Thêm giảng viên */}
      <div className="flex justify-between mb-4 items-center">
        <input
          type="text"
          placeholder="🔍 Tìm kiếm giảng viên theo tên..."
          className="w-1/2 px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button
          className="bg-[#1F5DE2] text-white font-semibold px-5 py-2 rounded-lg hover:bg-blue-700 transition"
          onClick={() => navigate("../AddLecturer")}
        >
          ➕ Thêm giảng viên
        </button>
      </div>

      {/* Bảng giảng viên */}
      <div className="w-full overflow-x-auto">
        <table className="min-w-full bg-white rounded-xl shadow-md overflow-hidden">
          <thead className="bg-[#D52929] text-white text-[15px] uppercase text-left">
            <tr className="h-12">
              <th className="px-5">STT</th>
              <th className="px-5">Họ tên</th>
              <th className="px-5">SĐT</th>
              <th className="px-5">Môn giảng dạy</th>
              <th className="px-5">Trạng thái</th>
              <th className="px-5 text-center">Thao tác</th>
            </tr>
          </thead>
          <tbody className="text-[15px] text-gray-700 font-semibold">
            {filteredLecturers.length > 0 ? (
              filteredLecturers.map((lecturer, index) => (
                <tr key={lecturer.id} className="border-t hover:bg-gray-50 transition">
                  <td className="px-5 py-3 font-semibold">{index + 1}</td>
                  <td className="px-5 py-3">{lecturer.name}</td>
                  <td className="px-5 py-3">{lecturer.phone}</td>
                  <td className="px-5 py-3">{lecturer.subject}</td>
                  <td className="px-5 py-3">
                    <span
                      className={`px-3 py-1 rounded-full text-white text-sm font-medium ${
                        lecturer.status === "Đang dạy" ? "bg-green-500" : "bg-gray-400"
                      }`}
                    >
                      {lecturer.status}
                    </span>
                  </td>
                  <td className="px-5 py-3 text-center">
                    <div className="flex justify-center gap-2">
                      <button
                        className="bg-blue-500 hover:bg-blue-600 p-2 rounded-md text-white"
                        title="Sửa"
                        onClick={() => navigate("../EditLecturer")}
                      >
                        <Pencil size={16} />
                      </button>
                      <button
                        className="bg-red-500 hover:bg-red-600 p-2 rounded-md text-white"
                        title="Xóa"
                        onClick={() => handleDelete(lecturer.id)}
                      >
                        <Trash2 size={16} />
                      </button>
                      <button
                        className="bg-gray-500 hover:bg-gray-600 p-2 rounded-md text-white"
                        title="Xem"
                        onClick={() => navigate("../LecturerDetail")}
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
                  Không tìm thấy giảng viên nào phù hợp.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminLecturer;
