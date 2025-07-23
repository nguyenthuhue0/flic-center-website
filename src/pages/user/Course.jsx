import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import zalo from "../../assets/images/zalo.png";

export default function App() {
  const navigate = useNavigate();
  const [selectedTab, setSelectedTab] = useState("LẬP TRÌNH");

  const allCourses = {
    "LẬP TRÌNH": Array(6).fill({
      title: "Lập trình C++",
      desc: "AI (trí tuệ nhân tạo) đã phát triển bùng nổ trong vài năm gần đây...",
      date: "07/07/2025",
    }),
    TOEIC: Array(3).fill({
      title: "Luyện thi TOEIC 600+",
      desc: "Khóa học giúp bạn cải thiện kỹ năng Listening và Reading TOEIC...",
      date: "15/08/2025",
    }),
    "TIN HỌC": Array(4).fill({
      title: "Tin học văn phòng",
      desc: "Nắm vững kỹ năng Word, Excel, PowerPoint chuẩn MOS quốc tế...",
      date: "01/09/2025",
    }),
  };

  const colors = [
    "bg-purple-300",
    "bg-yellow-200",
    "bg-green-300",
    "bg-red-300",
    "bg-pink-300",
    "bg-purple-300",
  ];

  const handleDetailClick = (course) => {
    navigate("/coursedetail", { state: { course } });
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
          {allCourses[selectedTab].map((course, idx) => (
            <div
              key={idx}
              className={`shadow-md w-[345px] h-[411px] overflow-hidden flex flex-col`}
            >
              {/* Phần ảnh */}
              <div
                className={`w-full h-[200px] flex items-center justify-center text-white text-base font-semibold ${
                  colors[idx % colors.length]
                }`}
              >
                Ảnh
              </div>

              {/* Nội dung card */}
              <div className="bg-white p-4 flex-1 flex flex-col justify-between rounded-b-2xl">
                <div>
                  <h2
                    style={{ fontSize: "24px" }}
                    className="font-semibold text-gray-900 flex items-center gap-2"
                  >
                    <span className="text-blue-600">📘</span>
                    {course.title}
                  </h2>
                  <p
                    style={{ fontSize: "14px" }}
                    className="text-blue-500 font-medium mb-2 pl-[42px]"
                  >
                    Đào tạo 3 tháng
                  </p>
                </div>
                <p className="text-xs text-gray-600 leading-snug mb-2 pl-[8px]">
                  {course.desc}
                </p>
                <div className="text-sm text-gray-700 mt-auto">
                  <div className="flex justify-between items-center mt-2">
                    <div className="font-bold pl-[8px]">
                      Khai giảng :{" "}
                      <span className="font-bold">{course.date}</span>
                    </div>
                    <button
                      onClick={() => handleDetailClick(course)}
                      className="bg-yellow-300 text-xs text-blue-500 px-4 py-1 rounded-full hover:bg-yellow-400 transition-all font-bold"
                    >
                      Chi tiết →
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
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

      {/* Pagination */}
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
