import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import demo from "../../assets/images/demo.jpg"
import { FaArrowLeft, FaSave } from "react-icons/fa";
import { changeStatus, getPaymentById } from "../../services/admin/payment";
import { toast } from "react-toastify";

const EditPayment  = () => {
    // ===== Helpers =====
const fmtDT = (v) => (v ? new Date(v).toLocaleString() : "—");

const Row = ({ label, value }) => (
  <div className="flex items-start gap-3 py-1">
    <span className="w-36 shrink-0 text-gray-500">{label}</span>
    <span className="font-semibold text-[#2B3674] break-words">{value ?? "—"}</span>
  </div>
);
const [dataPayment, setDataPayment] = useState({});
const [paymentStatus, setPaymentStatus] = useState("")
 const { id } = useParams();
 const navigate = useNavigate()
    useEffect(() => {
        fetchDataPayment(id)
    }, [])
    const handleChange = (e) => {
      const value = e.target.value;
      setPaymentStatus(value);
  };
    const fetchDataPayment = async (id) => {
        let res = await getPaymentById(id)
        console.log(res);
        
        if (res.success == true) {
            setDataPayment(res.data)
            setPaymentStatus(res.data.status)
        }
    }
    const handleSubmit = async (id) => {
      let res = await changeStatus(id, paymentStatus)
      console.log(res);
      
      if (res) {
        toast.success("Cập nhật thành công!")
        navigate("/admin/paymentManagement")
      }
    }
    return (
    <div className="ml-[250px] min-h-screen bg-gradient-to-br from-[#eef2fb] to-[#f6f9ff] p-10 text-[#2B3674]">
      <div className="max-w-6xl mx-auto bg-white shadow-xl rounded-3xl px-8 md:px-10 py-10 space-y-8">
        {/* Header */}
        <div className="flex items-center gap-6 border-b pb-6">
          <div className="flex-1">
            <h2 className="text-3xl md:text-4xl font-bold text-[#1E2B6A] flex flex-wrap items-center gap-2">
              Hóa đơn #{dataPayment.id}
            </h2>
            <p className="text-gray-500 mt-1">Chi tiết hóa đơn theo bảng <b>payments</b></p>
          </div>
        </div>

        {/* 3 summary tiles */}
        <div className="grid md:grid-cols-3 gap-4">
          <div className="bg-[#F6F8FF] rounded-2xl p-5 border border-gray-100">
            <p className="text-sm text-gray-500 mb-1">Tên người dùng</p>
            <p className="text-xl font-bold break-words">{dataPayment.email || "—"}</p>
          </div>
          <div className="bg-[#F6F8FF] rounded-2xl p-5 border border-gray-100">
            <p className="text-sm text-gray-500 mb-1">Email</p>
            <p className="text-xl font-bold">{dataPayment.phone || "—"}</p>
          </div>
          <div className="bg-[#F6F8FF] rounded-2xl p-5 border border-gray-100">
            <p className="text-sm text-gray-500 mb-1">Trạng thái</p>
            <select id="paymentStatus" name="paymentStatus" className="hover:border p-2 cursor-pointer" 
                value={paymentStatus}
      onChange={handleChange}
            >
              <option value="COMPLETED">Đã thanh toán</option>
              <option value="PENDING">Chưa thanh toán</option>
            </select>
          </div>
        </div>

        {/* 2 cards */}
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-[#F9FAFB] border border-gray-200 rounded-2xl p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-[#1E2B6A] mb-3">
              Thông tin khóa học
            </h3>

            <Row label="Tên khóa học" value={dataPayment.fullName} />
            <Row label="Giá tiền" value={dataPayment.phone} />
            <Row label="Thời gian bắt đầu học" value={dataPayment.studentId} />
          </div>

          <div className="bg-[#F9FAFB] border border-gray-200 rounded-2xl p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-[#1E2B6A] mb-3">
              Thông tin hóa đơn
            </h3>

            <div className="grid grid-cols-1 gap-x-6">
              <label htmlFor="">Ảnh hóa đơn</label>
              <img src={dataPayment.billImage} alt="ảnh hóa đơn" className="h-50 cursor-pointer"
              onClick={() => window.open(dataPayment.billImage, "_blank")}
              />
            </div>
            <div className="grid grid-cols-2 gap-3 mt-2">
              <div>
                <span className="block text-gray-500">Thời gian tạo</span>
                <span className="font-semibold">{fmtDT(dataPayment.createdAt)}</span>
              </div>
              <div>
                <span className="block text-gray-500">Thời gian cập nhật</span>
                <span className="font-semibold">{fmtDT(dataPayment.updatedAt)}</span>
              </div>
            </div>

        </div>
                  </div>
              {/* Nút thao tác */}
                    <div className="flex justify-between mt-6">
                      <button
                        type="button"
                        onClick={() => navigate("/admin/paymentManagement")}
                        className="btn-outline"
                      >
                        <FaArrowLeft className="inline mr-1" /> Quay lại
                      </button>
                      <button
                        type="button"
                        className={`bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-xl shadow-md transition-all `}
                        onClick={() => handleSubmit(dataPayment.id)}
                      >
                        <FaSave className="inline mr-1" /> {"Xác nhận"}
                      </button>
                    </div>
      </div>
    </div>
    )
}
export default EditPayment;