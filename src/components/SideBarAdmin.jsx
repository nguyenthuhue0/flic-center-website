import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaTachometerAlt,
  FaUser,
  FaBell,
  FaTable,
  FaFont,
  FaAtom,
  FaMapMarkerAlt,
} from "react-icons/fa";
import { FaUserTie } from "react-icons/fa6";

import { CiLogout } from "react-icons/ci";
import { MdOutlineManageAccounts } from "react-icons/md";

import logo from "/logo.svg"
const Sidebar = () => {
  const [active, setActive] = useState("Dashboard");
  const navigate = useNavigate();

  const menuItems = [
    { name: "Học viên", icon: <FaTachometerAlt /> },
    { name: "Giảng viên", icon: <FaUserTie /> },
    { name: "Khóa học", icon: <FaTable /> },
    { name: "Tin tức", icon: <FaFont /> },
    { name: "Hóa đơn", icon: <FaAtom /> },
    { name: "Thêm tài khoản", icon: <MdOutlineManageAccounts /> },
    { name: "Người dùng", icon: <FaUser /> },
  ];

  const handleClick = (name) => {
    setActive(name);
    if (name === "Học viên") {
      navigate("./StudentManagement");
    }
    if (name === "Giảng viên") {
      navigate("./LecturerManagement");
    }
    if (name === "Khóa học") {
      navigate("./CourseManagement");
    }
    if (name === "Tin tức") {
      navigate("./newManagement");
    }
    if (name === "Hóa đơn") {
      navigate("./paymentManagement");
    }
    if (name === "Thêm tài khoản") {
      navigate("./newAccount");
    }
    if (name === "Người dùng") {
      navigate("./userManagement");
    }

    // Các điều hướng khác bạn có thể thêm tại đây
  };

  const handleLogout = () => {
    sessionStorage.clear();
    navigate("/login");
  };

  return (
    <div className="fixed min-h-screen w-[250px] bg-[#2A3F54] text-white p-5">
      {/* Logo */}
      <div className="flex items-center mb-6">
        <img
          src={logo}
          alt="flic Logo"
          className="w-10 h-10 mr-3 rounded-full border border-white shadow-xl p-1 bg-white"
        />
        <span className="text-xl font-bold">FLIC ADMIN</span>
      </div>

      <div className="border-b border-white/20 mb-6" />

      {/* Menu items */}
      <ul className="space-y-2">
        {menuItems.map((item) => (
          <li
            key={item.name}
            onClick={() => handleClick(item.name)}
            className={`flex items-center gap-3 px-4 py-3 rounded cursor-pointer transition duration-200 ${
              active === item.name ? "bg-white/20" : "hover:bg-white/10"
            }`}
          >
            <span className="text-lg">{item.icon}</span>
            <span className="text-sm font-semibold uppercase">{item.name}</span>
          </li>
        ))}
      </ul>
      <ul className="space-y-2">
        <li
          className={`flex items-center gap-3 px-4 py-3 rounded cursor-pointer transition duration-200 hover:bg-white/10 hover:text-red-300`}
          onClick={() => handleLogout()}
        >
          {" "}
          <span>
            <CiLogout />
          </span>{" "}
          ĐĂNG XUẤT
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
