"use client";

import { useState, useEffect } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { FileText, Download, Eye, Calendar, Pencil } from "lucide-react";
import { Book, Presentation, ClipboardList } from "lucide-react";
import { getLessonMaterials } from "../../services/lecturer/DocumentApi";

const DocumentDetail = () => {
  const [sortField, setSortField] = useState("uploadedAt");
  const [sortOrder, setSortOrder] = useState("desc");
  const [materials, setMaterials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { courseId } = useParams();
  const location = useLocation();
  const courseTitle = location.state?.courseTitle || "Khóa học";

  // Fetch materials from API
  useEffect(() => {
    const fetchMaterials = async () => {
      if (!courseId) {
        setError("Course ID không hợp lệ");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const response = await getLessonMaterials(courseId);
        console.log('DocumentDetail - API response:', response);
        
        // Xử lý response data
        let materialsData = [];
        if (Array.isArray(response)) {
          materialsData = response;
        } else if (response && Array.isArray(response.value)) {
          materialsData = response.value;
        } else if (response && Array.isArray(response.data)) {
          materialsData = response.data;
        }

        // Transform API data to match actual response structure
        const transformedMaterials = materialsData.map((item, index) => ({
          id: item.id || index,
          courseId: item.courseId || courseId,
          title: item.title || `Tài liệu ${index + 1}`,
          fileUrl: item.fileUrl || "",
          type: item.type || "Tài liệu",
          uploadedAt: item.uploadedAt ? new Date(item.uploadedAt).toLocaleDateString('vi-VN') : null,
          // Helper fields for UI
          size: item.size || "N/A",
          status: item.fileUrl ? "Có sẵn" : "Chưa upload"
        }));

        setMaterials(transformedMaterials);
        setError(null);
      } catch (err) {
        console.error('Error fetching materials:', err);
        setError("Không thể tải dữ liệu tài liệu");
      } finally {
        setLoading(false);
      }
    };

    fetchMaterials();
  }, [courseId]);

  const semesterData = {
    "01": [
      {
        id: 1,
        type: "Giáo trình",
        title: "Lập trình C++ cơ bản.pdf",
        updateDate: "15/03/2023",
        size: "25.4 MB",
        status: "Có sẵn",
      },
      {
        id: 2,
        type: "Slide",
        title: "Bài 1 - Giới thiệu C++.pptx",
        updateDate: "10/03/2023",
        size: "8.2 MB",
        status: "Có sẵn",
      },
      {
        id: 3,
        type: "Đề cương",
        title: "Đề cương môn Lập trình C++.pdf",
        updateDate: "01/03/2023",
        size: "2.1 MB",
        status: "Có sẵn",
      },
      {
        id: 4,
        type: "Slide",
        title: "Bài 2 - Biến và kiểu dữ liệu.pptx",
        updateDate: "20/03/2023",
        size: "12.6 MB",
        status: "Đang cập nhật",
      },
      {
        id: 5,
        type: "Giáo trình",
        title: "Bài tập thực hành C++.pdf",
        updateDate: "25/03/2023",
        size: "18.7 MB",
        status: "Có sẵn",
      },
      {
        id: 13,
        type: "Bài tập khóa học",
        title: "Bài tập tuần 1.docx",
        updateDate: "18/03/2023",
        size: "0.8 MB",
        status: "Có sẵn",
        link: "", // nếu có file
      },
      {
        id: 14,
        type: "Google Meet",
        title: "Link lớp học Google Meet",
        updateDate: "01/03/2023",
        size: "-",
        status: "Có sẵn",
        link: "https://meet.google.com/your-meet-link",
      },
    ],
    "02": [
      {
        id: 6,
        type: "Giáo trình",
        title: "Lập trình hướng đối tượng.pdf",
        updateDate: "05/04/2023",
        size: "32.1 MB",
        status: "Có sẵn",
      },
      {
        id: 7,
        type: "Slide",
        title: "OOP - Lớp và đối tượng.pptx",
        updateDate: "10/04/2023",
        size: "15.3 MB",
        status: "Có sẵn",
      },
      {
        id: 8,
        type: "Đề cương",
        title: "Đề cương OOP nâng cao.pdf",
        updateDate: "01/04/2023",
        size: "1.8 MB",
        status: "Đang cập nhật",
      },
    ],
    "03": [
      {
        id: 9,
        type: "Giáo trình",
        title: "Cấu trúc dữ liệu và giải thuật.pdf",
        updateDate: "15/07/2023",
        size: "28.9 MB",
        status: "Có sẵn",
      },
      {
        id: 10,
        type: "Slide",
        title: "Thuật toán sắp xếp.pptx",
        updateDate: "20/07/2023",
        size: "11.4 MB",
        status: "Có sẵn",
      },
    ],
    "04": [
      {
        id: 11,
        type: "Đề cương",
        title: "Đề cương đồ án tốt nghiệp.pdf",
        updateDate: "01/10/2023",
        size: "3.2 MB",
        status: "Có sẵn",
      },
      {
        id: 12,
        type: "Giáo trình",
        title: "Hướng dẫn làm đồ án.pdf",
        updateDate: "15/10/2023",
        size: "45.6 MB",
        status: "Đang cập nhật",
      },
    ],
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Có sẵn":
        return "text-green-600 bg-green-50";
      case "Đang cập nhật":
        return "text-orange-600 bg-orange-50";
      default:
        return "text-gray-600 bg-gray-50";
    }
  };

  const getTypeColor = (type) => {
    switch (type) {
      case "Giáo trình":
        return "text-blue-600 bg-blue-50";
      case "Slide":
        return "text-purple-600 bg-purple-50";
      case "Đề cương":
        return "text-green-600 bg-green-50";
      case "Bài tập khóa học":
        return "text-orange-600 bg-orange-50";
      case "Google Meet":
        return "text-pink-600 bg-pink-50";
      default:
        return "text-gray-600 bg-gray-50";
    }
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case "Giáo trình":
        return <Book className="w-5 h-5 text-blue-600" />;
      case "Slide":
        return <Presentation className="w-5 h-5 text-purple-600" />;
      case "Đề cương":
        return <ClipboardList className="w-5 h-5 text-green-600" />;
      case "Bài tập khóa học":
        return <ClipboardList className="w-5 h-5 text-orange-600" />;
      case "Google Meet":
        return (
          <svg
            className="w-5 h-5 text-pink-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path d="M17 8V7a5 5 0 00-10 0v1M5 8h14a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2v-8a2 2 0 012-2z" />
          </svg>
        );
      default:
        return <FileText className="w-5 h-5 text-gray-500" />;
    }
  };

  const handleDownload = (materialId, title) => {
    console.log("Downloading:", title);
    // Implement download logic here
  };

  const handlePreview = (materialId, title) => {
    console.log("Previewing:", title);
    // Implement preview logic here
  };

  // Sử dụng tất cả dữ liệu từ API (không lọc theo semester)
  const currentData = materials;

  // Sắp xếp dữ liệu
  const sortedData = [...currentData].sort((a, b) => {
    let valA = a[sortField];
    let valB = b[sortField];

    // Xử lý date fields
    if (sortField === "uploadedAt") {
      if (!valA || !valB) return 0;
      const [dA, mA, yA] = valA.split("/");
      const [dB, mB, yB] = valB.split("/");
      valA = new Date(`${yA}-${mA}-${dA}`);
      valB = new Date(`${yB}-${mB}-${dB}`);
      return sortOrder === "asc" ? valA - valB : valB - valA;
    }

    // Xử lý size field
    if (sortField === "size") {
      if (valA === "N/A") valA = 0;
      if (valB === "N/A") valB = 0;
      valA = parseFloat(valA.toString().replace(" MB", "")) || 0;
      valB = parseFloat(valB.toString().replace(" MB", "")) || 0;
      return sortOrder === "asc" ? valA - valB : valB - valA;
    }

    // Xử lý numeric fields
    if (sortField === "id" || sortField === "courseId") {
      valA = parseInt(valA) || 0;
      valB = parseInt(valB) || 0;
      return sortOrder === "asc" ? valA - valB : valB - valA;
    }

    // Xử lý text fields
    if (
      sortField === "title" ||
      sortField === "type" ||
      sortField === "status"
    ) {
      return sortOrder === "asc"
        ? valA.localeCompare(valB, "vi", { sensitivity: "base" })
        : valB.localeCompare(valA, "vi", { sensitivity: "base" });
    }

    return 0;
  });

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Đang tải tài liệu...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-500 text-xl mb-4">{error}</div>
          <button 
            onClick={() => window.location.reload()} 
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Thử lại
          </button>
        </div>
      </div>
    );
  }

  // UI
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex">
    
        {/* Main Content */}
        <main className="flex-1 p-6">
          <div className="max-w-6xl mx-auto">
            {/* Page Title */}
            <div className="mb-6">
              <h1 className="text-3xl font-bold text-red-600 text-center mb-2">
                {courseTitle.toUpperCase()}
              </h1>
            </div>



            {/* Materials Table */}
            <div className="bg-white rounded-lg shadow-sm border-2 border-blue-200">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b">
                    <tr>
                      <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">
                        <button
                          className="flex items-center gap-1"
                          onClick={() => {
                            if (sortField === "type") {
                              setSortOrder(
                                sortOrder === "asc" ? "desc" : "asc"
                              );
                            } else {
                              setSortField("type");
                              setSortOrder("asc");
                            }
                          }}
                        >
                          Loại tài liệu
                          <span>
                            {sortField === "type"
                              ? sortOrder === "asc"
                                ? "↑"
                                : "↓"
                              : "↓"}
                          </span>
                        </button>
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">
                        <button
                          className="flex items-center gap-1"
                          onClick={() => {
                            if (sortField === "title") {
                              setSortOrder(
                                sortOrder === "asc" ? "desc" : "asc"
                              );
                            } else {
                              setSortField("title");
                              setSortOrder("asc");
                            }
                          }}
                        >
                          Tên tài liệu
                          <span>
                            {sortField === "title"
                              ? sortOrder === "asc"
                                ? "↑"
                                : "↓"
                              : "↓"}
                          </span>
                        </button>
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">
                        <button
                          className="flex items-center gap-1"
                          onClick={() => {
                            if (sortField === "uploadedAt") {
                              setSortOrder(
                                sortOrder === "asc" ? "desc" : "asc"
                              );
                            } else {
                              setSortField("uploadedAt");
                              setSortOrder("asc");
                            }
                          }}
                        >
                          Ngày upload
                          <span>
                            {sortField === "uploadedAt"
                              ? sortOrder === "asc"
                                ? "↑"
                                : "↓"
                              : "↓"}
                          </span>
                        </button>
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">
                        <button
                          className="flex items-center gap-1"
                          onClick={() => {
                            if (sortField === "fileUrl") {
                              setSortOrder(
                                sortOrder === "asc" ? "desc" : "asc"
                              );
                            } else {
                              setSortField("fileUrl");
                              setSortOrder("asc");
                            }
                          }}
                        >
                          File URL
                          <span>
                            {sortField === "fileUrl"
                              ? sortOrder === "asc"
                                ? "↑"
                                : "↓"
                              : "↓"}
                          </span>
                        </button>
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">
                        <button
                          className="flex items-center gap-1"
                          onClick={() => {
                            if (sortField === "status") {
                              setSortOrder(
                                sortOrder === "asc" ? "desc" : "asc"
                              );
                            } else {
                              setSortField("status");
                              setSortOrder("asc");
                            }
                          }}
                        >
                          Trạng thái
                          <span>
                            {sortField === "status"
                              ? sortOrder === "asc"
                                ? "↑"
                                : "↓"
                              : "↓"}
                          </span>
                        </button>
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">
                        Thao tác
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {sortedData.map((item) => (
                      <tr key={item.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4">
                          <div className="flex items-center space-x-3">
                            {getTypeIcon(item.type)}
                            <span
                              className={`px-3 py-1 rounded-full text-xs font-medium ${getTypeColor(
                                item.type
                              )}`}
                            >
                              {item.type}
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center space-x-2">
                            <span className="text-sm font-medium text-gray-900">
                              {item.title}
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center space-x-2 text-sm text-gray-500">
                            <span>{item.uploadedAt || "Chưa upload"}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center space-x-2 text-sm text-gray-500 max-w-xs">
                            <span className="truncate" title={item.fileUrl}>
                              {item.fileUrl || "Chưa có file"}
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
                              item.status
                            )}`}
                          >
                            {item.status}
                          </span>
                        </td>
                        {/* <td className="px-6 py-4">
                          <div className="flex items-center space-x-2">
                            {item.status === "Có sẵn" && (
                              <>
                                <button
                                  onClick={() =>
                                    handlePreview(item.id, item.title)
                                  }
                                  className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                                  title="Xem trước"
                                >
                                  <Eye className="w-4 h-4" />
                                </button>
                                <button
                                  onClick={() =>
                                    handleDownload(item.id, item.title)
                                  }
                                  className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                                  title="Tải xuống"
                                >
                                  <Download className="w-4 h-4" />
                                </button>
                                <button
                                  onClick={() =>
                                    navigate(`/materials-edit/${item.id}`)
                                  }
                                  className="p-2 text-yellow-600 hover:bg-yellow-50 rounded-lg transition-colors"
                                  title="Chỉnh sửa"
                                >
                                  <Pencil className="w-4 h-4" />
                                </button>
                              </>
                            )}
                            {item.status === "Đang cập nhật" && (
                              <span className="text-xs text-gray-400 italic">
                                Chưa có sẵn
                              </span>
                            )}
                          </div>
                        </td> */}
                        <td className="px-6 py-4">
  <div className="flex items-center space-x-2">
    {item.fileUrl ? (
      <>
        <a
          href={item.fileUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
          title="Xem tài liệu"
        >
          <Eye className="w-4 h-4" />
        </a>
        <a
          href={item.fileUrl}
          download
          className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
          title="Tải xuống"
        >
          <Download className="w-4 h-4" />
        </a>
        <button
          onClick={() => navigate(`/lecturer/materials-edit/${item.id}`)}
          className="p-2 text-yellow-600 hover:bg-yellow-50 rounded-lg transition-colors"
          title="Chỉnh sửa"
        >
          <Pencil className="w-4 h-4" />
        </button>
      </>
    ) : (
      <span className="text-xs text-gray-400 italic">
        Chưa upload file
      </span>
    )}
  </div>
</td>

                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Footer with statistics */}
              <div className="flex justify-between items-center p-4 border-t bg-gray-50">
                <div className="text-sm text-gray-600">
                  Tổng cộng:{" "}
                  <span className="font-medium">{currentData.length}</span> tài
                  liệu
                  {" • "}
                  Có file:{" "}
                  <span className="font-medium text-green-600">
                    {
                      currentData.filter((item) => item.fileUrl)
                        .length
                    }
                  </span>
                  {" • "}
                  Chưa upload:{" "}
                  <span className="font-medium text-orange-600">
                    {
                      currentData.filter((item) => !item.fileUrl).length
                    }
                  </span>
                </div>
                <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors">
                  Tải tất cả
                </button>
                <button
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
                  onClick={() => navigate("/lecturer/documentupload")}
                >
                  Upload tài liệu
                </button>
              </div>
            </div>

            {/* Empty State */}
            {currentData.length === 0 && (
              <div className="bg-white rounded-lg shadow-sm border-2 border-blue-200 p-8">
                <div className="text-center text-gray-500">
                  <FileText className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                  <p className="text-lg font-medium mb-2">Chưa có tài liệu</p>
                  <p>Chưa có tài liệu nào trong khóa học này</p>
                </div>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default DocumentDetail;
