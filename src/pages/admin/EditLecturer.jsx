// src/pages/admin/EditLecturer.jsx
import React, { useEffect, useState } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { FaArrowLeft, FaSave } from "react-icons/fa";
import {
  getLecturerDetail,
  updateLecturer,
  uploadLecturerAvatar,
} from "../../services/admin/users"; // hoặc từ lecturer.js

// Helpers: format cho input[type=date]/[type=datetime-local]
const toDateInput = (v) => {
  if (!v) return "";
  const d = new Date(v);
  if (isNaN(d.getTime())) return "";
  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  return `${yyyy}-${mm}-${dd}`;
};
const toDatetimeLocalInput = (v) => {
  if (!v) return "";
  const d = new Date(v);
  if (isNaN(d.getTime())) return "";
  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  const hh = String(d.getHours()).padStart(2, "0");
  const mi = String(d.getMinutes()).padStart(2, "0");
  return `${yyyy}-${mm}-${dd}T${hh}:${mi}`;
};

const mapStatusUIToApi = (s) =>
  String(s || "").toLowerCase().includes("đang") ? "active" : "inactive";

const normGender = (g) => {
  const v = String(g || "").trim().toLowerCase();
  if (v === "nữ") return "nu";
  if (v === "khác") return "khac";
  if (v === "nam") return "nam";
  return "";
};

