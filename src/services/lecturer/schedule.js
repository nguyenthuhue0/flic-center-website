// src/services/lecturer/schedule.js
import instance from "../../utils/AxiosCustomize";

export async function getTeachingSchedule() {
  return instance.get("/user/timetable-lecturer");
}

export async function getCourseLessons(courseId) {
  const res = await instance.get("/api/lesson", { params: { courseId } });
  const data = res?.data ?? res;
  if (Array.isArray(data)) return data;
  if (Array.isArray(data?.content)) return data.content;
  return [];
}