import { Pencil, Trash2, Eye, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { getAllPayment } from "../../services/admin/payment";

const PaymentManagement = () => {
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");
  const navigate = useNavigate();
  const [dataPayment, setDataPayment] = useState([]);
  useEffect(() => {
    fetchDataPayment();
  }, []);
  const fetchDataPayment = async () => {
    let data = await getAllPayment();
    console.log(data);

    if (data) {
      setDataPayment(data);
    }
  };
  const badge = (s) =>
    String(s || "").toLowerCase() === "completed"
      ? "bg-green-500"
      : "bg-red-500";
  const renderStatusText = (status) => {
    switch (status) {
      case "PENDING":
        return "Chưa xác nhận";
      case "COMPLETED":
        return "Đã thanh toán";
      default:
        return "—";
    }
  };

  return (
    <div className="p-6 min-h-screen ml-[250px] bg-gradient-to-br from-gray-100 to-white">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-2">
          <span className="text-2xl font-bold text-[#2B3674]">
            {" "}
            Quản lý hóa đơn
          </span>
        </div>
        <p className="text-sm text-gray-600">
          Xem và quản lý danh sách hóa đơn trong hệ thống.
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
              <th className="px-5">Email</th>
              <th className="px-5">Người dùng</th>
              <th className="px-5">Khóa học</th>
              <th className="px-5">Ngày đăng ký</th>
              <th className="px-5">Trạng thái</th>
              <th className="px-5 text-center">Thao tác</th>
            </tr>
          </thead>
          <tbody className="text-[15px] text-gray-700 divide-y font-semibold">
            {dataPayment.length ? (
              dataPayment.map((u) => (
                <motion.tr
                  key={u.id}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <td className="px-5 py-3">{u.id}</td>
                  <td className="px-5 py-3">{u.student?.email || "—"}</td>
                  <td className="px-5 py-3">{u.student?.fullName || "—"}</td>
                  <td className="px-5 py-3">{u.course?.title || "—"}</td>
                  <td className="px-5 py-3">
                    {u.createdAt ? new Date(u.createdAt).toLocaleString() : "—"}
                  </td>
                  <td className="px-5 py-3">
                    <span
                      className={`px-3 py-1 rounded-full text-white text-sm ${badge(
                        u.status
                      )}`}
                    >
                      {renderStatusText(u.status)}
                    </span>
                  </td>
                  <td className="px-5 py-3">
                    <div className="flex justify-center gap-2">
                      <button
                        className="bg-gray-500 hover:bg-gray-600 p-2 rounded-md text-white"
                        // AdminStudent/AdminLecturer:
                        onClick={() => navigate(`/admin/payment/${u.id}`)}
                        title="Xem"
                      >
                        <Eye size={16} />
                      </button>

                      <button
                        className="bg-blue-500 hover:bg-blue-600 p-2 rounded-md text-white"
                        title="Sửa"
                        onClick={() => navigate(`/admin/payment/${u.id}`)}
                      >
                        <Pencil size={16} />
                      </button>

                      {/* <button
                        className={`bg-red-500 hover:bg-red-600 p-2 rounded-md text-white`}
                        title="Xóa"
                        onClick={() => handleDelete(u.id)}
                      >
                        <Trash2 size={16} />
                      </button> */}
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
export default PaymentManagement;
