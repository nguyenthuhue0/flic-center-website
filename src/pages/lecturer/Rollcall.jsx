// src/pages/lecturer/Rollcall.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
dayjs.extend(customParseFormat);

import { getTeachingSchedule, getCourseLessons } from "../../services/Lecturer/schedule.js";

/* ---------------- helpers ---------------- */

// Map "Thứ ..." -> isoWeekday (1-7)
const DOW_NUM = {
  "Thứ hai": 1, "Thứ Hai": 1,
  "Thứ ba": 2,  "Thứ Ba": 2,
  "Thứ tư": 3,  "Thứ Tư": 3,
  "Thứ năm": 4, "Thứ Năm": 4,
  "Thứ sáu": 5, "Thứ Sáu": 5,
  "Thứ bảy": 6, "Thứ Bảy": 6,
  "Chủ nhật": 7, "Chủ Nhật": 7,
};

// "Tuần thứ X: dd/MM - dd/MM" -> {start, end}
function parseWeekRange(weekIndexStr) {
  if (!weekIndexStr) return null;
  const m = weekIndexStr.match(/(\d{2})\/(\d{2})\s*-\s*(\d{2})\/(\d{2})/);
  if (!m) return null;

  const [, d1, m1, d2, m2] = m;
  const thisYear = dayjs().year();
  const start = dayjs(`${thisYear}-${m1}-${d1}`, "YYYY-MM-DD").startOf("day");
  const endYear = Number(m2) < Number(m1) ? thisYear + 1 : thisYear;
  const end = dayjs(`${endYear}-${m2}-${d2}`, "YYYY-MM-DD").endOf("day");
  return { start, end };
}

// chỉ giữ các item thuộc tuần hiện tại
function filterCurrentWeek(items = []) {
  const today = dayjs();
  return items.filter((it) => {
    const rng = parseWeekRange(it?.weekIndex);
    return rng && !today.isBefore(rng.start) && !today.isAfter(rng.end);
  });
}

// build từng BUỔI (không gộp), cố gắng gắn lessonId/title nếu thiếu
async function buildRowsPerSession(items = []) {
  const current = filterCurrentWeek(items);
  const courseCache = new Map(); // courseId -> lessons[]

  const rows = [];
  for (const it of current) {
    const courseTitle = (it?.courseTitle || "Lớp chưa đặt tên").trim();
    const day = (it?.dayOfWeek || "").trim();
    const courseId = it?.courseId ?? it?.course_id ?? null;
    const weekIndex = it?.weekIndex || "";

    let lessonId = it?.lessonId ?? it?.id ?? it?.lesson_id ?? null;
    let lessonTitle = it?.lessonTitle || "";
    let startTime = (it?.startTime || "").trim(); // "HH:mm"
    let endTime   = (it?.endTime   || "").trim();

    // nếu timetable không có lessonId mà có courseId -> lấy danh sách bài và match
    if (!lessonId && courseId) {
      let lessons = courseCache.get(courseId);
      if (!lessons) {
        try { lessons = await getCourseLessons(courseId); } catch { lessons = []; }
        courseCache.set(courseId, lessons);
      }

      const rng = parseWeekRange(weekIndex);
      const wantDow = DOW_NUM[day] || null;

      // match chặt: trong tuần + đúng thứ + đúng HH:mm nếu có
      let best = lessons.find(L => {
        const p = dayjs(L?.plannedAt || L?.startTime || "");
        if (!p.isValid()) return false;
        const inWeek = !rng || (p.isAfter(rng.start.subtract(1,"ms")) && p.isBefore(rng.end.add(1,"ms")));
        if (!inWeek) return false;
        if (wantDow && p.isoWeekday() !== wantDow) return false;
        if (startTime) return p.format("HH:mm") === startTime;
        return true;
      });

      // nếu chưa có, nới điều kiện: trong tuần + đúng thứ
      if (!best) {
        best = lessons.find(L => {
          const p = dayjs(L?.plannedAt || L?.startTime || "");
          if (!p.isValid()) return false;
          const inWeek = !rng || (p.isAfter(rng.start.subtract(1,"ms")) && p.isBefore(rng.end.add(1,"ms")));
          return inWeek && (!wantDow || p.isoWeekday() === wantDow);
        });
      }

      if (best) {
        lessonId = best?.id ?? best?.lessonId ?? null;
        if (!lessonTitle && best?.title) lessonTitle = best.title;
        if (!startTime && best?.plannedAt) startTime = dayjs(best.plannedAt).format("HH:mm");
        if (!endTime && best?.endTime) endTime = dayjs(best.endTime).format("HH:mm");
      }
    }

    rows.push({
      id: rows.length + 1,
      name: courseTitle,
      suatHoc: day || "-",
      lessonId,
      lessonTitle,
      startTime,
      endTime,
      _dow: DOW_NUM[day] || 99,                 // dùng để so với hôm nay
      _start: startTime || "99:99",
      _name: courseTitle.toLowerCase(),
    });
  }

  // sort: thứ -> giờ -> tên lớp
  rows.sort((a, b) => (a._dow - b._dow) || a._start.localeCompare(b._start) || a._name.localeCompare(b._name, "vi"));
  return rows;
}

