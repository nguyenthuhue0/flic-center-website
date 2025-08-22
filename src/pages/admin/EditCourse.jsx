import React, { useEffect, useState } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { FaArrowLeft, FaSave } from "react-icons/fa";
import { getCourseDetailAdmin, updateCourse } from "../../services/admin/courses";
import { toast } from "react-toastify";

export default function EditCourse() {
  const navigate = useNavigate();
  const { id } = useParams();
  const location = useLocation();
  // optional: nếu navigate từ list có kèm state.course thì dùng luôn để đỡ gọi API
  const stateCourse = location.state?.course || null;

  const [loading, setLoading] = useState(!stateCourse);
  const [submitting, setSubmitting] = useState(false);
  const [err, setErr] = useState("");

  const [formData, setFormData] = useState({
    title: stateCourse?.title || "",
    description: stateCourse?.description || "",
    rating: stateCourse?.rating ?? "",
    price: stateCourse?.price ?? "",
    duration: stateCourse?.duration ?? "",
    status: stateCourse?.status || "active",
    image: stateCourse?.image || "",
    startMonth: stateCourse?.startMonth || "",
    type: stateCourse?.type || ""
  });

  useEffect(() => {
    if (stateCourse || !id) return; // đã có data trong state thì khỏi fetch
    (async () => {
      try {
        setLoading(true);
        setErr("");
        const data = await getCourseDetailAdmin(id);
        setFormData({
          title: data?.title || "",
          description: data?.description || "",
          rating: data?.rating ?? "",
          price: data?.price ?? "",
          duration: data?.duration ?? "",
          status: data?.status || "active",
          image: data?.image || "",
          startMonth: data?.startMonth || "",
          type: data?.type || ""
        });
      } catch (e) {
        const msg = e?.response?.data?.message || e?.message || "Không tải được chi tiết khoá học.";
        setErr(msg);
      } finally {
        setLoading(false);
      }
    })();
  }, [id, stateCourse]);

  const inputStyle =
    "w-full border-gray-300 focus:border-indigo-400 focus:ring focus:ring-indigo-100 text-[16px] p-3 rounded-xl shadow-sm transition-all duration-200 outline-none";

  const handleChange = (e) => {
    setErr("");
    const { name, value } = e.target;
    setFormData((p) => ({ ...p, [name]: value }));
  };

  const normalizePayload = (raw) => ({
    title: raw.title?.trim(),
    description: raw.description?.trim(),
    rating: raw.rating === "" ? null : Number(raw.rating),
    price: raw.price === "" ? null : Number(raw.price),
    duration: raw.duration === "" ? null : Number(raw.duration),
    status: raw.status || "active",
    image: raw.image?.trim() || null,
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
      let res = await updateCourse(id, payload);
      if (res){
        toast.success("Cập nhật khóa học thành công!")
      }
      navigate(-1); // hoặc navigate("/admin/courses")
    } catch (error) {
      console.error("Update course failed:", error);
      const msg =
        error?.response?.data?.message ||
        error?.message ||
        "Lỗi khi cập nhật khóa học.";
      setErr(msg);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="p-6 flex justify-center ml-[250px]">
        <div className="w-full max-w-6xl bg-white shadow-md rounded-xl p-6 animate-pulse">
          <div className="h-8 w-1/3 bg-gray-200 rounded mb-6" />
          <div className="grid grid-cols-3 gap-4">
            {[...Array(9)].map((_, i) => (
              <div key={i} className="h-12 bg-gray-100 rounded" />
            ))}
            <div className="col-span-3 h-24 bg-gray-100 rounded" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 flex justify-center ml-[250px]">
      <div className="w-full max-w-6xl">
        <h2 className="text-3xl font-bold text-indigo-600 mb-2">✏️ Sửa khóa học</h2>
        <p className="mb-4 text-gray-600">Chỉnh sửa thông tin khoá học và lưu lại.</p>

        {err && (
          <div className="mb-4 p-3 rounded border border-red-200 bg-red-50 text-red-700">
            {err}
          </div>
        )}

        <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-xl p-6 space-y-6">
          <div className="grid grid-cols-3 gap-4">
            {/* Tên khóa học */}
            <div>
              <label className="block font-medium mb-1">📘 Tên khóa học</label>
              <input
                name="title"
                value={formData.title}
                onChange={handleChange}
                className={inputStyle}
                required
              />
            </div>

            {/* Rating */}
            <div>
              <label className="block font-medium mb-1">⭐ Đánh giá</label>
              <input
                name="rating"
                type="number"
                step="0.1"
                value={formData.rating}
                onChange={handleChange}
                className={inputStyle}
              />
            </div>

            {/* Học phí */}
            <div>
              <label className="block font-medium mb-1">💸 Học phí</label>
              <input
                name="price"
                type="number"
                value={formData.price}
                onChange={handleChange}
                className={inputStyle}
              />
            </div>

            {/* Thời lượng */}
            <div>
              <label className="block font-medium mb-1">⏱️ Thời lượng (giờ)</label>
              <input
                name="duration"
                type="number"
                value={formData.duration}
                onChange={handleChange}
                className={inputStyle}
              />
            </div>

            {/* Tháng khai giảng */}
            <div>
              <label className="block font-medium mb-1">📅 Tháng khai giảng</label>
              <input
                name="startMonth"
                value={formData.startMonth}
                onChange={handleChange}
                className={inputStyle}
              />
            </div>

            {/* Loại khóa học */}
            <div>
              <label className="block font-medium mb-1">📂 Loại khóa học</label>
              <select
                name="type"
                value={formData.type}
                onChange={handleChange}
                className={inputStyle}
              >
                <option value="">-- chọn --</option>
                <option value="short_course">short_course</option>
                <option value="cert_exam">cert_exam</option>
              </select>
            </div>

            {/* Trạng thái */}
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

            {/* Ảnh URL */}
            <div className="col-span-3">
              <label className="block font-medium mb-1">🖼️ Ảnh (URL)</label>
              <img src={formData.image} alt="ảnh khóa học" className="h-100" />
            </div>

            {/* Mô tả */}
            <div className="col-span-3">
              <label className="block font-medium mb-1">📝 Mô tả</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                className={inputStyle}
              />
            </div>
          </div>

          {/* Nút thao tác */}
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
              disabled={submitting}
              className={`${
                submitting ? "opacity-70 cursor-not-allowed" : ""
              } bg-indigo-500 hover:bg-indigo-600 text-white font-semibold py-2 px-4 rounded-xl shadow-md transition-all`}
            >
              <FaSave className="inline mr-1" /> {submitting ? "Đang lưu..." : "Lưu thay đổi"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
