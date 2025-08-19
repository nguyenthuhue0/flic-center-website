import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
// import ảnh nếu cần cho fallback
import ieltsImg from "../../assets/images/IELTS.jpg";
import vkuImg from "../../assets/images/vku.jpg";
import mosImg from "../../assets/images/mos.webp";
import viteImg from "../../assets/images/vku.jpg";
import vstepImg from "../../assets/images/VSTEP.jpg";
import toeicImg from "../../assets/images/toeic.jpg";
// Import API mới tương tự như News
import { getLessons } from "../../services/lecturer/DocumentApi";
import lessonApi from "../../services/lecturer/lessonApi";
import { debugApi } from "../../utils/debugApi";

const ITEMS_PER_PAGE = 6;

const DocumentList = () => {
  const [courses, setCourses] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [debugInfo, setDebugInfo] = useState({});

  const navigate = useNavigate();

  // Sample data for testing
  const sampleCourses = [
    {
      id: 1,
      title: "Lập trình C++",
      name: "Lập trình C++",
      instructor: "TS. HUỲNH NGỌC THỌ",
      teacherName: "TS. HUỲNH NGỌC THỌ",
      image: null
    },
    {
      id: 2,
      title: "Lập trình Java",
      name: "Lập trình Java", 
      instructor: "TS. NGUYỄN VĂN A",
      teacherName: "TS. NGUYỄN VĂN A",
      image: null
    },
    {
      id: 3,
      title: "Cơ sở dữ liệu",
      name: "Cơ sở dữ liệu",
      instructor: "TS. TRẦN THỊ B",
      teacherName: "TS. TRẦN THỊ B", 
      image: null
    }
  ];

  useEffect(() => {
    // Gọi API lấy danh sách lesson theo courseId (nếu có courseId)
    // Nếu muốn lấy tất cả lesson, truyền courseId=null hoặc bỏ param
    const fetchCourses = () => {
      setLoading(true);
      
      // Debug: Test all endpoints
      console.log("=== DEBUG: Testing API endpoints ===");
      debugApi.testConnection().then(result => {
        console.log("Connection test result:", result);
      });
      debugApi.testAuth().then(result => {
        console.log("Auth test result:", result);
      });
      debugApi.testCourses().then(result => {
        console.log("Courses test result:", result);
      });
      debugApi.testLessons(1).then(result => {
        console.log("Lessons test result:", result);
      });
      console.log("=== END DEBUG ===");
      
      console.log("Fetching lessons using DocumentApi...");
      console.log("Access token:", sessionStorage.getItem("access_token"));
      
      // Sử dụng DocumentApi trước (tương tự như News API)
      getLessons(1)
        .then((data) => {
          console.log("DocumentApi getLessons response:", data);
          if (data && data.length > 0) {
            setCourses(data);
            setLoading(false);
            return;
          }
          // Nếu DocumentApi trống, thử lessonApi
          console.log("DocumentApi returned empty data, trying lessonApi...");
          return lessonApi.getCourses();
        })
        .then((data) => {
          if (data && data.length > 0) {
            console.log("LessonApi getCourses response:", data);
            setCourses(data);
            setLoading(false);
            return;
          }
          // Nếu lessonApi courses trống, thử lessons
          return lessonApi.getLessons(1);
        })
        .then((data) => {
          if (data && data.length > 0) {
            console.log("LessonApi getLessons response:", data);
            setCourses(data);
            setLoading(false);
            return;
          }
          // Nếu tất cả API trống, sử dụng sample data
          console.log("All API endpoints returned empty data, using sample data");
          setCourses(sampleCourses);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
          console.error("Error response:", error.response);
          // Sử dụng dữ liệu mẫu nếu API không hoạt động
          console.log("Using sample data due to API error");
          setCourses(sampleCourses);
          setLoading(false);
        });
    };
    fetchCourses();
  }, []);

  const totalPages = Math.ceil(courses.length / ITEMS_PER_PAGE);
  const paginatedCourses = courses.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex">
        <main className="flex-1 p-6">
          <div className="space-y-8">
            
            {/* Debug Section */}
            <div className="bg-yellow-100 border border-yellow-400 rounded p-4">
              <h3 className="font-bold text-yellow-800 mb-2">Debug Information</h3>
              <div className="text-sm text-yellow-700 space-y-1">
                <div>Token: {sessionStorage.getItem("access_token") ? "✅ Present" : "❌ Missing"}</div>
                <div>Connection: {debugInfo.connection ? "✅ Working" : "❌ Failed"}</div>
                <div>Auth: {debugInfo.auth ? "✅ Working" : "❌ Failed"}</div>
                <div>Courses API: {debugInfo.courses ? "✅ Working" : "❌ Failed"}</div>
                <div>Courses API (Alt): {debugInfo.coursesAlt ? "✅ Working" : "❌ Failed"}</div>
                <div>Lessons API: {debugInfo.lessons ? "✅ Working" : "❌ Failed"}</div>
                <div>Lessons API (Alt): {debugInfo.lessonsAlt ? "✅ Working" : "❌ Failed"}</div>
                <div>Data Source: {courses === sampleCourses ? "📋 Sample Data" : "🌐 API Data"}</div>
              </div>
            </div>
            
            {loading ? (
              <div className="text-center py-10">Đang tải dữ liệu...</div>
            ) : (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {paginatedCourses.map((course) => (
                    <div key={course.id} className="space-y-4">
                      <div className="bg-white rounded-lg shadow-md overflow-hidden">
                        <div className="aspect-video bg-purple-200 flex items-center justify-center overflow-hidden">
                          <img
                            src={
                              course.image ||
                              ieltsImg // fallback ảnh nếu API không trả về
                            }
                            alt={course.title || course.name}
                            className="object-cover w-full h-full"
                          />
                        </div>
                        <div className="p-4">
                          <h3 className="text-xl font-semibold mb-2">
                            {course.title || course.name}
                          </h3>
                          <p className="text-gray-600 mb-4">
                            {course.instructor || course.teacherName}
                          </p>
                          <button
                            onClick={() =>
                              navigate("/lecturer/documentdetail", {
                                state: { lessonId: course.id },
                              })
                            }
                            className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-medium py-2 px-4 rounded"
                          >
                            Chi tiết →
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
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
              </>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default DocumentList;
