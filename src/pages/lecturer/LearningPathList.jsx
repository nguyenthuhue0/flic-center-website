import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../utils/AxiosCustomize";
import ieltsImg from "../../assets/images/IELTS.jpg"; // ảnh mặc định nếu backend không có

const LearningPathList = () => {
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [errorMsg, setErrorMsg] = useState("");

    const navigate = useNavigate();

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const data = await api.get("/lecturer/course");
                console.log('DocumentList - API response:', data);

                // Xử lý response data
                let coursesData = [];
                if (Array.isArray(data)) {
                    coursesData = data;
                } else if (data && Array.isArray(data.value)) {
                    coursesData = data.value;
                } else if (data && Array.isArray(data.data)) {
                    coursesData = data.data;
                }

                const mappedCourses = coursesData.map((c, index) => ({
                    id: c.id || c.courseId || (index + 1), // Sử dụng index + 1 thay vì Math.random()
                    title: c.title || c.courseName || `Khóa học ${index + 1}`,
                    instructor: c.lecturerInCharge || c.instructor || c.lecturerName || "Chưa có giảng viên",
                    description: c.description || "Chưa có mô tả",
                    price: c.price || 0,
                    image: c.image || c.imageUrl || ieltsImg,
                }));

                console.log('DocumentList - Mapped courses:', mappedCourses);
                setCourses(mappedCourses);
            } catch (error) {
                console.error("Fetch courses failed:", error.response?.status, error.response?.data);
                if (error.response?.status === 403) {
                    setErrorMsg("Bạn không có quyền truy cập khóa học này.");
                } else {
                    setErrorMsg("Đã có lỗi xảy ra khi tải dữ liệu.");
                }
            } finally {
                setLoading(false);
            }
        };

        fetchCourses();
    }, []);

    if (loading) return <p className="text-center mt-10">Đang tải khóa học...</p>;
    if (errorMsg) return <p className="text-center mt-10 text-red-600">{errorMsg}</p>;

    return (
        <div className="min-h-screen bg-gray-50 p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {courses.map((course) => (
                    <div
                        key={course.id}
                        className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col"
                    >
                        {/* Ảnh */}
                        <div className="aspect-video bg-purple-200 flex items-center justify-center overflow-hidden">
                            <img
                                src={course.image}
                                alt={course.title}
                                className="object-cover w-full h-full"
                            />
                        </div>

                        {/* Nội dung */}
                        <div className="p-4 flex flex-col flex-grow">
                            <h3 className="text-xl font-semibold mb-2">{course.title}</h3>
                            <p className="text-gray-600 mb-2">{course.instructor}</p>
                            <p className="text-gray-700 mb-4 flex-grow">{course.description}</p>

                            {/* Nút và giá luôn nằm dưới */}
                            <div className="mt-auto">
                                <p className="text-green-600 font-medium mb-4">
                                    {course.price.toLocaleString("vi-VN", {
                                        style: "currency",
                                        currency: "VND",
                                    })}
                                </p>
                                <button
                                    onClick={() =>
                                        navigate(`/lecturer/learningpathdetail/${course.id}`, {
                                            state: {
                                                courseId: course.id,
                                                courseTitle: course.title
                                            },
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
        </div>
    );
};

export default LearningPathList;
