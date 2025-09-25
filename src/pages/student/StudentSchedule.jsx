// src/pages/lecturer/MaterialsDashboard.jsx
import React, { useEffect, useMemo, useState } from "react";
import dayjs from "dayjs";
import isoWeek from "dayjs/plugin/isoWeek";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { getScheduleOfStudent } from "../../services/Student/Schedule";

dayjs.extend(isoWeek);
dayjs.extend(customParseFormat);

/* =============== Helpers =============== */

// Map tên thứ -> cột (0..6)
const DOW_INDEX = {
  "Thứ hai": 0, "Thứ Hai": 0,
  "Thứ ba": 1,  "Thứ Ba": 1,
  "Thứ tư": 2,  "Thứ Tư": 2,
  "Thứ năm": 3, "Thứ Năm": 3,
  "Thứ sáu": 4, "Thứ Sáu": 4,
  "Thứ bảy": 5, "Thứ Bảy": 5,
  "Chủ nhật": 6, "Chủ Nhật": 6,
};

// Parse "Tuần thứ 1: 18/08 - 24/08" -> {start, end}
function parseWeekRange(weekIndexStr) {
  if (!weekIndexStr) return null;
  const m = weekIndexStr.match(/(\d{2})\/(\d{2})\s*-\s*(\d{2})\/(\d{2})/);
  if (!m) return null;
  const [, d1S, m1S, d2S, m2S] = m;
  const d1 = +d1S, m1 = +m1S, d2 = +d2S, m2 = +m2S;

  const thisYear = dayjs().year();
  const start = dayjs(`${thisYear}-${String(m1).padStart(2, "0")}-${String(d1).padStart(2, "0")}`, "YYYY-MM-DD").startOf("day");
  const endYear = m2 < m1 ? thisYear + 1 : thisYear; // nếu qua năm
  const end = dayjs(`${endYear}-${String(m2).padStart(2, "0")}-${String(d2).padStart(2, "0")}`, "YYYY-MM-DD").endOf("day");
  return { start, end };
}

// tuần UI và tuần từ API có giao nhau?
function inSelectedWeek(item, weekStart) {
  const rng = parseWeekRange(item?.weekIndex);
  if (!rng) return false;
  const selStart = dayjs(weekStart).startOf("day");
  const selEnd = dayjs(weekStart).add(6, "day").endOf("day");
  return !(rng.end.isBefore(selStart) || rng.start.isAfter(selEnd));
}

// "HH:mm" -> phút tính từ gridStartHour
function minutesFromGridStart(hhmm, gridStartHour = 8) {
  if (!hhmm) return 0;
  const [h, m] = hhmm.split(":").map(Number);
  return (h - gridStartHour) * 60 + (m || 0);
}

/* =============== Component =============== */

