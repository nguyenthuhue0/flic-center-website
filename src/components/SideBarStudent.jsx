import React, { useEffect, useState } from "react";
import {
  FaUser,
  FaBook,
  FaCalendar,
  FaKey,
  FaSignOutAlt,
} from "react-icons/fa";
import { useNavigate, useLocation } from "react-router-dom";
import { getProfile } from "../services/Student/Profie";

export default function SideBarStudent() {
  const [openScheduleMenu, setOpenScheduleMenu] = useState(true);
  const [avatar, setAvatar] = useState("");
  const [fullName, setFullName] = useState("");
  const [activeMenu, setActiveMenu] = useState(""); // state active menu
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    sessionStorage.clear();
    navigate("/login");
  };

  useEffect(() => {
    fetchDataProfile();
  }, []);

  const fetchDataProfile = async () => {
    let data = await getProfile();
    setFullName(data.fullName);
    setAvatar(data.avatarUrl);
  };

  // Theo dõi URL để set menu active
  useEffect(() => {
    if (location.pathname.includes("studentprofile")) {
      setActiveMenu("profile");
    } else if (location.pathname.includes("studentcourse")) {
      setActiveMenu("course");
    } else if (location.pathname.includes("studentschedule")) {
      setActiveMenu("week");
    } else if (location.pathname.includes("scheduledetail")) {
      setActiveMenu("detail");
    } else if (location.pathname.includes("changepass")) {
      setActiveMenu("changepass");
    }
  }, [location.pathname]);

  const menuItemClass =
    "flex flex-col md:flex-row items-center md:items-start text-[17px] gap-1 md:gap-2 hover:bg-white/10 p-2 rounded cursor-pointer text-center";

  return (
    <div className="w-[280px] bg-[#2A3F54] text-white flex flex-col items-center py-6 shadow-md">
      {/* Avatar */}
      <img
        src={avatar || undefined}
        alt="Avatar"
        className="w-24 h-24 rounded-full border-4 border-white mb-2"
      />
      <div className="text-sm text-center">
        <div className="font-bold mt-2 text-[15px]">HỌC VIÊN</div>
        <div className="font-semibold text-[18px]">{fullName}</div>
      </div>

      {/* Menu */}
      <ul className="mt-6 w-full px-4 text-sm space-y-1">
        {/* Thông tin cá nhân */}
        <li
          className={`${menuItemClass} ${
            activeMenu === "profile" ? "font-bold bg-white/20" : ""
          }`}
          onClick={() => navigate("/student/studentprofile")}
        >
          <FaUser className="text-[20px]" />
          <span>Thông tin cá nhân</span>
        </li>

        {/* Khóa học */}
        <li
          className={`cursor-pointer ${
            activeMenu === "course" ? "font-bold bg-white/20" : ""
          }`}
          onClick={() => navigate("/student/studentcourse")}
        >
          <div className={menuItemClass}>
            <FaBook className="text-[20px]" />
            <span>Khóa học</span>
          </div>
        </li>

        {/* Thời khóa biểu */}
        <li className="relative cursor-pointer">
          <div
            onClick={() => setOpenScheduleMenu(!openScheduleMenu)}
            className={menuItemClass}
          >
            <FaCalendar className="text-[20px]" />
            <span>Thời khóa biểu</span>
          </div>

          {openScheduleMenu && (
            <div className="absolute md:static left-full md:ml-6 top-0 md:mt-1 pl-4 bg-[#2A3F54] rounded shadow-lg md:shadow-none p-3 w-[200px] md:w-auto z-50 ml-3">
              {/* Lịch học theo tuần */}
              <div
                className={`flex items-center gap-2 mb-3 cursor-pointer ${
                  activeMenu === "week" ? "font-bold text-blue-200" : ""
                }`}
                onClick={() => navigate("/student/studentschedule")}
              >
                <div className="w-2 h-2 bg-white rounded-full"></div>
                <span className="hover:text-blue-200 text-[16px]">
                  Lịch học theo tuần
                </span>
              </div>

              {/* Lịch học chi tiết */}
              <div
                className={`flex items-center gap-2 mb-3 cursor-pointer ${
                  activeMenu === "detail" ? "font-bold text-blue-200" : ""
                }`}
                onClick={() => navigate("/student/scheduledetail")}
              >
                <div className="w-2 h-2 bg-white rounded-full"></div>
                <span className="hover:text-blue-200 text-[16px]">
                  Lịch học chi tiết
                </span>
              </div>

              {/* Lịch thi */}
              <div
                className={`flex items-center gap-2 cursor-pointer ${
                  activeMenu === "exam" ? "font-bold text-blue-200" : ""
                }`}
                onClick={() => setActiveMenu("exam")}
              >
                <div className="w-2 h-2 bg-white rounded-full"></div>
                <span className="hover:text-blue-200 text-[16px]">
                  Lịch thi
                </span>
              </div>
            </div>
          )}
        </li>

        {/* Đổi mật khẩu */}
        <li
          className={`${menuItemClass} ${
            activeMenu === "changepass" ? "font-bold bg-white/20" : ""
          }`}
          onClick={() => navigate("/student/changepass")}
        >
          <FaKey className="text-[20px]" />
          <span>Đổi mật khẩu</span>
        </li>

        {/* Đăng xuất */}
        <li
          className={`${menuItemClass} text-red-300`}
          onClick={handleLogout}
        >
          <FaSignOutAlt className="text-[20px]" />
          <span>Đăng xuất</span>
        </li>
      </ul>
    </div>
  );
}
