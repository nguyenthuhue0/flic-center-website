"use client";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FileText, Download, Eye, Calendar, Pencil } from "lucide-react";
import { Book, Presentation, ClipboardList } from "lucide-react";

const DocumentDetail = () => {
  const [activeSemester, setActiveSemester] = useState("01");
  const [sortField, setSortField] = useState("updateDate");
  const [sortOrder, setSortOrder] = useState("asc");
  const navigate = useNavigate();

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

  const currentData = semesterData[activeSemester] || [];

  // Sắp xếp dữ liệu
  const sortedData = [...currentData].sort((a, b) => {
    let valA = a[sortField];
    let valB = b[sortField];

    if (sortField === "updateDate") {
      const [dA, mA, yA] = valA.split("/");
      const [dB, mB, yB] = valB.split("/");
      valA = new Date(`${yA}-${mA}-${dA}`);
      valB = new Date(`${yB}-${mB}-${dB}`);
      return sortOrder === "asc" ? valA - valB : valB - valA;
    }

    if (sortField === "size") {
      valA = parseFloat(valA.replace(" MB", ""));
      valB = parseFloat(valB.replace(" MB", ""));
      return sortOrder === "asc" ? valA - valB : valB - valA;
    }

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
                LẬP TRÌNH C++ - TS. HUỲNH NGỌC THỌ
              </h1>
            </div>

            {/* Semester Tabs */}
            <div className="flex justify-center mb-8">
              <div className="bg-slate-800 rounded-full p-2 inline-flex">
                {["01", "02", "03", "04"].map((semester) => (
                  <button
                    key={semester}
                    onClick={() => setActiveSemester(semester)}
                    className={`px-6 py-3 rounded-full font-medium transition-colors ${
                      activeSemester === semester
                        ? "bg-orange-500 text-white"
                        : "text-white hover:bg-slate-700"
                    }`}
                  >
                    Khóa {semester}
                  </button>
                ))}
              </div>
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
                            if (sortField === "updateDate") {
                              setSortOrder(
                                sortOrder === "asc" ? "desc" : "asc"
                              );
                            } else {
                              setSortField("updateDate");
                              setSortOrder("asc");
                            }
                          }}
                        >
                          Ngày cập nhật
                          <span>
                            {sortField === "updateDate"
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
                            if (sortField === "size") {
                              setSortOrder(
                                sortOrder === "asc" ? "desc" : "asc"
                              );
                            } else {
                              setSortField("size");
                              setSortOrder("asc");
                            }
                          }}
                        >
                          Kích thước
                          <span>
                            {sortField === "size"
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
                            {/* <FileText className="w-4 h-4 text-gray-400" /> */}
                            <span className="text-sm font-medium text-gray-900">
                              {item.title}
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="px-4 flex items-center space-x-2 text-sm text-gray-500">
                            {/* <Calendar className="w-4 h-4" /> */}
                            <span>{item.updateDate}</span>
                          </div>
                        </td>
                        <td className="px-9 py-0 text-sm text-gray-500">
                          {item.size}
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
    {item.type === "Google Meet" ? (
      <>
        <a
          href={item.link}
          target="_blank"
          rel="noopener noreferrer"
          className="p-2 text-pink-600 hover:bg-pink-50 rounded-lg transition-colors"
          title="Tham gia Google Meet"
        >
          <Eye className="w-4 h-4" />
        </a>
        <button
          onClick={() => navigate(`/materials-edit/${item.id}`)}
          className="p-2 text-yellow-600 hover:bg-yellow-50 rounded-lg transition-colors"
          title="Chỉnh sửa Google Meet"
        >
          <Pencil className="w-4 h-4" />
        </button>
      </>
    ) : item.status === "Có sẵn" ? (
      <>
        <button
          onClick={() => handlePreview(item.id, item.title)}
          className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
          title="Xem trước"
        >
          <Eye className="w-4 h-4" />
        </button>
        <button
          onClick={() => handleDownload(item.id, item.title)}
          className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
          title="Tải xuống"
        >
          <Download className="w-4 h-4" />
        </button>
        <button
          onClick={() => navigate(`/materials-edit/${item.id}`)}
          className="p-2 text-yellow-600 hover:bg-yellow-50 rounded-lg transition-colors"
          title="Chỉnh sửa"
        >
          <Pencil className="w-4 h-4" />
        </button>
      </>
    ) : (
      item.status === "Đang cập nhật" && (
        <span className="text-xs text-gray-400 italic">
          Chưa có sẵn
        </span>
      )
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
                  Có sẵn:{" "}
                  <span className="font-medium text-green-600">
                    {
                      currentData.filter((item) => item.status === "Có sẵn")
                        .length
                    }
                  </span>
                  {" • "}
                  Đang cập nhật:{" "}
                  <span className="font-medium text-orange-600">
                    {
                      currentData.filter(
                        (item) => item.status === "Đang cập nhật"
                      ).length
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
                  <p>Không có tài liệu nào cho Semester {activeSemester}</p>
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
