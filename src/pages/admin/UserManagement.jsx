import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  deleteUser,
  getUsers,
  updateUserRole,
} from "../../services/admin/users";
import { motion } from "framer-motion";
import { Pencil, Trash2, Eye, X } from "lucide-react";

const UserManagement = () => {
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");
  const [dataUser, setDataUser] = useState([]);
  const [openRoleBox, setOpenRoleBox] = useState(false);
  const [role, setRole] = useState("");
  useEffect(() => {
    fetchDataUser();
  }, []);
  const fetchDataUser = async () => {
    let data = await getUsers();
    if (data) {
      setDataUser(data);
    }
  };
  const handleDelete = async (id) => {
    if (!window.confirm("Bạn có chắc muốn xóa người dùng này?")) return;
    let data = await deleteUser(id);
    if (data) {
      toast.success(data);
      fetchDataUser();
    }
  };
  const handleSave = async (id) => {
    let res = await updateUserRole(id, role);
    if (res) {
      toast.success("Cập nhật quyền thành công");
      setOpenRoleBox(false);
      fetchDataUser();
    }
  };
  const badge = (s) =>
    String(s || "").toLowerCase() === "active" ? "bg-green-500" : "bg-gray-400";
  return (
    <div className="p-6 min-h-screen ml-[250px] bg-gradient-to-br from-gray-100 to-white">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-2">
          <span className="text-2xl font-bold text-[#2B3674]">
            {" "}
            Quản lý người dùng
          </span>
        </div>
        <p className="text-sm text-gray-600">
          Xem và quản lý danh sách người dùng trong hệ thống.
        </p>
      </div>
      {/* Alerts */}
      {err && (
        <div className="mb-3 p-3 rounded border border-red-200 bg-red-50 text-red-700">
          {err}
        </div>
      )}
      {loading && (
        <div className="mb-3 p-3 rounded border border-blue-200 bg-blue-50 text-blue-700">
          Đang tải dữ liệu...
        </div>
      )}

      {/* Table (hiển thị 1 phần cột) */}
      <div className="w-full overflow-x-auto">
        <table className="min-w-full bg-white rounded-xl shadow-lg overflow-hidden">
          <thead className="bg-[#D52929] text-white text-[15px] uppercase text-left">
            <tr className="h-12">
              <th className="px-5">STT</th>
              <th className="px-5">Họ và tên</th>
              <th className="px-5">Email</th>
              <th className="px-5">Vai trò</th>
              <th className="px-5">Trạng thái</th>
              <th className="px-5">Ngày tạo</th>
              <th className="px-5 text-center">Thao tác</th>
            </tr>
          </thead>
          <tbody className="text-[15px] text-gray-700 divide-y font-semibold">
            {dataUser.length ? (
              dataUser.map((u) => (
                <motion.tr
                  key={u.id}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <td className="px-5 py-3">{u.id}</td>
                  <td className="px-5 py-3">{u.fullName || "—"}</td>
                  <td className="px-5 py-3">{u.email || "—"}</td>
                  <td className="px-5 py-3">{u.role || "—"}</td>
                  <td className="px-5 py-3">
                    <span
                      className={`px-3 py-1 rounded-full text-white text-sm ${badge(
                        u.status
                      )}`}
                    >
                      {u.status || "—"}
                    </span>
                  </td>
                  <td className="px-5 py-3">
                    {u.createdAt ? new Date(u.createdAt).toLocaleString() : "—"}
                  </td>
                  <td className="px-5 py-3">
                    <div className="flex justify-center gap-2">
                      <button
                        className="bg-blue-500 hover:bg-blue-600 p-2 rounded-md text-white"
                        title="Sửa"
                        onClick={() => setOpenRoleBox(true)}
                      >
                        <Pencil size={16} />
                      </button>
                      {openRoleBox && (
                        <div
                          className="fixed inset-0 bg-white/20 bg-opacity-50 flex items-center justify-center z-50"
                          onClick={() => setOpenRoleBox(false)} // 👈 click nền ngoài thì đóng modal
                        >
                          <div
                            className="bg-white rounded-lg shadow-lg w-full max-w-md p-6"
                            onClick={(e) => e.stopPropagation()} // 👈 chặn sự kiện click trong modal
                          >
                            <h2 className="text-lg font-semibold mb-4">
                              Phần quyền người dùng
                            </h2>

                            <select
                              name="type"
                              value={role}
                              onChange={(e) => setRole(e.target.value)}
                              className="w-full px-4 py-2 border border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300 "
                            >
                              <option value="">-- chọn quyền --</option>
                              <option value="STUDENT">STUDENT</option>
                              <option value="INSTRUCTOR">INSTRUCTOR</option>
                              <option value="ADMIN">ADMIN</option>
                            </select>

                            <div className="mt-6 flex justify-end gap-3">
                              <button
                                className="px-4 py-2 rounded-md bg-gray-200 hover:bg-gray-300"
                                onClick={() => setOpenRoleBox(false)}
                              >
                                Hủy
                              </button>
                              <button
                                className="px-4 py-2 rounded-md bg-blue-500 text-white hover:bg-blue-600"
                                onClick={() => handleSave(u.id)}
                              >
                                Lưu
                              </button>
                            </div>
                          </div>
                        </div>
                      )}
                      <button
                        className={`bg-red-500 hover:bg-red-600 p-2 rounded-md text-white`}
                        title="Xóa"
                        onClick={() => handleDelete(u.id)}
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </motion.tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="8"
                  className="text-center py-6 text-gray-500 italic"
                >
                  {loading ? "Đang tải..." : "Không có dữ liệu."}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default UserManagement;
