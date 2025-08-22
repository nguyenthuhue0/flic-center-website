import { useState, useEffect } from "react";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { getScheduleOfStudent } from "../../services/Student/Schedule";

dayjs.extend(customParseFormat);

const days = ["Thứ hai", "Thứ ba", "Thứ tư", "Thứ năm", "Thứ sáu", "Thứ bảy", "Chủ nhật"];
const hours = Array.from({ length: 21 - 7 + 1 }, (_, i) => `${7 + i}:00`);

const normalizeDay = (day) => {
  const mapping = {
    "Thứ Hai": "Thứ hai",
    "Thứ Ba": "Thứ ba",
    "Thứ Tư": "Thứ tư",
    "Thứ Năm": "Thứ năm",
    "Thứ Sáu": "Thứ sáu",
    "Thứ Bảy": "Thứ bảy",
    "Chủ Nhật": "Chủ nhật",
  };
  return mapping[day] || day;
};

const dayToIndex = {
  "Thứ hai": 0,
  "Thứ ba": 1,
  "Thứ tư": 2,
  "Thứ năm": 3,
  "Thứ sáu": 4,
  "Thứ bảy": 5,
  "Chủ nhật": 6,
};

const StudentSchedule = () => {
  const [lessons, setLessons] = useState([]);
  const [weekRanges, setWeekRanges] = useState({});
  const [currentWeekIndex, setCurrentWeekIndex] = useState(1);

  useEffect(() => {
    fetchDataScheduleOfStudent();
  }, []);

  const fetchDataScheduleOfStudent = async () => {
    try {
      let data = await getScheduleOfStudent();

      const formattedData = data.map((lesson, idx) => {
        const weekMatch = lesson.weekIndex.match(/Tuần thứ (\d+): (\d{2}\/\d{2}) - (\d{2}\/\d{2})/);
        let weekNum = null,
          startDate = null,
          endDate = null;

        if (weekMatch) {
          weekNum = parseInt(weekMatch[1], 10);
          const year = dayjs().year(); // giả sử năm hiện tại
          startDate = dayjs(`${weekMatch[2]}/${year}`, "DD/MM/YYYY");
          endDate = dayjs(`${weekMatch[3]}/${year}`, "DD/MM/YYYY");
        }

        return {
          id: idx,
          ...lesson,
          weekIndex: weekNum,
          startDate,
          endDate,
          dayOfWeek: normalizeDay(lesson.dayOfWeek),
        };
      });

      // tạo map tuần có sẵn
      const weekInfo = {};
      formattedData.forEach((l) => {
        if (l.weekIndex && l.startDate) {
          weekInfo[l.weekIndex] = { startDate: l.startDate, endDate: l.endDate };
        }
      });

      // sinh đủ tuần liên tục từ minWeek -> maxWeek
      const weeks = formattedData.filter((l) => l.weekIndex && l.startDate);
      const minWeek = Math.min(...weeks.map((l) => l.weekIndex));
      const maxWeek = Math.max(...weeks.map((l) => l.weekIndex));

      for (let w = minWeek; w <= maxWeek; w++) {
        if (!weekInfo[w]) {
          const base = weekInfo[minWeek];
          if (base) {
            const start = base.startDate.add((w - minWeek) * 7, "day");
            const end = start.add(6, "day");
            weekInfo[w] = { startDate: start, endDate: end };
          }
        }
      }

      setLessons(formattedData);
      setWeekRanges(weekInfo);

      // auto chọn tuần hiện tại
      const today = dayjs();
      const currentWeek = Object.entries(weekInfo).find(
        ([, range]) =>
          today.isSame(range.startDate, "day") ||
          today.isSame(range.endDate, "day") ||
          (today.isAfter(range.startDate) && today.isBefore(range.endDate))
      );
      if (currentWeek) {
        setCurrentWeekIndex(parseInt(currentWeek[0], 10));
      } else {
        setCurrentWeekIndex(minWeek);
      }
    } catch (err) {
      console.error("Lỗi tải lịch học:", err);
    }
  };

  const filteredLessons = lessons.filter((lesson) => lesson.weekIndex === currentWeekIndex);

  const getBlockStyle = (lesson) => {
    const dayIndex = days.indexOf(lesson.dayOfWeek);
    // Nếu startTime hoặc endTime là null/undefined, fallback về "00:00"
const [startHour, startMin] = (lesson.startTime || "00:00").split(":").map(Number);
const [endHour, endMin] = (lesson.endTime || "00:00").split(":").map(Number);


    const startOffset = (startHour - 7) * 50 + (startMin / 60) * 50;
    const duration = (endHour - startHour) * 50 + ((endMin - startMin) / 60) * 50;

    return {
      top: `${startOffset}px`,
      left: `${(dayIndex / 7) * 100}%`,
      height: `${duration}px`,
      width: `14.2857%`,
    };
  };

  const colors = ["#c42031", "#fed014", "#374f8a", "#f7961e"];
  const today = dayjs();

  const weekDates =
    weekRanges[currentWeekIndex]?.startDate &&
    Array.from({ length: 7 }, (_, i) => weekRanges[currentWeekIndex].startDate.add(i, "day"));

  return (
    <div className="p-4 flex gap-4">
      <div className="flex-1">
        {/* Thanh chọn tuần */}
        <div className="flex justify-between items-center mb-2">
          <button
            onClick={() => setCurrentWeekIndex((prev) => Math.max(1, prev - 1))}
            className="bg-gray-200 px-3 py-1 rounded hover:bg-gray-300"
            disabled={!weekRanges[currentWeekIndex - 1]}
          >
            ← Tuần trước
          </button>

          <div className="font-bold text-xl text-red-600">
            Tuần {currentWeekIndex}{" "}
            {weekRanges[currentWeekIndex]
              ? `(${weekRanges[currentWeekIndex].startDate.format("DD/MM")} - ${weekRanges[currentWeekIndex].endDate.format("DD/MM")})`
              : ""}
          </div>

          <button
            onClick={() => setCurrentWeekIndex((prev) => prev + 1)}
            className="bg-gray-200 px-3 py-1 rounded hover:bg-gray-300"
            disabled={!weekRanges[currentWeekIndex + 1]}
          >
            Tuần sau →
          </button>
        </div>

        {/* Header ngày trong tuần */}
        <div className="grid grid-cols-7 border border-black text-center font-semibold bg-white ml-12.5">
          {days.map((day, index) => {
            const dateObj = weekDates && weekDates[index];
            const isToday = dateObj && dateObj.isSame(today, "day");
            return (
              <div
                key={index}
                className={`p-1 border-r last:border-r-0 ${isToday ? "bg-yellow-200" : ""}`}
                title={dateObj ? dateObj.format("DD/MM/YYYY") : ""}
              >
                <div>{day}</div>
                {dateObj && <div className="text-xs text-gray-500">{dateObj.format("DD/MM")}</div>}
              </div>
            );
          })}
        </div>

        {/* Lưới + lessons */}
        <div className="relative flex">
          {/* Cột giờ */}
          <div className="flex flex-col text-sm mr-2">
            {hours.map((hour, idx) => (
              <div
                key={idx}
                className="h-[50px] flex items-start justify-end pr-2 text-gray-600"
              >
                {hour}
              </div>
            ))}
          </div>

          {/* Lưới + blocks */}
          <div className="border border-gray-300 flex-1 relative bg-white">
            {hours.map((_, rowIdx) => (
              <div
                key={rowIdx}
                className="absolute left-0 w-full border-t border-gray-200"
                style={{ top: `${(rowIdx + 1) * 50}px` }}
              />
            ))}

            {filteredLessons.map((lesson, idx) => {
              const lessonDayIndex = dayToIndex[lesson.dayOfWeek];
              const actualDate =
                weekRanges[lesson.weekIndex]?.startDate.add(lessonDayIndex, "day").format("DD/MM") ||
                "";

              return (
                <div
                  key={lesson.id}
                  className="absolute rounded p-6 text-md text-white shadow-md flex flex-col items-center justify-center"
                  style={{
                    ...getBlockStyle(lesson),
                    backgroundColor: colors[idx % colors.length],
                  }}
                  title={`${lesson.courseTitle} - ${lesson.lecturerName}\n${lesson.dayOfWeek} ${actualDate}\n${lesson.startTime} - ${lesson.endTime}`}
                >
                  <div className="font-bold">{lesson.courseTitle}</div>
                  <div className="py-4">
                    {lesson.startTime} - {lesson.endTime}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentSchedule;
