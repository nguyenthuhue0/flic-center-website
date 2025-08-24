import { useEffect, useState } from "react";
import { FaChalkboardTeacher, FaTags, FaFileAlt } from "react-icons/fa";
import { FaCalendarDays } from "react-icons/fa6";
import { FaFileLines } from "react-icons/fa6";
import { FaFolder } from "react-icons/fa6";
import { GiConfirmed } from "react-icons/gi";
import { TbXboxX } from "react-icons/tb";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import {
  getAssignmentDetailByAssignmentId,
  postSubmit,
  uploadFile,
} from "../../services/Student/Submission";
import dayjs from "dayjs";
import { toast } from "react-toastify";
import { getCourseById } from "../../services/Student/Course";

const StudentSubmission = () => {
  const [file, setFile] = useState(null);

  const [submissionTime, setSubmissionTime] = useState("");
  const [fileSubmit, setFileSubmit] = useState("");
  const [dataSubmit, setDataSubmit] = useState({});
  const [title, setTitle] = useState("");
  const [lecturerName, setLecturerName] = useState("");
  const [titleAssignment, setTitleAssignment] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [description, setDescription] = useState("");
  const [tagTopic, setTagTopic] = useState("");

  const navigate = useNavigate();
  const { id } = useParams();
  const [submitted, setSubmitted] = useState("");
  const [searchParams] = useSearchParams();

  const submit = searchParams.get("submit");
  const courseId = searchParams.get("detail");
  useEffect(() => {
    fetchDataCourseById(courseId);
    fetchAssignmentDetailByAssignmentId(id);
    if (submit) {
      setSubmitted(submit);
    }
  }, []);
  const fetchDataCourseById = async (id) => {
    let data = await getCourseById(id);
    if (data) {
      setTitle(data.title);
      setLecturerName(data.lecturerName);
    }
  };
  const fetchAssignmentDetailByAssignmentId = async (id) => {
    let data = await getAssignmentDetailByAssignmentId(id);
    setTitleAssignment(data[0].title);
    setDescription(data[0].description);
    setDueDate(data[0].dueDate);
    setTagTopic(data[0].fileUrl);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) return toast.error("Chọn file để nộp!");
    try {
      const uploadRes = await uploadFile(id, file);

      const submitRes = await postSubmit(id, uploadRes.fileUrl);
      setSubmitted("true");

      if (submitRes) {
        setDataSubmit(submitRes);

        setFileSubmit(submitRes.fileUrl);
        setSubmissionTime(
          dayjs(submitRes.submittedAt).format("HH:mm, DD/MM/YYYY")
        );
        toast.success("Nộp bài thành công!");
      }
    } catch (err) {
      console.error("Có lỗi khi submit:", err);
    }
  };
  const isOverdue = () => {
    if (!dueDate) return false;
    return dayjs().isAfter(dayjs(dueDate)); // so sánh bằng dayjs
  };
  return (
    <div className="p-6 space-y-6 bg-gray-50 min-h-screen font-sans">
      {/* Header */}
      <div className="border p-6">
        <h1 className="text-5xl font-bold text-red-600 uppercase">{title}</h1>
        <div className="flex items-center gap-2 mt-2 text-black-700 text-2xl">
          <FaChalkboardTeacher />
          <p>Giảng viên: {lecturerName}</p>
        </div>
        <p className="mt-1 text-md text-gray-600">
          Học viên &gt; Khóa học &gt; <span className="">{title}</span> &gt;{" "}
          <span className="text-blue-600 cursor-pointer">
            {titleAssignment}
          </span>
        </p>
      </div>
      <div className=" bg-white rounded-xl shadow-md p-6 space-y-6">
        <h1 className="text-4xl font-semibold text-blue-700">
          {titleAssignment}
        </h1>

        {/* Đề bài */}
        <div className="space-y-2 border-b border-gray-200 pb-4 text-lg">
          <p>
            <span className="font-semibold">
              <span className="inline-block">
                <FaCalendarDays />
              </span>{" "}
              Hạn nộp:{" "}
            </span>
            {dayjs(dueDate).format("HH:mm, DD/MM/YYYY")}
          </p>
          <p>
            <span className="font-semibold">
              <span className="inline-block">
                <FaFileLines />
              </span>{" "}
              Mô tả:{" "}
            </span>
            {description}
          </p>
          <p>
            <span className="font-semibold">
              <span className="inline-block">
                <FaFolder />
              </span>{" "}
              Định dạng nộp:{" "}
            </span>{" "}
            .pdf , .java , .doc , .py , ....
          </p>
          <p>
            <span className="font-semibold items-center gap-2">
              <span className="inline-block">
                <FaFileAlt />
              </span>{" "}
              Tệp đính kèm:{" "}
            </span>
            <a
              href={tagTopic}
              target="_blank"
              rel="noopener noreferrer"
              className="text-red-600 underline hover:text-blue-800 inline-block"
            >
              {tagTopic}
            </a>
          </p>
        </div>

        {/* Trạng thái nộp bài */}
        <div
          className={`p-4 rounded border-l-4 ${
            submitted === "true"
              ? "bg-green-50 border-green-600"
              : "bg-red-50 border-red-500"
          }`}
        >
          {submitted === "true" ? (
            <p className="text-green-700 font-medium flex items-center">
              <span className="inline-block mr-2">
                <GiConfirmed />
              </span>{" "}
              Đã nộp {submissionTime}{" "}
            </p>
          ) : (
            <p className="text-red-700 font-medium flex items-center">
              <span className="inline-block mr-2">
                <TbXboxX />
              </span>
              Chưa nộp bài
            </p>
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
          {dataSubmit && Object.keys(dataSubmit).length > 0 && (
            <div className="mt-2 p-2 rounded bg-green-50">
              <p className="text-md">
                ✅ Đã nộp:
                <a
                  href={fileSubmit}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline ml-1"
                >
                  Xem file
                </a>
              </p>
            </div>
          )}
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
              disabled={submitted === "true" || isOverdue()}
              className={`px-8 py-2 rounded 
              ${
                submitted === "true" || isOverdue()
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-blue-600 text-white hover:bg-blue-700 cursor-pointer "
              }`}
            >
              {submitted === "true"
                ? "Đã nộp"
                : isOverdue()
                ? "Đã quá hạn"
                : "Nộp bài"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
export default StudentSubmission;
