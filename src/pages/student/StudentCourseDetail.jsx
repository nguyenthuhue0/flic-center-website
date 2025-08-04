import { useState } from "react";
import { FaChalkboardTeacher, FaTags, FaFileAlt } from "react-icons/fa";
import Modal from "../../components/Modal";
import { FaFilePdf, FaFilePowerpoint, FaDownload } from "react-icons/fa";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { useNavigate } from "react-router-dom";
const StudentCourseDetail = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDoc, setSelectedDoc] = useState(null);
  const navigate = useNavigate();
  const documents = [
    "Đề cương chi tiết",
    "Slide bài giảng",
    "Tài liệu tham khảo",
    "Tài liệu khác",
  ];
  const labs = [
    {
      id: 1,
      title: "LAB 01 - Machine Learning Tools",
      status: "Chưa hoàn thành",
      deadline: "2025-07-30",
    },
    {
      id: 2,
      title: "LAB 02 - Data Preprocessing",
      status: "Đã hoàn thành",
      deadline: "2025-08-10",
    },
    {
      id: 3,
      title: "LAB 03 - Model Evaluation",
      status: "Chưa hoàn thành",
      deadline: "2025-08-15",
    },
    {
      id: 3,
      title: "LAB 03 - Model Evaluation",
      status: "Chưa hoàn thành",
      deadline: "2025-08-15",
    },
  ];

  const formatDate = (isoDateStr) => {
    const date = new Date(isoDateStr);
    return date.toLocaleDateString("vi-VN", {
      weekday: "long",
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });
  };
  const files = [
    {
      name: "Đề cương học kỳ 1.pdf",
      size: "1.2 MB",
      type: "pdf",
    },
    {
      name: "Slide bài giảng tuần 1.pptx",
      size: "3.5 MB",
      type: "ppt",
    },
    {
      name: "Slide bài giảng tuần 2.pptx",
      size: "2.8 MB",
      type: "ppt",
    },
    {
      name: "Đề cương học kỳ 2.pdf",
      size: "1.5 MB",
      type: "pdf",
    },
  ];

  const getFileIcon = (type) => {
    switch (type) {
      case "pdf":
        return <FaFilePdf className="text-red-600" />;
      case "ppt":
        return <FaFilePowerpoint className="text-orange-500" />;
      default:
        return <FaFilePdf />;
    }
  };
  const deadlineDates = labs
    .filter((lab) => lab.status !== "Đã hoàn thành") // bỏ lab đã hoàn thành
    .map((lab) => new Date(lab.deadline).toDateString());

  const isDeadline = (date) => deadlineDates.includes(date.toDateString());

  return (
    <div className="p-6 space-y-6 bg-gray-50 min-h-screen font-sans">
      {/* Header */}
      <div className="border p-6">
        <h1 className="text-5xl font-bold text-red-600 uppercase">
          Lập trình căn bản
        </h1>
        <div className="flex items-center gap-2 mt-2 text-black-700 text-2xl">
          <FaChalkboardTeacher />
          <p>Giảng viên: Nguyễn Văn A</p>
        </div>
        <p className="mt-1 text-md text-gray-600">
          Học viên &gt; Khóa học &gt;{" "}
          <span className="text-blue-600 cursor-pointer">Lập trình cơ bản</span>
        </p>
      </div>

      {/* Course Documents */}
      <div>
        <h2 className="text-3xl font-semibold text-blue-600 mb-2">
          Tài liệu khóa học
        </h2>
        <div className="space-y-2">
          {documents.map((doc, index) => (
            <div
              key={index}
              className="flex items-center gap-2 text-black-800 text-xl"
            >
              <FaTags className="text-black-600" />
              <span
                className="hover:text-red-500 hover:underline cursor-pointer w-full py-2"
                onClick={() => {
                  setIsModalOpen(true);
                  setSelectedDoc(doc);
                }}
              >
                {doc}
              </span>
            </div>
          ))}
        </div>
        <hr className="mt-4 border-yellow-200" />
      </div>
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <div className="w-[800px] mx-auto rounded-2xl bg-white">
          <div className=" px-6 py-4 border-b">
            <h2 className="text-center text-2xl font-bold text-blue-700">
              {selectedDoc}
            </h2>
          </div>
          <ul className="divide-y divide-gray-200 px-6 py-4 max-h-[400px] overflow-y-auto">
            {files.map((file, index) => (
              <li
                key={index}
                className="flex items-center justify-between py-3"
              >
                <div className="flex items-center gap-3">
                  <div className="text-2xl">{getFileIcon(file.type)}</div>
                  <div>
                    <p className="font-medium text-gray-800 truncate max-w-[200px]">
                      {file.name}
                    </p>
                    <p className="text-xs text-gray-500">{file.size}</p>
                  </div>
                </div>
                <button className="flex items-center gap-1 text-xs bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-full transition cursor-pointer">
                  <FaDownload className="text-sm" />
                  Tải xuống
                </button>
              </li>
            ))}
          </ul>
        </div>
      </Modal>

      <div className="bg-gray-50 min-h-screen font-sans">
        <h2 className="text-3xl font-semibold text-blue-600 mb-6">
          Bài tập khóa học
        </h2>

        {/* Flex container chia 2 cột */}
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Cột trái: danh sách lab */}
          <div className="flex-1 space-y-4 max-h-[600px] overflow-y-auto">
            {labs.map((lab) => (
              <div
                key={lab.id}
                className="p-4 bg-white rounded-lg shadow-sm border border-gray-100 hover:shadow-md"
              >
                <div
                  className="flex items-center gap-2 text-black font-medium text-lg"
                  onClick={() => navigate(`/student/studentsubmission/${lab.id}`)}
                >
                  <FaFileAlt />
                  <span className="hover:text-red-500 cursor-pointer w-full">
                    {lab.title}
                  </span>
                </div>
                <p
                  className={`ml-6 text-md mt-1 ${
                    lab.status === "Đã hoàn thành"
                      ? "text-blue-600"
                      : "text-red-600"
                  }`}
                >
                  <span className="text-black">Trạng thái:</span> {lab.status}
                </p>
                <div className="ml-6 mt-1 text-gray-700 text-sm">
                  <span className="font-medium text-black">Hạn nộp:</span>{" "}
                  <span className="italic">{formatDate(lab.deadline)}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Cột phải: Lịch deadline */}
          <div className="w-full lg:w-[350px] bg-white p-4 rounded-lg shadow-md h-fit">
            <h3 className="text-xl font-semibold text-blue-600 text-center mb-2">
              📅 Lịch hạn nộp
            </h3>
            <Calendar
              tileClassName={({ date }) =>
                isDeadline(date) ? "deadline-day" : null
              }
            />
          </div>
        </div>
      </div>
    </div>
  );
};
export default StudentCourseDetail;
