import {
  FaBook, FaChalkboardTeacher, FaUserGraduate, FaCalendarAlt,
  FaClock, FaListUl, FaStar, FaMoneyBillWave, FaIdCard
} from "react-icons/fa";
import { MdOutlineCategory, MdOutlineImage, MdOutlineUpdate } from "react-icons/md";
import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import { getCourseDetailAdmin, getCourseDetailPublic } from "../../services/admin/courses";

export default function CourseDetail() {
  const { id } = useParams();
  const location = useLocation();
  const stateCourse = location.state?.course || null;

  const [course, setCourse] = useState(stateCourse);
  const [loading, setLoading] = useState(!stateCourse);
  const [err, setErr] = useState("");

  useEffect(() => {
    if (!id || stateCourse) return;

    (async () => {
      try {
        setLoading(true);
        setErr("");
        try {
          const res1 = await getCourseDetailAdmin(id);
          setCourse(res1 || null);
        } catch {
          const res2 = await getCourseDetailPublic(id);
          setCourse(res2 || null);
        }
      } catch (e) {
        setErr(e?.response?.data?.message || e?.message || "Không tải được chi tiết khoá học");
      } finally {
        setLoading(false);
      }
    })();
  }, [id, stateCourse]);

  // Format helper
  const fmtPrice = (v) => typeof v === "number" ? v.toLocaleString("vi-VN") + " ₫" : "—";
  const fmtDate = (v) => v ? new Date(v).toLocaleString("vi-VN") : "—";

  // Map data
  const idVal       = course?.id ?? "—";
  const name        = course?.title || "—";
  const rating      = course?.rating ?? "—";
  const price       = fmtPrice(course?.price);
  const duration    = course?.duration ? `${course.duration} giờ` : "—";
  const status      = course?.status || "—";
  const image       = course?.image || "";
  const startDate   = course?.startDate || course?.startMonth || "—";
  const type        = course?.type || "—";
  const createdAt   = fmtDate(course?.createdAt);
  const updatedAt   = fmtDate(course?.updatedAt);
  const description = course?.description || "—";

  const statusColor =
    String(status).toLowerCase() === "active" || String(status).toLowerCase() === "open"
      ? "green"
      : String(status).toLowerCase() === "closed"
      ? "gray"
      : "blue";

  if (loading) return <LoadingSkeleton />;
  if (err) return <ErrorBox err={err} />;
  if (!course) return <NotFoundBox id={id} />;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
      className="ml-[250px] min-h-screen bg-gradient-to-br from-[#eef2fb] to-[#f6f9ff] p-10 text-[#2B3674] font-sans"
    >
      <div className="max-w-6xl mx-auto bg-white shadow-xl rounded-3xl px-10 py-10 space-y-10">
        
        {/* Header */}
        <div className="flex items-center gap-6 border-b pb-6">
          <motion.div
            animate={{ rotate: [0, 5, -5, 0] }} transition={{ repeat: Infinity, duration: 2 }}
            className="bg-[#CC2B2B] w-24 h-24 flex items-center justify-center rounded-full text-white text-4xl shadow-md"
          >
            <FaBook />
          </motion.div>
          <div>
            <h2 className="text-4xl font-bold text-[#1E2B6A] flex items-center gap-2">
              📘 {name}
            </h2>
            <p className="text-gray-500 mt-1">Thông tin chi tiết về khoá học</p>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-6 text-center">
          <StatBox color="blue"   label="ID" value={idVal} icon={<FaIdCard />} />
          <StatBox color="green"  label="Đánh giá" value={rating} icon={<FaStar />} />
          <StatBox color="yellow" label="Giá" value={price} icon={<FaMoneyBillWave />} />
        </div>

        {/* Thông tin khóa học */}
        <section className="grid md:grid-cols-2 gap-10">
          <CardGroup title="📖 Thông tin khóa học">
            <Info icon={<FaBook />} label="Tên khóa học" value={name} />
            <Info icon={<MdOutlineCategory />} label="Loại" value={type} />
            <Info icon={<FaCalendarAlt />} label="Khai giảng" value={startDate} />
            <Info icon={<FaClock />} label="Thời lượng" value={duration} />
            <StatusPill label="Trạng thái" value={status} color={statusColor} />
          </CardGroup>

          <CardGroup title="🗓 Thời gian & Cập nhật">
            <Info icon={<FaCalendarAlt />} label="Ngày tạo" value={createdAt} />
            <Info icon={<MdOutlineUpdate />} label="Ngày cập nhật" value={updatedAt} />
            <Info icon={<MdOutlineImage />} label="Ảnh" value={image} />
          </CardGroup>
        </section>

        {/* Ảnh */}
        {image && (
          <div className="flex justify-center">
            <img src={image} alt={name} className="max-w-[300px] rounded-lg shadow-lg border" />
          </div>
        )}

        {/* Mô tả */}
        <section>
          <h3 className="text-md font-semibold text-gray-500 mb-2">📝 Mô tả khóa học</h3>
          <p className="italic text-[#4B5585] bg-gray-50 rounded-xl p-4 border border-gray-200 shadow-inner">
            {description}
          </p>
        </section>
      </div>
    </motion.div>
  );
}

