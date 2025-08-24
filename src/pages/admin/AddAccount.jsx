import { useState } from "react";
import { createNewAccountRole } from "../../services/admin/users";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft, FaSave } from "react-icons/fa";

const AddAccount = () => {
const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [role, setRole] = useState("");
    const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
        //validate
    const isValidEmail = validateEmail(email);
    if (!isValidEmail) {
      toast.error("email không đúng định dạng");
      return;
    }
    console.log(role);
    
    let data = await createNewAccountRole(email, fullName, password, role);
    console.log(data);
    
    if (data.success == true) {
      toast.success(data.message);
      navigate("/admin");
    }
  };
  const inputStyle =
    "w-full border-gray-300 focus:border-blue-400 focus:ring focus:ring-blue-100 text-[16px] p-3 rounded-xl shadow-sm transition-all duration-200 outline-none mb-3";
  const navigate = useNavigate();
  return (
    <div className="p-6 flex justify-center ml-[250px]">
      <div className="w-full max-w-5xl">
        <h2 className="text-3xl font-bold text-blue-600 mb-2 flex items-center">
          <span className="mr-2"></span> Thêm tài khoản người dùng
        </h2>

        <p className="mb-4 text-gray-600">
          Thêm tài khoản người dùng mới vào hệ thống.
        </p>

        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-md rounded-xl p-6 space-y-6"
        >
          {/* Thông tin giảng viên */}
          <div className="grid grid-cols-1">
            <div>
              <label className="block font-medium mb-2">Email</label>
              <input
                type="email"
                name="email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                placeholder="Nhập email"
                className={inputStyle}
                required
              />
            </div>
            <div>
              <label className="block font-medium mb-2">Họ và tên</label>
              <input
                type="text"
                name="fullName"
                onChange={(e) => setFullName(e.target.value)}
                value={fullName}
                placeholder="Nhập họ và tên"
                className={inputStyle}
                required
              />
            </div>
            <div>
              <label className="block font-medium mb-2">Mật khẩu</label>
              <input
                type="password"
                name="password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                placeholder="Nhập mật khẩu"
                className={inputStyle}
                required
              />
            </div>
            <div>
              <label className="block font-medium mb-2">Phân quyền</label>
              <select id="paymentStatus" name="paymentStatus" className="hover:border p-2 cursor-pointer" 
                value={role}
                onChange={(e) => setRole(e.target.value)}
            >
               <option value="USER">--Chọn quyền--</option>
              <option value="STUDENT">HỌC VIÊN</option>
              <option value="INSTRUCTOR">GIẢNG VIÊN</option>
              <option value="ADMIN">QUẢN TRỊ VIÊN</option>
            </select>
            </div>
          </div>

          {/* Nút thao tác */}
          <div className="flex justify-between mt-6">
            <button
              type="button"
              onClick={() => navigate("/admin")}
              className="btn-outline cursor-pointer"
            >
              <FaArrowLeft className="inline mr-1" /> Quay lại
            </button>
            <button
              type="submit"
              className={`bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-xl shadow-md transition-all cursor-pointer`}
            >
              <FaSave className="inline mr-1" /> {"Xác nhận"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
export default AddAccount;