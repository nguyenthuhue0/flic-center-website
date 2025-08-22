// src/services/lecturer/attendance.js
import axios from "axios";
import nProgress from "nprogress";
import "nprogress/nprogress.css";

nProgress.configure({ showSpinner: false, speed: 500, trickleSpeed: 100 });

const instance = axios.create({
  baseURL: "http://localhost:8080",
});

instance.interceptors.request.use(
  (config) => {
    const token = sessionStorage.getItem("access_token");
    if (token) config.headers["Authorization"] = `Bearer ${token}`;
    nProgress.start();
    return config;
  },
  (err) => Promise.reject(err)
);

instance.interceptors.response.use(
  (res) => (nProgress.done(), res?.data ?? res),
  (err) => (nProgress.done(), Promise.reject(err))
);

// Unwrap nếu BE trả {message, data: [...]}
const unwrap = (payload) =>
  Array.isArray(payload) ? payload : (Array.isArray(payload?.data) ? payload.data : payload);

/** GET /api/lessons/attendance?lessonId=... */
export function getLessonAttendance(lessonId) {
  return instance
    .get("/api/lessons/attendance", { params: { lessonId } })
    .then(unwrap);
}

/** GET /api/lessons/students?lessonId=... (fallback nếu chưa có attendance) */
export function getLessonStudents(lessonId) {
  return instance
    .get("/api/lessons/students", { params: { lessonId } })
    .then(unwrap);
}

/**
 * PUT /api/lessons/attendance/update-list
 * Body phải match StudentAttendanceUpdateListDTO của BE.
 * Ví dụ:
 * {
 *   lessonId: 32,
 *   students: [
 *     { fullName: "Nguyễn A", birthDate: "2004-07-05", status: "present", note: null },
 *     ...
 *   ]
 * }
 */
export function saveLessonAttendance(lessonId, updates) {
  return instance.put("/api/lessons/attendance/update-list", {
    lessonId: Number(lessonId),
    updates,
  });
}