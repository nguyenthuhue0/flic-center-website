import React from "react";
import Slider from "react-slick";


const Home = () => {
   return (
      <div className="bg-white">
         {/* Section 1: Banner */}
         <div className="bg-gradient-to-r from-blue-700 to-blue-600 text-white py-12 px-6 md:px-16">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
               {/* Left Text */}
               <div className="flex-1">
                  <h1 className="text-3xl md:text-4xl font-bold leading-tight mb-4">
                     TRUNG TÂM<br />
                     NGOẠI NGỮ TIN HỌC FLIC
                  </h1>
                  <p className="text-lg">
                     Trung tâm Ngoại ngữ - Tin học (FLIC) trực thuộc <br />
                     Trường Đại học Công nghệ Thông tin và Truyền thông Việt - Hàn (VKU) là đơn vị đào tạo.
                  </p>

                  <div className="mt-6 flex gap-4">
                     <button className="bg-yellow-400 text-black font-semibold px-5 py-2 rounded hover:bg-yellow-300">
                        Các khoá học
                     </button>
                     <button className="border border-white px-5 py-2 rounded hover:bg-white hover:text-blue-600 transition">
                        Lịch thi
                     </button>
                  </div>
               </div>

               {/* Right Box */}
               <div className="flex-1 bg-white text-blue-900 p-8 rounded-xl shadow-lg text-center">
                  <div className="grid grid-cols-3 gap-4 text-lg font-semibold">
                     <div>
                        <p className="text-3xl font-bold text-blue-700">500+</p>
                        <p>Sinh viên</p>
                     </div>
                     <div>
                        <p className="text-3xl font-bold text-blue-700">100+</p>
                        <p>Giảng viên</p>
                     </div>
                     <div>
                        <p className="text-3xl font-bold text-blue-700">50+</p>
                        <p>Khoá học</p>
                     </div>
                  </div>
               </div>
            </div>
         </div>

         {/* Section 2: Lý do chọn FLIC */}

         <div className="py-16 bg-gray-50 px-6 md:px-16">
            <div className="max-w-7xl mx-auto text-center">
               <h2 className="text-2xl md:text-3xl font-bold text-blue-700 mb-4">Lý do chọn FLIC !</h2>
               <p className="text-gray-700 mb-12 max-w-3xl mx-auto">
                  FLIC là địa chỉ uy tín trong việc tổ chức các khóa học và cấp chứng chỉ thuộc hệ thống giáo dục quốc dân.
               </p>

               {/* 3 Columns */}
               <div className="grid md:grid-cols-3 gap-6 text-left">
                  {/* Box 1 */}
                  <div className="bg-white border-2 border-red-400 rounded-xl p-6 shadow hover:shadow-md transition">
                     <div className="text-4xl mb-4">🛡️</div>
                     <h3 className="text-xl font-bold mb-2">Chất lượng, uy tín</h3>
                     <p className="text-gray-600">
                        Đội ngũ giảng viên chuyên môn cao, nhiều kinh nghiệm giảng dạy. Chứng chỉ ngoại ngữ và tin học được cấp theo chuẩn quy định của Bộ Giáo dục & Đào tạo.
                     </p>
                  </div>

                  {/* Box 2 */}
                  <div className="bg-white border-2 border-yellow-400 rounded-xl p-6 shadow hover:shadow-md transition">
                     <div className="text-4xl mb-4">✅</div>
                     <h3 className="text-xl font-bold mb-2">Đào tạo đa dạng, linh hoạt</h3>
                     <p className="text-gray-600">
                        Tổ chức các khoá ngắn hạn, bồi dưỡng theo yêu cầu cá nhân & tổ chức. Môi trường học thân thiện, chuyên nghiệp.
                     </p>
                  </div>

                  {/* Box 3 */}
                  <div className="bg-white border-2 border-blue-400 rounded-xl p-6 shadow hover:shadow-md transition">
                     <div className="text-4xl mb-4">⭐</div>
                     <h3 className="text-xl font-bold mb-2">Liên kết quốc tế</h3>
                     <p className="text-gray-600">
                        Giáo trình chuẩn quốc tế, cập nhật liên tục theo nhu cầu thực tiễn. Hợp tác đào tạo, trao đổi sinh viên với các đối tác nước ngoài.
                     </p>
                  </div>
               </div>
            </div>
         </div>

      </div>
   );
};

export default Home;
