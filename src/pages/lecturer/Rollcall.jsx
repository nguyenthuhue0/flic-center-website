import React from "react";
import { useNavigate } from "react-router-dom";

const Rollcall = () => {
  const data = [1, 2, 3];
  const navigate = useNavigate();

  return (
    <div className="p-6 min-h-screen">
      {/* Box Thông tin khóa học */}
      <div className="bg-white p-4 shadow border font-semibold mb-0 ">
        <p className="font-semibold text-[16px]">Các khóa học của năm 2025 - 2026</p>
        <p className="mt-2 font-semibold">Lưu ý:</p>
        <ul className="list-disc list-inside text-sm mt-1 text-gray-700">
          <li>Giảng viên phải điểm danh mỗi tiết học</li>
          <li>Thời gian và nội dung tiết học giảng viên có thể sửa đổi</li>
          <li>......................................................</li>
          <li>......................................................</li>
        </ul>
      </div>

      {/* Nút chuyển trang */}
      <div
        className="bg-[#F1BA54] text-white font-semibold px-4 py-2 h-[50px] mt-6 rounded text-[17px] flex items-center cursor-pointer hover:text-white transition"

      >
        📘 Lịch giảng dạy chi tiết
      </div>

      {/* Header bảng */}
      <div className="grid grid-cols-6 bg-[#D52929] h-[50px] text-[17px] text-white font-semibold px-4 py-2 mt-6 ">
        <div>STT</div>
        <div>Tên lớp</div>
        <div>Suất học</div>
        <div>Thời gian</div>
        <div>Địa điểm</div>
        <div></div> {/* Cột cho nút điểm danh */}
      </div>

      {/* Danh sách lớp học */}
      <div className="space-y-4 mt-3">
        {data.map((i) => (
          <div
            key={i}
            className="grid grid-cols-6 bg-white text-[17px] px-4 py-3 border border-gray-300 rounded shadow-sm h-[50px] items-center"
          >
            <div className="font-semibold">{i}</div>
            <div className="font-semibold">Lập trình java</div>
            <div className="font-semibold">Thứ 2-4-6</div>
            <div className="font-semibold">9:00 - 11:30</div>
            <div className="font-semibold">KE.103</div>
            <div>
              <button
                onClick={() => navigate("/lecturer/RollcallDetail")}
                className="bg-[#1F5DE2] font-semibold text-white px-3  h-[30px] rounded hover:bg-blue-700 transition text-sm"
              >
                Điểm danh
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Rollcall;
