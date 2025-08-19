import { motion } from "framer-motion";
import React, { useEffect, useMemo, useState } from "react";
import { Pencil, Trash2, Eye, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { getUsers } from "../../services/admin/users";
import { deleteUser } from "../../services/admin/users";

const AdminStudent = () => {
  const [rows, setRows] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");
  const [viewUser, setViewUser] = useState(null);
  const [deletingId, setDeletingId] = useState(null); // << thêm state xoá
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        setErr("");

        const res = await getUsers(); // AxiosCustomize đang trả THẲNG data (mảng)
        console.log("[getUsers] axios response =", res);

        // Nhận đúng dữ liệu bất kể interceptor trả kiểu gì
        const list =
          Array.isArray(res) ? res :
          Array.isArray(res?.data) ? res.data :
          Array.isArray(res?.content) ? res.content :
          Array.isArray(res?.data?.content) ? res.data.content :
          [];

        console.log("[getUsers] list length =", list.length);
        setRows(list);
      } catch (e) {
        console.error("[getUsers] error =", e);
        setErr(e?.response?.data?.message || e?.message || "Load users failed");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();

    // Lọc: chỉ giữ USER (hoa/thường) hoặc student (hoa/thường)
    const allowed = rows.filter((u) => {
      const role = String(u.role || "").trim().toLowerCase();
      return role === "user" || role === "student";
    });

    // Log debug
    console.log("[filter] total rows =", rows.length);
    console.log("[filter] allowed (USER/student) =", allowed.length, allowed.map(u => ({ id: u.id, role: u.role })));

    if (!q) return allowed;

    const out = allowed.filter(
      (u) =>
        (u.fullName || "").toLowerCase().includes(q) ||
        (u.email || "").toLowerCase().includes(q) ||
        (u.phone || "").toLowerCase().includes(q)
    );

    console.log("[filter] after search =", out.length, out.map(u => u.id));
    return out;
  }, [rows, search]);

  const badge = (s) =>
    String(s || "").toLowerCase() === "active" ? "bg-green-500" : "bg-gray-400";

  // ===== XOÁ USER =====
  const handleDelete = async (user) => {
    if (!user?.id) return;
    if (!window.confirm(`Xoá người dùng "${user.fullName || user.email || user.id}"?`)) return;

    try {
      setDeletingId(user.id);
      await deleteUser(user.id);
      // cập nhật UI
      setRows((prev) => prev.filter((x) => x.id !== user.id));
    } catch (e) {
      alert(e?.response?.data?.message || e?.message || "Xoá thất bại");
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="p-6 min-h-screen ml-[250px] bg-gradient-to-br from-gray-100 to-white">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-2">
          <span className="text-2xl font-bold text-[#2B3674]">👥 Quản lý người dùng</span>
        </div>
        <p className="text-sm text-gray-600">Xem và quản lý danh sách người dùng trong hệ thống.</p>
      </div>

      {/* Search + Add */}
      <div className="flex justify-between mb-4 items-center">
        <input
          type="text"
          placeholder="🔍 Tìm theo tên / email / SĐT..."
          className="w-1/2 px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        
      </div>

      {/* Alerts */}
      {err && <div className="mb-3 p-3 rounded border border-red-200 bg-red-50 text-red-700">{err}</div>}
      {loading && <div className="mb-3 p-3 rounded border border-blue-200 bg-blue-50 text-blue-700">Đang tải dữ liệu...</div>}

      {/* Table (hiển thị 1 phần cột) */}
      <div className="w-full overflow-x-auto">
        <table className="min-w-full bg-white rounded-xl shadow-lg overflow-hidden">
          <thead className="bg-[#D52929] text-white text-[15px] uppercase text-left">
            <tr className="h-12">
              <th className="px-5">STT</th>
              <th className="px-5">Họ tên</th>
              <th className="px-5">Email</th>
              <th className="px-5">SĐT</th>
              <th className="px-5">Vai trò</th>
              <th className="px-5">Trạng thái</th>
              <th className="px-5">Ngày tạo</th>
              <th className="px-5 text-center">Thao tác</th>
            </tr>
          </thead>
          <tbody className="text-[15px] text-gray-700 divide-y font-semibold">
            {filtered.length ? (
              filtered.map((u, idx) => (
                <motion.tr key={u.id}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2 }}>
                  <td className="px-5 py-3">{idx + 1}</td>
                  <td className="px-5 py-3">{u.fullName || "—"}</td>
                  <td className="px-5 py-3">{u.email || "—"}</td>
                  <td className="px-5 py-3">{u.phone || "—"}</td>
                  <td className="px-5 py-3">{u.role || "—"}</td>
                  <td className="px-5 py-3">
                    <span className={`px-3 py-1 rounded-full text-white text-sm ${badge(u.status)}`}>
                      {u.status || "—"}
                    </span>
                  </td>
                  <td className="px-5 py-3">{u.createdAt ? new Date(u.createdAt).toLocaleString() : "—"}</td>
                  <td className="px-5 py-3">
                    <div className="flex justify-center gap-2">
                      <button
                        className="bg-gray-500 hover:bg-gray-600 p-2 rounded-md text-white"
                        // AdminStudent/AdminLecturer:
                        onClick={() => navigate(`/admin/users/${u.id}`, { state: { student: u } })}
                        title="Xem"
                      >
                        <Eye size={16} />
                      </button>

                      <button
                        className="bg-blue-500 hover:bg-blue-600 p-2 rounded-md text-white"
                        title="Sửa"
                        onClick={() =>
                          navigate(`/admin/users/${u.id}/edit`, { state: { student: u } })
                        }
                      >
                        <Pencil size={16} />
                      </button>

                      <button
                        className={`bg-red-500 hover:bg-red-600 p-2 rounded-md text-white ${
                          deletingId === u.id ? "opacity-70 cursor-not-allowed" : ""
                        }`}
                        title="Xóa"
                        onClick={() => handleDelete(u)}
                        disabled={deletingId === u.id}
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </motion.tr>
              ))
            ) : (
              <tr>
                <td colSpan="8" className="text-center py-6 text-gray-500 italic">
                  {loading ? "Đang tải..." : "Không có dữ liệu."}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Modal xem đầy đủ field theo entity User */}
      {viewUser && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white w-[760px] max-w-[95vw] rounded-xl p-5 shadow-xl">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold">Chi tiết người dùng</h3>
              <button onClick={() => setViewUser(null)} className="p-2 rounded hover:bg-gray-100">
                <X size={18} />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-3 text-sm">
              <Field k="Họ tên" v={viewUser.fullName} />
              <Field k="Email" v={viewUser.email} />
              <Field k="SĐT" v={viewUser.phone} />
              <Field k="Vai trò" v={viewUser.role} />
              <Field k="Trạng thái" v={viewUser.status} />
              <Field k="Mã SV" v={viewUser.studentId} />
              <Field k="Giới tính" v={viewUser.gender} />
              <Field k="Nghề nghiệp" v={viewUser.job} />
              <Field k="Ngày sinh" v={viewUser.birthDate} />
              <Field k="Nơi sinh" v={viewUser.birthPlace} />
              <Field k="Dân tộc" v={viewUser.ethnicity} />
              <Field k="Số CCCD" v={viewUser.idNumber} />
              <Field k="Ngày cấp" v={viewUser.idIssuedDate} />
              <Field k="Nơi cấp" v={viewUser.idIssuedPlace} />
              <Field k="Trường" v={viewUser.schoolName} />
              <Field k="Avatar" v={viewUser.avatarUrl} />
              <Field k="Tạo lúc" v={viewUser.createdAt && new Date(viewUser.createdAt).toLocaleString()} />
              <Field k="Cập nhật" v={viewUser.updatedAt && new Date(viewUser.updatedAt).toLocaleString()} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const Field = ({ k, v }) => (
  <div className="flex gap-2">
    <span className="min-w-[120px] text-gray-500">{k}:</span>
    <span className="font-medium break-words">{v ?? "—"}</span>
  </div>
);

export default AdminStudent;
