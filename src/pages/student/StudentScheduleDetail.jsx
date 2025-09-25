import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { getScheduleOfStudent } from "../../services/Student/Schedule";
import isBetween from "dayjs/plugin/isBetween";

dayjs.extend(isBetween);

const dayOfWeekToOffset = {
  "Thứ Hai": 0,
  "Thứ Ba": 1,
  "Thứ Tư": 2,
  "Thứ Năm": 3,
  "Thứ Sáu": 4,
  "Thứ Bảy": 5,
  "Chủ nhật": 6,
};

// lấy ngày bắt đầu tuần từ weekIndex
function getStartDateOfWeek(weekIndex) {
  if (!weekIndex || typeof weekIndex !== "string") return null;

  // trường hợp "1: 04/08 - 10/08" hoặc chỉ "04/08 - 10/08"
  let rangeStr = weekIndex.includes(":")
    ? weekIndex.split(":")[1].trim()
    : weekIndex.trim();

  if (!rangeStr.includes("-")) return null;

  const startStr = rangeStr.split("-")[0].trim(); // "04/08"
  const date = dayjs(startStr + "/2025", "DD/MM/YYYY");

  return date.isValid() ? date : null;
}

// tính ngày học từ weekIndex + dayOfWeek
function getDateOfSession(weekIndex, dayOfWeekStr) {
  const startDate = getStartDateOfWeek(weekIndex);
  if (!startDate) return "N/A";

  const offset = dayOfWeekToOffset[dayOfWeekStr] ?? 0;
  return startDate.add(offset, "day").format("DD/MM/YYYY");
}

const StudentScheduleDetail = () => {
  const [dataSchedule, setDataSchedule] = useState([]);

  useEffect(() => {
    fetchDataScheduleOfStudent();
  }, []);

  const fetchDataScheduleOfStudent = async () => {
    try {
      let data = await getScheduleOfStudent();
      // đảm bảo dữ liệu không null
      setDataSchedule(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Error fetching schedule:", err);
      setDataSchedule([]);
    }
  };

  const daysMap = [
    "Chủ nhật",
    "Thứ Hai",
    "Thứ Ba",
    "Thứ Tư",
    "Thứ Năm",
    "Thứ Sáu",
    "Thứ Bảy",
  ];
  const todayName = daysMap[new Date().getDay()];
  const today = dayjs();

  // chỉ lấy tuần hiện tại trở đi (bỏ qua tuần cũ)
  const validSchedules = dataSchedule.filter((item) => {
    const startDate = getStartDateOfWeek(item.weekIndex);
    if (!startDate) return false;

    const endDate = startDate.add(6, "day");
    return today.isBetween(startDate, endDate, "day", "[]") || today.isBefore(endDate);
  });

  const mapDataForTable = (arr) =>
    arr.map((item, index) => ({
      id: index + 1,
      className: item.courseTitle ?? "N/A",
      session: `${item.weekIndex} - ${item.dayOfWeek} (${getDateOfSession(
        item.weekIndex,
        item.dayOfWeek
      )})`,
      time: item.startTime && item.endTime ? `${item.startTime} - ${item.endTime}` : "N/A",
      location: "Phòng A1",
      teacher: item.lecturerName ?? "—",
    }));

  // lịch hôm nay
  const schedulesToday = mapDataForTable(
    validSchedules.filter((item) => item.dayOfWeek === todayName)
  );

  // lịch sắp tới
  const upcomingSchedules = mapDataForTable(
    validSchedules.filter((item) => item.dayOfWeek !== todayName)
  );

  const renderTable = (title, color, tableData) => (
    <div className="rounded mb-6">
      <div className={`text-white font-semibold px-7 py-4 ${color} text-lg mb-5`}>
        {title}
      </div>
      <div className="overflow-y-auto max-h-60">
        <table className="w-full text-md table-auto border-yellow-200 dark:border-yellow-900 border">
          <thead className="bg-red-600 dark:bg-red-800 text-white mb-3">
            <tr>
              <th className="px-4 py-2 text-left">STT</th>
              <th className="px-4 py-2 text-left">Tên lớp</th>
              <th className="px-4 py-2 text-left">Suất học</th>
              <th className="px-4 py-2 text-left">Thời gian</th>
              <th className="px-4 py-2 text-left">Giáo viên</th>
              <th className="px-4 py-2 text-left">Lịch trình môn học</th>
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-[#232326] text-md mt-3">
            {tableData.length === 0 ? (
              <tr>
                <td
                  className="text-center text-blue-700 dark:text-blue-300 p-4 text-lg"
                  colSpan={7}
                >
                  Không có lịch học
                </td>
              </tr>
            ) : (
              tableData.map((item) => (
                <tr key={item.id} className="border-yellow-200 dark:border-yellow-900 border">
                  <td className="px-4 py-2 dark:text-gray-100">{item.id}</td>
                  <td className="px-4 py-2 dark:text-gray-100">{item.className}</td>
                  <td className="px-4 py-2 dark:text-gray-100">{item.session}</td>
                  <td className="px-4 py-2 dark:text-gray-100">{item.time}</td>
                  <td className="px-4 py-2 dark:text-gray-100">{item.teacher}</td>
                  <td className="px-4 py-2">
                    <button className="bg-blue-500 dark:bg-blue-700 text-white px-6 py-2 rounded hover:bg-blue-600 dark:hover:bg-blue-800 cursor-pointer transition-colors">
                      Xem lịch trình
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );

  return (
    <div className="p-4 min-h-screen bg-gray-50 dark:bg-[#18181b] transition-colors duration-300">
      {renderTable("Lịch học ngày hôm nay", "bg-blue-600 dark:bg-blue-800", schedulesToday)}
      {renderTable("Lịch học ngày sắp tới", "bg-orange-500 dark:bg-orange-700", upcomingSchedules)}
    </div>
  );
};

export default StudentScheduleDetail;
