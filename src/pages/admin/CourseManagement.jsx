import React, { useEffect, useMemo, useState } from "react";
import { Pencil, Trash2, Eye } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { getAdminCourses, deleteCourse, assignInstructorToCourse } from "../../services/admin/courses";
import { toast } from "react-toastify";
import { IoPersonAddSharp } from "react-icons/io5";
import { getAllLectures } from "../../services/admin/users";

const AdminCourse = () => {
  const [courses, setCourses] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");
  const [deletingId, setDeletingId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchCourses();
  }, []);
  console.log(courses);
  
  const fetchCourses = async (page = 0, size = 20) => {
    try {
      setLoading(true);
      setErr("");
      const res = await getAdminCourses(page, size);
      const list = Array.isArray(res) ? res : Array.isArray(res?.content) ? res.content : [];
      setCourses(list);
    } catch (e) {
      setErr(e?.response?.data?.message || e?.message || "Không tải được danh sách khoá học");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    const ok = window.confirm("Bạn có chắc muốn xoá khoá học này?");
    if (!ok) return;

    // Lạc quan: xoá tạm trong UI
    const prev = courses;
    const next = prev.filter((c) => c.id !== id);
    setCourses(next);
    setDeletingId(id);

    try {
      let res = await deleteCourse(id); // gọi API xoá
      if (res) {
        toast.success("Xóa thành công!")
      }
      // thành công: giữ nguyên next
    } catch (e) {
      // thất bại: khôi phục danh sách cũ và báo lỗi
      setCourses(prev);
      alert(e?.response?.data?.message || e?.message || "Xoá khoá học thất bại");
    } finally {
      setDeletingId(null);
    }
  };

  const filteredCourses = useMemo(() => {
    const q = searchTerm.toLowerCase().trim();
    if (!q) return courses;
    return courses.filter((c) => (c.title || "").toLowerCase().includes(q));
  }, [courses, searchTerm]);

  const getStatusBadge = (status) => {
    const s = String(status || "").toLowerCase();
    return s === "active" || s === "open" ? "bg-green-500" : "bg-gray-400";
  };

  const money = (n) =>
    typeof n === "number" ? n.toLocaleString("vi-VN") + " đ" : "—";
  const [openTeacherBox, setOpenTeacherBox] = useState(false);
  const [teacherId, setTeacherId] = useState(0);
  const [courseId, setCourseId] = useState(0);
  const [teachers, setTeachers] = useState([]);
useEffect(() => {
    if (openTeacherBox) {
      fetchAllTeachers();
    }
  }, [openTeacherBox]);
  const fetchAllTeachers = async () => {
    let res = await getAllLectures();
    console.log(res);
    
    if (res) {
      setTeachers(res);
    }
  }
  const handleSave = async () => {
    let res = await assignInstructorToCourse(teacherId, courseId);
    console.log(res);
    if (res) {
      toast.success(res);
      fetchAllTeachers();
    }
    setOpenTeacherBox(false);
  };
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
          onKeyDown={(e) => e.key === "Enter" && fetchCourses()}
        />
        <button
          className="bg-[#1F5DE2] text-white font-semibold px-5 py-2 rounded-lg hover:bg-blue-700 transition"
          onClick={() => navigate("../AddCourse")}
        >
          ➕ Thêm khóa học
        </button>
      </div>

      {/* Lỗi */}
      {err && (
        <div className="mb-3 p-3 rounded border border-red-200 bg-red-50 text-red-700">{err}</div>
      )}

      {/* Bảng khóa học */}
      <div className="w-full overflow-x-auto">
  <table className="min-w-full bg-white rounded-xl shadow-md overflow-hidden table-fixed">
    {/* Set tỉ lệ các cột cho dễ đọc */}
    <colgroup>
      <col className="w-16" />              {/* STT */}
      <col className="w-[18%]" />           {/* Tên khóa học */}
      <col className="w-[40%]" />           {/* Mô tả */}
      <col className="w-[12%]" />           {/* Giá */}
      <col className="w-[10%]" />           {/* Thời lượng */}
      <col className="w-[10%]" />           {/* Trạng thái */}
      <col className="w-[12%]" />           {/* Thao tác */}
    </colgroup>

    <thead className="bg-[#D52929] text-white text-[15px] uppercase text-left">
      <tr className="h-12">
        <th className="px-5">STT</th>
        <th className="px-5">Tên khóa học</th>
        <th className="px-5">Mô tả</th>
        <th className="px-5">Giá</th>
        <th className="px-5">Thời lượng</th>
        <th className="px-5">Trạng thái</th>
        <th className="px-5">Giáo viên</th>
        <th className="px-5 text-center">Thao tác</th>
      </tr>
    </thead>

    <tbody className="text-[15px] text-gray-700 divide-y font-semibold">
      {loading ? (
        /* skeleton giữ nguyên của bạn */
        [...Array(6)].map((_, i) => (
          <tr key={i} className="animate-pulse">
            <td className="px-5 py-4"><div className="h-4 bg-gray-200 rounded w-8" /></td>
            <td className="px-5 py-4"><div className="h-4 bg-gray-200 rounded w-40" /></td>
            <td className="px-5 py-4"><div className="h-4 bg-gray-200 rounded w-72" /></td>
            <td className="px-5 py-4"><div className="h-4 bg-gray-200 rounded w-24" /></td>
            <td className="px-5 py-4"><div className="h-4 bg-gray-200 rounded w-20" /></td>
            <td className="px-5 py-4"><div className="h-6 bg-gray-200 rounded w-20" /></td>
            <td className="px-5 py-4"><div className="h-8 bg-gray-200 rounded w-28 ml-auto" /></td>
          </tr>
        ))
      ) : filteredCourses.length > 0 ? (
        filteredCourses.map((c, index) => (
          <tr key={c.id} className="hover:bg-gray-50 transition align-top">
            <td className="px-5 py-3 align-top">{index + 1}</td>
            <td className="px-5 py-3 align-top">{c.title || "—"}</td>

            {/* 👉 Bỏ line-clamp, cho xuống dòng & ngắt từ */}
            <td className="px-5 py-3 align-top whitespace-normal break-words leading-relaxed">
              {c.description || "—"}
            </td>

            <td className="px-5 py-3 align-top">{money(c.price)}</td>
            <td className="px-5 py-3 align-top">{c.duration ? `${c.duration} giờ` : "—"}</td>
            <td className="px-5 py-3 align-top">
              <span className={`px-3 py-1 rounded-full text-white text-sm ${getStatusBadge(c.status)}`}>
                {c.status || "—"}
              </span>
            </td>
            <td className="px-5 py-3 align-top">
              {c.nameLecturer && c.emailLecturer ? (
  <span>
    {c.nameLecturer} ({c.emailLecturer})
  </span>
) : (
  <button
    className="bg-blue-500 hover:bg-blue-600 p-2 rounded-md text-white"
    title="Thêm giáo viên"
    onClick={() => {
      setOpenTeacherBox(true);
      setCourseId(c.id);
    }}
  >
    <IoPersonAddSharp />
  </button>
)}

            </td>
{openTeacherBox && (
        <div
          className="fixed inset-0 bg-white/20 bg-opacity-50 flex items-center justify-center z-50"
          onClick={() => setOpenTeacherBox(false)} // 👈 click nền ngoài thì đóng modal
        >
          <div
            className="bg-white rounded-lg shadow-lg w-full max-w-md p-6"
            onClick={(e) => e.stopPropagation()} // 👈 chặn sự kiện click trong modal
          >
            <h2 className="text-lg font-semibold mb-4">
              Chọn giáo viên cho khóa học
            </h2>

            <select
                name="type"
                value={teacherId}
                onChange={(e) => setTeacherId(e.target.value)}
                className="w-full px-4 py-2 border border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300 "
              >
                <option value="">-- chọn giáo viên--</option>
                 {teachers.map((t) => (
    <option key={t.id} value={t.id}>
      {t.fullName} ({t.email})
    </option>
  ))}
              </select>

            <div className="mt-6 flex justify-end gap-3">
              <button
                className="px-4 py-2 rounded-md bg-gray-200 hover:bg-gray-300"
                onClick={() => setOpenTeacherBox(false)}
              >
                Hủy
              </button>
              <button
                className="px-4 py-2 rounded-md bg-blue-500 text-white hover:bg-blue-600"
                onClick={handleSave}
              >
                Lưu
              </button>
            </div>
          </div>
        </div>
      )}
                  <td className="px-5 py-3">
                    <div className="flex justify-center gap-2">
                      <button
                        className="bg-blue-500 hover:bg-blue-600 p-2 rounded-md text-white"
                        title="Sửa"
                        onClick={() => navigate(`/admin/courses/${c.id}/edit`, { state: { course: c } })}
                      >
                        <Pencil size={16} />
                      </button>

                      <button
                        className={`${
                          deletingId === c.id ? "opacity-70 cursor-not-allowed" : ""
                        } bg-red-500 hover:bg-red-600 p-2 rounded-md text-white`}
                        title={deletingId === c.id ? "Đang xoá..." : "Xoá"}
                        onClick={() => handleDelete(c.id)}
                        disabled={deletingId === c.id}
                      >
                        <Trash2 size={16} />
                      </button>

                      <button
                        className="bg-gray-500 hover:bg-gray-600 p-2 rounded-md text-white"
                        title="Xem"
                        onClick={() => navigate(`/admin/courses/${c.id}`, { state: { course: c } })}
                      >
                        <Eye size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="text-center py-6 text-gray-500 italic">
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
