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

const Sidebar = () => {
  const [active, setActive] = useState("Dashboard");
  const navigate = useNavigate();

  const menuItems = [
    { name: "Học viên", icon: <FaTachometerAlt /> },
    { name: "Giảng viên", icon: <FaUser /> },
    { name: "Khóa học", icon: <FaTable /> },
    { name: "Bài học", icon: <FaFont /> },
    { name: "Lịch thi", icon: <FaAtom /> },
    { name: "Thống kê học tập", icon: <FaMapMarkerAlt /> },
    { name: "Thống kê thi cử", icon: <FaBell /> },
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
    // Các điều hướng khác bạn có thể thêm tại đây
  };

  return (
    <div className="fixed min-h-screen w-[250px] bg-[#2A3F54] text-white p-5">
      {/* Logo */}
      <div className="flex items-center mb-6">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/f/f1/Vue.png"
          alt="Vue Logo"
          className="w-10 h-10 mr-3"
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
    </div>
  );
};

export default Sidebar;
