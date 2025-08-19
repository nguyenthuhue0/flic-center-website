import React, { useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";

const ToeicScheduleEditor = () => {
    const [schedule, setSchedule] = useState([
        {
            sessions: [
                "Hiện tại hoàn thành",
                "Hiện tại hoàn thành tiếp diễn",
                "Ôn tập – Làm bài tập tổng hợp buổi 1+2",
                "Quá khứ hoàn thành",
                "Quá khứ hoàn thành tiếp diễn",
                "Ôn tập – Làm bài tập tổng hợp buổi 4+5"
            ]
        },
        {
            sessions: [
                "Tương lai hoàn thành",
                "Tương lai hoàn thành tiếp diễn",
                "Ôn tập – Làm bài tập tổng hợp buổi 1+2",
                "Tổng ôn 12 thì",
                "Sự phối hợp các thì",
                "Ôn tập – Làm bài tập tổng hợp buổi 4+5"
            ]
        }
    ]);

    const [editingCell, setEditingCell] = useState(null);
    const [editValue, setEditValue] = useState("");

    const handleEdit = (weekIndex, sessionIndex, currentValue) => {
        setEditingCell({ week: weekIndex, session: sessionIndex });
        setEditValue(currentValue);
    };

    const handleSave = (weekIndex, sessionIndex) => {
        const updated = [...schedule];
        updated[weekIndex].sessions[sessionIndex] = editValue;
        setSchedule(updated);
        setEditingCell(null);
    };

    const handleDeleteWeek = (weekIndex) => {
        const updated = [...schedule];
        updated.splice(weekIndex, 1);
        setSchedule(updated);
    };

    const handleAddWeek = () => {
        const newWeek = {
            sessions: ["", "", "", "", "", ""]
        };
        setSchedule([...schedule, newWeek]);
    };

    return (
        <div className="p-4">
            <h2 className="text-xl font-bold mb-4 text-blue-600">LỘ TRÌNH HỌC TẬP - TOEIC 750+</h2>
            <table className="w-full border-collapse">
                <thead>
                    <tr className="bg-pink-200">
                        <th className="border p-2">Tuần</th>
                        <th className="border p-2">Buổi 1</th>
                        <th className="border p-2">Buổi 2</th>
                        <th className="border p-2">Buổi 3</th>
                        <th className="border p-2">Buổi 4</th>
                        <th className="border p-2">Buổi 5</th>
                        <th className="border p-2">Buổi 6</th>
                        <th className="border p-2">Thao tác</th>
                    </tr>
                </thead>
                <tbody>
                    {schedule.map((week, weekIndex) => (
                        <tr key={weekIndex}>
                            <td className="bg-pink-100 font-bold text-center">{weekIndex + 1}</td>
                            {week.sessions.map((session, sessionIndex) => (
                                <td key={sessionIndex} className="p-2 border">
                                    {editingCell &&
                                        editingCell.week === weekIndex &&
                                        editingCell.session === sessionIndex ? (
                                        <input
                                            value={editValue}
                                            onChange={(e) => setEditValue(e.target.value)}
                                            onBlur={() => handleSave(weekIndex, sessionIndex)}
                                            autoFocus
                                            className="w-full p-1 border border-blue-300"
                                        />
                                    ) : (
                                        <div
                                            className="cursor-pointer hover:bg-yellow-100"
                                            onClick={() => handleEdit(weekIndex, sessionIndex, session)}
                                        >
                                            {session || <span className="text-gray-400 italic">(trống)</span>}
                                        </div>
                                    )}
                                </td>
                            ))}
                            <td className="text-center space-x-2">
                                <button
                                    onClick={() => handleEdit(weekIndex, 0, week.sessions[0])}
                                    className="text-yellow-500 hover:text-yellow-700 text-lg"
                                    title="Sửa buổi 1"
                                >
                                    <FaEdit />
                                </button>
                                <button
                                    onClick={() => handleDeleteWeek(weekIndex)}
                                    className="text-red-500 hover:text-red-700 text-lg"
                                    title="Xoá tuần"
                                >
                                    <FaTrash />
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <button
                onClick={handleAddWeek}
                className="bg-green-500 text-white px-4 py-2 rounded mt-4"
            >
                Thêm tuần mới
            </button>
        </div>
    );
};

export default ToeicScheduleEditor;