// format hiển thị thời gian HH:mm - HH:mm
function formatTimeRange(start, end) {
  if (start && end) return `${start} - ${end}`;
  if (start) return start;
  if (end) return end;
  return "-";
}

/* ---------------- component ---------------- */

export default function Rollcall() {
  const navigate = useNavigate();
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");

  // hôm nay là thứ mấy (1..7)
  const todayDow = dayjs().isoWeekday();

  // chỉ cho điểm danh nếu đúng NGÀY (đúng thứ của buổi) và có lessonId
  const canAttend = (row) => Boolean(row.lessonId) && row._dow === todayDow;

  useEffect(() => {
    (async () => {
      // check token/quyền
      const token = sessionStorage.getItem("access_token");
      if (!token) { setErr("Vui lòng đăng nhập."); return; }
      try {
        const role = jwtDecode(token)?.role;
        const roles = Array.isArray(role) ? role : typeof role === "string" ? [role] : [];
        if (!roles.includes("INSTRUCTOR") && !roles.includes("ADMIN")) {
          setErr("Bạn không có quyền xem danh sách lớp để điểm danh.");
          return;
        }
      } catch { /* ignore */ }

      // fetch & render
      try {
        setLoading(true);
        setErr("");
        const data = await getTeachingSchedule();
        const list = Array.isArray(data) ? data : [];
        const normalized = await buildRowsPerSession(list);
        setRows(normalized);
      } catch (e) {
        setErr(e?.response?.data?.message || e?.message || "Load schedule failed");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  // layout cột thống nhất cho header + rows (thêm cột Thời gian)
  const gridCols = "[grid-template-columns:80px_minmax(0,1fr)_160px_150px_150px]";

  return (
    <div className="p-6 min-h-screen">
      {/* Box Thông tin */}
      <div className="bg-white p-4 shadow border font-semibold">
        <p className="font-semibold text-[16px]">Các khóa học của năm 2025 - 2026</p>
        <p className="mt-2 font-semibold">Lưu ý:</p>
        <ul className="list-disc list-inside text-sm mt-1 text-gray-700">
          <li>Giảng viên phải điểm danh mỗi tiết học</li>
          <li>Thời gian và nội dung tiết học giảng viên có thể sửa đổi</li>
        </ul>
      </div>

      {/* Link lịch dạy chi tiết */}
      <div className="bg-[#F1BA54] text-white font-semibold px-4 py-2 h-[50px] mt-6 rounded text-[17px] flex items-center">
        📘 Lịch giảng dạy chi tiết
      </div>

      {/* Header */}
      <div className={`grid ${gridCols} bg-[#D52929] h-[50px] text-[17px] text-white font-semibold px-4 py-2 mt-6`}>
        <div className="text-center">STT</div>
        <div>Tên lớp</div>
        <div className="text-center">Suất học</div>
        <div className="text-center">Thời gian</div>
        <div className="text-center">Điểm danh</div>
      </div>

      {/* Content */}
      <div className="space-y-3 mt-3">
        {loading && <div className="bg-white px-4 py-3 border rounded shadow-sm">Đang tải...</div>}
        {err && <div className="bg-red-50 text-red-700 px-4 py-3 border border-red-200 rounded">{err}</div>}
        {!loading && !err && rows.length === 0 && (
          <div className="bg-white px-4 py-3 border rounded shadow-sm">Chưa có lớp trong tuần hiện tại</div>
        )}

        {rows.map((row, idx) => {
          const allowed = canAttend(row);
          return (
            <div
              key={row.id ?? idx}
              className={`grid ${gridCols} bg-white text-[17px] px-4 py-3 border border-gray-300 rounded shadow-sm h-[50px] items-center`}
            >
              <div className="font-semibold text-center">{idx + 1}</div>
              <div className="font-semibold truncate">{row.name}</div>
              <div className="font-semibold text-center truncate">{row.suatHoc}</div>
              <div className="font-semibold text-center truncate">
                {formatTimeRange(row.startTime, row.endTime)}
              </div>

              <div className="flex items-center justify-center">
                <button
                  onClick={() =>
                    navigate(
                      `/lecturer/rollcalldetail` +
                        `?lessonId=${encodeURIComponent(row.lessonId ?? "")}` +
                        `&title=${encodeURIComponent(row.lessonTitle || row.name || "")}` +
                        `&start=${encodeURIComponent(row.startTime || "")}` +
                        `&end=${encodeURIComponent(row.endTime || "")}`
                    )
                  }
                  disabled={!allowed}
                  title={
                    allowed
                      ? ""
                      : row.lessonId
                      ? `Chỉ mở vào ${row.suatHoc} trong tuần này`
                      : "Không tìm thấy lessonId phù hợp."
                  }
                  className={`w-[110px] h-[34px] rounded text-sm font-semibold transition ${
                    allowed
                      ? "bg-[#1F5DE2] text-white hover:bg-blue-700"
                      : "bg-gray-200 text-gray-500 cursor-not-allowed"
                  }`}
                >
                  Điểm danh
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
