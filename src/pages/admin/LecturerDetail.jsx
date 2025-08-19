// src/pages/admin/LecturerDetail.jsx
import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import {
  FaUser,
  FaPhone,
  FaEnvelope,
  FaChalkboardTeacher,
} from "react-icons/fa";
import { getUserDetail } from "../../services/admin/users";

// ===== Helpers =====
const fmtDate = (v) => (v ? new Date(v).toLocaleDateString() : "—");
const fmtDT = (v) => (v ? new Date(v).toLocaleString() : "—");
const dicebear = (seed) =>
  `https://api.dicebear.com/7.x/thumbs/svg?seed=${encodeURIComponent(
    seed || "lecturer"
  )}`;

const Badge = ({ status }) => {
  const s = String(status || "").toLowerCase();
  const isActive = s === "active";
  return (
    <span
      className={`px-3 py-1 rounded-full text-xs font-semibold ${
        isActive ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-600"
      }`}
    >
      {status ?? "—"}
    </span>
  );
};

const Row = ({ label, value }) => (
  <div className="flex items-start gap-3 py-1">
    <span className="w-36 shrink-0 text-gray-500">{label}</span>
    <span className="font-semibold text-[#2B3674] break-words">{value ?? "—"}</span>
  </div>
);

export default function LecturerDetail() {
  const { id } = useParams();
  const location = useLocation();

  // Nếu navigate từ list đã pass sẵn state
  const stateLecturer = location.state?.lecturer || null;

  const [loading, setLoading] = useState(!stateLecturer);
  const [err, setErr] = useState("");
  const [u, setU] = useState(
    stateLecturer || {
      id,
      email: "",
      phone: "",
      role: "instructor",
      status: "",
      fullName: "",
      studentId: "",
      gender: "",
      job: "",
      birthDate: null,
      birthPlace: "",
      ethnicity: "",
      idNumber: "",
      idIssuedDate: null,
      idIssuedPlace: "",
      schoolName: "",
      avatarUrl: "",
      createdAt: null,
      updatedAt: null,
    }
  );

  useEffect(() => {
    if (stateLecturer || !id) return;
    (async () => {
      try {
        setLoading(true);
        setErr("");
        const data = await getUserDetail(id);
        setU({
          id: data?.id ?? id,
          email: data?.email ?? "",
          phone: data?.phone ?? "",
          role: data?.role ?? "",
          status: data?.status ?? "",
          fullName: data?.fullName ?? "",
          studentId: data?.studentId ?? "",
          gender: data?.gender ?? "",
          job: data?.job ?? "",
          birthDate: data?.birthDate ?? null,
          birthPlace: data?.birthPlace ?? "",
          ethnicity: data?.ethnicity ?? "",
          idNumber: data?.idNumber ?? "",
          idIssuedDate: data?.idIssuedDate ?? null,
          idIssuedPlace: data?.idIssuedPlace ?? "",
          schoolName: data?.schoolName ?? "",
          avatarUrl: data?.avatarUrl ?? "",
          createdAt: data?.createdAt ?? null,
          updatedAt: data?.updatedAt ?? null,
        });
      } catch (e) {
        setErr(
          e?.response?.data?.message || e?.message || "Không tải được chi tiết giảng viên."
        );
      } finally {
        setLoading(false);
      }
    })();
  }, [id, stateLecturer]);

  if (loading) {
    return (
      <div className="ml-[250px] p-10">
        <div className="max-w-6xl mx-auto bg-white rounded-3xl shadow animate-pulse p-10">
          <div className="h-8 w-1/3 bg-gray-200 rounded mb-6" />
          <div className="grid grid-cols-3 gap-6 mb-8">
            <div className="h-16 bg-gray-100 rounded" />
            <div className="h-16 bg-gray-100 rounded" />
            <div className="h-16 bg-gray-100 rounded" />
          </div>
          <div className="grid grid-cols-2 gap-6">
            <div className="h-56 bg-gray-100 rounded" />
            <div className="h-56 bg-gray-100 rounded" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="ml-[250px] min-h-screen bg-gradient-to-br from-[#eef2fb] to-[#f6f9ff] p-10 text-[#2B3674]">
      <div className="max-w-6xl mx-auto bg-white shadow-xl rounded-3xl px-8 md:px-10 py-10 space-y-8">
        {/* Header */}
        <div className="flex items-center gap-6 border-b pb-6">
          <img
            src={u.avatarUrl || dicebear(u.fullName || `lecturer-${u.id}`)}
            alt="Avatar"
            className="w-20 h-20 rounded-full border shadow-md object-cover bg-white"
          />
          <div className="flex-1">
            <h2 className="text-3xl md:text-4xl font-bold text-[#1E2B6A] flex flex-wrap items-center gap-2">
              <FaChalkboardTeacher />
              Người dùng #{u.id}
            </h2>
            <p className="text-gray-500 mt-1">Chi tiết người dùng theo bảng <b>users</b></p>
          </div>
        </div>

        {/* 3 summary tiles */}
        <div className="grid md:grid-cols-3 gap-4">
          <div className="bg-[#F6F8FF] rounded-2xl p-5 border border-gray-100">
            <p className="text-sm text-gray-500 mb-1">Email</p>
            <p className="text-xl font-bold break-words">{u.email || "—"}</p>
          </div>
          <div className="bg-[#F6F8FF] rounded-2xl p-5 border border-gray-100">
            <p className="text-sm text-gray-500 mb-1">SĐT</p>
            <p className="text-xl font-bold">{u.phone || "—"}</p>
          </div>
          <div className="bg-[#F6F8FF] rounded-2xl p-5 border border-gray-100">
            <p className="text-sm text-gray-500 mb-1">Trạng thái</p>
            <Badge status={u.status} />
          </div>
        </div>

        {/* 2 cards */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Thông tin tài khoản */}
          <div className="bg-[#F9FAFB] border border-gray-200 rounded-2xl p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-[#1E2B6A] mb-3">
              👤 Thông tin tài khoản
            </h3>

            <Row label="Họ tên" value={u.fullName} />
            <Row label="Số điện thoại" value={u.phone} />
            <Row label="Mã SV" value={u.studentId} />
            <Row label="Email" value={u.email} />
            <Row label="Vai trò" value={u.role} />
            <Row label="Trường" value={u.schoolName} />

            <div className="grid grid-cols-2 gap-3 mt-2">
              <div>
                <span className="block text-gray-500">Tạo lúc</span>
                <span className="font-semibold">{fmtDT(u.createdAt)}</span>
              </div>
              <div>
                <span className="block text-gray-500">Cập nhật</span>
                <span className="font-semibold">{fmtDT(u.updatedAt)}</span>
              </div>
            </div>
          </div>

          {/* Thông tin cá nhân */}
          <div className="bg-[#F9FAFB] border border-gray-200 rounded-2xl p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-[#1E2B6A] mb-3">
              📄 Thông tin cá nhân
            </h3>

            <div className="grid grid-cols-2 gap-x-6">
              <Row label="Giới tính" value={u.gender} />
              <Row label="Nghề nghiệp" value={u.job} />

              <Row label="Ngày sinh" value={fmtDate(u.birthDate)} />
              <Row label="Nơi sinh" value={u.birthPlace} />

              <Row label="Dân tộc" value={u.ethnicity} />
              <Row label="Số CCCD" value={u.idNumber} />

              <Row label="Ngày cấp" value={fmtDate(u.idIssuedDate)} />
              <Row label="Nơi cấp" value={u.idIssuedPlace} />
            </div>
          </div>
        </div>

        {/* Ghi chú / thêm tuỳ ý (để trống nếu không có) */}
        {/* <section>
          <h3 className="text-md font-semibold text-gray-500 mb-2">📝 Ghi chú</h3>
          <p className="italic text-[#4B5585] bg-gray-50 rounded-xl p-4 border border-gray-200 shadow-inner">
            —
          </p>
        </section> */}
        {err && (
          <div className="p-3 rounded border border-red-200 bg-red-50 text-red-700">{err}</div>
        )}
      </div>
    </div>
  );
}
