import React, { useState } from "react";
import {
  FaUser,
  FaBook,
  FaCalendar,
  FaKey,
  FaSignOutAlt,
} from "react-icons/fa";
import { useNavigate, useLocation } from "react-router-dom";

export default function SideBarLecture() {
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
        <div className="font-bold mt-2 text-[15px]">GIẢNG VIÊN</div>
        <div className="font-semibold text-[18px]">NGUYỄN VĂN B</div>
      </div>

      {/* Menu */}
      <ul className="mt-6 w-full px-4 text-sm space-y-1">
        {/* Thông tin cá nhân */}
        <li
          className={`flex flex-col md:flex-row items-center md:items-start gap-1 md:gap-2 text-[17px] p-2 rounded cursor-pointer ${
            isActive("/profile")
              ? "bg-white/10 text-blue-200"
              : "hover:bg-white/10"
          }`}
          onClick={() => navigate("/profile")}
        >
          <FaUser size={20} />
          <span className="text-sm text-center md:text-left">
            Thông tin cá nhân
          </span>
        </li>

        {/* Quản lý khóa học */}
        <li className="cursor-pointer">
          <div
            onClick={() => setOpenCourseMenu(!openCourseMenu)}
            className="flex flex-col md:flex-row items-center md:items-start gap-1 md:gap-2 text-[17px] hover:bg-white/10 p-2 rounded"
          >
            <FaBook size={20} />
            <span className="text-sm text-center md:text-left">
              Quản lý khóa học
            </span>
          </div>

          {/* Submenu - Desktop */}
          {openCourseMenu && (
            <div className="relative ml-6 mt-1 pl-4 hidden md:block">
              <div className="absolute left-[19px] top-3 h-[32px] w-[2px] bg-white z-0"></div>

              <div
                className={`flex items-center gap-2 relative z-10 mb-3 text-[16px] cursor-pointer ${
                  isActive("/lo-trinh")
                    ? "text-blue-200"
                    : "hover:text-blue-200"
                }`}
                onClick={() => navigate("/lo-trinh")}
              >
                <div className="w-2 h-2 bg-white rounded-full"></div>
                <span>Lộ trình học</span>
              </div>

              <div
                className={`flex items-center gap-2 relative z-10 text-[16px] cursor-pointer ${
                  isActive("/tai-lieu")
                    ? "text-blue-200"
                    : "hover:text-blue-200"
                }`}
                onClick={() => navigate("/lecturer/documentlist")}
              >
                <div className="w-2 h-2 bg-white rounded-full"></div>
                <span>Tài liệu khóa học</span>
              </div>
            </div>
          )}

          {/* Submenu - Mobile off-canvas sidebar */}
          <div
            className={`fixed top-0 right-0 h-full w-64 bg-white text-black z-50 transform transition-transform duration-300 ease-in-out md:hidden ${
              openCourseMenu ? "translate-x-0" : "translate-x-full"
            }`}
          >
            <div className="p-4 border-b flex justify-between items-center">
              <h3 className="text-lg font-semibold">Quản lý khóa học</h3>
              <button
                onClick={() => setOpenCourseMenu(false)}
                className="text-2xl font-bold text-gray-600 hover:text-red-500"
              >
                ×
              </button>
            </div>

            <div className="p-4 space-y-4">
              <div
                className="text-[16px] cursor-pointer hover:text-blue-600"
                onClick={() => {
                  navigate("/lo-trinh");
                  setOpenCourseMenu(false);
                }}
              >
                Lộ trình học
              </div>

              <div
                className="text-[16px] cursor-pointer hover:text-blue-600"
                onClick={() => {
                  navigate("/lecturer/documentlist");
                  setOpenCourseMenu(false);
                }}
              >
                Tài liệu khóa học
              </div>
            </div>
          </div>
        </li>

        {/* Thời khóa biểu */}
        <li className="cursor-pointer">
          <div
            onClick={() => setOpenScheduleMenu(!openScheduleMenu)}
            className="flex flex-col md:flex-row items-center md:items-start gap-1 md:gap-2 text-[17px] hover:bg-white/10 p-2 rounded"
          >
            <FaCalendar size={20} />
            <span className="text-sm text-center md:text-left">
              Thời khóa biểu
            </span>
          </div>

          {/* Submenu - Desktop */}
          {openScheduleMenu && (
            <div className="relative ml-6 mt-1 pl-4 hidden md:block">
              <div className="absolute left-[19px] top-3 h-[32px] w-[2px] bg-white z-0"></div>

              <div
                className={`flex items-center gap-2 relative z-10 mb-3 text-[16px] cursor-pointer ${
                  isActive("/lecturer/Teachingschedule")
                    ? "text-blue-200"
                    : "hover:text-blue-200"
                }`}
                onClick={() => navigate("/lecturer/Teachingschedule")}
              >
                <div className="w-2 h-2 bg-white rounded-full"></div>
                <span>Lịch giảng dạy</span>
              </div>

              <div
                className={`flex items-center gap-2 relative z-10 text-[16px] cursor-pointer ${
                  isActive("/lecturer/Rollcall")
                    ? "text-blue-200"
                    : "hover:text-blue-200"
                }`}
                onClick={() => navigate("/lecturer/Rollcall")}
              >
                <div className="w-2 h-2 bg-white rounded-full"></div>
                <span>Điểm danh</span>
              </div>
            </div>
          )}

          {/* Submenu - Mobile off-canvas */}
          <div
            className={`fixed top-0 right-0 h-full w-64 bg-white text-black z-[9999] transform transition-transform duration-300 ease-in-out md:hidden ${
              openScheduleMenu ? "translate-x-0" : "translate-x-full"
            }`}
          >
            <div className="p-4 border-b flex justify-between items-center">
              <h3 className="text-lg font-semibold">Thời khóa biểu</h3>
              <button
                onClick={() => setOpenScheduleMenu(false)}
                className="text-2xl font-bold text-gray-600 hover:text-red-500"
              >
                ×
              </button>
            </div>

            <div className="p-4 space-y-4">
              <div
                className="text-[16px] cursor-pointer hover:text-blue-600"
                onClick={() => {
                  navigate("/lecturer/Teachingschedule");
                  setOpenScheduleMenu(false);
                }}
              >
                Lịch giảng dạy
              </div>

              <div
                className="text-[16px] cursor-pointer hover:text-blue-600"
                onClick={() => {
                  navigate("/lecturer/Rollcall");
                  setOpenScheduleMenu(false);
                }}
              >
                Điểm danh
              </div>
            </div>
          </div>
        </li>

        {/* Theo dõi tiến độ */}
        <li
          className={`flex flex-col md:flex-row items-center md:items-start gap-1 md:gap-2 text-[17px] p-2 rounded cursor-pointer ${
            isActive("/tien-do")
              ? "bg-white/10 text-blue-200"
              : "hover:bg-white/10"
          }`}
          onClick={() => navigate("/tien-do")}
        >
          <FaKey size={20} />
          <span className="text-sm text-center md:text-left">
            Theo dõi tiến độ
          </span>
        </li>

        {/* Đăng xuất */}
        <li
          className="flex flex-col md:flex-row items-center md:items-start gap-1 md:gap-2 text-[17px] hover:bg-white/10 p-2 rounded text-red-300 cursor-pointer"
          onClick={() => navigate("/login")}
        >
          <FaSignOutAlt size={20} />
          <span className="text-sm text-center md:text-left">Đăng xuất</span>
        </li>
      </ul>
    </div>
  );
}