function Info({ label, value, icon }) {
  return (
    <div className="space-y-1 hover:bg-gray-50 rounded-md p-2 transition">
      <p className="text-xs font-semibold text-gray-500 flex items-center gap-1">
        {icon} {label}
      </p>
      <p className="text-[#2B3674] font-medium break-all">{value}</p>
    </div>
  );
}

function StatusPill({ label, value, color }) {
  const colorClass = {
    green: "bg-green-500",
    blue: "bg-blue-500",
    red: "bg-red-500",
    gray: "bg-gray-400",
  }[color] || "bg-gray-400";

  return (
    <div className="space-y-1">
      <p className="text-xs font-semibold text-gray-500">{label}</p>
      <p className={`inline-block px-4 py-1 rounded-full text-white text-sm font-medium ${colorClass}`}>
        {value}
      </p>
    </div>
  );
}

function CardGroup({ title, children }) {
  return (
    <div className="bg-[#F9FAFB] border border-gray-200 rounded-xl p-6 shadow-sm space-y-4">
      <h3 className="text-lg font-semibold text-[#1E2B6A]">{title}</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">{children}</div>
    </div>
  );
}

function StatBox({ value, label, color, icon }) {
  const bg = {
    blue: "bg-blue-100 text-blue-800",
    green: "bg-green-100 text-green-800",
    yellow: "bg-yellow-100 text-yellow-800",
  }[color];

  return (
    <div className={`p-4 rounded-xl shadow-md ${bg}`}>
      <div className="text-2xl flex justify-center mb-1">{icon}</div>
      <p className="text-xl font-bold">{value}</p>
      <p className="text-sm">{label}</p>
    </div>
  );
}

function LoadingSkeleton() {
  return (
    <div className="ml-[250px] min-h-screen p-10">
      <div className="max-w-6xl mx-auto bg-white rounded-3xl p-10 shadow animate-pulse">
        <div className="h-8 w-1/3 bg-gray-200 rounded mb-6" />
        <div className="grid grid-cols-3 gap-6 mb-10">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="p-6 rounded-xl shadow bg-gray-100 h-28" />
          ))}
        </div>
        <div className="grid grid-cols-2 gap-10">
          <div className="h-48 bg-gray-100 rounded-xl" />
          <div className="h-32 bg-gray-100 rounded-xl" />
        </div>
      </div>
    </div>
  );
}

function ErrorBox({ err }) {
  return (
    <div className="ml-[250px] min-h-screen p-10">
      <div className="max-w-3xl mx-auto p-6 rounded-xl bg-red-50 border border-red-200 text-red-700">
        {err}
      </div>
    </div>
  );
}

function NotFoundBox({ id }) {
  return (
    <div className="ml-[250px] min-h-screen p-10">
      <div className="max-w-3xl mx-auto p-6 rounded-xl bg-yellow-50 border border-yellow-200 text-yellow-700">
        Không tìm thấy khoá học (id: {id}).
      </div>
    </div>
  );
}
