import React, { useState, useEffect } from "react";
import { FaInfoCircle } from "react-icons/fa";
import { IoBookmarksSharp } from "react-icons/io5";
import { FaThLarge, FaBars } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { getCourseByUserRegistered } from "../../services/Student/Course";

const CourseCard = ({ course, displayMode }) => {
  const navigate = useNavigate();

  // LIST VIEW
  if (displayMode === "list") {
    return (
      <div
        className="flex bg-white shadow-sm hover:shadow-md rounded-lg overflow-hidden mb-4 cursor-pointer"
        onClick={() =>
          navigate(`/student/studentcourse/${course.courseDetail.id}`)
        }
      >
        <div className="w-40 bg-purple-200 flex items-center justify-center text-gray-600 text-sm shrink-0">
          Ảnh
        </div>

        <div className="p-4 flex-1 flex flex-col">
          <div className="flex items-start gap-3">
            <IoBookmarksSharp className="text-yellow-500 mt-1" />
            <div>
              <div className="font-bold text-xl">
                {course.courseDetail.title}
              </div>
              <div className="text-xs text-gray-500">
                Lịch bắt đầu: {course.courseDetail.startMonth}
              </div>
            </div>
          </div>

          <p className="text-sm text-gray-500 mt-2 truncate">
            {course.courseDetail.description}
          </p>
          <p className="text-sm font-medium mt-2">
            Giảng viên: {course.courseDetail.lecturerName}
          </p>

          <div className="mt-auto">
            <div className="text-right text-sm">{course.progress}%</div>
            <div className="h-2 bg-red-200 rounded overflow-hidden mt-2">
              <div
                className="h-full bg-red-500"
                style={{ width: `${course.progress}%` }}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }

  // GRID VIEW
  return (
    <div
      className="rounded-lg shadow-sm overflow-hidden bg-white hover:shadow-md cursor-pointer h-full flex flex-col"
      onClick={() =>
        navigate(`/student/studentcourse/${course.courseDetail.id}`)
      }
    >
      <div className="h-40 bg-purple-200 flex items-center justify-center text-gray-600 w-full flex-shrink-0">
        Ảnh
      </div>

      <div className="p-4 flex-1 flex flex-col">
        <div className="flex items-start gap-3">
          <IoBookmarksSharp className="text-yellow-500 mt-1" />
          <div>
            <div className="font-bold text-xl">{course.courseDetail.title}</div>
            <div className="text-xs text-gray-500">
              Lịch bắt đầu: {course.courseDetail.startMonth}
            </div>
          </div>
        </div>

        <p className="text-sm text-gray-500 mt-2 truncate">
          {course.courseDetail.description}
        </p>
        <p className="text-sm font-medium mt-2">
          Giảng viên: {course.courseDetail.lecturerName}
        </p>

        <div className="mt-auto">
          <div className="text-right text-sm">{course.progress}%</div>
          <div className="h-2 bg-red-200 rounded overflow-hidden mt-2">
            <div
              className="h-full bg-red-500"
              style={{ width: `${course.progress}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default function StudentCourse() {
  const [courses, setCourses] = useState([]);
  const [tab, setTab] = useState("registered");
  const [displayMode, setDisplayMode] = useState("grid");

  useEffect(() => {
    (async () => {
      try {
        const data = await getCourseByUserRegistered();
        if (data) setCourses(data);
      } catch (err) {
        console.error(err);
      }
    })();
  }, []);

  const displayedCourses =
    tab === "registered"
      ? courses.filter((c) => c.progress < 100)
      : courses.filter((c) => c.progress === 100);

  return (
    <div className="p-4 pr-6">
      <h2 className="text-blue-600 text-2xl font-semibold flex items-center gap-2 mb-7">
        <FaInfoCircle />
        <span>Khóa học</span>
      </h2>

      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-2">
        <div className="flex gap-2 text-lg">
          <button
            className={`px-4 py-1 rounded cursor-pointer ${
              tab === "registered"
                ? "bg-orange-500 text-white"
                : "text-gray-800 hover:bg-gray-100"
            }`}
            onClick={() => setTab("registered")}
          >
            Đã đăng ký
          </button>
          <button
            className={`px-4 py-1 rounded cursor-pointer ${
              tab === "completed"
                ? "bg-orange-500 text-white"
                : "text-gray-800 hover:bg-gray-100"
            }`}
            onClick={() => setTab("completed")}
          >
            Hoàn thành
          </button>
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => setDisplayMode("grid")}
            className={`p-2 rounded ${
              displayMode === "grid"
                ? "bg-orange-500 text-white"
                : "bg-gray-100 text-gray-700"
            }`}
          >
            <FaThLarge />
          </button>
          <button
            onClick={() => setDisplayMode("list")}
            className={`p-2 rounded ${
              displayMode === "list"
                ? "bg-orange-500 text-white"
                : "bg-gray-100 text-gray-700"
            }`}
          >
            <FaBars />
          </button>
        </div>
      </div>

      <div>
        {displayedCourses.length > 0 ? (
          displayMode === "grid" ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 items-stretch">
              {displayedCourses.map((c, i) => (
                <CourseCard key={c.id ?? i} course={c} displayMode="grid" />
              ))}
            </div>
          ) : (
            <div className="grid gap-4">
              {displayedCourses.map((c, i) => (
                <CourseCard key={c.id ?? i} course={c} displayMode="list" />
              ))}
            </div>
          )
        ) : (
          <div className="text-gray-500 text-center w-full py-4">
            Không có khóa học{" "}
            {tab === "completed" ? "hoàn thành" : "đã đăng ký"}.
          </div>
        )}
      </div>
    </div>
  );
}
