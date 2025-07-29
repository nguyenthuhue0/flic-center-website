import React, { useState } from "react";

const attendanceStates = [
  { label: "Có mặt", color: "bg-green-500" },
  { label: "Vắng", color: "bg-red-500" },
  { label: "Đi trễ", color: "bg-yellow-500" },
];

const initialStudents = [
  { id: 1, name: "Nguyễn Văn A", dob: "05/07/2004", stateIndex: 0 },
  { id: 2, name: "Nguyễn Văn A", dob: "05/07/2004", stateIndex: 0 },
  { id: 3, name: "Nguyễn Văn A", dob: "05/07/2004", stateIndex: 0 },
  { id: 4, name: "Nguyễn Văn A", dob: "05/07/2004", stateIndex: 0 },
  { id: 5, name: "Nguyễn Văn A", dob: "05/07/2004", stateIndex: 0 }
];

export default function Attendance() {
  const [students, setStudents] = useState(initialStudents);

  const toggleState = (index) => {
    const updated = [...students];
    updated[index].stateIndex = (updated[index].stateIndex + 1) % attendanceStates.length;
    setStudents(updated);
  };

  return (
    <div className="p-4 font-sans bg-white min-h-screen">
      
      <div className="border border-[#EFE4E5] rounded-b-md overflow-x-auto">
        <div className="p-4 font-bold text-[16px]">Danh sách học viên khóa lập trình java - Giảng viên Nguyễn Văn A</div>
        <div className="text-sm text-gray-600 px-4">Học viên: 83</div>
        <table className="w-full mt-2 border-collapse">
          <thead>
            <tr className="bg-[#E21F22] text-white text-left h-[50px]">
              <th className="p-2">STT</th>
              <th className="p-2">Họ và tên</th>
              <th className="p-2">Ngày sinh</th>
              <th className="p-2">Điểm danh</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student, index) => {
              const state = attendanceStates[student.stateIndex];
              return (
                <tr key={student.id} className="border-b border-[#EFE4E5]">
                  <td className="p-2">{index + 1}</td>
                  <td className="p-2 font-semibold">{student.name}</td>
                  <td className="p-2">{student.dob}</td>
                  <td className="p-2">
                    <button
                      onClick={() => toggleState(index)}
                      className={`text-white px-3 py-1 rounded ${state.color}`}
                    >
                      {state.label}
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
