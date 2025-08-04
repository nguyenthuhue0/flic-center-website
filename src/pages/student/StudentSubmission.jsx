import { useState } from "react";
import { FaChalkboardTeacher, FaTags, FaFileAlt } from "react-icons/fa";
import { FaCalendarDays } from "react-icons/fa6";
import { FaFileLines } from "react-icons/fa6";
import { FaFolder } from "react-icons/fa6";
import { GiConfirmed } from "react-icons/gi";
import { TbXboxX } from "react-icons/tb";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const StudentSubmission = () => {
      const [file, setFile] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [submissionTime, setSubmissionTime] = useState('');
    const navigate = useNavigate()
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!file) return alert("Vui lòng chọn file để nộp!");

    setSubmitted(true);
    const now = new Date();
    setSubmissionTime(now.toLocaleString());
    alert(`Đã nộp: ${file.name}`);
  };
    return (
    <div className="p-6 space-y-6 bg-gray-50 min-h-screen font-sans">
      {/* Header */}
      <div className="border p-6">
        <h1 className="text-5xl font-bold text-red-600 uppercase">Lập trình căn bản</h1>
        <div className="flex items-center gap-2 mt-2 text-black-700 text-2xl">
          <FaChalkboardTeacher />
          <p>Giảng viên: Nguyễn Văn A</p>
        </div>
        <p className="mt-1 text-md text-gray-600">
          Học viên &gt; Khóa học &gt;{" "}
          <span className="">Lập trình cơ bản</span>
          {" "}&gt;{" "}
            <span className="text-blue-600 cursor-pointer">Lab 01 - thực hành</span>
        </p>
      </div>
       <div className=" bg-white rounded-xl shadow-md p-6 space-y-6">
        <h1 className="text-4xl font-semibold text-blue-700">Lab 3 - Lập trình C++</h1>

        {/* Đề bài */}
        <div className="space-y-2 border-b border-gray-200 pb-4 text-lg">
          <p><span className="font-semibold"><span className="inline-block"><FaCalendarDays/></span> Hạn nộp:</span> 23:59, 10/08/2025</p>
          <p><span className="font-semibold"><span className="inline-block"><FaFileLines/></span> Mô tả:</span> Viết chương trình nhập vào một mảng số nguyên và sắp xếp theo thứ tự tăng dần.</p>
          <p><span className="font-semibold"><span className="inline-block"><FaFolder/></span> Định dạng nộp:</span> .zip hoặc .rar</p>
          <p>
    <span className="font-semibold items-center gap-2">
      <span className="inline-block"><FaFileAlt /></span> Tệp đính kèm:{" "}
    </span> 
    <a
      href="/files/Lab03-DeBai.pdf"
      target="_blank"
      rel="noopener noreferrer"
      className="text-red-600 underline hover:text-blue-800 inline-block"
    >
      Đề bài Lab03.pdf
    </a>
  </p>
        </div>

        {/* Trạng thái nộp bài */}
        <div className={`p-4 rounded border-l-4 ${submitted ? 'bg-green-50 border-green-600' : 'bg-red-50 border-red-500'}`}>
          {submitted ? (
            <p className="text-green-700 font-medium flex items-center"><span className="inline-block mr-2"><GiConfirmed/></span> Đã nộp lúc {submissionTime}</p>
          ) : (
            <p className="text-red-700 font-medium flex items-center"><span className="inline-block mr-2"><TbXboxX/></span> Chưa nộp bài</p>
          )}
        </div>

        {/* Form nộp bài */}
 <form onSubmit={handleSubmit} className="space-y-4">
      <label className="block text-sm font-medium">Chọn file để nộp:</label>
      <input
        type="file"
        onChange={(e) => setFile(e.target.files[0])}
        className="block w-full border rounded px-3 py-2 cursor-pointer hover:border-yellow-400"
      />

      <div className="flex justify-between pt-4">
        <button
          type="button"
          onClick={() => navigate("/student/studentcourse")}
          className="bg-orange-500 text-white px-6 py-2 rounded hover:bg-orange-600 flex items-center cursor-pointer"
        >
          <FaArrowLeft className="mr-2" />
          Quay về
        </button>

        <button
          type="submit"
          className="bg-blue-600 text-white px-8 py-2 rounded hover:bg-blue-700 cursor-pointer"
        >
          Nộp bài
        </button>
      </div>
    </form>
      </div>
    </div>
    )
}
export default StudentSubmission