import React, { useState } from "react";
import ieltsImg from "../../assets/images/IELTS.jpg";
import vkuImg from "../../assets/images/vku.jpg";
import mosImg from "../../assets/images/mos.webp";
import viteImg from "../../assets/images/vku.jpg";
import vstepImg from "../../assets/images/VSTEP.jpg";
import toeicImg from "../../assets/images/toeic.jpg";
import { useNavigate } from "react-router-dom";

const courses = [
  {
    id: 1,
    title: "Lập trình C++ cơ bản",
    instructor: "TS. Huỳnh Ngọc Thọ",
    category: "LẬP TRÌNH",
    image: ieltsImg,
  },
  {
    id: 2,
    title: "TOEIC 500+",
    instructor: "ThS. Nguyễn Thị Lan",
    category: "TOEIC",
    image: vkuImg,
  },
  {
    id: 3,
    title: "Tin học văn phòng MOS",
    instructor: "ThS. Trần Văn Minh",
    category: "TIN HỌC",
    image: mosImg,
  },
  {
    id: 4,
    title: "Lập trình Python nâng cao",
    instructor: "TS. Lê Văn A",
    category: "LẬP TRÌNH",
    image: vkuImg,
  },
  {
    id: 5,
    title: "VSTEP B1-B2",
    instructor: "ThS. Phạm Thị Hạnh",
    category: "VSTEP",
    image: vstepImg,
  },
  {
    id: 6,
    title: "TOEIC Speaking & Writing",
    instructor: "ThS. Nguyễn Thị Lan",
    category: "TOEIC",
    image: toeicImg,
  },
  {
    id: 7,
    title: "Lập trình Java cơ bản",
    instructor: "TS. Nguyễn Văn C",
    category: "LẬP TRÌNH",
    image: ieltsImg,
  },
  {
    id: 8,
    title: "MOS Excel nâng cao",
    instructor: "ThS. Lê Thị D",
    category: "TIN HỌC",
    image: mosImg,
  },
  {
    id: 9,
    title: "TOEIC Reading Master",
    instructor: "ThS. Nguyễn Thị Lan",
    category: "TOEIC",
    image: toeicImg,
  },
  {
    id: 10,
    title: "Lập trình Web cơ bản",
    instructor: "TS. Lê Văn A",
    category: "LẬP TRÌNH",
    image: viteImg,
  },
  {
    id: 11,
    title: "VSTEP C1",
    instructor: "ThS. Phạm Thị Hạnh",
    category: "VSTEP",
    image: vstepImg,
  },
  {
    id: 12,
    title: "MOS PowerPoint",
    instructor: "ThS. Trần Văn Minh",
    category: "TIN HỌC",
    image: mosImg,
  },
  {
    id: 13,
    title: "TOEIC Listening Master",
    instructor: "ThS. Nguyễn Thị Lan",
    category: "TOEIC",
    image: toeicImg,
  },
  {
    id: 14,
    title: "Lập trình C# nâng cao",
    instructor: "TS. Nguyễn Văn C",
    category: "LẬP TRÌNH",
    image: ieltsImg,
  },
  {
    id: 15,
    title: "VSTEP luyện đề",
    instructor: "ThS. Phạm Thị Hạnh",
    category: "VSTEP",
    image: vstepImg,
  },
];

const ITEMS_PER_PAGE = 6;

const DocumentList = () => {
  // Thêm state để lưu category đang chọn
  const [activeCategory, setActiveCategory] = useState(courses[0].category);
  const [currentPage, setCurrentPage] = useState(1);

  // Lấy danh sách category duy nhất
  const categories = Array.from(new Set(courses.map((c) => c.category)));

  // Lọc courses theo category đang chọn
  const filteredCourses = courses.filter(
    (course) => course.category === activeCategory
  );
  const totalPages = Math.ceil(filteredCourses.length / ITEMS_PER_PAGE);
  const paginatedCourses = filteredCourses.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  // Khi đổi category thì về trang 1
  const handleCategoryChange = (category) => {
    setActiveCategory(category);
    setCurrentPage(1);
  };

  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex">
        {/* Main Content */}
        <main className="flex-1 p-6">
          <div className="space-y-8">
            {/* Thanh chọn category */}
            <div className="flex justify-center mb-8">
              <div className="bg-slate-800 rounded-full p-2 inline-flex">
                {categories.map((category) => (
                  // <button
                  //   key={category}
                  //   onClick={() => handleCategoryChange(category)}
                  //   className={`text-base font-bold px-4 py-2 rounded transition-colors duration-200 ${
                  //     activeCategory === category ? 'text-red-600' : 'text-blue-700 hover:text-red-600'
                  //   }`}
                  // >
                  //   {category}
                  // </button>
                  <button
                    key={category}
                    onClick={() => handleCategoryChange(category)}
                    className={`px-6 py-3 rounded-full font-medium transition-colors ${
                      activeCategory === category
                        ? "bg-orange-500 text-white"
                        : "text-white hover:bg-slate-700"
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>

            {/* Danh sách courses theo category đang chọn và phân trang */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {paginatedCourses.map((course) => (
                <div key={course.id} className="space-y-4">
                  {/* Bỏ hiển thị category trên từng khoá học */}
                  <div className="bg-white rounded-lg shadow-md overflow-hidden">
                    <div className="aspect-video bg-purple-200 flex items-center justify-center overflow-hidden">
                      <img
                        src={course.image}
                        alt={course.title}
                        className="object-cover w-full h-full"
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="text-xl font-semibold mb-2">
                        {course.title}
                      </h3>
                      <p className="text-gray-600 mb-4">{course.instructor}</p>
                      <button
                        onClick={() => navigate("/lecturer/documentdetail")}
                        className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-medium py-2 px-4 rounded"
                      >
                        Chi tiết →
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            {/* Pagination - chỉ hiển thị nếu có nhiều hơn 1 trang */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center space-x-2 mt-8">
                <button
                  className="p-2 hover:bg-gray-200 rounded"
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                >
                  ‹
                </button>
                {Array.from({ length: totalPages }, (_, i) => (
                  <button
                    key={i + 1}
                    className={`px-3 py-1 rounded ${
                      currentPage === i + 1
                        ? "bg-red-600 text-white"
                        : "hover:bg-gray-200"
                    }`}
                    onClick={() => setCurrentPage(i + 1)}
                  >
                    {i + 1}
                  </button>
                ))}
                <button
                  className="p-2 hover:bg-gray-200 rounded"
                  onClick={() =>
                    setCurrentPage((p) => Math.min(totalPages, p + 1))
                  }
                  disabled={currentPage === totalPages}
                >
                  ›
                </button>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default DocumentList;
