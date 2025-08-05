import React, { useState } from 'react';

const initialData = [
    ['1', 'Hiện tại hoàn thành', 'Hiện tại hoàn thành tiếp diễn', 'Ôn tập\n- Làm bài tập tổng hợp buổi 1+2', 'Quá khứ hoàn thành', 'Quá khứ hoàn thành tiếp diễn', 'Ôn tập\n- Làm bài tập tổng hợp buổi 4+5'],
    ['2', 'Tương lai hoàn thành', 'Tương lai hoàn thành tiếp diễn', 'Ôn tập\n- Làm bài tập tổng hợp buổi 1+2', 'Tổng ôn 12 thì', 'Sự phối hợp các thì', 'Ôn tập\n- Làm bài tập tổng hợp buổi 4+5'],
    ['3', 'Câu điều kiện', 'Câu ước', 'Ôn tập\n- Làm bài tập tổng hợp buổi 1+2', 'Câu hỏi đuôi', 'Câu bị động', 'Ôn tập\n- Làm bài tập tổng hợp buổi 4+5'],
    ['4', 'Câu gián tiếp', 'Mệnh đề danh từ', 'Ôn tập\n- Làm bài tập tổng hợp buổi 1+2', 'Cụm từ và mệnh đề chỉ mục đích.\n- Cụm từ và mệnh đề chỉ kết quả.', 'Cụm từ và mệnh đề chỉ lý do\n- Cụm từ và mệnh đề chỉ sự nhượng bộ', 'Ôn tập\n- Làm bài tập tổng hợp buổi 4+5'],
    ['5', 'Mệnh đề quan hệ', 'Mệnh đề sau “As if”, “As though”, “It’s high time”, “It’s time”, “Would rather”', 'Ôn tập\n- Làm bài tập tổng hợp buổi 1+2', 'Câu nhấn mạnh', 'Đảo cấu ngữ', 'Ôn tập\n- Làm bài tập tổng hợp buổi 4+5'],
];

const LearningPath = () => {
    const [data, setData] = useState(initialData);
    const [isEditing, setIsEditing] = useState(false);
    const [editedData, setEditedData] = useState(initialData);

    const handleChange = (e, row, col) => {
        const newData = [...editedData];
        newData[row][col] = e.target.value;
        setEditedData(newData);
    };

    const handleEdit = () => {
        setIsEditing(true);
        setEditedData([...data]);
    };

    const handleSave = () => {
        setData(editedData);
        setIsEditing(false);
    };

    const headers = ['Tuần', 'Buổi 1', 'Buổi 2', 'Buổi 3', 'Buổi 4', 'Buổi 5', 'Buổi 6'];

    return (
        <div className="max-w-7xl mx-auto p-6 bg-white shadow-md rounded-md">
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-2xl font-bold text-blue-700">LỘ TRÌNH HỌC TẬP - TOEIC 750+</h1>
                <div className="space-x-2">
                    {!isEditing ? (
                        <button onClick={handleEdit} className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded">
                            Sửa
                        </button>
                    ) : (
                        <button onClick={handleSave} className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded">
                            Lưu
                        </button>
                    )}
                </div>
            </div>

            <table className="w-full border border-collapse">
                <thead>
                    <tr className="bg-rose-100 text-left">
                        {headers.map((header, idx) => (
                            <th key={idx} className="border border-gray-300 p-2 text-center font-">
                                {header}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {data.map((week, rowIdx) => (
                        <tr key={rowIdx}>
                            {week.map((cell, colIdx) => (
                                <td key={colIdx} className={`border p-4 align-top ${colIdx === 0 ? 'bg-rose-100 text-center font-bold' : ''}`}>
                                    {isEditing && colIdx !== 0 ? (
                                        <textarea
                                            value={editedData[rowIdx][colIdx]}
                                            onChange={(e) => handleChange(e, rowIdx, colIdx)}
                                            className="w-full border border-gray-300 p-1 resize-none"
                                            rows={3}
                                        />
                                    ) : (
                                        <pre className="whitespace-pre-wrap">{cell}</pre>
                                    )}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default LearningPath;
