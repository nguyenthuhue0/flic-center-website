import React, { useState, useEffect } from "react";
import { PlusCircle, Trash2 } from "lucide-react";
import { useParams } from "react-router-dom";
import lessonAPI from "../../services/Lecturer/Lesson";
import api from "../../utils/AxiosCustomize"; // gọi fallback /lesson/{id}

export default function StudyPlan() {
  const { courseId } = useParams();
  const [weeks, setWeeks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState({}); // { type: 'session'|'week'|'save', id, field }
  const [editing, setEditing] = useState(null); // { weekId, lessonId, field: 'content'|'startTime'|'endTime', draft }

  // ------- utils -------
  const groupLessons = (arr) => {
    const grouped = arr.reduce((acc, item) => {
      const w = item.weekIndex ?? 1;
      if (!acc[w]) acc[w] = { id: w, sessions: [] };
      acc[w].sessions.push({
        lessonId: item.id,
        order: acc[w].sessions.length + 1,
        title: item.title || "",
        detail: item.description || "",
        startTime: item.plannedAt || "",
        endTime: item.endTime || "",
      });
      return acc;
    }, {});
    return Object.values(grouped).sort((a, b) => a.id - b.id);
  };

 // YYYY-MM-DDTHH:mm  <- dùng cho <input type="datetime-local">
const toInputDT = (s) => {
  if (!s) return "";
  // Hỗ trợ 3 kiểu vào: ISO, "yyyy-MM-dd HH:mm:ss", "dd/MM/yyyy HH:mm:ss"
  // 1) ISO
  if (/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}/.test(s)) {
    return s.slice(0, 16);
  }
  // 2) yyyy-MM-dd HH:mm(:ss)
  if (/^\d{4}-\d{2}-\d{2}\s+\d{2}:\d{2}(:\d{2})?$/.test(s)) {
    const [date, time] = s.split(" ");
    return `${date}T${time.slice(0,5)}`;
  }
  // 3) dd/MM/yyyy HH:mm(:ss)
  if (/^\d{2}\/\d{2}\/\d{4}\s+\d{2}:\d{2}(:\d{2})?$/.test(s)) {
    const [d, m, rest] = s.split(/[\/]/);
    const [y, time] = rest.split(" ");
    return `${y}-${m}-${d}T${time.slice(0,5)}`;
  }
  // Fallback cố gắng parse
  const d = new Date(s);
  if (isNaN(d)) return "";
  const pad = (n) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth()+1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
};

// FE -> BE: dd/MM/yyyy HH:mm:ss  (khớp @JsonFormat ở BE)
// Trường hợp BE muốn "yyyy-MM-dd HH:mm:ss"
const fromInputDT = (s) => s ? `${s.replace('T',' ')}:00` : "";



  // ------- load -------
  const fetchWeeks = async () => {
    if (!courseId) return;
    try {
      setLoading(true);
      const res = await lessonAPI.getByCourseId(courseId); // GET /lesson?courseId=
      const payload = res?.data ?? res;
      const list = Array.isArray(payload)
        ? payload
        : Array.isArray(payload?.data)
        ? payload.data
        : Array.isArray(payload?.value)
        ? payload.value
        : [];
      setWeeks(groupLessons(list));
    } catch (err) {
      console.error("❌ Lỗi khi load lessons:", err);
      setWeeks([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWeeks();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [courseId]);

// ------- API delete safe -------
// ------- API delete safe -------
const removeLessonSafe = async (id) => {
  // Ưu tiên: DELETE /lesson?lessonId=...
  try {
    if (typeof lessonAPI.removeByQuery === "function") {
      return await lessonAPI.removeByQuery(id);
    }
    return await api.delete(`/lesson`, { params: { lessonId: id } });
  } catch (err1) {
    // Fallback 1: /lesson/{id}
    try {
      return await api.delete(`/lesson/${id}`);
    } catch (err2) {
      // Fallback 2: /lessons/{id}
      return await api.delete(`/lessons/${id}`);
    }
  }
};



  // Ưu tiên: PUT /lesson/update?lessonId={id} (body: payload không cần id)
// Fallback: POST /lesson/update (body có id) → PUT /lesson/{id} → PUT /lessons/{id}
const updateLessonSafe = async (id, payload) => {
  try {
    // Nếu service đã có method riêng thì dùng luôn
    if (typeof lessonAPI.updateByQuery === "function") {
      return await lessonAPI.updateByQuery(id, payload); // PUT /lesson/update?lessonId=...
    }
    // Gọi thẳng qua axios base
    return await api.put(`/lesson/update`, payload, {
      params: { lessonId: id },
    });
  } catch {
    try {
      // fallback 1: API mới nhưng dùng body có id
      return await api.post(`/lesson/update`, { id, ...payload });
    } catch {
      try {
        // fallback 2
        return await lessonAPI.update(id, payload); // PUT /lesson/{id}
      } catch {
        // fallback 3
        return await api.put(`/lessons/${id}`, payload); // PUT /lessons/{id}
      }
    }
  }
};


  // ------- add -------
  const addWeek = async () => {
    try {
      const nextWeek = weeks.length > 0 ? weeks[weeks.length - 1].id + 1 : 1;
      const payload = {
        courseId: Number(courseId),
        weekIndex: nextWeek,
        title: `Tuần ${nextWeek} - Buổi 1`,
        description: "",
        plannedAt: "",
        endTime: "",
      };
      const res = await lessonAPI.create(payload);
      const newId = res?.data?.id ?? res?.id ?? null;

      setWeeks((prev) => [
        ...prev,
        {
          id: nextWeek,
          sessions: [
            {
              lessonId: newId || Math.random(),
              order: 1,
              title: payload.title,
              detail: payload.description,
              startTime: payload.plannedAt,
              endTime: payload.endTime,
            },
          ],
        },
      ]);
    } catch (e) {
      console.error("❌ Error adding week:", e);
    }
  };

  const addSession = async (weekIndex) => {
    try {
      const week = weeks.find((w) => w.id === weekIndex);
      const nextOrder = (week?.sessions?.length || 0) + 1;
      const payload = {
        courseId: Number(courseId),
        weekIndex,
        title: `Tuần ${weekIndex} - Buổi ${nextOrder}`,
        description: "",
        plannedAt: "",
        endTime: "",
      };
      const res = await lessonAPI.create(payload);
      const newId = res?.data?.id ?? res?.id ?? null;

      setWeeks((prev) =>
        prev.map((w) =>
          w.id === weekIndex
            ? {
                ...w,
                sessions: [
                  ...w.sessions,
                  {
                    lessonId: newId || Math.random(),
                    order: nextOrder,
                    title: payload.title,
                    detail: payload.description,
                    startTime: payload.plannedAt,
                    endTime: payload.endTime,
                  },
                ],
              }
            : w
        )
      );
    } catch (e) {
      console.error("❌ Error adding session:", e);
    }
  };

  // ------- inline edit -------
  const startEdit = (weekId, lessonId, field, current) => {
    if (editing && (editing.lessonId !== lessonId || editing.field !== field)) {
      setEditing(null);
    }
    setEditing({ weekId, lessonId, field, draft: current });
  };

  const commitEdit = async () => {
    if (!editing) return;
    const { weekId, lessonId, field, draft } = editing;

    const w = weeks.find((x) => x.id === weekId);
    const s = w?.sessions.find((x) => x.lessonId === lessonId);
    if (!s) {
      setEditing(null);
      return;
    }

    // build payload gửi BE
    let changes = {};
    let payload = {
      courseId: Number(courseId),
      weekIndex: weekId,
      title: s.title,
      description: s.detail,
      plannedAt: s.startTime,
      endTime: s.endTime,
    };

    if (field === "content") {
      changes = { title: draft.title ?? "", detail: draft.detail ?? "" };
      payload.title = changes.title;
      payload.description = changes.detail;
    } else if (field === "startTime") {
      const v = fromInputDT(draft);
      changes = { startTime: v };
      payload.plannedAt = v;
    } else if (field === "endTime") {
      const v = fromInputDT(draft);
      changes = { endTime: v };
      payload.endTime = v;
    }

    // optimistic update
    setBusy({ type: "save", id: lessonId, field });
    setWeeks((prev) =>
      prev.map((ww) =>
        ww.id === weekId
          ? {
              ...ww,
              sessions: ww.sessions.map((ss) =>
                ss.lessonId === lessonId ? { ...ss, ...changes } : ss
              ),
            }
          : ww
      )
    );

    try {
      await updateLessonSafe(lessonId, payload); // ✅ dùng endpoint POST /lesson/update (fallback nếu cần)
      // (tuỳ) nếu muốn đồng bộ format/plannedAt từ server: await fetchWeeks();
    } catch (e) {
      console.error("❌ Error saving edit:", e);
      await fetchWeeks(); // rollback theo server
    } finally {
      setBusy({});
      setEditing(null);
    }
  };

  const cancelEdit = () => setEditing(null);

  const onEnterCommit = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      commitEdit();
    } else if (e.key === "Escape") {
      cancelEdit();
    }
  };

  // ------- delete -------
  const deleteSession = async (lessonId, weekIndex) => {
    if (!window.confirm("Xóa buổi này?")) return;
    setBusy({ type: "session", id: lessonId });

    // optimistic update
    const prev = weeks;
    setWeeks(
      prev
        .map((w) => {
          if (w.id !== weekIndex) return w;
          const kept = w.sessions.filter((s) => s.lessonId !== lessonId);
          kept.forEach((s, i) => (s.order = i + 1));
          return { ...w, sessions: kept };
        })
        .filter((w) => w.sessions.length > 0)
    );

    try {
      if (lessonId != null) await removeLessonSafe(lessonId);
    } catch (e) {
      console.error("❌ Error deleting session:", e);
      await fetchWeeks();
    } finally {
      setBusy({});
    }
  };

  const deleteWeek = async (weekIndex) => {
    if (!window.confirm(`Xóa toàn bộ "Tuần ${weekIndex}"?`)) return;
    setBusy({ type: "week", id: weekIndex });

    const prev = weeks;
    setWeeks(prev.filter((w) => w.id !== weekIndex));

    try {
      const week = prev.find((w) => w.id === weekIndex);
      if (week) {
        await Promise.all(
          week.sessions
            .filter((s) => s.lessonId != null)
            .map((s) => removeLessonSafe(s.lessonId))
        );
      }
    } catch (e) {
      console.error("❌ Error deleting week:", e);
      await fetchWeeks();
    } finally {
      setBusy({});
    }
  };

  // ------- render -------
  return (
    <div className="p-6">
      <h1 className="text-red-600 text-2xl font-bold mb-4">LẬP TRÌNH JAVA</h1>

      <table className="w-full border border-gray-400 text-sm">
        <thead>
          <tr className="bg-gray-100">
            <th className="border border-gray-400 p-2">Tuần</th>
            <th className="border border-gray-400 p-2">Buổi</th>
            <th className="border border-gray-400 p-2">Nội dung</th>
            <th className="border border-gray-400 p-2">Bắt đầu</th>
            <th className="border border-gray-400 p-2">Kết thúc</th>
            <th className="border border-gray-400 p-2">Thao tác</th>
          </tr>
        </thead>

        <tbody>
          {loading ? (
            <tr>
              <td colSpan="6" className="text-center p-4 text-gray-500">
                Đang tải...
              </td>
            </tr>
          ) : weeks.length === 0 ? (
            <tr>
              <td colSpan="6" className="text-center p-4 text-gray-500">
                Chưa có dữ liệu
              </td>
            </tr>
          ) : (
            weeks.map((week) =>
              week.sessions.map((session, idx) => (
                <tr key={`${week.id}-${session.lessonId || idx}`}>
                  {/* Cột tuần + nút tuần */}
                  {idx === 0 && (
                    <td
                      className="border border-gray-400 text-center align-middle"
                      rowSpan={week.sessions.length}
                    >
                      <div className="flex flex-col items-center gap-2">
                        <div className="font-semibold">Tuần {week.id}</div>

                        <button
                          onClick={() => addSession(week.id)}
                          className="flex items-center gap-1 text-green-600 hover:opacity-80 disabled:opacity-50"
                          disabled={busy.type === "week" && busy.id === week.id}
                          title="Thêm buổi trong tuần này"
                        >
                          <PlusCircle size={18} /> Thêm buổi
                        </button>

                        <button
                          onClick={() => deleteWeek(week.id)}
                          className="flex items-center gap-1 text-red-600 hover:opacity-80 disabled:opacity-50"
                          disabled={busy.type === "week" && busy.id === week.id}
                          title="Xóa cả tuần"
                        >
                          <Trash2 size={18} /> Xóa tuần
                        </button>
                      </div>
                    </td>
                  )}

                  <td className="border border-gray-400 text-center">
                    {session.order}
                  </td>

                  {/* Nội dung (double-click để sửa title & detail) */}
                  <td className="border border-gray-400 p-2">
                    {editing &&
                    editing.lessonId === session.lessonId &&
                    editing.field === "content" ? (
                      <div
                        className="space-y-1"
                        tabIndex={-1}
                        onBlur={(e) => {
                          if (!e.currentTarget.contains(e.relatedTarget)) {
                            commitEdit();
                          }
                        }}
                      >
                        <input
                          className="w-full border rounded px-2 py-1 mb-1"
                          placeholder="Tiêu đề"
                          value={editing.draft.title}
                          onChange={(ev) =>
                            setEditing((ed) => ({
                              ...ed,
                              draft: { ...ed.draft, title: ev.target.value },
                            }))
                          }
                          onKeyDown={onEnterCommit}
                          autoFocus
                        />
                        <input
                          className="w-full border rounded px-2 py-1"
                          placeholder="Mô tả"
                          value={editing.draft.detail}
                          onChange={(ev) =>
                            setEditing((ed) => ({
                              ...ed,
                              draft: { ...ed.draft, detail: ev.target.value },
                            }))
                          }
                          onKeyDown={onEnterCommit}
                        />
                      </div>
                    ) : (
                      <div
                        onDoubleClick={() =>
                          startEdit(week.id, session.lessonId, "content", {
                            title: session.title,
                            detail: session.detail,
                          })
                        }
                        title="Nhấp đúp để sửa"
                        className="cursor-text"
                      >
                        {session.title}
                        {session.detail ? ` - ${session.detail}` : ""}
                      </div>
                    )}
                  </td>

                  {/* Bắt đầu */}
                  <td className="border border-gray-400 text-center">
                    {editing &&
                    editing.lessonId === session.lessonId &&
                    editing.field === "startTime" ? (
                      <input
                        type="datetime-local"
                        className="border rounded px-2 py-1"
                        value={editing.draft}
                        onChange={(e) =>
                          setEditing((ed) => ({ ...ed, draft: e.target.value }))
                        }
                        onBlur={commitEdit}
                        onKeyDown={onEnterCommit}
                        autoFocus
                      />
                    ) : (
                      <div
                        onDoubleClick={() =>
                          startEdit(
                            week.id,
                            session.lessonId,
                            "startTime",
                            toInputDT(session.startTime)
                          )
                        }
                        title="Nhấp đúp để sửa"
                        className="cursor-text"
                      >
                        {session.startTime || "-"}
                      </div>
                    )}
                  </td>

                  {/* Kết thúc */}
                  <td className="border border-gray-400 text-center">
                    {editing &&
                    editing.lessonId === session.lessonId &&
                    editing.field === "endTime" ? (
                      <input
                        type="datetime-local"
                        className="border rounded px-2 py-1"
                        value={editing.draft}
                        onChange={(e) =>
                          setEditing((ed) => ({ ...ed, draft: e.target.value }))
                        }
                        onBlur={commitEdit}
                        onKeyDown={onEnterCommit}
                        autoFocus
                      />
                    ) : (
                      <div
                        onDoubleClick={() =>
                          startEdit(
                            week.id,
                            session.lessonId,
                            "endTime",
                            toInputDT(session.endTime)
                          )
                        }
                        title="Nhấp đúp để sửa"
                        className="cursor-text"
                      >
                        {session.endTime || "-"}
                      </div>
                    )}
                  </td>

                  <td className="border border-gray-400 text-center">
                    <button
                      onClick={() => addSession(week.id)}
                      className="text-green-600 hover:opacity-80 disabled:opacity-50"
                      disabled={busy.type === "week" && busy.id === week.id}
                      title="Thêm buổi"
                    >
                      <PlusCircle size={18} />
                    </button>
                    <button
                      onClick={() => deleteSession(session.lessonId, week.id)}
                      className="text-red-600 ml-2 hover:opacity-80 disabled:opacity-50"
                      disabled={
                        (busy.type === "session" && busy.id === session.lessonId) ||
                        (busy.type === "week" && busy.id === week.id) ||
                        (busy.type === "save" && busy.id === session.lessonId)
                      }
                      title="Xóa buổi"
                    >
                      <Trash2 size={18} />
                    </button>
                  </td>
                </tr>
              ))
            )
          )}
        </tbody>
      </table>

      <div className="mt-4 flex gap-3">
        <button
          onClick={addWeek}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 disabled:opacity-50"
          disabled={busy.type === "week"}
        >
          Thêm tuần mới
        </button>
        <button
          onClick={fetchWeeks}
          className="bg-gray-200 text-gray-800 px-4 py-2 rounded hover:bg-gray-300 disabled:opacity-50"
          disabled={loading || !!busy.type}
        >
          Tải lại
        </button>
      </div>
    </div>
  );
}
