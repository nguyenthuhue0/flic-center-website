import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import zalo from "../../assets/images/zalo.png";
import { getCourse } from "../../services/Auth/course";

export default function App() {
  const navigate = useNavigate();
  const [selectedTab, setSelectedTab] = useState("LẬP TRÌNH");
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    fetchCourse();
  }, []);

  const fetchCourse = async () => {
    try {
      const res = await getCourse();
      if (res) {
        setCourses(res);
      }
    } catch (error) {
      console.error("Lỗi khi lấy khóa học:", error);
    }
  };


 

  return (
    <div className="min-h-screen bg-white z-0">
      {/* Tabs */}
      <div className="flex justify-center gap-x-10 my-6 font-semibold text-lg">
        {["LẬP TRÌNH", "TOEIC", "TIN HỌC"].map((tab) => (
          <div
            key={tab}
            onClick={() => setSelectedTab(tab)}
            className={`cursor-pointer pb-1 font-bold px-3 text-[32px] ${
              selectedTab === tab
                ? "text-red-600 border-b-4 border-red-600"
                : "text-gray-800 hover:text-red-500"
            }`}
          >
            {tab}
          </div>
        ))}
      </div>

      {/* Grid khóa học */}
      <div className="w-full flex justify-center">
        <div className="flex flex-wrap justify-center gap-x-10 gap-y-8 max-w-[1120px]">
          {courses.length === 0 ? (
            <p className="text-gray-500">Không có khóa học nào</p>
          ) : (
            courses.map((course, idx) => (
              <div
                key={course.id || idx}
                className={`shadow-md w-[345px] h-[430px] overflow-hidden flex flex-col rounded-xl`}
              >
                {/* Màu nền thay ảnh */}
                <div
                  className={`w-full h-[180px] flex items-center  text-white text-base font-semibold }`}
                >
                  <img src={course.imageUrl} alt="" />
                  {course.title}
                </div>

                <div className="bg-white p-4 flex-1 flex flex-col justify-between">
                  <div>
                    <h2 className="text-[22px] font-semibold text-gray-900 flex items-center gap-2">
                      <span className="text-blue-600">📘</span>
                      {course.title}
                    </h2>
                    <p className="text-blue-500 text-sm mb-2 pl-[42px] font-medium">
                      Đào tạo {course.duration || "3 tháng"}
                    </p>

                    {/* Mô tả */}
                    <div className="pl-[8px] mb-3">
                      <p className="text-gray-800 text-sm font-medium mb-1">Mô tả:</p>
                      <p className="text-gray-600 text-sm leading-snug line-clamp-3">
                        {course.description || "Chưa có mô tả"}
                      </p>
                    </div>
                  </div>

                  <div className="text-sm text-gray-700 mt-auto">
                    <div className="flex justify-between items-center mt-2">
                      <div className="font-bold pl-[8px]">
                        Khai giảng:{" "}
                        <span className="font-bold">
                          {course.start_month || "Đang cập nhật"}
                        </span>
                      </div>
                     <button
        onClick={() => navigate(`/course/${course.id}`, { state: { course } })}
        className="bg-yellow-300 text-xs text-blue-600 px-4 py-1 rounded-full hover:bg-yellow-400 transition font-bold mt-3"
      >
        Chi tiết →
      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Zalo + Dots */}
      <div className="fixed bottom-4 right-4 z-50">
        <img
          src={zalo}
          alt="Zalo"
          className="w-15 h-15 rounded-full transition-transform duration-500 hover:rotate-[360deg]"
        />
      </div>
      <div className="fixed left-4 top-3/4 -translate-y-1/2 z-40">
        <div className="grid grid-cols-3 gap-1.5">
          {Array(9)
            .fill(0)
            .map((_, idx) => (
              <div
                key={idx}
                className="w-2.5 h-2.5 bg-red-500 rounded-full"
              ></div>
            ))}
        </div>
      </div>
      <div className="fixed right-4 top-1/3 -translate-y-1/2 z-40">
        <div className="grid grid-cols-3 gap-1.5">
          {Array(9)
            .fill(0)
            .map((_, idx) => (
              <div
                key={idx}
                className="w-2.5 h-2.5 bg-red-500 rounded-full"
              ></div>
            ))}
        </div>
      </div>

      {/* Pagination (giả lập) */}
      <div className="flex justify-center items-center gap-4 my-10 text-lg font-medium select-none">
        <button className="text-gray-700 hover:text-red-500">{"<"}</button>
        <button className="bg-red-500 text-white w-7 h-7 rounded hover:bg-red-600 transition-all">
          1
        </button>
        <button className="text-gray-800 hover:text-red-500">2</button>
        <button className="text-gray-800 hover:text-red-500">3</button>
        <button className="text-gray-800 hover:text-red-500">{">"}</button>
      </div>
    </div>
  );
}
