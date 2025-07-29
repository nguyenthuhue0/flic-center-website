import { useNavigate } from "react-router-dom";
import logo from "../../assets/images/header-FLIC.png";
import SlideAuth from "./SlideAuth";
const Register = () => {
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
          <div className="shadow-lg p-8 rounded-2xl">
            <h2 className="text-center text-2xl font-bold text-red-600 mb-6">
              ĐĂNG KÝ TÀI KHOẢN
            </h2>
            <form className="space-y-4">
              <input
                type="text"
                placeholder="Họ và tên"
                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
              />
              <input
                type="email"
                placeholder="Email"
                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
              />
              <input
                type="password"
                placeholder="Mật khẩu"
                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
              />
              <button
                type="submit"
                className="w-full bg-red-500 hover:bg-red-600 text-white py-2 rounded-full font-semibold"
              >
                Đăng ký ngay
              </button>
            </form>
            <p className="text-center text-sm mt-4">
              Bạn đã có tài khoản?{" "}
              <a
                onClick={() => navigate("/login")}
                className="text-blue-600 font-bold hover:underline hover:cursor-pointer"
              >
                Đăng nhập ngay
              </a>
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
};
export default Register;
