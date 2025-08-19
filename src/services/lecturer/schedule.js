// src/services/lecturer/schedule.js
import AxiosCustomize from "../../utils/axiosCustomize"; // đường dẫn theo dự án bạn

// GET /api/lecturers/{lecturerId}/schedule?from=yyyy-mm-dd&to=yyyy-mm-dd
export const getLecturerSchedule = async (lecturerId, from, to) => {
  const res = await AxiosCustomize.get(
    `/api/lecturers/${lecturerId}/schedule`,
    { params: { from, to } }
  );
  // backend trả mảng [{lesson_id, course_id, course_title, room, dow, start_time, end_time, date?}]
  return res;
};