export default function EditLecturer() {
  const navigate = useNavigate();
  const { id } = useParams();
  const location = useLocation();

  // nếu đi từ list thì có thể pass sẵn { state: { lecturer } }
  const stateLecturer = location.state?.lecturer || null;

  const [loading, setLoading] = useState(!stateLecturer);
  const [submitting, setSubmitting] = useState(false);
  const [err, setErr] = useState("");

  const [avatarFile, setAvatarFile] = useState(null);
  const [preview, setPreview] = useState(stateLecturer?.avatarUrl || null);

  const [formData, setFormData] = useState({
    // map theo entity user/lecturer của backend
    fullName: stateLecturer?.fullName || "",
    email: stateLecturer?.email || "",
    phone: stateLecturer?.phone || "",
    statusUI: stateLecturer?.status === "active" ? "Đang giảng dạy" : "Đã nghỉ",
    gender: stateLecturer?.gender || "",
    job: stateLecturer?.job || "", // trình độ chuyên môn hiển thị
    birthDate: toDateInput(stateLecturer?.birthDate) || "",
    address: stateLecturer?.address || "",
    subject: stateLecturer?.subject || "", // nếu backend có
    createdAt: toDatetimeLocalInput(stateLecturer?.createdAt) || toDatetimeLocalInput(new Date()),
    avatarUrl: stateLecturer?.avatarUrl || "",
  });

  // nếu không có state thì fetch
  useEffect(() => {
    if (stateLecturer || !id) return;
    (async () => {
      try {
        setLoading(true);
        setErr("");
        const data = await getLecturerDetail(id);
        setFormData({
          fullName: data?.fullName || "",
          email: data?.email || "",
          phone: data?.phone || "",
          statusUI: (data?.status || "") === "active" ? "Đang giảng dạy" : "Đã nghỉ",
          gender: data?.gender || "",
          job: data?.job || "",
          birthDate: toDateInput(data?.birthDate) || "",
          address: data?.address || "",
          subject: data?.subject || "",
          createdAt: toDatetimeLocalInput(data?.createdAt) || "",
          avatarUrl: data?.avatarUrl || "",
        });
        setPreview(data?.avatarUrl || null);
      } catch (e) {
        setErr(e?.response?.data?.message || e?.message || "Không tải được chi tiết giảng viên.");
      } finally {
        setLoading(false);
      }
    })();
  }, [id, stateLecturer]);

  const inputStyle =
    "w-full border-gray-300 focus:border-blue-400 focus:ring focus:ring-blue-100 text-[16px] p-3 rounded-xl shadow-sm transition-all duration-200 outline-none";

  const handleChange = (e) => {
    setErr("");
    const { name, value } = e.target;
    setFormData((p) => ({ ...p, [name]: value }));
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setAvatarFile(file);
    setPreview(URL.createObjectURL(file));
  };

  // chuẩn hoá payload update JSON
  const normalizePayload = (raw) => {
    const p = {
      fullName: raw.fullName?.trim(),
      email: raw.email?.trim(),
      phone: raw.phone?.trim(),
      role: "instructor",
      status: mapStatusUIToApi(raw.statusUI), // active | inactive
      gender: normGender(raw.gender) || undefined,
      birthDate: raw.birthDate || undefined, // yyyy-MM-dd
      job: raw.job?.trim() || undefined,     // trình độ chuyên môn
      address: raw.address?.trim() || undefined,
      subject: raw.subject?.trim() || undefined,
      // createdAt/ avatarUrl bỏ qua khi PUT
    };
    Object.keys(p).forEach((k) => (p[k] === "" || p[k] === undefined) && delete p[k]);
    return p;
  };

  const validate = (p) => {
    if (!p.fullName) return "Vui lòng nhập Họ tên.";
    if (!p.phone) return "Vui lòng nhập Số điện thoại.";
    if (p.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(p.email)) return "Email không hợp lệ.";
    return "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErr("");

    const payload = normalizePayload(formData);
    const v = validate(payload);
    if (v) return setErr(v);

    try {
      setSubmitting(true);
      await updateLecturer(id, payload);
      if (avatarFile) {
        // nếu backend có endpoint upload avatar; nếu không có thì bỏ đoạn này
        await uploadLecturerAvatar(id, avatarFile);
      }
      alert("Cập nhật giảng viên thành công!");
      navigate(-1); // hoặc navigate("/admin/lecturer")
    } catch (error) {
      const msg =
        error?.response?.data?.message || error?.message || "Lỗi khi cập nhật giảng viên.";
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
        <h2 className="text-3xl font-bold text-blue-600 mb-2">✏️ Sửa giảng viên</h2>
        <p className="mb-4 text-gray-600">Chỉnh sửa thông tin giảng viên và lưu lại.</p>

        {err && (
          <div className="mb-4 p-3 rounded border border-red-200 bg-red-50 text-red-700">
            {err}
          </div>
        )}

        <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-xl p-6 space-y-6">
          {/* Ảnh đại diện */}
          <div className="flex items-center space-x-6 mb-6">
            <div>
              <label htmlFor="avatarUpload" className="block font-medium mb-1 text-gray-700">
                🖼️ Ảnh đại diện
              </label>
              <input id="avatarUpload" type="file" accept="image/*" onChange={handleAvatarChange} className="text-sm" />
            </div>
            {preview && (
              <img
                src={preview}
                alt="Preview"
                className="w-24 h-24 object-cover rounded-full ring-4 ring-blue-300 shadow-md hover:scale-105 transition-transform duration-200"
              />
            )}
          </div>

          {/* Form */}
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block font-medium mb-1">👤 Họ tên</label>
              <input
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                className={inputStyle}
                required
              />
            </div>
            <div>
              <label className="block font-medium mb-1">📞 Số điện thoại</label>
              <input
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className={inputStyle}
                required
              />
            </div>
            <div>
              <label className="block font-medium mb-1">📧 Email</label>
              <input
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={inputStyle}
              />
            </div>

            <div>
              <label className="block font-medium mb-1">📍 Trạng thái</label>
              <select
                name="statusUI"
                value={formData.statusUI}
                onChange={handleChange}
                className={inputStyle}
              >
                <option>Đang giảng dạy</option>
                <option>Đã nghỉ</option>
              </select>
            </div>

            <div>
              <label className="block font-medium mb-1">🚻 Giới tính</label>
              <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                className={inputStyle}
              >
                <option value="">-- chọn --</option>
                <option value="nam">Nam</option>
                <option value="nữ">Nữ</option>
                <option value="khác">Khác</option>
              </select>
            </div>

            <div>
              <label className="block font-medium mb-1">🎓 Trình độ chuyên môn</label>
              <input
                name="job"
                value={formData.job}
                onChange={handleChange}
                placeholder="VD: Thạc sĩ CNTT"
                className={inputStyle}
              />
            </div>

            <div>
              <label className="block font-medium mb-1">🎂 Ngày sinh</label>
              <input
                type="date"
                name="birthDate"
                value={formData.birthDate}
                onChange={handleChange}
                className={inputStyle}
              />
            </div>

            <div className="col-span-2">
              <label className="block font-medium mb-1">🏠 Địa chỉ</label>
              <input
                name="address"
                value={formData.address}
                onChange={handleChange}
                className={inputStyle}
              />
            </div>

            <div className="col-span-3">
              <label className="block font-medium mb-1">📘 Môn giảng dạy</label>
              <input
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                className={inputStyle}
              />
            </div>

            <div>
              <label className="block font-medium mb-1">🕒 Tạo lúc</label>
              <input
                type="datetime-local"
                name="createdAt"
                value={formData.createdAt}
                onChange={() => {}}
                className={inputStyle}
                disabled
              />
            </div>

            <div className="col-span-3">
              <label className="block font-medium mb-1">🔗 Avatar URL (readonly)</label>
              <input
                name="avatarUrl"
                value={formData.avatarUrl || ""}
                onChange={() => {}}
                className={inputStyle}
                disabled
              />
            </div>
          </div>

          {/* Buttons */}
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
              } bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-xl shadow-md transition-all`}
            >
              <FaSave className="inline mr-1" /> {submitting ? "Đang lưu..." : "Lưu thay đổi"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
