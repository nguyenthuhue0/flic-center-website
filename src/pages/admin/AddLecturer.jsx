import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft, FaSave } from "react-icons/fa";
import { createUser, uploadAvatar } from "../../services/admin/users";

const mapStatus = (s) =>
  String(s || "").toLowerCase().includes("đang") ? "active" : "inactive";

const normGender = (g) => {
  const v = String(g || "").trim().toLowerCase();
  if (v === "nữ") return "nu";
  if (v === "khác") return "khac";
  if (v === "nam") return "nam";
  return "";
};

export default function AddLecturer() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    subject: "",
    status: "Đang giảng dạy",
    level: "",
    dob: "",
    address: "",
    gender: "",
    joinDate: new Date().toISOString().slice(0, 16),
    note: ""
  });

  const [avatar, setAvatar] = useState(null);
  const [preview, setPreview] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [err, setErr] = useState("");

  const inputStyle =
    "w-full border-gray-300 focus:border-blue-400 focus:ring focus:ring-blue-100 text-[16px] p-3 rounded-xl shadow-sm transition-all duration-200 outline-none";

  const handleChange = (e) => {
    setErr("");
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setAvatar(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  // JSON payload cho backend
  const normalizePayload = (raw) => {
    const p = {
      fullName: raw.name?.trim(),
      email: raw.email?.trim(),
      phone: raw.phone?.trim(),
      role: "instructor",
      status: mapStatus(raw.status),      // "active"/"inactive"
      gender: normGender(raw.gender) || undefined, // "nam"/"nu"/"khac"
      birthDate: raw.dob || undefined,    // yyyy-MM-dd
      job: raw.level?.trim() || undefined
    };
    // bỏ field rỗng/undefined để tránh 400
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
    if (v) {
      setErr(v);
      return;
    }

    try {
      setSubmitting(true);

      // 1) Tạo user = JSON ONLY
      const created = await createUser(payload);
      const newId = created?.id ?? created?.data?.id;

      // 2) (Tuỳ backend) Nếu KHÔNG muốn multipart luôn, có thể BỎ QUA avatar:
      // nếu cho phép endpoint riêng upload avatar thì để lại dòng dưới, còn không thì comment nó.
      if (newId && avatar) {
        await uploadAvatar(newId, avatar); // <- có multipart ở bước riêng này; xoá nếu backend cấm hoàn toàn
      }

      alert("Thêm giảng viên thành công!");
      navigate("../LecturerManagement");
    } catch (error) {
      const msg =
        error?.response?.data?.message ||
        error?.message ||
        "Lỗi khi tạo giảng viên.";
      setErr(msg);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="p-6 flex justify-center ml-[250px]">
      <div className="w-full max-w-5xl">
        <h2 className="text-3xl font-bold text-blue-600 mb-2 flex items-center">
          <span className="mr-2">👨‍🏫</span> Thêm giảng viên
        </h2>

        <p className="mb-4 text-gray-600">Nhập thông tin để thêm giảng viên mới vào hệ thống.</p>

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

          {/* Thông tin giảng viên */}
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block font-medium mb-1">👤 Họ tên</label>
              <input name="name" onChange={handleChange} value={formData.name} placeholder="Nhập họ tên" className={inputStyle} required />
            </div>
            <div>
              <label className="block font-medium mb-1">📞 Số điện thoại</label>
              <input name="phone" onChange={handleChange} value={formData.phone} placeholder="VD: 0912345678" className={inputStyle} required />
            </div>
            <div>
              <label className="block font-medium mb-1">📧 Email</label>
              <input name="email" onChange={handleChange} value={formData.email} placeholder="VD: giangvien@gmail.com" className={inputStyle} />
            </div>
            <div>
              <label className="block font-medium mb-1">📘 Môn giảng dạy</label>
              <input name="subject" onChange={handleChange} value={formData.subject} placeholder="VD: Toán, Lập trình C++..." className={inputStyle} />
            </div>
            <div>
              <label className="block font-medium mb-1">🎓 Trình độ chuyên môn</label>
              <input name="level" onChange={handleChange} value={formData.level} placeholder="VD: Thạc sĩ CNTT, Cử nhân Sư phạm..." className={inputStyle} />
            </div>
            <div>
              <label className="block font-medium mb-1">📍 Trạng thái</label>
              <select name="status" onChange={handleChange} value={formData.status} className={inputStyle}>
                <option>Đang giảng dạy</option>
                <option>Đã nghỉ</option>
                <option>Bảo lưu</option>
              </select>
            </div>
            <div>
              <label className="block font-medium mb-1">🎂 Ngày sinh</label>
              <input name="dob" type="date" onChange={handleChange} value={formData.dob} className={inputStyle} />
            </div>
            <div>
              <label className="block font-medium mb-1">🏠 Địa chỉ</label>
              <input name="address" onChange={handleChange} value={formData.address} placeholder="VD: 123 Nguyễn Trãi..." className={inputStyle} />
            </div>
            <div>
              <label className="block font-medium mb-1">🚻 Giới tính</label>
              <select name="gender" onChange={handleChange} value={formData.gender} className={inputStyle}>
                <option value="">-- Chọn --</option>
                <option value="Nam">Nam</option>
                <option value="Nữ">Nữ</option>
                <option value="Khác">Khác</option>
              </select>
            </div>
            <div>
              <label className="block font-medium mb-1">📅 Ngày vào làm</label>
              <input type="datetime-local" name="joinDate" value={formData.joinDate} onChange={handleChange} className={inputStyle} disabled />
            </div>
            <div className="col-span-3">
              <label className="block font-medium mb-1">📝 Ghi chú</label>
              <textarea name="note" onChange={handleChange} value={formData.note} placeholder="Ghi chú thêm (nếu có)" className={inputStyle}></textarea>
            </div>
          </div>

          {/* Nút thao tác */}
          <div className="flex justify-between mt-6">
            <button type="button" onClick={() => navigate("../LecturerManagement")} className="btn-outline" disabled={submitting}>
              <FaArrowLeft className="inline mr-1" /> Quay lại
            </button>
            <button
              type="submit"
              disabled={submitting}
              className={`bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-xl shadow-md transition-all ${
                submitting ? "opacity-70 cursor-not-allowed" : ""
              }`}
            >
              <FaSave className="inline mr-1" /> {submitting ? "Đang lưu..." : "Lưu giảng viên"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
