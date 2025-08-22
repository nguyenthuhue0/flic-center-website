"use client";

import { useState, useEffect } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import {
  FileText,
  Download,
  Eye,
  Calendar,
  Pencil,
  Trash2,
} from "lucide-react";
import { Book, Presentation, ClipboardList } from "lucide-react";
import { getLessonMaterials } from "../../services/lecturer/DocumentApi";

const DocumentDetail = () => {
  const [sortField, setSortField] = useState("uploadedAt");
  const [sortOrder, setSortOrder] = useState("desc");
  const [materials, setMaterials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [deletingId, setDeletingId] = useState(null);
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
        console.log("DocumentDetail - API response:", response);

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
          uploadedAt: item.uploadedAt
            ? new Date(item.uploadedAt).toLocaleDateString("vi-VN")
            : null,
          // Helper fields for UI
          size: item.size || "N/A",
          status: item.fileUrl ? "Có sẵn" : "Chưa upload",
        }));

        setMaterials(transformedMaterials);
        setError(null);
      } catch (err) {
        console.error("Error fetching materials:", err);
        setError("Không thể tải dữ liệu tài liệu");
      } finally {
        setLoading(false);
      }
    };

    fetchMaterials();
  }, [courseId]);

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

  const handlePreview = (materialId, title, fileUrl) => {
    if (!fileUrl) {
      alert("Tài liệu chưa có file để xem trước.");
      return;
    }
    // Mở fileUrl trong tab mới
    window.open(fileUrl, "_blank");
  };

  const handleDeleteMaterial = async (materialId, title) => {
    if (
      window.confirm(`Bạn có chắc chắn muốn xóa tài liệu "${title}" không?`)
    ) {
      try {
        setDeletingId(materialId);
        // Assuming you have an API endpoint for deleting materials
        // For now, we'll just remove it from the state
        setMaterials(
          materials.filter((material) => material.id !== materialId)
        );
        setError(null);
        console.log(`Material with ID ${materialId} deleted.`);
      } catch (err) {
        console.error("Error deleting material:", err);
        setError("Không thể xóa tài liệu");
      } finally {
        setDeletingId(null);
      }
    }
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
      try {
        // Xử lý format dd/mm/yyyy
        if (valA.includes("/") && valB.includes("/")) {
          const [dA, mA, yA] = valA.split("/");
          const [dB, mB, yB] = valB.split("/");
          valA = new Date(
            `${yA}-${mA.padStart(2, "0")}-${dA.padStart(2, "0")}`
          );
          valB = new Date(
            `${yB}-${mB.padStart(2, "0")}-${dB.padStart(2, "0")}`
          );
        } else {
          // Xử lý format ISO string hoặc format khác
          valA = new Date(valA);
          valB = new Date(valB);
        }

        if (isNaN(valA.getTime()) || isNaN(valB.getTime())) return 0;

        return sortOrder === "asc" ? valA - valB : valB - valA;
      } catch (error) {
        console.error("Error sorting dates:", error);
        return 0;
      }
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
                              : ""}
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
                              : ""}
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
                              setSortOrder("desc");
                            }
                          }}
                        >
                          Ngày upload
                          <span>
                            {sortField === "uploadedAt"
                              ? sortOrder === "asc"
                                ? "↑"
                                : "↓"
                              : ""}
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
                              : ""}
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
                              : ""}
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

                        <td className="px-6 py-4">
                          <div className="flex items-center space-x-2">
                            {item.fileUrl ? (
                              <>
                                <button
                                  onClick={() =>
                                    handlePreview(
                                      item.id,
                                      item.title,
                                      item.fileUrl
                                    )
                                  }
                                  className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                                  title="Xem trước"
                                >
                                  <Eye className="w-4 h-4" />
                                </button>

                                <button
                                  onClick={() =>
                                    handleDeleteMaterial(item.id, item.title)
                                  }
                                  className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                  title="Xóa tài liệu"
                                  disabled={deletingId === item.id}
                                >
                                  <Trash2 className="w-4 h-4" />
                                </button>
                                <button
                                  onClick={() =>
                                    navigate(
                                      `/lecturer/documentedit/${item.id}`
                                    )
                                  }
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
                </div>

                <button
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
                  onClick={() =>
                    navigate(`/lecturer/documentupload/${courseId}`, {
                      state: { courseTitle },
                    })
                  }
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
