import React, { useState, useEffect, useMemo } from "react";
import { FaInfoCircle } from "react-icons/fa";
import { IoBookmarksSharp } from "react-icons/io5";
import { FaThLarge, FaBars } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import {
  getAllProgress,
  getCourseByUserRegistered,
} from "../../services/Student/Course";

const CourseCard = ({ course, displayMode }) => {
  const navigate = useNavigate();

  // LIST VIEW
  if (displayMode === "list") {
    return (
      <div
        className="flex bg-white dark:bg-[#232326] shadow-sm hover:shadow-md rounded-lg overflow-hidden mb-4 cursor-pointer transition-colors"
        onClick={() =>
          navigate(`/student/studentcourse/${course.courseDetail.id}`)
        }
      >
        <div className="w-40 bg-purple-200 dark:bg-purple-900 flex items-center justify-center text-gray-600 dark:text-gray-300 text-sm shrink-0">
          Ảnh
        </div>

        <div className="p-4 flex-1 flex flex-col">
          <div className="flex items-start gap-3">
            <IoBookmarksSharp className="text-yellow-500 mt-1" />
            <div>
              <div className="font-bold text-xl dark:text-gray-100">
                {course.courseDetail.title}
              </div>
              <div className="text-xs text-gray-500 dark:text-gray-400">
                Lịch bắt đầu: {course.courseDetail.startMonth}
              </div>
            </div>
          </div>

          <p className="text-sm text-gray-500 dark:text-gray-400 mt-2 truncate">
            {course.courseDetail.description}
          </p>
          <p className="text-sm font-medium mt-2 dark:text-gray-200">
            Giảng viên: {course.courseDetail.lecturerName}
          </p>

          <div className="mt-auto">
            <div className="text-right text-sm dark:text-gray-300">
              {course.progress}%
            </div>
            <div className="h-2 bg-red-200 dark:bg-red-900 rounded overflow-hidden mt-2">
              <div
                className="h-full bg-red-500 dark:bg-red-600"
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
      className="rounded-lg shadow-sm overflow-hidden bg-white dark:bg-[#232326] hover:shadow-md cursor-pointer h-full flex flex-col transition-colors"
      onClick={() =>
        navigate(`/student/studentcourse/${course.courseDetail.id}`)
      }
    >
      <div className="h-40 bg-purple-200 dark:bg-purple-900 flex items-center justify-center text-gray-600 dark:text-gray-300 w-full flex-shrink-0">
        Ảnh
      </div>

      <div className="p-4 flex-1 flex flex-col">
        <div className="flex items-start gap-3">
          <IoBookmarksSharp className="text-yellow-500 mt-1" />
          <div>
            <div className="font-bold text-xl dark:text-gray-100">
              {course.courseDetail.title}
            </div>
            <div className="text-xs text-gray-500 dark:text-gray-400">
              Lịch bắt đầu: {course.courseDetail.startMonth}
            </div>
          </div>
        </div>

        <p className="text-sm text-gray-500 dark:text-gray-400 mt-2 truncate">
          {course.courseDetail.description}
        </p>
        <p className="text-sm font-medium mt-2 dark:text-gray-200">
          Giảng viên: {course.courseDetail.lecturerName}
        </p>

        <div className="mt-auto">
          <div className="text-right text-sm dark:text-gray-300">
            {course.progress}%
          </div>
          <div className="h-2 bg-red-200 dark:bg-red-900 rounded overflow-hidden mt-2">
            <div
              className="h-full bg-red-500 dark:bg-red-600"
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
  const [courseProgress, setCourseProgress] = useState([]);

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

  useEffect(() => {
    getProgress();
  }, []);

  const getProgress = async () => {
    try {
      let data = await getAllProgress();
      if (data) setCourseProgress(data);
    } catch (err) {
      console.error(err);
    }
  };

  // merge khi cả courses và courseProgress thay đổi
  const mergedCourses = useMemo(() => {
    return courses.map((course) => {
      const enrollment = courseProgress.find(
        (e) => e.courseId === course.courseDetail.id
      );
      return {
        ...course,
        progress: enrollment ? enrollment.progressPercent : course.progress,
      };
    });
  }, [courses, courseProgress]);

  useEffect(() => {
    console.log("c", mergedCourses);
  }, [mergedCourses]);

  const displayedCourses =
    tab === "registered"
      ? mergedCourses.filter((c) => c.progress < 100)
      : mergedCourses.filter((c) => c.progress === 100);

  return (
    <div className="p-4 pr-6 bg-gray-50 dark:bg-[#18181b] min-h-screen transition-colors duration-300">
      <h2 className="text-blue-600 dark:text-blue-300 text-2xl font-semibold flex items-center gap-2 mb-7">
        <FaInfoCircle />
        <span>Khóa học</span>
      </h2>

      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-2">
        <div className="flex gap-2 text-lg">
          <button
            className={`px-4 py-1 rounded cursor-pointer transition-colors ${
              tab === "registered"
                ? "bg-orange-500 text-white"
                : "text-gray-800 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-700"
            }`}
            onClick={() => setTab("registered")}
          >
            Đã đăng ký
          </button>
          <button
            className={`px-4 py-1 rounded cursor-pointer transition-colors ${
              tab === "completed"
                ? "bg-orange-500 text-white"
                : "text-gray-800 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-700"
            }`}
            onClick={() => setTab("completed")}
          >
            Hoàn thành
          </button>
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => setDisplayMode("grid")}
            className={`p-2 rounded transition-colors ${
              displayMode === "grid"
                ? "bg-orange-500 text-white"
                : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-100"
            }`}
          >
            <FaThLarge />
          </button>
          <button
            onClick={() => setDisplayMode("list")}
            className={`p-2 rounded transition-colors ${
              displayMode === "list"
                ? "bg-orange-500 text-white"
                : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-100"
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
          <div className="text-gray-500 dark:text-gray-400 text-center w-full py-4">
            Không có khóa học{" "}
            {tab === "completed" ? "hoàn thành" : "đã đăng ký"}.
          </div>
        )}
      </div>
    </div>
  );
}
