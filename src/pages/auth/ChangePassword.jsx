import { useState } from "react";
import { toast } from "react-toastify";
import { changePasswordService } from "../../services/Auth/AuthService";

const ChangePassword = () => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = async (e) => {
    if (!oldPassword || !newPassword || !confirmPassword) {
       toast.error("Vui lòng điền đầy đủ thông tin!");
    }
    if (newPassword !== confirmPassword) {      
         toast.error("Mật khẩu mới và xác nhận mật khẩu không khớp!");    
    }
    e.preventDefault();
    let res = await changePasswordService(oldPassword, newPassword, confirmPassword);
    if (res) {
      toast.success("Đổi mật khẩu thành công");
      setOldPassword("");
      setNewPassword("");
      setConfirmPassword("");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-[#18181b] transition-colors duration-300">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-2xl bg-white dark:bg-[#232326] rounded-2xl shadow-lg p-8 space-y-6 transition-colors"
      >
        <h2 className="text-3xl font-bold text-blue-700 dark:text-blue-300 mb-6 text-center">
          Đổi mật khẩu
        </h2>

        {/* Mật khẩu cũ */}
        <div className="flex flex-col">
          <label className="mb-2 font-semibold text-gray-700 dark:text-gray-200">Mật khẩu cũ</label>
          <input
            type="password"
            name="oldPassword"
            value={oldPassword}
            onChange={(event) => setOldPassword(event.target.value)}
            className="border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 bg-gray-50 dark:bg-[#232326] text-gray-800 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
            placeholder="Nhập mật khẩu cũ"
            required
          />
        </div>

        {/* Mật khẩu mới */}
        <div className="flex flex-col">
          <label className="mb-2 font-semibold text-gray-700 dark:text-gray-200">Mật khẩu mới</label>
          <input
            type="password"
            name="newPassword"
            value={newPassword}
            onChange={(event) => setNewPassword(event.target.value)}
            className="border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 bg-gray-50 dark:bg-[#232326] text-gray-800 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
            placeholder="Nhập mật khẩu mới"
            required
          />
        </div>

        {/* Xác nhận mật khẩu */}
        <div className="flex flex-col">
          <label className="mb-2 font-semibold text-gray-700 dark:text-gray-200">Xác nhận mật khẩu</label>
          <input
            type="password"
            name="confirmPassword"
            value={confirmPassword}
            onChange={(event) => setConfirmPassword(event.target.value)}
            className="border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 bg-gray-50 dark:bg-[#232326] text-gray-800 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
            placeholder="Nhập lại mật khẩu mới"
            required
          />
        </div>

        {/* Nút Submit */}
        <div className="flex justify-center mt-4">
          <button
            type="submit"
            className="px-8 py-2 bg-blue-600 dark:bg-blue-700 text-white font-semibold rounded-lg hover:bg-blue-700 dark:hover:bg-blue-800 transition-colors"
          >
            Đổi mật khẩu
          </button>
        </div>
      </form>
    </div>
  );
};

export default ChangePassword;