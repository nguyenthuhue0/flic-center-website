// src/pages/lecturer/Attendance.jsx
import React, { useEffect, useMemo, useState } from "react";
import dayjs from "dayjs";
import { useLocation } from "react-router-dom";
import { getLessonAttendance, saveLessonAttendance } from "../../services/Lecturer/attendance.js";
import { getLessonById } from "../../services/Lecturer/lessons.js"; // <-- dùng để backfill meta

// Map trạng thái hiển thị <-> giá trị server
const ATT_STATES = [
  { ui: "Có mặt",  server: "present", color: "bg-green-500" },
  { ui: "Vắng",    server: "absent",  color: "bg-red-500" },
  { ui: "Đi trễ",  server: "late",    color: "bg-yellow-500" },
];

function stateIndexFromServer(val = "present") {
  const i = ATT_STATES.findIndex((s) => s.server === val);
  return i >= 0 ? i : 0;
}
function serverFromIndex(i = 0) {
  return ATT_STATES[i]?.server ?? "present";
}

function useQuery() {
  const { search } = useLocation();
  return useMemo(() => new URLSearchParams(search), [search]);
}

// format linh hoạt: HH:mm hoặc ISO -> "DD/MM/YYYY HH:mm"
function fmtTime(raw) {
  if (!raw) return "";
  const s = String(raw);
  if (s.length <= 5) return s; // "HH:mm" thì giữ nguyên
  const iso = dayjs(s);
  if (iso.isValid()) return iso.format("DD/MM/YYYY HH:mm");
  const m2 = dayjs(s, "YYYY-MM-DD HH:mm:ss", true);
  return m2.isValid() ? m2.format("DD/MM/YYYY HH:mm") : s;
}

