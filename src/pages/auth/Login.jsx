import { useNavigate } from "react-router-dom";
import logo from "../../assets/images/header-FLIC.png";
import SlideAuth from "./SlideAuth";
import { HiHome } from "react-icons/hi2";
import { useState } from "react";
import { toast } from "react-toastify";
import { postLogin } from "../../services/Auth/AuthService";
const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };
  const handleLogin = async (event) => {
    event.preventDefault();
    //validate
    const isValidEmail = validateEmail(email);
    if (!isValidEmail) {
      toast.error("email không đúng định dạng");
      return;
    }
    if (!password) {
      toast.error("password không đúng");
      return;
    }
    //api
    let data = await postLogin(email, password);
    if (data) {
      toast.success("Đăng nhập thành công!");
      sessionStorage.setItem("access_token", data.token);
      navigate("/");
    }
         if (!data) {
    toast.error("Đăng nhập thất bại!");
    return;
         }
    console.log("token", data);
  };
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
          <div className="flex items-center space-x-1 justify-end text-md mb-3">
            <HiHome className="text-blue-600" />
            <span
              className="hover:text-red-500 hover:cursor-pointer"
              onClick={() => navigate("/")}
            >
              Về trang chủ
            </span>
          </div>
          <div className="shadow-lg p-8 rounded-2xl">
            <h2 className="text-2xl font-bold text-red-500 text-center mb-8">
              ĐĂNG NHẬP
            </h2>

            <div className="space-y-4 text-left">
              <div>
                <input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  className="w-full px-4 py-2 border border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300 "
                />
              </div>
              <div>
                <input
                  type="password"
                  placeholder="Mật khẩu"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  className="w-full px-4 py-2 border border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300 "
                />
              </div>

              <div className="flex justify-between items-center text-sm">
                <label className="flex items-center space-x-2">
                  <input type="checkbox" className="form-checkbox" />
                  <span>Ghi nhớ mật khẩu</span>
                </label>
                <a
                  onClick={() => navigate("/forgotPassword")}
                  className="text-blue-600 hover:underline hover:cursor-pointer"
                >
                  Quên mật khẩu?
                </a>
              </div>
            </div>

            <button
              className="w-full bg-red-500 hover:bg-red-600 text-white font-bold py-2 rounded-full transition mt-7 mb-4"
              onClick={(e) => handleLogin(e)}
            >
              Đăng nhập
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
};
export default Login;
