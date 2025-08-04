import React, { useState } from "react";
import {
  FaUser,
  FaBook,
  FaRoute,
  FaFileAlt,
  FaCalendar,
  FaKey,
  FaSignOutAlt,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function SideBarStudent() {
  const [openScheduleMenu, setOpenScheduleMenu] = useState(true);
  const navigate = useNavigate();

  const menuItemClass =
    "flex flex-col md:flex-row items-center md:items-start text-[17px] gap-1 md:gap-2 hover:bg-white/10 p-2 rounded cursor-pointer text-center";

  return (
    <div className="w-[280px] bg-[#2A3F54] text-white flex flex-col items-center py-6 shadow-md">
      {/* Avatar */}
      <img
        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSlypGDTnDajs3DEzazfw-dKvApBOXODYXpLw&s"
        alt="Avatar"
        className="w-24 h-24 rounded-full border-4 border-white mb-2"
      />
      <div className="text-sm text-center">
        <div className="font-bold mt-2 text-[15px]">HỌC VIÊN</div>
        <div className="font-semibold text-[18px]">NGUYỄN VĂN B</div>
      </div>

      {/* Menu */}
      <ul className="mt-6 w-full px-4 text-sm space-y-1">
        <li
          className={menuItemClass}
          onClick={() => navigate("/student/studentprofile")}
        >
          <FaUser className="text-[20px]" />
          <span>Thông tin cá nhân</span>
        </li>

        <li
          className="cursor-pointer"
          onClick={() => navigate("/student/studentcourse")}
        >
          <div className={menuItemClass}>
            <FaBook className="text-[20px]" />
            <span>Khóa học</span>
          </div>
        </li>

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
              <div
                className="flex items-center gap-2 mb-3 cursor-pointer"
                onClick={() => navigate("/student/studentschedule")}
              >
                <div className="w-2 h-2 bg-white rounded-full"></div>
                <span className="hover:text-blue-200 text-[16px]">
                  Lịch học theo tuần
                </span>
              </div>

              <div
                className="flex items-center gap-2 mb-3 cursor-pointer"
                onClick={() => navigate("/student/scheduledetail")}
              >
                <div className="w-2 h-2 bg-white rounded-full"></div>
                <span className="hover:text-blue-200 text-[16px]">
                  Lịch học chi tiết
                </span>
              </div>

              <div className="flex items-center gap-2 cursor-pointer">
                <div className="w-2 h-2 bg-white rounded-full"></div>
                <span className="hover:text-blue-200 text-[16px]">
                  Lịch thi
                </span>
              </div>
            </div>
          )}
        </li>

        <li className={menuItemClass}>
          <FaKey className="text-[20px]" />
          <span>Đổi mật khẩu</span>
        </li>

        <li className={`${menuItemClass} text-red-300`}>
          <FaSignOutAlt className="text-[20px]" />
          <span>Đăng xuất</span>
        </li>
      </ul>
    </div>
  );
}
