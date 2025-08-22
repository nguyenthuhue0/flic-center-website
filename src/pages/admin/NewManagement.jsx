import { useEffect, useState } from "react";
import { deleteNew, getNew } from "../../services/admin/news";
import { Pencil, Trash2, Eye, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { toast } from "react-toastify";

const NewManagement = () => {
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");
  const [dataNew, setDataNew] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    fetchDataNew();
  }, []);
  const fetchDataNew = async () => {
    let data = await getNew();
    if (data) {
      setDataNew(data);
    }
  };
  const handleDelete = async (id) => {
    if (!window.confirm("Bạn có chắc muốn xóa tin tức này?")) return;
    let data = await deleteNew(id);
    if (data.success == true) {
      toast.success(data.message);
      fetchDataNew();
    }
  };
  return (
    <div className="p-6 min-h-screen ml-[250px] bg-gradient-to-br from-gray-100 to-white">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-2">
          <span className="text-2xl font-bold text-[#2B3674]">
            {" "}
            Quản lý tin tức
          </span>
        </div>
        <p className="text-sm text-gray-600">
          Xem và quản lý danh sách tin tức trong hệ thống.
        </p>
      </div>

      {/* Tìm kiếm + Thêm mới */}
      <div className="flex justify-end mb-4 items-center">
        <button
          className="bg-[#1F5DE2] text-white font-semibold px-5 py-2 rounded-lg hover:bg-blue-700 transition cursor-pointer"
          onClick={() => navigate("../addnew")}
        >
          Thêm tin tức
        </button>
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
              <th className="px-5">Tiêu đề</th>
              <th className="px-5">Ngày đăng</th>
              <th className="px-5">Ngày tạo</th>
              <th className="px-5">Ngày cập nhật</th>
              <th className="px-5 text-center">Thao tác</th>
            </tr>
          </thead>
          <tbody className="text-[15px] text-gray-700 divide-y font-semibold">
            {dataNew.length ? (
              dataNew.map((u) => (
                <motion.tr
                  key={u.id}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <td className="px-5 py-3">{u.id}</td>
                  <td className="px-5 py-3">{u.title || "—"}</td>
                  <td className="px-5 py-3">
                    {u.publishedAt
                      ? new Date(u.publishedAt).toLocaleString()
                      : "—"}
                  </td>
                  <td className="px-5 py-3">
                    {u.createdAt ? new Date(u.createdAt).toLocaleString() : "—"}
                  </td>
                  <td className="px-5 py-3">
                    {u.updatedAt ? new Date(u.updatedAt).toLocaleString() : "—"}
                  </td>
                  <td className="px-5 py-3">
                    <div className="flex justify-center gap-2">
                      <button
                        className="bg-gray-500 hover:bg-gray-600 p-2 rounded-md text-white"
                        // AdminStudent/AdminLecturer:
                        onClick={() => navigate(`/admin/new/${u.id}`)}
                        title="Xem"
                      >
                        <Eye size={16} />
                      </button>

                      <button
                        className="bg-blue-500 hover:bg-blue-600 p-2 rounded-md text-white"
                        title="Sửa"
                        onClick={() => navigate(`/admin/new/${u.id}/edit`)}
                      >
                        <Pencil size={16} />
                      </button>

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

export default NewManagement;
