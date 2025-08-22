import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft, FaSave } from "react-icons/fa";
import { createCourse } from "../../services/admin/courses";
import confetti from "canvas-confetti";
import { toast } from "react-toastify";

export default function AddCourse() {
  const navigate = useNavigate();
  const [submitting, setSubmitting] = useState(false);
  const [err, setErr] = useState("");

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    rating: "",
    price: "",
    duration: "",
    status: "active",
    image: "",
    startMonth: "",
    type: ""
  });

  const inputStyle =
    "w-full border-gray-300 focus:border-indigo-400 focus:ring focus:ring-indigo-100 text-[16px] p-3 rounded-xl shadow-sm transition-all duration-200 outline-none";

const handleChange = (e) => {
  setErr("");
  const { name, value, files, type } = e.target;

  setFormData((prev) => ({
    ...prev,
    [name]: type === "file" ? files[0] : value, 
  }));
};


  const normalizePayload = (raw) => ({
    title: raw.title?.trim(),
    description: raw.description?.trim(),
    rating: raw.rating === "" ? null : Number(raw.rating),
    price: raw.price === "" ? null : Number(raw.price),
    duration: raw.duration === "" ? null : Number(raw.duration),
    status: raw.status || "active",
       image: raw.image,
    startMonth: raw.startMonth?.trim() || null,
    type: raw.type?.trim() || null
  });

  const validate = (p) => {
    if (!p.title) return "Vui lòng nhập Tên khóa học.";
    if (!p.description) return "Vui lòng nhập Mô tả.";
    if (p.rating !== null && (isNaN(p.rating) || p.rating < 0 || p.rating > 5))
      return "Rating phải là số trong khoảng 0 – 5.";
    if (p.price !== null && (isNaN(p.price) || p.price < 0))
      return "Học phí phải là số không âm.";
    if (p.duration !== null && (isNaN(p.duration) || p.duration < 0))
      return "Thời lượng phải là số không âm.";
    return "";
  };

 const handleSubmit = async (e) => {
  e.preventDefault();
  setErr("");

  const payload = normalizePayload(formData);
  const v = validate(payload);
  if (v) {
    setErr(v);
    return;
  }

  try {
    setSubmitting(true);
    
    let res = await createCourse(payload);
    if (res) {
      toast.success("Tạo khóa học thành công!")
    }
    navigate(-1);
  } catch (error) {
    console.error("Create course failed:", error);
    const msg =
      error?.response?.data?.message ||
      error?.message ||
      "Lỗi khi thêm khóa học.";
    setErr(msg);
  } finally {
    setSubmitting(false);
  }
};

  return (
    <div className="p-6 flex justify-center ml-[250px]">
      <div className="w-full max-w-6xl">
        <h2 className="text-3xl font-bold text-indigo-600 mb-2 flex items-center">
          📚 Thêm khóa học
        </h2>
        <p className="mb-4 text-gray-600">Nhập thông tin để tạo khóa học mới.</p>

        {err && (
          <div className="mb-4 p-3 rounded border border-red-200 bg-red-50 text-red-700">
            {err}
          </div>
        )}

        <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-xl p-6 space-y-6">
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block font-medium mb-1">📘 Tên khóa học</label>
              <input
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="VD: TOEIC 450+"
                className={inputStyle}
                required
              />
            </div>
            <div>
              <label className="block font-medium mb-1">⭐ Đánh giá</label>
              <input
                name="rating"
                type="number"
                step="0.1"
                value={formData.rating}
                onChange={handleChange}
                placeholder="VD: 4.5"
                className={inputStyle}
              />
            </div>
            <div>
              <label className="block font-medium mb-1">💸 Học phí</label>
              <input
                name="price"
                type="number"
                value={formData.price}
                onChange={handleChange}
                placeholder="VD: 2500000"
                className={inputStyle}
              />
            </div>
            <div>
              <label className="block font-medium mb-1">⏱️ Thời lượng (giờ)</label>
              <input
                name="duration"
                type="number"
                value={formData.duration}
                onChange={handleChange}
                placeholder="VD: 60"
                className={inputStyle}
              />
            </div>
            <div>
              <label className="block font-medium mb-1">📅 Tháng khai giảng</label>
              <input
                name="startMonth"
                value={formData.startMonth}
                onChange={handleChange}
                placeholder='VD: "Tháng 1" hoặc "2025-09"'
                className={inputStyle}
              />
            </div>
            <div>
              <label className="block font-medium mb-1">📂 Loại khóa học</label>
              <select
                name="type"
                value={formData.type}
                onChange={handleChange}
                className={inputStyle}
              >
                <option value="short_course">short_course</option>
                <option value="cert_exam">cert_exam</option>
              </select>
            </div>
            <div>
              <label className="block font-medium mb-1">📍 Trạng thái</label>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className={inputStyle}
              >
                <option value="active">active</option>
                <option value="open">open</option>
                <option value="closed">closed</option>
              </select>
            </div>
            <div className="col-span-3">
              <label className="block font-medium mb-1">🖼️ Ảnh (URL)</label>
              <input
                type="file"
                name="image"
                accept="image/*"
                onChange={handleChange}
                placeholder="VD: courses/toeic_450.jpg"
                className={inputStyle}
              />
            </div>
            <div className="col-span-3">
              <label className="block font-medium mb-1">📝 Mô tả</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Mô tả chi tiết về khóa học..."
                className={inputStyle}
              />
            </div>
          </div>

          <div className="flex justify-between mt-6">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="btn-outline"
              disabled={submitting}
            >
              <FaArrowLeft className="inline mr-1" /> Quay lại
            </button>

            <button
              type="submit"
              id="btnsavecourse"
              disabled={submitting}
              className={`${
                submitting ? "opacity-70 cursor-not-allowed" : ""
              } bg-indigo-500 hover:bg-indigo-600 text-white font-semibold py-2 px-4 rounded-xl shadow-md transition-all`}
            >
              <FaSave className="inline mr-1" /> {submitting ? "Đang lưu..." : "Lưu khóa học"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
