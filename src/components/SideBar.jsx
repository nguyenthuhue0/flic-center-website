import React, { useState } from "react";
import {
  FaUser,
  FaBook,
  FaCalendar,
  FaKey,
  FaSignOutAlt,
} from "react-icons/fa";
import { useNavigate, useLocation } from "react-router-dom";

export default function Sidebar() {
  const [openCourseMenu, setOpenCourseMenu] = useState(true);
  const [openScheduleMenu, setOpenScheduleMenu] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <div className="w-[280px] bg-[#2A3F54] text-white flex flex-col items-center py-6 shadow-md">
      {/* Avatar */}
      <img
        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSlypGDTnDajs3DEzazfw-dKvApBOXODYXpLw&s"
        alt="Avatar"
        className="w-24 h-24 rounded-full border-4 border-white mb-2"
      />
      <div className="text-sm text-center">
        <div className="font-bold mt-2 text-[15px]">👨‍🏫 GIẢNG VIÊN</div>
        <div className="font-semibold text-[18px]">NGUYỄN VĂN B</div>
      </div>

      {/* Menu */}
      <ul className="mt-6 w-full px-4 text-sm space-y-1">
        <li
          className={`flex items-center text-[17px] gap-2 p-2 rounded cursor-pointer ${
            isActive("/profile") ? "bg-white/10 text-blue-200" : "hover:bg-white/10"
          }`}
          onClick={() => navigate("/profile")}
        >
          <FaUser /> Thông tin cá nhân
        </li>

        {/* Quản lý khóa học */}
        <li className="cursor-pointer">
          <div
            onClick={() => setOpenCourseMenu(!openCourseMenu)}
            className="flex items-center text-[17px] gap-2 hover:bg-white/10 p-2 rounded"
          >
            <FaBook /> Quản lý khóa học
          </div>

          {openCourseMenu && (
            <div className="relative ml-6 mt-1 pl-4">
              <div className="absolute left-[19px] top-3 h-[32px] w-[2px] bg-white z-0"></div>

              <div
                className={`flex items-center gap-2 relative z-10 mb-3 text-[16px] cursor-pointer ${
                  isActive("/lo-trinh") ? "text-blue-200" : "hover:text-blue-200"
                }`}
                onClick={() => navigate("/lo-trinh")}
              >
                <div className="w-2 h-2 bg-white rounded-full"></div>
                <span>Lộ trình học</span>
              </div>

              <div
                className={`flex items-center gap-2 relative z-10 text-[16px] cursor-pointer ${
                  isActive("/tai-lieu") ? "text-blue-200" : "hover:text-blue-200"
                }`}
                onClick={() => navigate("/tai-lieu")}
              >
                <div className="w-2 h-2 bg-white rounded-full"></div>
                <span>Tài liệu khóa học</span>
              </div>
            </div>
          )}
        </li>

        {/* Thời khóa biểu */}
        <li className="cursor-pointer">
          <div
            onClick={() => setOpenScheduleMenu(!openScheduleMenu)}
            className="flex items-center text-[17px] gap-2 hover:bg-white/10 p-2 rounded"
          >
            <FaCalendar /> Thời khóa biểu
          </div>

          {openScheduleMenu && (
            <div className="relative ml-6 mt-1 pl-4">
              <div className="absolute left-[19px] top-3 h-[32px] w-[2px] bg-white z-0"></div>

              <div
                className={`flex items-center gap-2 relative z-10 mb-3 text-[16px] cursor-pointer ${
                  isActive("/lecturer/Teachingschedule") ? "text-blue-200 " : "hover:text-blue-200"
                }`}
                onClick={() => navigate("/lecturer/Teachingschedule")}
              >
                <div className="w-2 h-2 bg-white rounded-full"></div>
                <span>Lịch giảng dạy</span>
              </div>

              <div
                className={`flex items-center gap-2 relative z-10 text-[16px] cursor-pointer ${
                  isActive("/lecturer/Rollcall") ? "text-blue-200" : "hover:text-blue-200"
                }`}
                onClick={() => navigate("/lecturer/Rollcall")}
              >
                <div className="w-2 h-2 bg-white rounded-full"></div>
                <span>Điểm danh</span>
              </div>
            </div>
          )}
        </li>

        <li
          className={`flex items-center gap-2 text-[17px] p-2 rounded cursor-pointer ${
            isActive("/tien-do") ? "bg-white/10 text-blue-200" : "hover:bg-white/10"
          }`}
          onClick={() => navigate("/tien-do")}
        >
          <FaKey /> Theo dõi tiến độ
        </li>

        <li
          className="flex items-center text-[17px] gap-2 hover:bg-white/10 p-2 rounded text-red-300 cursor-pointer"
          onClick={() => navigate("/dang-xuat")}
        >
          <FaSignOutAlt /> Đăng xuất
        </li>
      </ul>
    </div>
  );
}
