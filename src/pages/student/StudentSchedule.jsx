import dayjs from "dayjs";
import isoWeek from "dayjs/plugin/isoWeek";
dayjs.extend(isoWeek);

import { useState } from "react";
const StudentSchedule = () => {
  const days = [
    "Thứ hai",
    "Thứ ba",
    "Thứ tư",
    "Thứ năm",
    "Thứ sáu",
    "Thứ bảy",
    "Chủ nhật",
  ];
  const hours = Array.from({ length: 15 }, (_, i) => `${8 + i}:00`);
  const [currentWeekStart, setCurrentWeekStart] = useState(
    dayjs().startOf("isoWeek")
  );

  const weekDates = Array.from({ length: 7 }, (_, i) =>
    currentWeekStart.add(i, "day").format("DD/MM")
  );

  return (
    <div className="p-4 flex gap-4">
      {/* Bên trái: Thời khóa biểu */}
      <div className="flex-1">
        {/* Thanh chọn tuần */}
        <div className="flex justify-between items-center mb-2">
          <button
            onClick={() => setCurrentWeekStart(currentWeekStart.subtract(1, "week"))}
            className="bg-gray-200 px-3 py-1 rounded ml-[49px] hover:bg-gray-300"
          >
            ← Tuần trước
          </button>

          <div className="font-semibold">
            Tuần: {currentWeekStart.format("DD/MM")} –{" "}
            {currentWeekStart.add(6, "day").format("DD/MM")}
          </div>

          <button
            onClick={() => setCurrentWeekStart(currentWeekStart.add(1, "week"))}
            className="bg-gray-200 px-3 py-1 rounded hover:bg-gray-300 mr-[112px]"
          >
            Tuần sau →
          </button>
        </div>

        {/* Header: các thứ + ngày */}
        <div className="grid grid-cols-7 ml-[49px] border border-black text-center font-semibold w-[1016px] h-[52px] bg-white">
          {days.map((day, index) => {
  const isToday = weekDates[index] === dayjs().format("DD/MM");

  return (
    <div
      key={index}
      className={`p-1 border-r last:border-r-0 ${
        isToday ? "bg-yellow-200 text-[#CC2B2B] font-bold rounded" : ""
      }`}
    >
      <div>{day}</div>
      <div className="text-xs text-gray-500">{weekDates[index]}</div>
    </div>
  );
})}

        </div>

        {/* Grid thời khóa biểu */}
        <div className="relative mt-1 flex">
          {/* Cột giờ bên trái */}
          <div className="flex flex-col text-sm mt-4 mr-2">
            {hours.map((hour, idx) => (
              <div
                key={idx}
                className="h-[50px] flex items-start justify-end pr-2 text-gray-600"
              >
                {hour}
              </div>
            ))}
          </div>

          {/* Lưới thời khóa biểu */}
          <div className="border border-pink-200 w-[1016px] h-[750px] grid grid-cols-7 relative bg-white">
            {/* Dòng lưới ngang */}
            {hours.map((_, rowIdx) => (
              <div
                key={rowIdx}
                className="absolute left-0 w-full border-t border-gray-200"
                style={{ top: `${(rowIdx + 1) * 50}px` }}
              />
            ))}

            {/* Các khối học */}
            <div className="absolute top-[50px] left-[14.2857%] w-[14.2857%] h-[100px] bg-red-300 rounded" />
            <div className="absolute top-[0px] left-[57.1428%] w-[14.2857%] h-[50px] bg-yellow-200 rounded" />
            <div className="absolute top-[100px] left-[71.4285%] w-[14.2857%] h-[50px] bg-blue-500 rounded" />
          </div>
        </div>
      </div>

      {/* Bên phải: Thông báo + Thống kê */}
      {/* <div className="w-[280px] space-y-4">
        <div className="bg-white rounded shadow p-4">
          <h3 className="text-[#CC2B2B] font-bold mb-2">📢 Thông báo</h3>
          <ul className="list-disc list-inside text-sm space-y-1">
            <li>Thứ 3: kiểm tra 15 phút</li>
            <li>Thứ 6: nộp bài tập</li>
          </ul>
        </div>

        <div className="bg-white rounded shadow p-4">
          <h3 className="text-[#CC2B2B] font-bold mb-2">📊 Thống kê tuần</h3>
          <p className="text-sm">📘 3 môn học</p>
          <p className="text-sm">🕒 5 giờ học</p>
          <p className="text-sm">📅 Lịch học rải từ T3–T6</p>
        </div>
      </div> */}
    </div>
  );
}
export default StudentSchedule