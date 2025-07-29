"use client";

import { useState, useRef } from "react";
import { ChevronUp, ChevronDown } from "lucide-react";

export default function DocumentUpload() {
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [category, setCategory] = useState("");
  const [subCategory, setSubCategory] = useState("");
  const [topic, setTopic] = useState("");
  const [contentsOpen, setContentsOpen] = useState(false);
  const fileInputRef = useRef(null);

  const contentOptions = [
    "Video",
    "Attach File",
    "Captions",
    "Description",
    "Lecture Notes",
  ];

  const handleSave = () => {
    console.log({
      title,
      subtitle,
      category,
      subCategory,
      topic,
    });
    alert("Đã lưu tài liệu!");
  };

  const handleCancel = () => {
    setTitle("");
    setSubtitle("");
    setCategory("");
    setSubCategory("");
    setTopic("");
  };

  const handleContentOptionClick = (option) => {
    if (fileInputRef.current) {
      fileInputRef.current.click(); // mở file picker
    }
  };

  const handleFileChange = (e) => {
    if (e.target.files.length > 0) {
      const file = e.target.files[0];
      alert(`Đã chọn file cho mục: ${file.name}`);
      // Có thể xử lý file upload ở đây
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <main className="flex-1 p-6 flex flex-col items-center justify-start">
        <div className="max-w-2xl w-full">
          <h1 className="text-2xl font-bold text-center mb-2 text-red-600">
            LẬP TRÌNH C++ - TS. HUỲNH NGỌC THỌ
          </h1>
          <h2 className="text-lg text-center text-gray-600 mb-6">
            Thông tin tài liệu
          </h2>

          <div className="bg-white border-2 border-blue-200 rounded-lg p-6 space-y-4 shadow-sm">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Tiêu đề
              </label>
              <input
                type="text"
                placeholder="Your course title"
                maxLength={80}
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full border rounded p-2"
              />
              <div className="text-right text-xs text-gray-400">
                {title.length}/80
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Subtitle
              </label>
              <input
                type="text"
                placeholder="Your course subtitle"
                maxLength={120}
                value={subtitle}
                onChange={(e) => setSubtitle(e.target.value)}
                className="w-full border rounded p-2"
              />
              <div className="text-right text-xs text-gray-400">
                {subtitle.length}/120
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Course Category
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full border rounded p-2"
                >
                  <option value="">Select...</option>
                  <option value="Giáo trình">Giáo trình</option>
                  <option value="Slide">Slide</option>
                  <option value="Đề cương">Đề cương</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Course Sub-category
                </label>
                <select
                  value={subCategory}
                  onChange={(e) => setSubCategory(e.target.value)}
                  className="w-full border rounded p-2"
                >
                  <option value="">Select...</option>
                  <option value="Lý thuyết">Lý thuyết</option>
                  <option value="Thực hành">Thực hành</option>
                  <option value="Bài tập">Bài tập</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Course Topic
              </label>
              <input
                type="text"
                placeholder="What is primarily taught in your course?"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                className="w-full border rounded p-2"
              />
            </div>

            {/* Contents Dropdown */}
            <div className="relative">
              <button
                onClick={() => setContentsOpen(!contentsOpen)}
                className="flex items-center justify-between px-4 py-2 bg-red-50 border border-red-200 rounded text-red-600 font-medium w-full"
              >
                Contents
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
                      onClick={() => handleContentOptionClick(option)}
                    >
                      {option}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Hidden file input */}
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              style={{ display: "none" }}
            />

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