export default function StudentSchedule() {
  const days = ["Thứ hai", "Thứ ba", "Thứ tư", "Thứ năm", "Thứ sáu", "Thứ bảy", "Chủ nhật"];
  const gridStartHour = 8;     // 8:00
  const slotHeightPx = 50;     // 60' = 50px
  const defaultDurMin = 90;    // nếu endTime null

  const hours = Array.from({ length: 15 }, (_, i) => `${gridStartHour + i}:00`);
  const [currentWeekStart, setCurrentWeekStart] = useState(dayjs().startOf("isoWeek"));
  const weekDates = useMemo(
    () => Array.from({ length: 7 }, (_, i) => currentWeekStart.add(i, "day").format("DD/MM")),
    [currentWeekStart]
  );

  const [blocks, setBlocks] = useState([]);
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        setErr("");
        setLoading(true);

        // Gọi API timetable-lecturer
        const data = await getScheduleOfStudent(); // [{courseTitle, dayOfWeek, startTime, endTime, weekIndex, ...}]
        const list = Array.isArray(data) ? data : [];

        // Lọc theo tuần UI đang chọn
        const filtered = list.filter((it) => inSelectedWeek(it, currentWeekStart));

        // Map thành các block đặt lên grid
        const mapped = filtered
          .map((it, idx) => {
            const colIndex = DOW_INDEX[it?.dayOfWeek?.trim()];
            if (colIndex == null) return null;

            const startMin = minutesFromGridStart(it.startTime, gridStartHour);
            const endMin = it.endTime
              ? minutesFromGridStart(it.endTime, gridStartHour)
              : startMin + defaultDurMin;

            const durMin = Math.max(30, endMin - startMin);
            const topPx = (startMin / 60) * slotHeightPx;
            const heightPx = (durMin / 60) * slotHeightPx;

            return {
              id: idx,
              colIndex,
              topPx,
              heightPx,
              title: it.courseTitle || "Lớp học",
              note: `${it.dayOfWeek} • ${it.startTime}${it.endTime ? `–${it.endTime}` : ""}`,
            };
          })
          .filter(Boolean);

        setBlocks(mapped);
      } catch (e) {
        setErr(e?.response?.data?.message || e?.message || "Load timetable failed");
        setBlocks([]);
      } finally {
        setLoading(false);
      }
    })();
  }, [currentWeekStart]);

  return (
    <div className="p-4 flex gap-4 bg-gray-50 dark:bg-[#18181b] min-h-screen transition-colors duration-300">
      {/* Trái: Thời khóa biểu */}
      <div className="flex-1">
        {/* Thanh chọn tuần */}
        <div className="flex justify-between items-center mb-2">
          <button
            onClick={() => setCurrentWeekStart(currentWeekStart.subtract(1, "week"))}
            className="bg-gray-200 dark:bg-gray-700 dark:text-gray-100 px-3 py-1 rounded ml-[49px] hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
          >
            ← Tuần trước
          </button>

          <div className="font-semibold dark:text-white">
            Tuần: {currentWeekStart.format("DD/MM")} – {currentWeekStart.add(6, "day").format("DD/MM")}
          </div>

          <button
            onClick={() => setCurrentWeekStart(currentWeekStart.add(1, "week"))}
            className="bg-gray-200 dark:bg-gray-700 dark:text-gray-100 px-3 py-1 rounded hover:bg-gray-300 dark:hover:bg-gray-600 mr-[112px] transition-colors"
          >
            Tuần sau →
          </button>
        </div>

        {/* Header: các thứ + ngày */}
        <div className="grid grid-cols-7 ml-[49px] border border-black dark:border-gray-700 text-center font-semibold w-[1016px] h-[52px] bg-white dark:bg-[#232326] transition-colors">
          {days.map((day, index) => {
            const isSameWeek = currentWeekStart.isSame(dayjs().startOf("isoWeek"), "day");
            const isToday = isSameWeek && weekDates[index] === dayjs().format("DD/MM");
            return (
              <div
                key={index}
                className={`p-1 border-r last:border-r-0 border-gray-200 dark:border-gray-700 ${isToday ? "bg-yellow-200 text-[#CC2B2B] font-bold rounded" : "dark:text-gray-100"}`}
              >
                <div>{day}</div>
                <div className="text-xs text-gray-500 dark:text-gray-400">{weekDates[index]}</div>
              </div>
            );
          })}
        </div>

        {/* Grid thời khóa biểu */}
        <div className="relative mt-1 flex">
          {/* Cột giờ bên trái */}
          <div className="flex flex-col text-sm mt-4 mr-2">
            {hours.map((hour, idx) => (
              <div key={idx} className="h-[50px] flex items-start justify-end pr-2 text-gray-600 dark:text-gray-400">
                {hour}
              </div>
            ))}
          </div>

          {/* Lưới */}
          <div className="border border-pink-200 dark:border-pink-900 w-[1016px] h-[750px] grid grid-cols-7 relative bg-white dark:bg-[#232326] transition-colors">
            {/* Dòng lưới ngang */}
            {hours.map((_, rowIdx) => (
              <div
                key={rowIdx}
                className="absolute left-0 w-full border-t border-gray-200 dark:border-gray-700"
                style={{ top: `${(rowIdx + 1) * slotHeightPx}px` }}
              />
            ))}

            {/* Blocks từ API */}
            {loading && (
              <div className="absolute left-1/2 -translate-x-1/2 top-4 text-sm text-gray-500 dark:text-gray-300">
                Đang tải lịch...
              </div>
            )}
            {err && (
              <div className="absolute left-1/2 -translate-x-1/2 top-4 text-sm text-red-600 dark:text-red-400">
                {err}
              </div>
            )}
            {!loading &&
              blocks.map((b) => {
                const leftPct = (b.colIndex / 7) * 100;
                const widthPct = 100 / 7;
                return (
                  <div
                    key={b.id}
                    className="absolute rounded-lg shadow text-sm text-white flex flex-col justify-center items-center px-2"
                    style={{
                      top: `${b.topPx}px`,
                      left: `calc(${leftPct}% )`,
                      width: `calc(${widthPct}% - 4px)`,
                      height: `${b.heightPx}px`,
                      backgroundColor: "red",
                      border: "1px solid rgba(0,0,0,0.05)",
                    }}
                    title={b.note}
                  >
                    <div className="font-semibold truncate w-full text-center">{b.title}</div>
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    </div>
  );
}
