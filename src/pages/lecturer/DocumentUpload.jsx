"use client";

import { useState, useRef } from "react";
import { ChevronUp, ChevronDown, X } from "lucide-react";
import api from "../../utils/AxiosCustomize"; // axios instance

export default function DocumentUpload({ courseId }) {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [contentsOpen, setContentsOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploading, setUploading] = useState(false);

  const fileInputRef = useRef(null);
  const contentOptions = ["Video", "Attach File", "Captions", "Description", "Lecture Notes"];

  const handleFileChange = async (e) => {
    if (e.target.files.length > 0) {
      const file = e.target.files[0];
      setUploading(true);

      const formData = new FormData();
      formData.append("file", file);

      try {
        const res = await api.post("/upload", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });

        const fileUrl = res.data.fileUrl;
        setSelectedFile({ name: file.name, url: fileUrl });
        console.log("Upload thành công, URL:", fileUrl);
      } catch (err) {
        console.error("Upload thất bại:", err);
      } finally {
        setUploading(false);
      }
    }
  };

  const handleSave = async () => {
    if (!title || !selectedFile) {
      alert("Vui lòng điền tiêu đề và chọn file.");
      return;
    }

    try {
      const payload = {
        courseId,
        revisionId: null,
        title,
        type: category || "PDF",
        fileUrl: selectedFile.url,
      };

      const res = await api.post("/lesson/create-materials", payload);
      console.log("Tạo tài liệu thành công:", res.data);
      alert("Đã lưu tài liệu thành công!");
      handleCancel();
    } catch (error) {
      console.error("Lỗi khi tạo tài liệu:", error.response?.data || error.message);
      alert("Tạo tài liệu thất bại!");
    }
  };

  const handleCancel = () => {
    setTitle("");
    setCategory("");
    setSelectedFile(null);
  };

  const handleContentOptionClick = () => {
    if (fileInputRef.current) fileInputRef.current.click();
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <main className="flex-1 p-6 flex flex-col items-center justify-start">
        <div className="max-w-2xl w-full">
          <h1 className="text-2xl font-bold text-center mb-6 text-red-600">
            Upload Lesson Material
          </h1>

          <div className="bg-white border-2 border-blue-200 rounded-lg p-6 space-y-4 shadow-sm">
            {/* Tiêu đề */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Tiêu đề
              </label>
              <input
                type="text"
                placeholder="Tên tài liệu"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full border rounded p-2"
              />
            </div>

            {/* Category */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Loại tài liệu
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full border rounded p-2"
              >
                <option value="">Chọn...</option>
                <option value="PDF">PDF</option>
                <option value="Video">Video</option>
                <option value="Slide">Slide</option>
              </select>
            </div>

            {/* Contents Dropdown */}
            <div className="relative">
              <button
                onClick={() => setContentsOpen(!contentsOpen)}
                className="flex items-center justify-between px-4 py-2 bg-red-50 border border-red-200 rounded text-red-600 font-medium w-full"
              >
                Chọn nội dung
                {contentsOpen ? (
                  <ChevronUp className="w-4 h-4" />
                ) : (
                  <ChevronDown className="w-4 h-4" />
                )}
              </button>
              {contentsOpen && (
                <div className="absolute mt-1 bg-white border rounded shadow w-full z-10">
                  {contentOptions.map((option) => (
                    <div
                      key={option}
                      className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm"
                      onClick={handleContentOptionClick}
                    >
                      {option}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* File input */}
            <div>
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                style={{ display: "none" }}
              />
              {uploading && <p className="text-sm text-blue-500">Đang upload...</p>}

              {selectedFile && !uploading && (
                <div className="mt-2 space-y-2">
                  <div className="flex items-center justify-between bg-gray-100 p-2 rounded">
                    <p className="text-sm text-gray-700">{selectedFile.name}</p>
                    <button
                      onClick={() => setSelectedFile(null)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <X size={16} />
                    </button>
                  </div>

                  {/* Preview */}
                  {selectedFile.url.endsWith(".pdf") && (
                    <iframe
                      src={selectedFile.url}
                      className="w-full h-64 border rounded"
                      title="PDF Preview"
                    />
                  )}
                  {selectedFile.url.match(/\.(mp4|webm|ogg)$/) && (
                    <video
                      controls
                      className="w-full max-h-64 rounded border"
                      src={selectedFile.url}
                    />
                  )}
                  {selectedFile.url.match(/\.(jpg|jpeg|png|gif)$/) && (
                    <img
                      src={selectedFile.url}
                      alt="Preview"
                      className="max-h-64 rounded border"
                    />
                  )}
                  {!selectedFile.url.match(
                    /\.(pdf|mp4|webm|ogg|jpg|jpeg|png|gif)$/
                  ) && (
                    <a
                      href={selectedFile.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 underline text-sm"
                    >
                      Xem tài liệu
                    </a>
                  )}
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
                disabled={uploading}
              >
                Lưu
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
