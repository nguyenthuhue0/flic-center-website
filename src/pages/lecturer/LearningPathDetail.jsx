import React, { useState, useEffect } from "react";
import axios from "axios";
import { PlusCircle, Trash2 } from "lucide-react";
import { useParams } from "react-router-dom";
import lessonAPI from "../../services/Lecturer/Lesson";

export default function StudyPlan() {
    const { courseId } = useParams();
    const [weeks, setWeeks] = useState([]);


    const addSession = (weekId) => {
        setWeeks((prevWeeks) =>
            prevWeeks.map((week) =>
                week.id === weekId
                    ? {
                        ...week,
                        sessions: [
                            ...week.sessions,
                            {
                                id: week.sessions.length + 1,
                                title: "",
                                description: "",
                                startTime: "",
                                weekIndex: "",
                                plannedAt: "",
                                endTime: "",
                            },
                        ],
                    }
                    : week
            )
        );
    };


    const addWeek = async () => {
        const newWeekIndex = weeks.length > 0 ? weeks[weeks.length - 1].week_index + 1 : 1;

        try {
            const response = await lessonAPI.create({
                course_id: courseId,
                week_index: newWeekIndex,
                title: `Week ${newWeekIndex}`,
                description: "",
                plannedAt: "",
                endTime: "",
            });

            const newWeek = {
                id: response.data.id, week_index: newWeekIndex, sessions: [],
                title: `Tuần ${newWeekIndex}`, description: "", plannedAt: "", endTime: ""
            };
            setWeeks(prev => [...prev, newWeek]);
        } catch (error) {
            console.error("Error adding week:", error);
        }
    };



    useEffect(() => {
        if (!courseId) return;
        const token = sessionStorage.getItem("access_token");
        if (!token) {
            console.error("❌ Không tìm thấy token trong localStorage");
            return;
        }

        axios
            .get(`http://localhost:8080/api/lesson?courseId=${courseId}`, {
                headers: { Authorization: `Bearer ${token}` },
            })
            .then((res) => {
                const apiData = res.data;

                // Nhóm theo weekIndex
                const grouped = apiData.reduce((acc, item) => {
                    const weekIndex = item.weekIndex || 1;
                    if (!acc[weekIndex]) {
                        acc[weekIndex] = {
                            id: weekIndex,
                            sessions: [],
                        };
                    }
                    acc[weekIndex].sessions.push({
                        id: acc[weekIndex].sessions.length + 1,
                        title: item.title || "",
                        detail: item.description || "",
                        startTime: item.plannedAt || "",
                        endTime: item.endTime || "",
                    });
                    return acc;
                }, {});

                setWeeks(Object.values(grouped));
            })
            .catch((err) => {
                console.error("❌ Lỗi khi load lessons:", err);
            });
    }, [courseId]);

    // giữ nguyên các hàm thêm/xóa/ghi đè tuần và session của bạn

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
                    {weeks.length === 0 ? (
                        <tr>
                            <td colSpan="6" className="text-center p-4 text-gray-500">
                                Chưa có dữ liệu
                            </td>
                        </tr>
                    ) : (
                        weeks.map((week) =>
                            week.sessions.map((session, idx) => (
                                <tr key={`${week.id}-${session.id}`}>
                                    {idx === 0 && (
                                        <td
                                            className="border border-gray-400 text-center align-middle"
                                            rowSpan={week.sessions.length}
                                        >
                                            {week.id}
                                        </td>
                                    )}

                                    <td className="border border-gray-400 text-center">{session.id}</td>

                                    <td className="border border-gray-400 p-2">
                                        {session.title} - {session.detail}
                                    </td>

                                    <td className="border border-gray-400 text-center">{session.startTime}</td>

                                    <td className="border border-gray-400 text-center">{session.endTime}</td>

                                    <td className="border border-gray-400 text-center">
                                        <button className="text-green-600">
                                            <PlusCircle size={18} />
                                        </button>
                                        <button className="text-red-600 ml-2">
                                            <Trash2 size={18} />
                                        </button>
                                    </td>
                                </tr>
                            ))
                        )
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





