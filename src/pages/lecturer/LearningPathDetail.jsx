import React, { useState, useEffect } from "react";
import { PlusCircle, Trash2 } from "lucide-react";
import {
    createLesson,
    updateLesson,
    deleteLesson,
    getLessonByCourseId,
} from "../../services/Lecturer/Lesson";

export default function StudyPlan() {
    const courseId = 1; // 👈 courseId fix cứng, bạn có thể lấy từ props hoặc URL
    const [weeks, setWeeks] = useState([]);

    const formatDateTime = (dt) => {
        if (!dt) return "";
        return dt.slice(0, 16); // cắt "YYYY-MM-DDTHH:mm"
    };

    // ✅ Lấy danh sách lessons theo courseId khi load trang
    useEffect(() => {
        fetchLessons();
    }, []);

    const fetchLessons = async () => {
        try {
            const lessons = await getLessonByCourseId(courseId);
            console.log("📡 Raw response từ API:", lessons);

            // const lessons = res?.data || [];
            // console.log("📡 Lessons từ API:", lessons);

            if (lessons.length === 0) {
                setWeeks([]);
                return;
            }

            // Group theo weekIndex
            const grouped = lessons.reduce((acc, lesson) => {
                const week = lesson.weekIndex || 1;
                if (!acc[week]) acc[week] = [];
                acc[week].push({
                    id: lesson.id,
                    title: lesson.title,
                    description: lesson.description || "",
                    plannedAt: formatDateTime(lesson.plannedAt),
                    endTime: formatDateTime(lesson.endTime),
                });
                return acc;
            }, {});

            const formatted = Object.keys(grouped).map((w) => ({
                id: parseInt(w),
                sessions: grouped[w],
            }));

            console.log("📦 Data sau khi group theo tuần:", formatted);
            setWeeks(formatted);
        } catch (err) {
            console.error("❌ Lỗi load lessons:", err);
        }
    };

    // ✅ Thêm tuần mới
    const addWeek = async () => {
        try {
            const newLesson = {
                courseId,
                weekIndex: weeks.length + 1,
                title: "",
                description: "",
                plannedAt: "",
                endTime: "",
            };
            const res = await createLesson(newLesson);

            const newWeek = {
                id: weeks.length + 1,
                sessions: [{ ...newLesson, id: res.data.id }],
            };

            setWeeks([...weeks, newWeek]);
        } catch (err) {
            console.error("Lỗi thêm tuần:", err);
        }
    };

    // ✅ Xóa tuần
    const deleteWeek = async (weekId) => {
        if (!window.confirm("Bạn có chắc muốn xóa tuần này?")) return;
        try {
            const week = weeks.find((w) => w.id === weekId);
            for (let session of week.sessions) {
                await deleteLesson(session.id);
            }
            setWeeks(weeks.filter((w) => w.id !== weekId));
        } catch (err) {
            console.error("Lỗi xóa tuần:", err);
        }
    };

    // ✅ Thêm buổi học
    const addSession = async (weekId) => {
        try {
            const newLesson = {
                courseId,
                weekIndex: weekId,
                title: "",
                description: "",
                plannedAt: "2025-08-24T00:00",
                endTime: "2025-08-24T00:00",
            };
            const res = await createLesson(newLesson);

            setWeeks(
                weeks.map((w) =>
                    w.id === weekId
                        ? { ...w, sessions: [...w.sessions, { ...newLesson, id: res.data.id }] }
                        : w
                )
            );
        } catch (err) {
            console.error("Lỗi thêm buổi:", err);
        }
    };

    // ✅ Xóa buổi học
    const deleteSession = async (weekId, sessionId) => {
        try {
            await deleteLesson(sessionId);
            setWeeks(
                weeks.map((w) =>
                    w.id === weekId
                        ? { ...w, sessions: w.sessions.filter((s) => s.id !== sessionId) }
                        : w
                )
            );
        } catch (err) {
            console.error("Lỗi xóa buổi:", err);
        }
    };

    // ✅ Update field
    const updateField = async (weekId, sessionId, field, value) => {
        setWeeks(
            weeks.map((w) =>
                w.id === weekId
                    ? {
                        ...w,
                        sessions: w.sessions.map((s) =>
                            s.id === sessionId ? { ...s, [field]: value } : s
                        ),
                    }
                    : w
            )
        );

        try {
            const week = weeks.find((w) => w.id === weekId);
            const session = week.sessions.find((s) => s.id === sessionId);
            await updateLesson(sessionId, { ...session, [field]: value });
        } catch (err) {
            console.error("Lỗi update buổi:", err);
        }
    };

    return (
        <div className="p-6">
            <h1 className="text-red-600 text-2xl font-bold">LẬP TRÌNH JAVA</h1>

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
                    {weeks.map((week) =>
                        week.sessions.map((session, idx) => (
                            <tr key={`${week.id}-${session.id}`}>
                                {idx === 0 && (
                                    <td
                                        className="border border-gray-400 text-center align-middle"
                                        rowSpan={week.sessions.length}
                                    >
                                        <div className="flex flex-col items-center">
                                            <span className="font-semibold">{weeks.indexOf(week) + 1}</span>
                                            <button
                                                onClick={() => deleteWeek(week.id)}
                                                className="text-red-600 mt-1"
                                            >
                                                <Trash2 size={16} />
                                            </button>
                                        </div>
                                    </td>
                                )}

                                <td className="border border-gray-400 text-center">
                                    {session.id}
                                </td>

                                {/* Nội dung */}
                                <td className="border border-gray-400 p-2">
                                    <div className="flex items-start space-x-2 w-full">
                                        <textarea
                                            placeholder="Tiêu đề"
                                            value={session.title}
                                            onChange={(e) =>
                                                updateField(week.id, session.id, "title", e.target.value)
                                            }
                                            className="flex-1 p-2 resize-none overflow-hidden min-h-[40px] focus:outline-none"
                                        />
                                        <span>-</span>
                                        <textarea
                                            placeholder="Chi tiết"
                                            value={session.description}
                                            onChange={(e) =>
                                                updateField(week.id, session.id, "description", e.target.value)
                                            }
                                            className="flex-1 p-2 resize-none overflow-hidden min-h-[40px] focus:outline-none"
                                        />
                                    </div>
                                </td>

                                {/* Thời gian */}
                                <td className="border border-gray-400 text-center">
                                    <input
                                        type="datetime-local"
                                        value={session.plannedAt}
                                        onChange={(e) =>
                                            updateField(week.id, session.id, "plannedAt", e.target.value)
                                        }
                                        className="focus:outline-none"
                                    />
                                </td>
                                <td className="border border-gray-400 text-center">
                                    <input
                                        type="datetime-local"
                                        value={session.endTime}
                                        onChange={(e) =>
                                            updateField(week.id, session.id, "endTime", e.target.value)
                                        }
                                        className="focus:outline-none"
                                    />
                                </td>

                                <td className="border border-gray-400 text-center space-x-2">
                                    <button
                                        onClick={() => addSession(week.id)}
                                        className="text-green-600"
                                    >
                                        <PlusCircle size={18} />
                                    </button>
                                    <button
                                        onClick={() => deleteSession(week.id, session.id)}
                                        className="text-red-600"
                                    >
                                        <Trash2 size={18} />
                                    </button>
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>

            <button
                onClick={addWeek}
                className="mt-4 bg-green-600 text-white px-4 py-2 rounded"
            >
                Thêm tuần mới
            </button>
        </div>
    );
}
