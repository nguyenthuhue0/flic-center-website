import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft, FaSave } from "react-icons/fa";

export default function AddCourse() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    code: "",
    description: "",
    duration: "",
    level: "",
    teacher: "",
    startDate: "",
    endDate: "",
    price: "",
    status: "Đang mở",
    method: "",
    note: ""
  });

  const [thumbnail, setThumbnail] = useState(null);
  const [preview, setPreview] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleThumbnailChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setThumbnail(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Course submitted:", formData);
    console.log("Thumbnail file:", thumbnail);
  };

  const inputStyle =
    "w-full border-gray-300 focus:border-indigo-400 focus:ring focus:ring-indigo-100 text-[16px] p-3 rounded-xl shadow-sm transition-all duration-200 outline-none";

  return (
    <div className="p-6 flex justify-center ml-[250px]">
      <div className="w-full max-w-6xl">
        <h2 className="text-3xl font-bold text-indigo-600 mb-2 flex items-center">
          📚 Thêm khóa học
        </h2>

        <p className="mb-4 text-gray-600">Nhập thông tin để tạo khóa học mới.</p>

        <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-xl p-6 space-y-6">
          {/* Thumbnail */}
          <div className="flex items-center space-x-6 mb-6">
            <div>
              <label htmlFor="thumbnailUpload" className="block font-medium mb-1 text-gray-700">
                🖼️ Ảnh đại diện khóa học
              </label>
              <input id="thumbnailUpload" type="file" accept="image/*" onChange={handleThumbnailChange} className="text-sm" />
            </div>
            {preview && (
              <img
                src={preview}
                alt="Preview"
                className="w-24 h-24 object-cover rounded-lg ring-4 ring-indigo-300 shadow-md hover:scale-105 transition-transform duration-200"
              />
            )}
          </div>

          {/* Thông tin khóa học */}
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block font-medium mb-1">📘 Tên khóa học</label>
              <input name="title" onChange={handleChange} value={formData.title} placeholder="VD: Lập trình Python cơ bản" className={inputStyle} required />
            </div>
            <div>
              <label className="block font-medium mb-1">🆔 Mã khóa học</label>
              <input name="code" onChange={handleChange} value={formData.code} placeholder="VD: PY101" className={inputStyle} required />
            </div>
            <div>
              <label className="block font-medium mb-1">⏱️ Thời lượng (giờ)</label>
              <input name="duration" onChange={handleChange} value={formData.duration} placeholder="VD: 40" type="number" className={inputStyle} />
            </div>

            <div>
              <label className="block font-medium mb-1">🎓 Trình độ</label>
              <input name="level" onChange={handleChange} value={formData.level} placeholder="VD: Cơ bản, Nâng cao..." className={inputStyle} />
            </div>
            <div>
              <label className="block font-medium mb-1">👨‍🏫 Giảng viên</label>
              <input name="teacher" onChange={handleChange} value={formData.teacher} placeholder="VD: Thầy Nam, Cô Ngọc..." className={inputStyle} />
            </div>
            <div>
              <label className="block font-medium mb-1">💸 Học phí</label>
              <input name="price" onChange={handleChange} value={formData.price} placeholder="VD: 1.500.000" type="number" className={inputStyle} />
            </div>

            <div>
              <label className="block font-medium mb-1">📆 Ngày bắt đầu</label>
              <input name="startDate" type="date" onChange={handleChange} value={formData.startDate} className={inputStyle} />
            </div>
            <div>
              <label className="block font-medium mb-1">📅 Ngày kết thúc</label>
              <input name="endDate" type="date" onChange={handleChange} value={formData.endDate} className={inputStyle} />
            </div>
            <div>
              <label className="block font-medium mb-1">🧭 Phương thức học</label>
              <input name="method" onChange={handleChange} value={formData.method} placeholder="Online, Offline, Hybrid..." className={inputStyle} />
            </div>

            <div>
              <label className="block font-medium mb-1">📍 Trạng thái</label>
              <select name="status" value={formData.status} onChange={handleChange} className={inputStyle}>
                <option>Đang mở</option>
                <option>Đã kết thúc</option>
                <option>Bảo lưu</option>
              </select>
            </div>

            <div className="col-span-3">
              <label className="block font-medium mb-1">📝 Mô tả / Ghi chú</label>
              <textarea name="note" onChange={handleChange} value={formData.note} placeholder="Mô tả chi tiết về khóa học..." className={inputStyle}></textarea>
            </div>
          </div>

          {/* Nút thao tác */}
          <div className="flex justify-between mt-6">
            <button type="button" onClick={() => navigate(-1)} className="btn-outline">
              <FaArrowLeft className="inline mr-1" /> Quay lại
            </button>
            <button
              type="submit"
              className="bg-indigo-500 hover:bg-indigo-600 text-white font-semibold py-2 px-4 rounded-xl shadow-md transition-all"
            >
              <FaSave className="inline mr-1" /> Lưu khóa học
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
