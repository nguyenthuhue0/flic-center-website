import { useEffect, useState } from "react";
import { FaChalkboardTeacher, FaTags, FaFileAlt } from "react-icons/fa";
import Modal from "../../components/Modal";
import {
  FaFilePdf,
  FaFilePowerpoint,
  FaDownload,
  FaFile,
} from "react-icons/fa";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { useNavigate, useParams } from "react-router-dom";
import {
  getAssignmentByLessonId,
  getCourseById,
  getDocumentByCourseId,
  getLessonByCourseId,
} from "../../services/Student/Course";
import { IoIosArrowDroprightCircle } from "react-icons/io";
import { IoIosArrowDropdownCircle } from "react-icons/io";

const StudentCourseDetail = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedDoc, setSelectedDoc] = useState(null);
  const { id } = useParams();
  const [dataCourse, setDataCourse] = useState({});
  const [dataLesson, setDataLesson] = useState([]);
  const [dataDocument, setDataDocument] = useState([]);
  const [files, setFiles] = useState([]);

  useEffect(() => {
    fetchDataCourseById(id);
    fetchDataLessonByCourseId(id);
    fetchDataDocumentByCourseId(id);
  }, []);
  const fetchDataCourseById = async (id) => {
    let data = await getCourseById(id);

    setDataCourse(data);
  };
  const fetchDataDocumentByCourseId = async (id) => {
    let data = await getDocumentByCourseId(id);
    if (data) {
      setDataDocument(data);
    }
  };
  const fetchDataLessonByCourseId = async (id) => {
    let data = await getLessonByCourseId(id);
    setDataLesson(data);
  };
  const navigate = useNavigate();
  const documents = [
    "Đề cương chi tiết",
    "Slide bài giảng",
    "Tài liệu tham khảo",
    "Tài liệu khác",
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
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [expandedLessons, setExpandedLessons] = useState([]);
  const [assignments, setAssignments] = useState({});

  const toggleLesson = async (lessonId) => {
    setIsOpen((prev) => !prev);
    if (expandedLessons.includes(lessonId)) {
      // Thu gọn
      setExpandedLessons((prev) => prev.filter((id) => id !== lessonId));
    } else {
      // Mở ra
      setExpandedLessons((prev) => [...prev, lessonId]);

      // Chỉ gọi API khi chưa có dữ liệu
      if (!assignments[lessonId]) {
        try {
          const res = await getAssignmentByLessonId(lessonId);

          const data = Array.isArray(res) ? res : []; // luôn là mảng
          setAssignments((prev) => ({
            ...prev,
            [lessonId]: data,
          }));
        } catch (err) {
          console.error("Lỗi lấy assignment:", err);
        }
      }
    }
  };

  const getFileIcon = (type) => {
    switch (type) {
      case "Đề cương":
        return <FaFilePdf className="text-red-600 dark:text-red-400" />;
      case "Slide":
        return <FaFilePowerpoint className="text-orange-500 dark:text-orange-300" />;
      default:
        return <FaFile className="dark:text-gray-300" />;
    }
  };
  function mapDisplayToDbType(displayName) {
    switch (displayName) {
      case "Đề cương chi tiết":
        return "Đề cương";
      case "Slide bài giảng":
        return "Slide";
      case "Tài liệu tham khảo":
        return "Giáo trình";
      case "Tài liệu khác":
        return null;
      default:
        return "Khác"; // trả về gì cũng được
    }
  }

  const allAssignments = Array.isArray(assignments)
    ? assignments
    : Object.values(assignments || {}).flat();

  const deadlineDates = allAssignments
    .filter((a) => a.submitted === false)
    .map((a) => new Date(a.dueDate).toDateString());

  // Hàm check
  const isDeadline = (date) => deadlineDates.includes(date.toDateString());

  return (
    <div className="p-6 space-y-6 bg-gray-50 dark:bg-[#18181b] min-h-screen font-sans transition-colors duration-300">
      {/* Header */}
      <div className="border p-6 bg-white dark:bg-[#232326] rounded-lg shadow transition-colors">
        <h1 className="text-5xl font-bold text-red-600 dark:text-red-400 uppercase">
          {dataCourse.title}
        </h1>
        <div className="flex items-center gap-2 mt-2 text-black-700 dark:text-gray-200 text-2xl">
          <FaChalkboardTeacher />
          <p>Giảng viên: {dataCourse.lecturerName}</p>
        </div>
        <p className="mt-1 text-md text-gray-600 dark:text-gray-400">
          Học viên &gt; Khóa học &gt;{" "}
          <span className="text-blue-600 dark:text-blue-300 cursor-pointer">
            {dataCourse.title}
          </span>
        </p>
      </div>

      {/* Course Documents */}
      <div className="bg-white dark:bg-[#232326] rounded-lg shadow transition-colors p-6">
        <h2 className="text-3xl font-semibold text-blue-600 dark:text-blue-300 mb-2">
          Tài liệu khóa học
        </h2>
        <div className="space-y-2">
          {documents.map((doc, index) => (
            <div
              key={index}
              className="flex items-center gap-2 text-black-800 dark:text-gray-100 text-xl"
            >
              <FaTags className="text-black-600 dark:text-gray-400" />
              <span
                className="hover:text-red-500 dark:hover:text-red-400 hover:underline cursor-pointer w-full py-2"
                onClick={() => {
                  setIsModalOpen(true);
                  setSelectedDoc(doc);
                  const type = mapDisplayToDbType(doc);
                  let filtered;
                  if (type) {
                    filtered = dataDocument.filter(
                      (item) => item.type === type
                    );
                  } else {
                    filtered = dataDocument.filter(
                      (item) =>
                        !["Đề cương", "Slide", "Giáo trình"].includes(item.type)
                    );
                  }

                  setFiles(filtered);
                }}
              >
                {doc}
              </span>
            </div>
          ))}
        </div>
        <hr className="mt-4 border-yellow-200 dark:border-yellow-900" />
      </div>
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <div className="w-[800px] mx-auto rounded-2xl bg-white dark:bg-[#232326] transition-colors">
          <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
            <h2 className="text-center text-2xl font-bold text-blue-700 dark:text-blue-300">
              {selectedDoc}
            </h2>
          </div>
          <ul className="divide-y divide-gray-200 dark:divide-gray-700 px-6 py-4 max-h-[400px] overflow-y-auto">
            {files.map((file, index) => (
              <li
                key={index}
                className="flex items-center justify-between py-3"
              >
                <div className="flex items-center gap-3">
                  <div className="text-2xl">{getFileIcon(file.type)}</div>
                  <div>
                    <p className="font-medium text-gray-800 dark:text-gray-100 truncate max-w-[500px]">
                      {file.title}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">{file.size}</p>
                  </div>
                </div>
                <a
                  className="flex items-center gap-1 text-xs bg-blue-600 dark:bg-blue-700 hover:bg-blue-700 dark:hover:bg-blue-800 text-white px-4 py-2 rounded-full transition cursor-pointer"
                  href={file.fileUrl}
                  download
                >
                  <FaDownload className="text-sm" />
                  Tải xuống
                </a>
              </li>
            ))}
          </ul>
        </div>
      </Modal>

      <div className="bg-gray-50 dark:bg-[#18181b] min-h-screen font-sans transition-colors duration-300">
        <h2 className="text-3xl font-semibold text-blue-600 dark:text-blue-300 mb-6">
          Bài tập khóa học
        </h2>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Cột trái: Danh sách bài học */}
          <div className="flex-1 space-y-4 max-h-[600px] overflow-y-auto">
            {dataLesson.map((dataLesson) => (
              <div key={dataLesson.id} className="mb-4">
                {/* BOX BÀI HỌC */}
                <div
                  className="p-4 bg-white dark:bg-[#232326] rounded-lg shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-md cursor-pointer transition-colors"
                  onClick={() => toggleLesson(dataLesson.id)}
                >
                  <div className="flex items-center text-orange-600 dark:text-orange-400">
                    <span className="inline-block text-lg">
                      {isOpen ? (
                        <IoIosArrowDropdownCircle />
                      ) : (
                        <IoIosArrowDroprightCircle />
                      )}
                    </span>
                    <h3 className="ml-2 text-xl font-semibold ">
                      {dataLesson.title}
                    </h3>
                  </div>
                </div>
                {/* Danh sách bài tập bên trong */}
                {expandedLessons.includes(dataLesson.id) && (
                  <div className="pl-6 mt-2 space-y-3">
                    {(assignments[dataLesson.id] || []).map((lab) => (
                      <div
                        key={lab.id}
                        className="p-3 bg-white dark:bg-[#232326] border-l-4 border-blue-500 dark:border-blue-400 rounded shadow-sm hover:bg-blue-50 dark:hover:bg-blue-900 cursor-pointer transition-colors"
                        onClick={() =>
                          navigate(
                            `/student/studentsubmission/${lab.id}?submit=${lab.submitted}&detail=${id}`
                          )
                        }
                      >
                        <div className="flex items-center gap-2 text-black dark:text-gray-100 font-medium text-lg">
                          <FaFileAlt />
                          <span className="hover:text-red-500 dark:hover:text-red-400">
                            {lab.title}
                          </span>
                        </div>
                        <p
                          className={`ml-6 text-sm mt-1 ${
                            lab.submitted === true
                              ? "text-blue-600 dark:text-blue-300"
                              : "text-red-600 dark:text-red-400"
                          }`}
                        >
                          <span className="text-black dark:text-gray-200">Trạng thái:</span>{" "}
                          {lab.submitted === true
                            ? "Đã hoàn thành"
                            : "Chưa hoàn thành"}
                        </p>
                        <div className="ml-6 mt-1 text-gray-700 dark:text-gray-300 text-sm">
                          <span className="font-medium text-black dark:text-gray-200">
                            Hạn nộp:
                          </span>{" "}
                          <span className="italic">
                            {formatDate(lab.dueDate)}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Cột phải: Lịch deadline */}
          <div className="w-full lg:w-[350px] bg-white dark:bg-[#232326] p-4 rounded-lg shadow-md h-fit transition-colors">
            <h3 className="text-xl font-semibold text-blue-600 dark:text-blue-300 text-center mb-2">
              📅 Lịch hạn nộp
            </h3>
            <Calendar
              value={selectedDate}
              onChange={setSelectedDate}
              tileClassName={({ date }) =>
                isDeadline(date) ? "deadline-day" : null
              }
              className="!bg-white dark:!bg-[#232326] !text-black dark:!text-gray-100 !rounded-lg !border-gray-200 dark:!border-gray-700"
           
            />
          </div>
        </div>
      </div>
    </div>
  );
};
export default StudentCourseDetail;
