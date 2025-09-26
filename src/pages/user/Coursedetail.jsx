import React, { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { FaClock, FaCalendarAlt, FaChartBar } from "react-icons/fa";
import zalo from "../../assets/images/zalo.png";
import { getCourseById, getLessonsByCourse } from "../../services/Auth/course";
import { MdStarRate } from "react-icons/md";


const fmtVND = (n) =>
  (Number(n) || 0).toLocaleString("vi-VN", { maximumFractionDigits: 0 });

const hoursBetween = (start, end) => {
  try {
    const s = new Date(start).getTime();
    const e = new Date(end).getTime();
    if (!isFinite(s) || !isFinite(e)) return "-";
    return Math.max(0, (e - s) / (1000 * 60 * 60)); // giờ
  } catch {
    return "-";
  }
};

export default function CourseDetail() {
  const gioiThieuRef = useRef(null);
  const chuongTrinhRef = useRef(null);
  const hocPhiRef = useRef(null);
  const navigate = useNavigate();

  const { id } = useParams();                  // /course/:id
  const location = useLocation();
  const courseFromState = location.state?.course || null;

  const [course, setCourse] = useState(courseFromState);
  const [lessons, setLessons] = useState([]);
  const [loading, setLoading] = useState(true);

  // fetch course + lessons
useEffect(() => {
  let alive = true;
  (async () => {
    try {
      setLoading(true);
      const [c, ls] = await Promise.all([
        getCourseById(id),       // /api/course/{id}
        getLessonsByCourse(id),  // /api/lesson?courseId={id}
      ]);
      console.log(c, ls);
      
      if (!alive) return;
      setCourse(c || null);      setLessons(Array.isArray(ls) ? ls : []);
    } catch (e) {
      if (!alive) return;
      // Nếu hỏng 1 API, bạn có thể set riêng:
      setCourse((prev) => prev ?? null);
      setLessons((prev) => Array.isArray(prev) ? prev : []);
      console.error(e);
    } finally {
      if (alive) setLoading(false);
    }
  })();
  return () => { alive = false; };
}, [id]);


  // học phí & giảm giá (tính theo course.price)
  const fee = Number(course?.price) || 0;
  const discounts = useMemo(() => {
    const groupOff = 200_000;
    return [
      { label: "Học phí", value: `${fmtVND(fee)} VND`, strong: true },
      { label: "Đăng kí nhóm (từ 2 người trở lên)", value: `Giảm ${fmtVND(groupOff)} VND/người` },
      { label: "Vợ chồng đăng kí", value: `Giảm ${Math.round(20)}% → còn ${fmtVND(fee * 0.8)} VND` },
      { label: "Hộ nghèo", value: `Giảm 50% → còn ${fmtVND(fee * 0.5)} VND`, highlight: true },
    ];
  }, [fee]);

  const handleScrollTo = (ref) =>
    ref.current?.scrollIntoView({ behavior: "smooth", block: "start" });

  return (
    <div className="font-sans bg-white min-h-screen">
      {/* Header */}
      <div className="bg-[#CC2B2B] text-white w-[1250px] h-[140px] px-10 py-6 flex items-center justify-between mx-auto">
        <div className="text-[32px] md:text-[36px] font-bold pl-[43px]">
          {course?.title || "Khoá học"}
        </div>
        <button
          type="button"
          onClick={() => navigate("/registerForm")}
          className="bg-white text-[#CC2B2B] w-[198px] h-[42px] font-bold text-xl rounded-full hover:bg-gray-100 transition flex items-center justify-center mr-[40px]"
        >
          Đăng ký học
        </button>
      </div>

      {/* Thông tin ngắn (giữ nguyên layout cũ; có thể nối dữ liệu nếu bạn có) */}
      <div className="bg-[#CC2B2B] text-white px-10 py-4 flex justify-center gap-8 md:gap-16 mx-auto w-[1250px]">
        <div className="flex items-center gap-6">
          <FaClock size={55} />
          <span className="text-[22px] md:text-[32px] font-bold">
            Suất học: -
          </span>
        </div>
        <div className="flex items-center gap-4">
          <FaCalendarAlt size={55} />
          <span className="text-[22px] md:text-[32px] font-bold">
            Khai giảng: {course?.startMonth || "Tháng ?"}
          </span>
        </div>
        <div className="flex items-center gap-4">
          <FaChartBar size={55} />
          <span className="text-[22px] md:text-[32px] font-bold flex items-center">
            Đánh giá: {course?.rating}<span className="inline-block text-yellow-400"><MdStarRate /></span> 
          </span>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-300 flex text-sm font-bold pl-[70px] w-[1250px] mx-auto">
        {[
          { label: "GIỚI THIỆU", ref: gioiThieuRef },
          { label: "CHƯƠNG TRÌNH HỌC", ref: chuongTrinhRef },
          { label: "HỌC PHÍ", ref: hocPhiRef },
        ].map(({ label, ref }, i) => (
          <div
            key={i}
            onClick={() => handleScrollTo(ref)}
            className={`px-4 py-3 border-b-4 cursor-pointer ${
              i === 0 ? "border-yellow-400" : "border-transparent hover:border-yellow-400"
            }`}
          >
            {label}
          </div>
        ))}
      </div>

      {/* Main */}
      <div className="w-[1330px] mx-auto px-10 py-6 space-y-8">
        {/* GIỚI THIỆU (đổ description) */}
        {/* GIỚI THIỆU (2 đoạn fix cứng + phần mô tả từ DB) */}
<section ref={gioiThieuRef}>
  <h3 className="font-bold mb-2 text-[24px] text-[#CC2B2B]">Giới thiệu</h3>

  {/* 2 đoạn cố định */}
  <div className="mb-6">
    <p className="text-[18px] md:text-[20px] font-semibold leading-relaxed text-justify text-gray-700">
      Trung tâm Tin học Ngoại ngữ FLIC mang đến cho học viên môi trường học tập
      hiện đại, kết hợp giữa lý thuyết và thực hành nhằm giúp người học nhanh chóng
      cải thiện kỹ năng.
    </p> <br />
    <p className="text-[18px] md:text-[20px] font-semibold leading-relaxed text-justify text-gray-700">
      Các khóa học được xây dựng bởi đội ngũ giảng viên giàu kinh nghiệm, nội dung
      đa dạng và phù hợp cho nhiều đối tượng, từ học sinh – sinh viên đến người đi làm.
    </p>
  </div>

  {/* phần còn lại lấy từ CSDL */}
  <p className="text-[18px] md:text-[20px] font-semibold leading-relaxed text-justify text-gray-700">
    {loading ? "Đang tải..." : (course?.description || "Chưa có mô tả.")}
  </p>
</section>


       <section ref={chuongTrinhRef}>
  <h3 className="font-bold text-[24px] text-[#CC2B2B] mb-2">Chương trình học</h3>
  <div className="overflow-x-auto">
    <table className="w-full text-left border border-gray-200">
      <thead>
        <tr className="bg-[#CC2B2B] text-white text-[18px]">
          <th className="px-4 py-2 border border-gray-200">Buổi</th>
          <th className="px-4 py-2 border border-gray-200">Môn học / Tiêu đề</th>
          <th className="px-4 py-2 border border-gray-200">Bắt đầu</th>
          <th className="px-4 py-2 border border-gray-200">Kết thúc</th>
          <th className="px-4 py-2 border border-gray-200">Số giờ</th>
        </tr>
      </thead>

      <tbody className="text-[18px] font-semibold text-gray-800">
        {loading ? (
          <tr>
            <td className="px-4 py-3" colSpan={5}>Đang tải...</td>
          </tr>
        ) : lessons.length === 0 ? (
          <tr>
            <td className="px-4 py-3" colSpan={5}>Chưa có lịch/buổi học.</td>
          </tr>
        ) : (
          [...lessons]
            // sắp xếp theo weekIndex (nếu có), rồi theo plannedAt
            .sort((a, b) => {
              const wi = (a.weekIndex ?? 0) - (b.weekIndex ?? 0);
              if (wi !== 0) return wi;
              return new Date(a.plannedAt) - new Date(b.plannedAt);
            })
            .map((l, idx) => (
              <tr key={l.id} className={idx % 2 === 0 ? "bg-white" : "bg-gray-100"}>
                <td className="px-4 py-2 border border-gray-200 font-medium">{idx + 1}</td>
                <td className="px-4 py-2 border border-gray-200">
                  {l.title || "(Không tên)"}{l.description ? ` — ${l.description}` : ""}
                </td>
                <td className="px-4 py-2 border border-gray-200">
                  {l.plannedAt ? new Date(l.plannedAt).toLocaleString("vi-VN") : "-"}
                </td>
                <td className="px-4 py-2 border border-gray-200">
                  {l.endTime ? new Date(l.endTime).toLocaleString("vi-VN") : "-"}
                </td>
                <td className="px-4 py-2 border border-gray-200">
                  {hoursBetween(l.plannedAt, l.endTime)}
                </td>
              </tr>
            ))
        )}
      </tbody>
    </table>
  </div>
</section>


        {/* HỌC PHÍ (đổ theo course.price + giảm %/số tiền) */}
        <section ref={hocPhiRef}>
          <h3 className="font-bold text-[24px] text-[#CC2B2B] mb-2">Học phí</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-left border border-gray-200 rounded-md overflow-hidden">
              <tbody className="text-[18px] font-semibold text-gray-800">
                {discounts.map((d, i) => (
                  <tr key={i} className={i % 2 ? "bg-white" : "bg-gray-100"}>
                    <td className="px-4 py-3 font-medium">{d.label}</td>
                    <td
                      className={
                        "px-4 py-3 text-right " +
                        (d.strong ? "font-bold" : "") +
                        (d.highlight ? " text-[#CC2B2B]" : "")
                      }
                    >
                      {d.value}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Decor */}
        <div className="fixed left-4 top-3/4 -translate-y-1/2 z-40">
          <div className="grid grid-cols-3 gap-1.5">
            {Array(9).fill(0).map((_, idx) => (
              <div key={idx} className="w-2.5 h-2.5 bg-red-500 rounded-full"></div>
            ))}
          </div>
        </div>
        <div className="fixed right-4 top-1/3 -translate-y-1/2 z-40">
          <div className="grid grid-cols-3 gap-1.5">
            {Array(9).fill(0).map((_, idx) => (
              <div key={idx} className="w-2.5 h-2.5 bg-red-500 rounded-full"></div>
            ))}
          </div>
        </div>
      </div>

      {/* Zalo */}
      <div className="fixed bottom-4 right-4 z-50">
        <img
          src={zalo}
          alt="Zalo"
          className="w-15 h-15 rounded-full transition-transform duration-500 hover:rotate-[360deg]"
        />
      </div>
    </div>
  );
}
