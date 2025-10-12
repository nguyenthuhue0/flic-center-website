// src/pages/lecturer/Teachingschedule.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getTeachingSchedule } from "../../services/Lecturer/schedule.js";

import { jwtDecode } from "jwt-decode";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
dayjs.extend(customParseFormat);

/* ---------- helpers ---------- */

// map thứ -> số để sort (ISO: 1=Mon ... 7=Sun)
const DOW_NUM = {
  "Thứ hai": 1, "Thứ Hai": 1,
  "Thứ ba": 2,  "Thứ Ba": 2,
  "Thứ tư": 3,  "Thứ Tư": 3,
  "Thứ năm": 4, "Thứ Năm": 4,
  "Thứ sáu": 5, "Thứ Sáu": 5,
  "Thứ bảy": 6, "Thứ Bảy": 6,
  "Chủ nhật": 7, "Chủ Nhật": 7,
};

const norm = (s) => (typeof s === "string" ? s.trim() : "");

// "Tuần thứ X: dd/MM - dd/MM" -> {start, end}
function parseWeekRange(weekIndexStr) {
  if (!weekIndexStr) return null;
  const m = weekIndexStr.match(/(\d{2})\/(\d{2})\s*-\s*(\d{2})\/(\d{2})/);
  if (!m) return null;

  const [, d1Str, m1Str, d2Str, m2Str] = m;
  const y = dayjs().year();
  const start = dayjs(`${y}-${m1Str}-${d1Str}`, "YYYY-MM-DD").startOf("day");
  const endY = Number(m2Str) < Number(m1Str) ? y + 1 : y;
  const end = dayjs(`${endY}-${m2Str}-${d2Str}`, "YYYY-MM-DD").endOf("day");
  return { start, end };
}

function filterCurrentWeek(items = []) {
  const today = dayjs();
  return items.filter((it) => {
    const rng = parseWeekRange(it?.weekIndex);
    return rng && !today.isBefore(rng.start) && !today.isAfter(rng.end);
  });
}

function formatRange(start, end) {
  const s = norm(start);
  const e = norm(end);
  if (!s && !e) return "-";
  if (s && !e) return s;
  if (!s && e) return e;
  return `${s} - ${e}`;
}

/** MỖI BUỔI = 1 DÒNG (không gộp theo khóa) */
function buildRowsPerSession(items = []) {
  const current = filterCurrentWeek(items);
  const rows = current.map((it, idx) => {
    const courseTitle = norm(it?.courseTitle) || "Lớp chưa đặt tên";
    const day = norm(it?.dayOfWeek) || "-";
    const timeRange = formatRange(it?.startTime, it?.endTime);

    // sort keys
    const dowNum = DOW_NUM[day] || 99;
    const startSort = norm(it?.startTime) || "99:99";

    return {
      id: idx + 1,
      name: courseTitle,
      suatHoc: day,
      timeRange,
      _dow: dowNum,
      _start: startSort,
    };
  });

  // Sắp xếp theo thứ -> giờ
  rows.sort((a, b) => {
    if (a._dow !== b._dow) return a._dow - b._dow;
    return a._start.localeCompare(b._start);
  });

  return rows;
}

/* ---------- component ---------- */

export default function Teachingschedule() {
  const navigate = useNavigate();
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");

  useEffect(() => {
    (async () => {
      // quyền
      const token = sessionStorage.getItem("access_token");
      if (!token) { setErr("Vui lòng đăng nhập để xem lịch giảng dạy."); return; }
      try {
        const role = jwtDecode(token)?.role;
        const roles = Array.isArray(role) ? role : typeof role === "string" ? [role] : [];
        if (!roles.includes("INSTRUCTOR") && !roles.includes("ADMIN")) {
          setErr("Bạn không có quyền xem lịch giảng dạy (cần INSTRUCTOR/ADMIN).");
          return;
        }
      } catch { /* ignore */ }

      // dữ liệu
      try {
        setLoading(true);
        setErr("");
        const data = await getTeachingSchedule();
        const list = Array.isArray(data) ? data : [];
        const normalized = buildRowsPerSession(list);
        setRows(normalized);
      } catch (e) {
        setErr(e?.response?.data?.message || e?.message || "Load schedule failed");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return (
    <div className="p-6 min-h-screen">
      {/* Info box */}
      <div className="bg-white p-4 shadow border font-semibold mb-0">
        <p className="font-semibold text-[16px]">Các khóa học của năm 2025 - 2026</p>
        <p className="mt-2 font-semibold">Lưu ý:</p>
        <ul className="list-disc list-inside text-sm mt-1 text-gray-700">
          <li>Giảng viên phải điểm danh mỗi tiết học</li>
          <li>Thời gian và nội dung tiết học giảng viên có thể sửa đổi</li>
        </ul>
      </div>

      {/* Nút điều hướng (tuỳ bạn) */}
      <div
        className="bg-[#F1BA54] text-white font-semibold px-4 py-2 h-[50px] mt-6 rounded text-[17px] flex items-center cursor-pointer hover:text-white transition"
        onClick={() => navigate("../")}
      >
        📘 Lịch giảng dạy chi tiết
      </div>

      {/* Header bảng */}
      <div className="grid grid-cols-4 bg-[#D52929] h-[50px] text-[17px] text-white font-semibold px-4 py-2 mt-6">
        <div>STT</div>
        <div>Tên lớp</div>
        <div>Suất học</div>
        <div>Thời gian</div>
      </div>

      {/* Content */}
      <div className="space-y-4 mt-3">
        {loading && <div className="bg-white px-4 py-3 border rounded shadow-sm">Đang tải...</div>}
        {err && <div className="bg-red-50 text-red-700 px-4 py-3 border border-red-200 rounded">{err}</div>}
        {!loading && !err && rows.length === 0 && (
          <div className="bg-white px-4 py-3 border rounded shadow-sm">
            Chưa có lịch giảng dạy trong tuần hiện tại
          </div>
        )}

        {rows.map((row, idx) => (
          <div
            key={`${row.id}-${idx}`}
            className="grid grid-cols-4 bg-white text-[17px] px-4 py-3 border border-gray-300 rounded shadow-sm h-[50px] items-center"
          >
            <div className="font-semibold">{idx + 1}</div>
            <div className="font-semibold truncate">{row.name}</div>
            <div className="font-semibold truncate">{row.suatHoc}</div>
            <div className="font-semibold truncate">{row.timeRange}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
