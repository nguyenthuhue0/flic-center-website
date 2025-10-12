"use client";

import { useState, useRef, useEffect } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { X } from "lucide-react";
import { uploadMaterial } from "../../services/Lecturer/DocumentApi";

export default function DocumentUpload({ courseId: propCourseId }) {
  const params = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  
  // Lấy courseId từ URL params hoặc props
  const courseId = params.courseId || propCourseId;
  const courseTitle = location.state?.courseTitle || "Khóa học";
  
  console.log("DocumentUpload - Debug courseId:", {
    params: params,
    propCourseId: propCourseId,
    finalCourseId: courseId,
    courseTitle: courseTitle,
    location: location
  });
  
  const [title, setTitle] = useState("");
  const [type, setType] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  const fileInputRef = useRef(null);

  // Kiểm tra nếu không có courseId
  useEffect(() => {
    console.log("DocumentUpload - useEffect triggered with courseId:", courseId);
    
    if (!courseId) {
      console.error("DocumentUpload - No courseId found!");
      setError("Không tìm thấy thông tin khóa học");
      return;
    }
    
    // Kiểm tra token
    const token = sessionStorage.getItem("access_token");
    console.log("DocumentUpload - Token check:", {
      hasToken: !!token,
      tokenLength: token?.length,
      tokenStart: token?.substring(0, 20) + "..."
    });
    
    if (!token) {
      setError("Bạn chưa đăng nhập hoặc token đã hết hạn. Vui lòng đăng nhập lại.");
      return;
    }

    // Kiểm tra JWT format và thông tin
    try {
      const parts = token.split('.');
      if (parts.length === 3) {
        const payload = JSON.parse(atob(parts[1]));
        const now = Math.floor(Date.now() / 1000);
        
        console.log("DocumentUpload - JWT info:", {
          role: payload.role,
          userId: payload.sub || payload.userId,
          issuedAt: new Date(payload.iat * 1000),
          expiresAt: new Date(payload.exp * 1000),
          isExpired: payload.exp < now,
          timeLeft: Math.floor((payload.exp - now) / 60) + " minutes"
        });

        if (payload.exp < now) {
          setError("Token đã hết hạn. Vui lòng đăng nhập lại.");
          return;
        }

        if (payload.role !== "INSTRUCTOR" && payload.role !== "ADMIN") {
          setError("Bạn không có quyền upload tài liệu. Chỉ giảng viên mới có quyền này.");
          return;
        }
      }
    } catch (e) {
      console.error("DocumentUpload - Token decode error:", e);
      setError("Token không hợp lệ. Vui lòng đăng nhập lại.");
    }
  }, [courseId]);

  const handleFileChange = (e) => {
    if (e.target.files.length > 0) {
      const file = e.target.files[0];
      processFile(file);
    }
  };

  const processFile = (file) => {
    // Kiểm tra kích thước file (giới hạn 10MB)
    if (file.size > 10 * 1024 * 1024) {
      setError("File quá lớn. Vui lòng chọn file nhỏ hơn 10MB.");
      return;
    }
    
    // Kiểm tra loại file
    const allowedTypes = [
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'application/vnd.ms-excel',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      'text/plain',
      'image/jpeg',
      'image/png',
      'image/gif',
      'video/mp4',
      'video/webm',
      'video/ogg'
    ];
    
    if (!allowedTypes.includes(file.type)) {
      setError("Loại file không được hỗ trợ. Vui lòng chọn file PDF, Word, Excel, text, hình ảnh hoặc video.");
      return;
    }
    
    setSelectedFile(file);
    setError("");
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.currentTarget.classList.add('border-blue-400', 'bg-blue-50');
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.currentTarget.classList.remove('border-blue-400', 'bg-blue-50');
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.currentTarget.classList.remove('border-blue-400', 'bg-blue-50');
    
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      processFile(files[0]);
    }
  };

  const handleSave = async () => {
    if (!title || !selectedFile || !type) {
      setError("Vui lòng điền đầy đủ tiêu đề, loại tài liệu và chọn file.");
      return;
    }

    try {
      setUploading(true);
      setError("");

      // Tạo FormData theo đúng format backend yêu cầu
      const formData = new FormData();
      
      // 1. data - JSON string chứa thông tin tài liệu
      const dataObj = {
        courseId: parseInt(courseId),
        revisionId: null,
        title: title.trim(),
        type: type
      };
      formData.append("data", JSON.stringify(dataObj));
      
      // 2. file - MultipartFile
      formData.append("file", selectedFile);

      console.log("DocumentUpload - Starting upload:", {
        courseId,
        title: title.trim(),
        type,
        fileName: selectedFile.name,
        fileSize: selectedFile.size,
        fileType: selectedFile.type,
        formData: {
          data: JSON.stringify(dataObj),
          file: selectedFile.name
        }
      });

      const response = await uploadMaterial(formData);
      console.log("DocumentUpload - Upload success:", response);
      
      alert("Upload tài liệu thành công!");
      
      // Reset form
      setTitle("");
      setType("");
      setSelectedFile(null);
      
      // Reset file input
      if (fileInputRef.current) fileInputRef.current.value = "";
      
      // Quay lại trang danh sách tài liệu
      setTimeout(() => {
        navigate(`/lecturer/documentdetail/${courseId}`);
      }, 1000);
      
    } catch (err) {
      console.error("DocumentUpload - Upload failed:", err);
      
      if (err.response?.status === 401) {
        setError("Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại.");
      } else if (err.response?.status === 403) {
        setError("Bạn không có quyền upload tài liệu cho khóa học này.");
      } else if (err.response?.status === 413) {
        setError("File quá lớn. Vui lòng chọn file nhỏ hơn.");
      } else if (err.response?.status === 400) {
        setError("Dữ liệu không hợp lệ. Vui lòng kiểm tra lại thông tin.");
      } else if (err.response?.status === 500) {
        setError("Lỗi server. Vui lòng thử lại sau.");
      } else {
        setError(`Upload thất bại: ${err.message || "Vui lòng thử lại sau."}`);
      }
    } finally {
      setUploading(false);
    }
  };

  const handleCancel = () => {
    navigate(`/lecturer/documentdetail/${courseId}`);
  };

  if (!courseId) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-md text-center">
          <div className="text-red-500 text-6xl mb-4">⚠️</div>
          <h2 className="text-xl font-semibold text-gray-800 mb-2">Lỗi</h2>
          <p className="text-gray-600 mb-4">Không tìm thấy thông tin khóa học</p>
          <button
            onClick={() => navigate("/lecturer")}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          >
            Quay lại trang chủ
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <main className="flex-1 p-6 flex flex-col items-center justify-start">
        <div className="max-w-2xl w-full">
          <h1 className="text-2xl font-bold text-center mb-6 text-red-600">
           {courseTitle.toUpperCase()}
          </h1>

          {/* Debug info */}
          {/* <div className="mb-4 p-3 bg-gray-50 rounded-lg text-xs text-gray-600">
            <p><strong>Debug Info:</strong></p>
            <p>Course ID: {courseId}</p>
            <p>Course Title: {courseTitle}</p>
            <p>Token: {sessionStorage.getItem("access_token") ? "✅ Có" : "❌ Không có"}</p>
            {(() => {
              try {
                const token = sessionStorage.getItem("access_token");
                if (token) {
                  const parts = token.split('.');
                  if (parts.length === 3) {
                    const payload = JSON.parse(atob(parts[1]));
                    const now = Math.floor(Date.now() / 1000);
                    return (
                      <>
                        <p>Role: {payload.role}</p>
                        <p>User ID: {payload.sub || payload.userId}</p>
                        <p>Expires: {new Date(payload.exp * 1000).toLocaleString('vi-VN')}</p>
                        <p>Status: {payload.exp < now ? "❌ Hết hạn" : "✅ Còn hiệu lực"}</p>
                      </>
                    );
                  }
                }
                return <p>Token format: Không phải JWT</p>;
              } catch (e) {
                return <p>Token decode error: {e.message}</p>;
              }
            })()}
          </div> */}

          <div className="bg-white border-2 border-blue-200 rounded-lg p-6 space-y-4 shadow-sm">
            {error && (
              <div className="p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg">
                {error}
              </div>
            )}

            {/* Tiêu đề */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Tiêu đề <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                placeholder="Tên tài liệu"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full border rounded p-2"
                required
              />
            </div>

            {/* Type */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Loại tài liệu <span className="text-red-500">*</span>
              </label>
              <select
                value={type}
                onChange={(e) => setType(e.target.value)}
                className="w-full border rounded p-2"
                required
              >
                <option value="Đề cương">Đề cương chi tiết</option>
                <option value="Slide">Slide bài giảng</option>
                <option value="Giáo trình">Tài liệu tham khảo</option>
                <option value="">Tài liệu khác</option>
              </select>
            </div>

            {/* File input */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Chọn file <span className="text-red-500">*</span>
              </label>
              
              {/* Khung thả tài liệu */}
              <div
                className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-blue-400 transition-colors bg-gray-50"
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
              >
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  className="hidden"
                  accept=".pdf,.doc,.docx,.xls,.xlsx,.txt,.jpg,.jpeg,.png,.gif,.mp4,.webm,.ogg"
                  required
                />
                
                {!selectedFile ? (
                  <div onClick={() => fileInputRef.current?.click()} className="cursor-pointer">
                    <div className="text-6xl text-gray-400 mb-4">📁</div>
                    <p className="text-lg font-medium text-gray-700 mb-2">
                      Chọn file để upload
                    </p>
                    <p className="text-sm text-gray-500 mb-4">
                      Hoặc kéo thả file vào đây
                    </p>
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                    >
                      Chọn file
                    </button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="flex items-center justify-center space-x-2">
                      <div className="text-4xl text-green-500">✅</div>
                      <div>
                        <p className="text-lg font-medium text-gray-700">
                          File đã chọn
                        </p>
                        <p className="text-sm text-gray-500">
                          {selectedFile.name}
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-center space-x-4">
                      <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors text-sm"
                      >
                        Chọn file khác
                      </button>
                      <button
                        type="button"
                        onClick={() => setSelectedFile(null)}
                        className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors text-sm"
                      >
                        Xóa file
                      </button>
                    </div>
                    
                    <div className="bg-white p-3 rounded-lg border">
                      <p className="text-xs text-gray-600">
                        <span className="font-medium">Kích thước:</span> {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                      </p>
                      <p className="text-xs text-gray-600">
                        <span className="font-medium">Loại file:</span> {selectedFile.type || "Không xác định"}
                      </p>
                    </div>
                  </div>
                )}
              </div>
              
              <p className="text-xs text-gray-500 mt-2 text-center">
                Hỗ trợ: PDF, Word, Excel, Text, JPG, PNG, GIF, MP4, WebM, OGG (tối đa 10MB)
              </p>

              {uploading && (
                <div className="mt-3 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                  <p className="text-sm text-blue-700 text-center">
                    ⏳ Đang upload file...
                  </p>
                </div>
              )}
            </div>

            {/* Actions */}
            <div className="flex justify-between items-center mt-4">
              <button
                onClick={handleCancel}
                className="px-4 py-2 border border-gray-300 rounded text-gray-600 hover:bg-gray-50"
              >
                Hủy
              </button>
              <button
                onClick={handleSave}
                className="px-6 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
                disabled={uploading || !title || !selectedFile || !type}
              >
                {uploading ? "Đang upload..." : "Lưu"}
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
