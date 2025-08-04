import React, { useState, useRef } from 'react';
import { FaInfoCircle } from "react-icons/fa";
import { IoBookmarksSharp } from "react-icons/io5";
import { FaThLarge, FaBars } from "react-icons/fa"; // icon dạng lưới và danh sách
import { Navigate, useNavigate } from 'react-router-dom';

const courses = [
  { id: 1, title: 'Lập trình C++', desc: 'Khóa học cơ bản về C++', progress: 36 },
  { id: 2, title: 'Java Web', desc: 'Học Spring Boot từ A-Z', progress: 72 },
  { id: 3, title: 'ReactJS', desc: 'Xây dựng web hiện đại với React', progress: 90 },
  { id: 4, title: 'NodeJS', desc: 'Viết API và backend với NodeJS', progress: 60 },
  { id: 5, title: 'Python cơ bản', desc: 'Lập trình Python cho người mới bắt đầu', progress: 100 },
];
const CourseCard = ({ course, displayMode }) => {
  const navigate = useNavigate()
  if (displayMode === 'list') {
    return (
      <div className="flex bg-white shadow-sm hover:shadow-md rounded-lg overflow-hidden mb-4 cursor-pointer"
          onClick={() => {navigate(`/student/studentcourse/${course.id}`)}}
      >
        <div className="w-40 bg-purple-200 flex items-center justify-center text-gray-600 text-sm shrink-0">Ảnh</div>
        <div className="p-3 space-y-1 flex-1">
          <div className="flex items-center gap-2 font-semibold text-xl">
            <IoBookmarksSharp className='text-yellow-500' />
            <div>
              <div className='font-bold'>{course.title}</div>
              <div className="text-xs text-gray-500">Đào tạo 3 tháng</div>
            </div>
          </div>
          <p className="text-sm text-gray-500">{course.desc}</p>
          <p className="text-md text-black-500">Giảng viên: Nguyễn Văn A</p>
          <div className="text-right text-sm">{course.progress}%</div>
          <div className="h-2 bg-red-200 rounded overflow-hidden mt-2">
            <div className="h-full bg-red-500" style={{ width: `${course.progress}%` }}></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-lg shadow-sm overflow-hidden bg-white hover:shadow-md cursor-pointer"
    onClick={() => {navigate(`/student/studentcourse/${course.id}`)}}
    >
      <div className="h-40 bg-purple-200 flex items-center justify-center text-gray-600">Ảnh</div>
      <div className="p-3 space-y-1">
        <div className="flex items-center gap-2 font-semibold text-xl">
          <IoBookmarksSharp className='text-yellow-500' />
          <div>
            <div className='font-bold'>{course.title}</div>
            <div className="text-xs text-gray-500">Đào tạo 3 tháng</div>
          </div>
        </div>
        <p className="text-sm text-gray-500">{course.desc}</p>
        <p className="text-md text-black-500">Giảng viên: Nguyễn Văn A</p>
        <div className="text-right text-sm">{course.progress}%</div>
        <div className="h-2 bg-red-200 rounded overflow-hidden mt-2">
          <div className="h-full bg-red-500" style={{ width: `${course.progress}%` }}></div>
        </div>
      </div>
    </div>
  );
};

export default function StudentCourse() {
  const [tab, setTab] = useState('registered');
  const [displayMode, setDisplayMode] = useState('grid'); // grid | list
  const scrollRef = useRef(null);

  const scrollLeft = () => {
    scrollRef.current?.scrollBy({ left: -300, behavior: 'smooth' });
  };

  const scrollRight = () => {
    scrollRef.current?.scrollBy({ left: 300, behavior: 'smooth' });
  };

const displayedCourses =
  tab === 'registered'
    ? courses.filter((c) => c.progress < 100)
    : courses.filter((c) => c.progress === 100);

  return (
    <div className="p-4 pr-6">
      {/* Tiêu đề */}
      <h2 className="text-blue-600 text-2xl font-semibold flex items-center gap-2 mb-7">
        <FaInfoCircle />
        <span>Khóa học</span>
      </h2>

      {/* Tabs & Display Mode */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-2">
        {/* Tabs */}
        <div className="flex gap-2 text-lg">
          <button
            className={`px-4 py-1 rounded cursor-pointer ${
              tab === 'registered'
                ? 'bg-orange-500 text-white'
                : 'text-gray-800 hover:bg-gray-100'
            }`}
            onClick={() => setTab('registered')}
          >
            Đã đăng ký
          </button>
          <button
            className={`px-4 py-1 rounded cursor-pointer ${
              tab === 'completed'
                ? 'bg-orange-500 text-white'
                : 'text-gray-800 hover:bg-gray-100'
            }`}
            onClick={() => setTab('completed')}
          >
            Hoàn thành
          </button>
        </div>

        {/* Toggle Display Mode */}
        <div className="flex gap-2">
          <button
            onClick={() => setDisplayMode('grid')}
            className={`p-2 rounded ${displayMode === 'grid' ? 'bg-orange-500 text-white' : 'bg-gray-100 text-gray-700'}`}
          >
            <FaThLarge />
          </button>
          <button
            onClick={() => setDisplayMode('list')}
            className={`p-2 rounded ${displayMode === 'list' ? 'bg-orange-500 text-white' : 'bg-gray-100 text-gray-700'}`}
          >
            <FaBars />
          </button>
        </div>
      </div>

      {/* Course Cards */}
      <div className="relative">
        {displayedCourses.length > 0 ? (
          displayMode === 'grid' ? (
            <>
              <div
                ref={scrollRef}
                className="flex gap-4 overflow-x-auto scroll-smooth mb-4 pb-2 scrollbar-hidden"
              >
                {displayedCourses.map((c, i) => (
                  <div key={c.id + i} style={{ flex: '0 0 25%' }}>
                    <CourseCard course={c} displayMode="grid" />
                  </div>
                ))}
              </div>
              <div className="flex gap-2 justify-end mt-2">
                <button
                  onClick={scrollLeft}
                  className="w-10 h-10 bg-gray-200 rounded shadow cursor-pointer hover:bg-gray-100"
                >
                  ❮
                </button>
                <button
                  onClick={scrollRight}
                  className="w-10 h-10 bg-gray-200 rounded shadow cursor-pointer hover:bg-gray-100"
                >
                  ❯
                </button>
              </div>
            </>
          ) : (
            <div className="grid gap-4">
              {displayedCourses.map((c, i) => (
                <CourseCard key={c.id + i} course={c} displayMode="list" />
              ))}
            </div>
          )
        ) : (
          <div className="text-gray-500 text-center w-full py-4">
            Không có khóa học hoàn thành.
          </div>
        )}
      </div>
    </div>
  );
}
