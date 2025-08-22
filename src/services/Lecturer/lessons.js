// src/services/lecturer/lessons.js
import instance from "../../utils/AxiosCustomize";

export async function getLessonById(lessonId) {
  const res = await instance.get(`/api/lessons/${lessonId}`); // hoặc /api/lesson/${lessonId} tuỳ BE
  const d = res?.data ?? res;
  return {
    id: d.id ?? d.lessonId,
    title: d.title ?? "",
    plannedAt: d.plannedAt ?? d.startTime ?? "",
    endTime: d.endTime ?? "",
  };
}
