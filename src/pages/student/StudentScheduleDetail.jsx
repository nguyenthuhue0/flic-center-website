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
  const rangeStr = weekIndex.split(":")[1].trim(); // "04/08 - 10/08"
  const startStr = rangeStr.split("-")[0].trim(); // "04/08"
  return dayjs(startStr + "/2025", "DD/MM/YYYY");
}

// tính ngày học từ weekIndex + dayOfWeek
function getDateOfSession(weekIndex, dayOfWeekStr) {
  try {
    const startDate = getStartDateOfWeek(weekIndex);
    const offset = dayOfWeekToOffset[dayOfWeekStr] ?? 0;
    return startDate.add(offset, "day").format("DD/MM/YYYY");
  } catch {
    return "N/A";
  }
}

const StudentScheduleDetail = () => {
  const [dataSchedule, setDataSchedule] = useState([]);

  useEffect(() => {
    fetchDataScheduleOfStudent();
  }, []);

  const fetchDataScheduleOfStudent = async () => {
    let data = await getScheduleOfStudent();
    setDataSchedule(data);
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
    const endDate = startDate.add(6, "day");
    return today.isBetween(startDate, endDate, "day", "[]") || today.isBefore(endDate);
  });

  const mapDataForTable = (arr) =>
    arr.map((item, index) => ({
      id: index + 1,
      className: item.courseTitle,
      session: `${item.weekIndex} - ${item.dayOfWeek} (${getDateOfSession(
        item.weekIndex,
        item.dayOfWeek
      )})`,
      time: `${item.startTime} - ${item.endTime}`,
      location: "Phòng A1",
      teacher: item.lecturerName,
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
        <table className="w-full text-md table-auto border-yellow-200 border">
          <thead className="bg-red-600 text-white mb-3">
            <tr>
              <th className="px-4 py-2 text-left">STT</th>
              <th className="px-4 py-2 text-left">Tên lớp</th>
              <th className="px-4 py-2 text-left">Suất học</th>
              <th className="px-4 py-2 text-left">Thời gian</th>
              <th className="px-4 py-2 text-left">Giáo viên</th>
              <th className="px-4 py-2 text-left">Lịch trình môn học</th>
            </tr>
          </thead>
          <tbody className="bg-white text-md mt-3">
            {tableData.length === 0 ? (
              <tr>
                <td
                  className="text-center text-blue-700 p-4 text-lg"
                  colSpan={7}
                >
                  Không có lịch học
                </td>
              </tr>
            ) : (
              tableData.map((item) => (
                <tr key={item.id} className="border-yellow-200 border">
                  <td className="px-4 py-2">{item.id}</td>
                  <td className="px-4 py-2">{item.className}</td>
                  <td className="px-4 py-2">{item.session}</td>
                  <td className="px-4 py-2">{item.time}</td>
                  <td className="px-4 py-2">{item.teacher}</td>
                  <td className="px-4 py-2">
                    <button className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 cursor-pointer">
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
    <div className="p-4">
      {renderTable("Lịch học ngày hôm nay", "bg-blue-600", schedulesToday)}
      {renderTable("Lịch học ngày sắp tới", "bg-orange-500", upcomingSchedules)}
    </div>
  );
};

export default StudentScheduleDetail;
