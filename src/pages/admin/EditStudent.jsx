import React, { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { FaArrowLeft, FaSave } from "react-icons/fa";
import { getUserDetail, updateUser, uploadAvatar } from "../../services/admin/users";

// Helpers: format về giá trị phù hợp <input type="date"> / <input type="datetime-local">
const toDateInput = (v) => {
  if (!v) return "";
  // nhận ISO/Date/string -> yyyy-MM-dd
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

export default function EditStudent() {
  const navigate = useNavigate();
  const { id } = useParams();
  const location = useLocation();

  // Nếu đi từ bảng: có thể đính kèm sẵn user trong state để đỡ gọi API
  const stateUser = location.state?.student || location.state?.user || null;

  const [loading, setLoading] = useState(!stateUser);
  const [submitting, setSubmitting] = useState(false);
  const [err, setErr] = useState("");

  // Avatar upload
  const [avatarFile, setAvatarFile] = useState(null);
  const [preview, setPreview] = useState(stateUser?.avatarUrl || null);

  const [formData, setFormData] = useState({
    // mapping theo backend bạn cung cấp
    email: stateUser?.email || "",
    fullName: stateUser?.fullName || "",
    phone: stateUser?.phone || "",
    role: stateUser?.role || "student",
    status: stateUser?.status || "active", // active/inactive
    studentId: stateUser?.studentId || "",
    gender: stateUser?.gender || "",
    job: stateUser?.job || "",
    birthDate: toDateInput(stateUser?.birthDate) || "",
    birthPlace: stateUser?.birthPlace || "",
    ethnicity: stateUser?.ethnicity || "",
    idNumber: stateUser?.idNumber || "",
    idIssuedDate: toDateInput(stateUser?.idIssuedDate) || "",
    idIssuedPlace: stateUser?.idIssuedPlace || "",
    schoolName: stateUser?.schoolName || "",
    createdAt: toDatetimeLocalInput(stateUser?.createdAt) || toDatetimeLocalInput(new Date()),
    avatarUrl: stateUser?.avatarUrl || null,
  });

  // Nếu không có state -> fetch theo id
  useEffect(() => {
    if (stateUser || !id) return;
    (async () => {
      try {
        setLoading(true);
        setErr("");
        const data = await getUserDetail(id);
        setFormData({
          email: data?.email || "",
          fullName: data?.fullName || "",
          phone: data?.phone || "",
          role: data?.role || "student",
          status: data?.status || "active",
          studentId: data?.studentId || "",
          gender: data?.gender || "",
          job: data?.job || "",
          birthDate: toDateInput(data?.birthDate) || "",
          birthPlace: data?.birthPlace || "",
          ethnicity: data?.ethnicity || "",
          idNumber: data?.idNumber || "",
          idIssuedDate: toDateInput(data?.idIssuedDate) || "",
          idIssuedPlace: data?.idIssuedPlace || "",
          schoolName: data?.schoolName || "",
          createdAt: toDatetimeLocalInput(data?.createdAt) || "",
          avatarUrl: data?.avatarUrl || null,
        });
        setPreview(data?.avatarUrl || null);
      } catch (e) {
        const msg = e?.response?.data?.message || e?.message || "Không tải được chi tiết học viên.";
        setErr(msg);
      } finally {
        setLoading(false);
      }
    })();
  }, [id, stateUser]);

  const inputStyle =
    "w-full border-gray-300 focus:border-pink-400 focus:ring focus:ring-pink-100 text-[16px] p-3 rounded-xl shadow-sm transition-all duration-200 outline-none";

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

  // Chuẩn hoá payload đúng kiểu backend
  const normalizePayload = (raw) => ({
    email: raw.email?.trim() || null,
    fullName: raw.fullName?.trim() || null,
    phone: raw.phone?.trim() || null,
    role: raw.role || "student",
    status: raw.status || "active",
    studentId: raw.studentId?.trim() || null,
    gender: raw.gender?.trim() || null,
    job: raw.job?.trim() || null,
    birthDate: raw.birthDate || null, // yyyy-MM-dd
    birthPlace: raw.birthPlace?.trim() || null,
    ethnicity: raw.ethnicity?.trim() || null,
    idNumber: raw.idNumber?.trim() || null,
    idIssuedDate: raw.idIssuedDate || null, // yyyy-MM-dd
    idIssuedPlace: raw.idIssuedPlace?.trim() || null,
    schoolName: raw.schoolName?.trim() || null,
    // createdAt thường readonly phía server, không gửi lên (tránh ghi đè)
  });

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
    if (v) {
      setErr(v);
      return;
    }

    try {
      setSubmitting(true);
      await updateUser(id, payload);

      // Upload avatar nếu có chọn
      if (avatarFile) {
        await uploadAvatar(id, avatarFile);
      }

      alert("Cập nhật học viên thành công!");
      navigate(-1);
    } catch (error) {
      console.error("Update student failed:", error);
      const msg =
        error?.response?.data?.message || error?.message || "Lỗi khi cập nhật học viên.";
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
            {[...Array(12)].map((_, i) => (
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
        <h2 className="text-3xl font-bold text-pink-600 mb-2 flex items-center">
          <span className="mr-2">🌸</span> Chỉnh sửa thông tin học viên
        </h2>
        <p className="mb-4 text-gray-600">Nhập/chỉnh sửa thông tin học viên và lưu lại.</p>

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
                className="w-24 h-24 object-cover rounded-full ring-4 ring-pink-300 shadow-md hover:scale-105 transition-transform duration-200"
              />
            )}
          </div>

          {/* Thông tin học viên */}
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block font-medium mb-1">👤 Họ tên</label>
              <input
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                placeholder="Nhập họ tên"
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
                placeholder="VD: 0912345678"
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
                placeholder="VD: ten@gmail.com"
                className={inputStyle}
              />
            </div>

            <div>
              <label className="block font-medium mb-1">🆔 Mã học viên</label>
              <input
                name="studentId"
                value={formData.studentId}
                onChange={handleChange}
                placeholder="VD: STU001"
                className={inputStyle}
              />
            </div>

            <div>
              <label className="block font-medium mb-1">🚻 Giới tính</label>
              <input
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                placeholder="VD: nam/nữ/khác"
                className={inputStyle}
              />
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
                <option value="inactive">inactive</option>
              </select>
            </div>

            <div>
              <label className="block font-medium mb-1">💼 Nghề nghiệp</label>
              <input
                name="job"
                value={formData.job}
                onChange={handleChange}
                placeholder="VD: sinh viên"
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

            <div>
              <label className="block font-medium mb-1">🏠 Nơi sinh</label>
              <input
                name="birthPlace"
                value={formData.birthPlace}
                onChange={handleChange}
                placeholder="VD: Đà Nẵng"
                className={inputStyle}
              />
            </div>

            <div>
              <label className="block font-medium mb-1">🪪 Số CMND/CCCD</label>
              <input
                name="idNumber"
                value={formData.idNumber}
                onChange={handleChange}
                placeholder="VD: 0123456789"
                className={inputStyle}
              />
            </div>

            <div>
              <label className="block font-medium mb-1">📅 Ngày cấp</label>
              <input
                type="date"
                name="idIssuedDate"
                value={formData.idIssuedDate}
                onChange={handleChange}
                className={inputStyle}
              />
            </div>

            <div>
              <label className="block font-medium mb-1">🏢 Nơi cấp</label>
              <input
                name="idIssuedPlace"
                value={formData.idIssuedPlace}
                onChange={handleChange}
                placeholder="VD: CA TP. Đà Nẵng"
                className={inputStyle}
              />
            </div>

            <div>
              <label className="block font-medium mb-1">🏫 Trường</label>
              <input
                name="schoolName"
                value={formData.schoolName}
                onChange={handleChange}
                placeholder="VD: VKU"
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
              <label className="block font-medium mb-1">🔗 Avatar URL (chỉ xem)</label>
              <input
                name="avatarUrl"
                value={formData.avatarUrl || ""}
                onChange={() => {}}
                className={inputStyle}
                disabled
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
              } bg-pink-500 hover:bg-pink-600 text-white font-semibold py-2 px-4 rounded-xl shadow-md transition-all`}
            >
              <FaSave className="inline mr-1" /> {submitting ? "Đang lưu..." : "Lưu học viên"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
