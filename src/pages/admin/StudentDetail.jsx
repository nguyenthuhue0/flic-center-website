import React, { useEffect, useMemo, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { getUserDetail } from "../../services/admin/users";
import { FaUser, FaEnvelope, FaPhone } from "react-icons/fa";

export default function StudentDetail() {
  const { id } = useParams();
  const location = useLocation();
  const stateUser = location.state?.student || location.state?.user || null;

  const [user, setUser] = useState(stateUser);
  const [loading, setLoading] = useState(!stateUser);
  const [err, setErr] = useState("");

  useEffect(() => {
    if (!id || stateUser) return;
    (async () => {
      try {
        setLoading(true);
        setErr("");
        const res = await getUserDetail(id);
        const data = res?.data && typeof res.data === "object" ? res.data : res;
        setUser(data || null);
      } catch (e) {
        setErr(e?.response?.data?.message || e?.message || "Không tải được chi tiết người dùng");
      } finally {
        setLoading(false);
      }
    })();
  }, [id, stateUser]);

  // helper đọc cả snake_case & camelCase
  const pick = (o, ...keys) => keys.find(k => o?.[k] !== undefined ? true : false) && o[keys.find(k => o?.[k] !== undefined)];
  const fmtDate = (v) => (v ? new Date(v).toLocaleString("vi-VN") : "—");

  const view = useMemo(() => {
    const u = user || {};
    return {
      id:                u.id ?? "—",
      email:             pick(u, "email"),
      full_name:         pick(u, "full_name", "fullName"),
      phone:             pick(u, "phone"),
      avatar_url:        pick(u, "avatar_url", "avatarUrl"),
      role:              pick(u, "role"),
      status:            pick(u, "status"),
      student_id:        pick(u, "student_id", "studentId"),
      gender:            pick(u, "gender"),
      job:               pick(u, "job"),
      birth_date:        pick(u, "birth_date", "birthDate"),
      birth_place:       pick(u, "birth_place", "birthPlace"),
      ethnicity:         pick(u, "ethnicity"),
      id_number:         pick(u, "id_number", "idNumber"),
      id_issued_date:    pick(u, "id_issued_date", "idIssuedDate"),
      id_issued_place:   pick(u, "id_issued_place", "idIssuedPlace"),
      school_name:       pick(u, "school_name", "schoolName"),
      created_at:        pick(u, "created_at", "createdAt"),
      updated_at:        pick(u, "updated_at", "updatedAt"),
    };
  }, [user]);

  const statusColor =
    String(view.status || "").toLowerCase() === "active" ? "bg-green-500" : "bg-gray-400";

  if (loading) return <Skeleton />;
  if (err) return <ErrorBox err={err} />;
  if (!user) return <EmptyBox id={id} />;

  return (
    <div className="min-h-screen md:pl-[250px] p-4 md:p-10 bg-gradient-to-br from-[#eef2fb] to-[#f6f9ff] text-[#2B3674]">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="max-w-6xl mx-auto bg-white rounded-3xl shadow-xl px-6 md:px-10 py-8 space-y-8"
      >
        {/* Header */}
        <div className="flex items-center gap-5 border-b pb-6">
          <motion.img
            animate={{ scale: [1, 1.06, 1] }}
            transition={{ repeat: Infinity, duration: 1.4 }}
            src={
              view.avatar_url ||
              `https://api.dicebear.com/7.x/thumbs/svg?seed=${encodeURIComponent(
                String(view.full_name || view.email || "user")
              )}`
            }
            alt="Avatar"
            className="w-20 h-20 rounded-full border shadow-md"
          />
          <div>
            <h2 className="text-3xl md:text-4xl font-bold flex items-center gap-2">
              <FaUser /> Người dùng #{view.id}
            </h2>
            <p className="text-gray-500">Chi tiết người dùng theo bảng <code>users</code></p>
          </div>
        </div>

        {/* Thông tin chính */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
          <Stat label="Email" value={view.email || "—"} />
          <Stat label="SĐT" value={view.phone || "—"} />
          <div className="p-4 rounded-xl shadow bg-gray-100">
            <p className="text-sm text-gray-600 mb-1">Trạng thái</p>
            <span className={`px-3 py-1 rounded-full text-white text-sm font-medium ${statusColor}`}>
              {view.status || "—"}
            </span>
          </div>
        </div>

        {/* 2 cột thông tin theo schema */}
        <section className="grid md:grid-cols-2 gap-8">
          <Card title="👤 Thông tin tài khoản">
            <Field k="Họ tên" v={view.full_name} icon={<FaUser />} />
            <Field k="Email" v={view.email} icon={<FaEnvelope />} />
            <Field k="Số điện thoại" v={view.phone} icon={<FaPhone />} />
            <Field k="Vai trò" v={view.role} />
            <Field k="Mã SV" v={view.student_id} />
            <Field k="Trường" v={view.school_name} />
            <Field k="Tạo lúc" v={fmtDate(view.created_at)} />
            <Field k="Cập nhật" v={fmtDate(view.updated_at)} />
          </Card>

          <Card title="📝 Thông tin cá nhân">
            <Field k="Giới tính" v={view.gender} />
            <Field k="Nghề nghiệp" v={view.job} />
            <Field k="Ngày sinh" v={view.birth_date} />
            <Field k="Nơi sinh" v={view.birth_place} />
            <Field k="Dân tộc" v={view.ethnicity} />
            <Field k="Số CCCD" v={view.id_number} />
            <Field k="Ngày cấp" v={view.id_issued_date} />
            <Field k="Nơi cấp" v={view.id_issued_place} />
          </Card>
        </section>
      </motion.div>
    </div>
  );
}

/* small UI helpers */
function Card({ title, children }) {
  return (
    <div className="bg-[#F9FAFB] border border-gray-200 rounded-xl p-6 shadow-sm space-y-3">
      <h3 className="text-lg font-semibold">{title}</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">{children}</div>
    </div>
  );
}

function Field({ k, v, icon }) {
  return (
    <div className="flex gap-2">
      <span className="min-w-[120px] text-gray-500 flex items-center gap-1">{icon}{icon ? "" : null}{k}:</span>
      <span className="font-medium break-words">{v ?? "—"}</span>
    </div>
  );
}

function Stat({ label, value }) {
  return (
    <div className="p-4 rounded-xl shadow bg-blue-50">
      <p className="text-sm text-blue-700">{label}</p>
      <p className="text-xl font-bold text-blue-900 break-all">{value}</p>
    </div>
  );
}

function Skeleton() {
  return (
    <div className="min-h-screen md:pl-[250px] p-6">
      <div className="max-w-6xl mx-auto bg-white rounded-3xl p-10 shadow animate-pulse space-y-6">
        <div className="h-8 w-1/3 bg-gray-200 rounded" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[...Array(3)].map((_, i) => <div key={i} className="h-24 bg-gray-100 rounded-xl" />)}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="h-48 bg-gray-100 rounded-xl" />
          <div className="h-48 bg-gray-100 rounded-xl" />
        </div>
      </div>
    </div>
  );
}

function ErrorBox({ err }) {
  return (
    <div className="min-h-screen md:pl-[250px] p-6">
      <div className="max-w-3xl mx-auto p-6 rounded-xl bg-red-50 border border-red-200 text-red-700">
        {err}
      </div>
    </div>
  );
}

function EmptyBox({ id }) {
  return (
    <div className="min-h-screen md:pl-[250px] p-6">
      <div className="max-w-3xl mx-auto p-6 rounded-xl bg-yellow-50 border border-yellow-200 text-yellow-700">
        Không tìm thấy người dùng (id: {id}).
      </div>
    </div>
  );
}