export default function Attendance() {
  const query = useQuery();

  // URL params
  const lessonId   = query.get("lessonId");
  const queryTitle = query.get("title") || query.get("lessonTitle") || "";
  const queryStart = query.get("start") || query.get("startTime") || query.get("plannedAt") || "";
  const queryEnd   = query.get("end")   || query.get("endTime")   || "";

  // Header info
  const [lessonTitle, setLessonTitle] = useState(queryTitle);
  const [startTime, setStartTime]     = useState(queryStart);
  const [endTime, setEndTime]         = useState(queryEnd);

  // Data
  const [students, setStudents] = useState([]); // {id, name, dob, stateIndex, note}
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");
  const [savedMsg, setSavedMsg] = useState("");
  const [showSummary, setShowSummary] = useState(false);

  // Tải danh sách điểm danh
  useEffect(() => {
    if (!lessonId) {
      setErr("Thiếu lessonId trên URL.");
      return;
    }
    (async () => {
      try {
        setLoading(true);
        setErr(""); 
        setSavedMsg("");

        const payload = await getLessonAttendance(lessonId);

        // Hậu thuẫn cả 2 kiểu trả về: mảng thuần hoặc { data: [...], ...meta }
        let list = [];
        if (Array.isArray(payload)) {
          list = payload;
        } else if (Array.isArray(payload?.data)) {
          list = payload.data;

          // Nếu BE có kèm meta thì lấy
          if (payload.lessonTitle || payload.title) {
            setLessonTitle((prev) => prev || payload.lessonTitle || payload.title);
          }
          if (payload.startTime || payload.plannedAt || payload.start) {
            setStartTime((prev) => prev || payload.startTime || payload.plannedAt || payload.start);
          }
          if (payload.endTime || payload.end) {
            setEndTime((prev) => prev || payload.endTime || payload.end);
          }
        }

        const mapped = list.map((stu, idx) => ({
          id: idx + 1,
          name: stu.fullName || "—",
          dob: stu.birthDate ? dayjs(stu.birthDate).format("DD/MM/YYYY") : "—",
          rawDobISO: stu.birthDate || null,
          stateIndex: stateIndexFromServer(stu.status),
          note: "",
        }));
        setStudents(mapped);
      } catch (e) {
        setErr(e?.response?.data?.message || e?.message || "Không tải được danh sách điểm danh.");
      } finally {
        setLoading(false);
      }
    })();
  }, [lessonId]);

  // Backfill meta (title/time) theo lessonId nếu chưa có trên URL/payload
  useEffect(() => {
    if (!lessonId) return;
    if (lessonTitle && (startTime || endTime)) return; // đã đủ thông tin

    (async () => {
      try {
        const meta = await getLessonById(lessonId); // { id, title, plannedAt, endTime, ... }
        if (meta?.title)     setLessonTitle((prev) => prev || meta.title);
        if (meta?.plannedAt) setStartTime((prev) => prev || meta.plannedAt);
        if (meta?.startTime) setStartTime((prev) => prev || meta.startTime);
        if (meta?.endTime)   setEndTime((prev) => prev || meta.endTime);
      } catch {
        // ignore nếu không có API
      }
    })();
  }, [lessonId, lessonTitle, startTime, endTime]);

  const toggleState = (index) => {
    setStudents((prev) => {
      const next = [...prev];
      next[index].stateIndex = (next[index].stateIndex + 1) % ATT_STATES.length;
      return next;
    });
  };

  const handleNoteChange = (index, value) => {
    setStudents((prev) => {
      const next = [...prev];
      next[index].note = value;
      return next;
    });
  };

  const confirmAttendance = async () => {
    try {
      setSavedMsg("");
      setErr("");
      setLoading(true);

      const updates = students.map((s) => ({
        fullName: s.name,
        birthDate: s.rawDobISO, // null hoặc 'YYYY-MM-DD'
        status: serverFromIndex(s.stateIndex),
        note: s.note || null,
      }));

      const res = await saveLessonAttendance(lessonId, updates);
      setSavedMsg(res?.message || "Đã lưu điểm danh thành công ✅");
      setShowSummary(true);
    } catch (e) {
      setErr(e?.response?.data?.message || e?.message || "Lưu điểm danh thất bại.");
    } finally {
      setLoading(false);
    }
  };

  // summary
  const total = students.length || 1;
  const counts = students.reduce(
    (acc, s) => {
      const key = ATT_STATES[s.stateIndex].ui;
      acc[key] = (acc[key] || 0) + 1;
      return acc;
    },
    { "Có mặt": 0, "Vắng": 0, "Đi trễ": 0 }
  );
  const pct = (n) => Math.round((n * 100) / total);

  const timeLabel =
    startTime || endTime
      ? `${fmtTime(startTime)}${startTime && endTime ? " - " : ""}${fmtTime(endTime)}`
      : "—";

  return (
    <div className="p-4 font-sans bg-white min-h-screen">
      {/* HEADER: Tên buổi, ID, thời gian */}
      <div className="border border-[#EFE4E5] p-4">
        <div className="font-bold text-[16px]">
          Buổi học: {lessonTitle || "(chưa có tiêu đề)"}
        </div>
        <div className="text-sm font-semibold text-gray-600 mt-1 flex flex-wrap gap-x-6 gap-y-1">
          <span>Lesson ID: <span className="font-bold text-gray-800">{lessonId}</span></span>
          <span>Thời gian: <span className="font-bold text-gray-800">{timeLabel}</span></span>
          <span>Học viên: <span className="font-bold text-gray-800">{students.length}</span></span>
        </div>
      </div>

      {loading && <div className="mt-4 bg-white border rounded p-3">Đang tải...</div>}
      {err && (
        <div className="mt-4 bg-red-50 text-red-700 border border-red-200 rounded p-3">
          {err}
        </div>
      )}
      {savedMsg && (
        <div className="mt-4 bg-green-50 text-green-700 border border-green-200 rounded p-3">
          {savedMsg}
        </div>
      )}

      {/* Bảng học viên */}
      <div className="border border-[#EFE4E5] overflow-x-auto mt-4">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-[#E21F22] text-white text-left h-[50px]">
              <th className="p-2">STT</th>
              <th className="p-2">Họ và tên</th>
              <th className="p-2">Ngày sinh</th>
              <th className="p-2">Điểm danh</th>
              <th className="p-2">Ghi chú</th>
            </tr>
          </thead>
          <tbody>
            {students.map((s, idx) => {
              const state = ATT_STATES[s.stateIndex];
              return (
                <tr key={s.id} className="border-b border-[#EFE4E5] hover:bg-gray-50">
                  <td className="p-2 font-semibold">{idx + 1}</td>
                  <td className="p-2 font-semibold">{s.name}</td>
                  <td className="p-2 font-semibold">{s.dob}</td>
                  <td className="p-2 font-semibold">
                    <button
                      onClick={() => toggleState(idx)}
                      className={`transition-all duration-200 text-white px-4 py-1 rounded border-2 w-[100px] text-center font-semibold ${state.color} border-transparent hover:scale-105`}
                    >
                      {state.ui}
                    </button>
                  </td>
                  <td className="p-2">
                    <input
                      type="text"
                      className="border border-gray-300 rounded-lg px-3 py-1 w-[160px] focus:outline-none focus:ring-2 focus:ring-red-400"
                      placeholder="Ghi chú"
                      value={s.note}
                      onChange={(e) => handleNoteChange(idx, e.target.value)}
                    />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Nút xác nhận */}
      <div className="mt-6 flex justify-center gap-3">
        <button
          onClick={() => setShowSummary(!showSummary)}
          className="bg-gray-100 text-gray-700 px-5 py-2 rounded-xl font-semibold border hover:bg-gray-200"
        >
          {showSummary ? "Ẩn thống kê" : "Xem thống kê"}
        </button>
        <button
          onClick={confirmAttendance}
          className="bg-[#E21F22] text-white px-6 py-2 rounded-xl text-base font-semibold shadow-md hover:bg-red-600"
        >
          ✅ Xác nhận điểm danh
        </button>
      </div>

      {/* Thống kê gọn */}
      {showSummary && (
        <div className="mt-6 flex justify-center">
          <div className="p-6 border rounded-xl shadow-md bg-white max-w-xl w-full">
            <h2 className="font-bold text-lg mb-4 text-[#E21F22]">📊 Thống kê điểm danh</h2>

            <div className="grid grid-cols-3 gap-3 text-center">
              <div className="rounded-lg border p-3 bg-green-50 text-green-700 font-semibold">
                Có mặt
                <div className="text-xl">{counts["Có mặt"]}</div>
                <div className="text-xs">{pct(counts["Có mặt"])}%</div>
              </div>

              <div className="rounded-lg border p-3 bg-yellow-50 text-yellow-700 font-semibold">
                Đi trễ
                <div className="text-xl">{counts["Đi trễ"]}</div>
                <div className="text-xs">{pct(counts["Đi trễ"])}%</div>
              </div>

              <div className="rounded-lg border p-3 bg-red-50 text-red-700 font-semibold">
                Vắng
                <div className="text-xl">{counts["Vắng"]}</div>
                <div className="text-xs">{pct(counts["Vắng"])}%</div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
