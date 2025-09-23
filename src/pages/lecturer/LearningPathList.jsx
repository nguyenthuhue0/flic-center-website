import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../utils/AxiosCustomize";
import ieltsImg from "../../assets/images/IELTS.jpg";

// Ảnh: chuẩn hoá nếu BE trả đường dẫn tương đối
const resolveImage = (img) => {
  const raw = img || "";
  if (!raw) return ieltsImg;
  return /^https?:\/\//i.test(raw)
    ? raw
    : `http://localhost:8080/${String(raw).replace(/^\/+/, "")}`;
};

// Lấy courseId đúng: cover nhiều biến thể + trường lồng
const getCourseId = (c) =>
  c?.id ??
  c?.courseId ??
  c?.course_id ??
  c?.course?.id ??
  c?.course?.courseId ??
  c?.course?.course_id ??
  c?.idCourse ??
  c?.courseID ??
  null;

const LearningPathList = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      try {
        const res = await api.get("/lecturer/course");
        const payload = res?.data ?? res;

        // Chuẩn hoá mảng từ nhiều dạng response khác nhau
        const raw =
          Array.isArray(payload) ? payload :
          Array.isArray(payload?.data) ? payload.data :
          Array.isArray(payload?.value) ? payload.value :
          Array.isArray(payload?.content) ? payload.content :
          Array.isArray(payload?.items) ? payload.items : [];

        const mapped = raw.map((c, i) => {
          const courseId = getCourseId(c);
          return {
            key: courseId ?? `tmp-${i}`,                // key cho React
            courseId,                                   // id dùng để điều hướng
            title: c.title ?? c.courseName ?? c.name ?? `Khóa học ${i + 1}`,
            instructor:
              c.lecturerInCharge ?? c.instructor ?? c.lecturerName ?? "Chưa có giảng viên",
            description: c.description ?? "Chưa có mô tả",
            price: Number(c.price ?? 0),
            image: resolveImage(c.imageUrl ?? c.image),
          };
        });

        setCourses(mapped);
      } catch (err) {
        console.error("Fetch courses failed:", err?.response || err);
        setErrorMsg(
          err?.response?.status === 403
            ? "Bạn không có quyền truy cập khóa học này."
            : "Đã có lỗi xảy ra khi tải dữ liệu."
        );
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (loading) return <p className="text-center mt-10">Đang tải khóa học...</p>;
  if (errorMsg) return <p className="text-center mt-10 text-red-600">{errorMsg}</p>;
  if (courses.length === 0) return <p className="text-center mt-10 text-gray-600">Không có khóa học nào.</p>;

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {courses.map((course) => {
          const canGo = !!course.courseId; // chỉ điều hướng khi có ID thật
          return (
            <div
              key={course.key}
              className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col"
            >
              {/* Ảnh */}
              <div className="aspect-video bg-purple-200 flex items-center justify-center overflow-hidden">
                <img
                  src={course.image}
                  alt={course.title}
                  className="object-cover w-full h-full"
                  onError={(e) => (e.currentTarget.src = ieltsImg)}
                />
              </div>

              {/* Nội dung */}
              <div className="p-4 flex flex-col flex-grow">
                <h3 className="text-xl font-semibold mb-2">{course.title}</h3>
                <p className="text-gray-600 mb-2">{course.instructor}</p>
                <p className="text-gray-700 mb-4 flex-grow">{course.description}</p>

                <div className="mt-auto">
                  <p className="text-green-600 font-medium mb-4">
                    {course.price.toLocaleString("vi-VN", {
                      style: "currency",
                      currency: "VND",
                    })}
                  </p>

                  <button
                    onClick={() =>
                      canGo &&
                      navigate(`/lecturer/learningpathlist/${course.courseId}`, {
                        state: { courseId: course.courseId, courseTitle: course.title },
                      })
                    }
                    disabled={!canGo}
                    title={canGo ? "" : "Thiếu courseId từ API – không thể vào chi tiết"}
                    className={
                      "w-full font-medium py-2 px-4 rounded " +
                      (canGo
                        ? "bg-yellow-400 hover:bg-yellow-500 text-black"
                        : "bg-gray-300 text-gray-600 cursor-not-allowed")
                    }
                  >
                    Chi tiết →
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default LearningPathList;
