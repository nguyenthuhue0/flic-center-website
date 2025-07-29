import React, { useState } from "react";

const attendanceStates = [
  { label: "Có mặt", color: "bg-green-500" },
  { label: "Vắng", color: "bg-red-500" },
  { label: "Đi trễ", color: "bg-yellow-500" },
];

const initialStudents = [
  { id: 1, name: "Nguyễn Văn A", dob: "05/07/2004", stateIndex: 0, note: "" },
  { id: 2, name: "Nguyễn Văn B", dob: "05/07/2004", stateIndex: 0, note: "" },
  { id: 3, name: "Nguyễn Văn C", dob: "05/07/2004", stateIndex: 0, note: "" },
  { id: 4, name: "Nguyễn Văn D", dob: "05/07/2004", stateIndex: 0, note: "" },
  { id: 5, name: "Nguyễn Văn E", dob: "05/07/2004", stateIndex: 0, note: "" },
  { id: 6, name: "Nguyễn Văn A", dob: "05/07/2004", stateIndex: 0, note: "" },
  { id: 7, name: "Nguyễn Văn B", dob: "05/07/2004", stateIndex: 0, note: "" },
  { id: 8, name: "Nguyễn Văn C", dob: "05/07/2004", stateIndex: 0, note: "" },
  { id: 9, name: "Nguyễn Văn D", dob: "05/07/2004", stateIndex: 0, note: "" },
  { id: 10, name: "Nguyễn Văn E", dob: "05/07/2004", stateIndex: 0, note: "" }
];

export default function Attendance() {
  const [students, setStudents] = useState(initialStudents);
  const [showSummary, setShowSummary] = useState(false);

  const toggleState = (index) => {
    const updated = [...students];
    updated[index].stateIndex =
      (updated[index].stateIndex + 1) % attendanceStates.length;
    setStudents(updated);
  };

  const handleNoteChange = (index, value) => {
    const updated = [...students];
    updated[index].note = value;
    setStudents(updated);
  };

  const confirmAttendance = () => {
    setShowSummary(true);
  };

  // Đếm số lượng theo từng trạng thái
  const summary = students.reduce(
    (acc, student) => {
      const label = attendanceStates[student.stateIndex].label;
      acc[label] = (acc[label] || 0) + 1;
      return acc;
    },
    {
      "Có mặt": 0,
      "Vắng": 0,
      "Đi trễ": 0,
    }
  );

  return (
    <div className="p-4 font-sans bg-white min-h-screen">
      <div className="border border-[#EFE4E5]  p-4">
        <div className="font-bold text-[16px]">
          Danh sách học viên khóa lập trình java - Giảng viên Nguyễn Văn A
        </div>
        <div className="text-sm font-semibold text-gray-600 mt-1">Học viên: {students.length}</div>
      </div>

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
            {students.map((student, index) => {
              const state = attendanceStates[student.stateIndex];
              return (
                <tr key={student.id} className="border-b border-[#EFE4E5] hover:bg-gray-50 transition-colors">
                  <td className="p-2 font-semibold">{index + 1}</td>
                  <td className="p-2 font-semibold">{student.name}</td>
                  <td className="p-2 font-semibold">{student.dob}</td>
                  <td className="p-2 font-semibold">
                    <button
  onClick={() => toggleState(index)}
  className={`transition-all duration-300 text-white px-4 py-1 rounded border-2 w-[90px] text-center font-semibold ${state.color} border-transparent hover:scale-105`}
>
  {state.label}
</button>

                  </td>
                  <td className="p-2">
                    <input
  type="text"
  className="border border-gray-300 rounded-lg px-3 py-1 w-[120px] focus:outline-none focus:ring-2 focus:ring-red-400"
  placeholder="Ghi chú"
  value={student.note}
  onChange={(e) => handleNoteChange(index, e.target.value)}
/>

                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

<div className="mt-6 flex justify-center">
  <button
    onClick={confirmAttendance}
    className="bg-[#E21F22] text-white px-6 py-2 rounded-xl text-base font-semibold shadow-md hover:bg-red-600 transition-all duration-200"
  >
    ✅ Xác nhận điểm danh
  </button>
</div>

{/* Kết quả sau xác nhận */}
{showSummary && (
  <div className="mt-8 flex flex-col md:flex-row gap-6 items-start justify-center">

    {/* BÊN TRÁI: THÔNG TIN BUỔI HỌC */}
    <div className="bg-white p-6 border rounded-xl shadow-md max-w-md w-full">
      <h2 className="text-lg font-bold text-[#E21F22] mb-2">📚 Nội dung buổi học</h2>
      <p className="text-sm text-gray-700 leading-relaxed">
        Buổi học hôm nay bao gồm phần ôn tập kiến thức lập trình hướng đối tượng và thực hành thao tác với mảng, hàm trong Java. Học viên cần chuẩn bị máy tính, tài liệu ghi chép và tham gia đầy đủ.
      </p>
    </div>

    {/* BÊN PHẢI: THỐNG KÊ */}
    <div className="p-6 border rounded-xl shadow-md bg-white max-w-md w-full">
      <h2 className="font-bold text-lg mb-4 flex items-center gap-2 h-[75px] text-[#E21F22]">
        📊 Thống kê điểm danh
      </h2>
      <div className="grid grid-cols-3 gap-4 text-center text-sm font-semibold">
        <div className="bg-green-100 text-green-700 rounded p-2">
          Có mặt: <span>{summary["Có mặt"]}</span>
        </div>
        <div className="bg-yellow-100 text-yellow-700 rounded p-2">
          Đi trễ: <span>{summary["Đi trễ"]}</span>
        </div>
        <div className="bg-red-100 text-red-700 rounded p-2">
          Vắng: <span>{summary["Vắng"]}</span>
        </div>
      </div>
    </div>

  </div>
)}


    </div>
  );
}
