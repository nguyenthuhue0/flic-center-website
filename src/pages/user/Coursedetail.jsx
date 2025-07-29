import React, { useRef } from "react";
import { FaClock, FaCalendarAlt, FaChartBar } from "react-icons/fa";
import zalo from "../../assets/images/zalo.png"
export default function CourseDetail() {
  const gioiThieuRef = useRef(null);
  const chuongTrinhRef = useRef(null);
  const hocPhiRef = useRef(null);
  const noiDungRef = useRef(null);

  const handleScrollTo = (ref) => {
    ref.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="font-sans bg-white min-h-screen">
      {/* Course header */}
      <div className="bg-[#CC2B2B] text-white w-[1250px] h-[140px] px-10 py-6 flex items-center justify-between mx-auto">
        <div className="text-[36px] font-bold pl-[43px]">Ứng dụng AI cho người mới</div>
        <button className="bg-white text-[#CC2B2B] w-[198px] h-[42px] font-bold text-xl rounded-full hover:bg-gray-100 transition flex items-center justify-center mr-[40px]">
          Đăng ký học
        </button>
      </div>

      <div className="bg-[#CC2B2B] text-white px-10 py-4 flex justify-center gap-16 mx-auto w-[1250px]">
        <div className="flex items-center gap-3">
          <FaClock size={45} />
          <span className="text-[28px] font-bold">Suất học: 2 - 4 - 6</span>
        </div>
        <div className="flex items-center gap-3">
          <FaCalendarAlt size={45} />
          <span className="text-[28px] font-bold">Khai giảng: 11/07/2025</span>
        </div>
        <div className="flex items-center gap-3">
          <FaChartBar size={45} />
          <span className="text-[28px] font-bold">Thời gian: 6 tháng</span>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-300 flex text-sm font-bold pl-[70px] w-[1250px] mx-auto">
        {[
          { label: "GIỚI THIỆU", ref: gioiThieuRef },
          { label: "CHƯƠNG TRÌNH HỌC", ref: chuongTrinhRef },
          { label: "HỌC PHÍ", ref: hocPhiRef },
          { label: "NỘI DUNG", ref: noiDungRef },
        ].map(({ label, ref }, i) => (
          <div
            key={i}
            onClick={() => handleScrollTo(ref)}
            className={`px-4 py-3 border-b-4 cursor-pointer ${i === 0 ? 'border-yellow-400' : 'border-transparent hover:border-yellow-400'}`}
          >
            {label}
          </div>
        ))}
      </div>

      {/* Main content */}
      <div className="w-[1330px] mx-auto px-10 py-6 space-y-8">
        {/* GIỚI THIỆU */}
        <section ref={gioiThieuRef}>
          <h3 className="font-bold mb-2 text-[24px] text-[#CC2B2B]">Nội dung</h3>
          <p className="text-sm text-gray-700 text-[20px] font-semibold leading-relaxed text-justify space-y-2">
            AI (Trí tuệ nhân tạo) là từ khóa mà ai cũng quen thuộc trong thời gian gần đây. Tuy nhiên, để hiểu được AI là gì và làm thế nào để ứng dụng AI hiệu quả vào công việc thì có lẽ chưa nhiều người nắm được.
            <br /><br />
            Ứng dụng AI đã bùng nổ từ cuối năm 2024 và phổ biến từ năm 2025. Ứng dụng AI giờ đây không phải là lựa chọn mà là bắt buộc từ trường học đến công sở. Việc ứng dụng AI đúng cách không chỉ giúp tăng năng suất lên gấp đôi, gấp ba, mà có thể gấp 5, 10 lần, đồng thời còn khẳng định vị thế của bạn trong việc làm chủ công nghệ.
            <br /><br />
            AI không thay thế bạn, nhưng những người biết ứng dụng AI hiệu quả có thể sẽ thay thế bạn. Do vậy, nắm vững kỹ năng ứng dụng AI sẽ giúp bạn chủ động hơn trong công việc cũng như không phải lo lắng bị AI thay thế.
          </p>
        </section>

        {/* CHƯƠNG TRÌNH HỌC */}
        <section ref={chuongTrinhRef}>
          <h3 className="font-bold text-[24px] text-[#CC2B2B] mb-2">Chương trình học</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-left border border-gray-200">
              <thead>
                <tr className="bg-[#CC2B2B] text-white text-[18px]">
                  <th className="px-4 py-2 border border-gray-200">Buổi</th>
                  <th className="px-4 py-2 border border-gray-200">Môn học</th>
                  <th className="px-4 py-2 border border-gray-200">Số giờ</th>
                </tr>
              </thead>
              <tbody className="text-[19px] font-semibold text-gray-800">
                {[
                  ["1", "Hiểu về AI – Hiểu để tự tin sử dụng hiệu quả AI", "1"],
                  ["2", "AI ChatBot – Xây dựng AI thành trợ lý cá nhân", "3"],
                  ["3", "AI Image – Thiết kế ảnh chuyên nghiệp cùng AI", "2"],
                  ["4", "AI Video – Thiết kế Video cùng AI", "2"],
                  ["5", "AI Audio – Thiết kế âm thanh chuyên nghiệp", "2"],
                  ["6", "Xây dựng video triệu view bằng AI", "2"],
                  ["7", "Ứng dụng AI để tăng tốc công việc văn phòng", "2"],
                  ["8", "AI phân tích tài liệu – Tạm biệt nỗi lo đọc văn bản", "2"],
                  ["8", "AI phân tích dữ liệu – Khai phá tiềm năng dữ liệu cùng AI", "2"],
                  ["9", "AI Agent – Xây dựng trợ lý ảo cho cá nhân, doanh nghiệp", "2"],
                  ["10", "AI Automation – Tự động hóa công việc cùng AI để thời gian tận hưởng cuộc sống", "2"]
                ].map(([buoi, monhoc, sogio], index) => (
                  <tr key={index} className={index % 2 === 0 ? "bg-white" : "bg-gray-100"}>
                    <td className="px-4 py-2 border border-gray-200 font-medium">{buoi}</td>
                    <td className="px-4 py-2 border border-gray-200">{monhoc}</td>
                    <td className="px-4 py-2 border border-gray-200 ">{sogio}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* ĐỐI TƯỢNG */}
        <section>
          <h3 className="font-bold mb-2 text-[24px] text-[#CC2B2B]">Đối tượng tham gia</h3>
          <p className="text-sm text-gray-700 text-[20px] font-semibold leading-relaxed text-justify space-y-2">
            Khóa học dành cho mọi người, những ai có nhu cầu tìm hiểu và ứng dụng AI vào cuộc sống, công việc.
          </p>
        </section>

        {/* HỌC PHÍ */}
        <section ref={hocPhiRef}>
          <h3 className="font-bold text-[24px] text-[#CC2B2B] mb-2">Học phí</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-left border border-gray-200 rounded-md overflow-hidden">
              <tbody className="text-[18px] font-semibold text-gray-800">
                <tr className="bg-gray-100">
                  <td className="px-4 py-3 font-medium">Học phí</td>
                  <td className="px-4 py-3 text-right">1,990,000 (VND)</td>
                </tr>
                <tr className="bg-white">
                  <td className="px-4 py-3 font-medium">Đăng kí nhóm (Từ 2 người trở lên)</td>
                  <td className="px-4 py-3 text-right">Giảm 200,000 VND mỗi người</td>
                </tr>
                <tr className="bg-gray-100">
                  <td className="px-4 py-3 font-medium">Vợ chồng đăng kí</td>
                  <td className="px-4 py-3 text-right text-green-700 font-semibold">Giảm 20%</td>
                </tr>
                <tr className="bg-white">
                  <td className="px-4 py-3 font-medium">Hộ nghèo</td>
                  <td className="px-4 py-3 text-right text-[#CC2B2B] font-semibold">Giảm 50%</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* NỘI DUNG KHÓA HỌC */}
        <section ref={noiDungRef}>
          <h3 className="font-bold text-[24px] text-[#CC2B2B] mb-4">Nội dung khóa học</h3>
          <div className="space-y-2">
            {[
              {
                title: "Hiểu về AI",
                content: [
                  "AI là gì? AI làm được gì? Và không làm được gì?",
                  "Làm thế nào để dùng tốt AI",
                  "Có những AI nào?",
                  "Demo một số AI thông dụng",
                  "Dùng AI đúng cách"
                ]
              },
              {
                title: "AI Chatbot – Sử dụng Chat GPT vào công việc",
                content: [
                  "Tạo tài khoản ChatGPT",
                  "Viết prompt hiệu quả",
                  "Ứng dụng GPT hỗ trợ công việc"
                ]
              },
              {
                title: "AI Image – Thiết kế ảnh chuyên nghiệp cùng AI",
                content: ["Giới thiệu Midjourney", "Tạo ảnh AI", "Thiết kế banner, poster"]
              }
            ].map((item, idx) => (
              <details key={idx} className="border rounded-md overflow-hidden">
                <summary className="cursor-pointer bg-white text-[#CC2B2B] px-4 py-2 font-semibold text-[18px]">
                  {item.title}
                </summary>
                <ul className="bg-white px-6 py-3 list-disc text-gray-800 text-[16px] space-y-1">
                  {item.content.map((point, i) => (
                    <li key={i}>{point}</li>
                  ))}
                </ul>
              </details>
            ))}
          </div>
        </section>

        {/* Decor Left & Right */}
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

      {/* Zalo logo */}
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
