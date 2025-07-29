import { useNavigate } from "react-router-dom";
import logo from "../../assets/images/header-FLIC.png";
import SlideAuth from "./SlideAuth";
import { HiHome } from "react-icons/hi2";
import { IoChevronBackCircle } from "react-icons/io5";
const ForgotPassword = () => {
const navigate = useNavigate();
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-blue-50">
      <div className="flex flex-col md:flex-row items-center justify-center gap-10 w-full max-w-6xl p-10 shadow bg-white rounded-2xl">
        <div className="md:w-1/2 space-y-4 text-center md:text-left">
          <img src={logo} alt="Logo" className="w-full" />
          <h1 className="text-3xl font-bold mr-3">
            Chào mừng đến với <span className="text-blue-600">F</span>
            <span className="text-orange-400">L</span>
            <span className="text-yellow-400">I</span>
            <span className="text-red-500">C</span>
          </h1>
          <p className="text-gray-700 text-md max-w-md">
            Đơn vị thuộc, trực thuộc Trường Đại học Công nghệ Thông tin và
            Truyền thông Việt - Hàn
          </p>
          <SlideAuth />
        </div>
        <div className="md:w-1/2 bg-white max-w-md w-full">
          <div className="flex items-center space-x-1 justify-between text-md mb-3">
            <div className="flex items-center space-x-1">
                <IoChevronBackCircle className="text-blue-600 text-xl" />
                <span
                className="hover:text-red-500 hover:cursor-pointer"
                onClick={() => navigate("/login")}
                >
                Đăng nhập
                </span>
            </div>
            <div className="flex items-center space-x-1">
                <HiHome className="text-blue-600" />
                <span
                className="hover:text-red-500 hover:cursor-pointer"
                onClick={() => navigate("/")}
                >
                Về trang chủ
                </span>
            </div>
          </div>
          <div className="shadow-lg p-8 rounded-2xl">
            <h2 className="text-2xl font-bold text-red-500 text-center mb-8">
                KHÔI PHỤC MẬT KHẨU 
            </h2>

            <div className="space-y-4 text-left">
              <div>
                <input
                  type="email"
                  placeholder="Email"
                  className="w-full px-4 py-2 border border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300 "
                />
              </div>
              <div>
                <input
                  type="password"
                  placeholder="Mật khẩu mới"
                  className="w-full px-4 py-2 border border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300 "
                />
              </div>
              <div>
                <input
                  type="password"
                  placeholder="Nhập lại mật khẩu"
                  className="w-full px-4 py-2 border border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300 "
                />
              </div>
            </div>

            <button className="w-full bg-red-500 hover:bg-red-600 text-white font-bold py-2 rounded-full transition mt-7 mb-4">
              Đổi mật khẩu
            </button>

            <p className="text-sm text-center">
              Bạn chưa có tài khoản?{" "}
              <span
                onClick={() => navigate("/register")}
                className="text-blue-600 font-bold cursor-pointer hover:underline"
              >
                Đăng ký ngay
              </span>
            </p>
          </div>
          <p className="text-xs text-center mt-6 text-gray-500">
            <span className="text-blue-600 text-lg">©</span> 2025 Foreign
            languages - information center. All rights reserved
          </p>
        </div>
      </div>
    </div>
  );
}
export default ForgotPassword;