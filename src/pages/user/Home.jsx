import React from "react";
import Slider from "react-slick";
import banner01 from "../../assets/images/banner01.png";
import banner02 from "../../assets/images/banner02.png";
import { getCourse } from "../../services/Student/Home";
import { useEffect, useState } from "react";

const Home = () => {
   useEffect(() => {
      fetchCourse()
   }, []);
   const [dataCourse, setDataCourse] = useState([]);
   const fetchCourse = async () => {
      let courses = await getCourse();
      setDataCourse(courses);
   }
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

         <div className="py-16 bg-gray-100 px-6 md:px-16">
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

         {/* Banner 1 */}
         <div className="w-full relative overflow-hidden">
            <img
               src={banner02}
               alt="Banner"
               className="w-full h-auto object-contain"
            />
         </div>


         {/* Section 3: Khóa học */}
         <div className="py-16 bg-white px-6 md:px-16">
            <div className="max-w-7xl mx-auto text-center">
               <h2 className="text-2xl md:text-3xl font-bold text-blue-700 mb-4 text-center">Khóa học của chúng tôi</h2>
               <p className="text-gray-700 mb-12 max-w-3xl mx-auto">
                  Các khóa học tại FLIC VKU được thiết kế nhằm nâng cao trình độ ngoại ngữ và tin học, đáp ứng nhu cầu học tập, thi chứng chỉ và ứng dụng thực tiễn trong học tập và công việc.
               </p>
               <Slider dots={false} infinite={true} speed={500} slidesToShow={4} slidesToScroll={1} autoplay={true} autoplaySpeed={2000} className="-mx-2">
                  {/* Course 1 */}
                  {
                     dataCourse.map((course, index) => (
                        <div className="bg-gray-100 p-4 rounded-lg shadow-md">
                           <img src={course.imageUrl} alt="Khóa học 1" className="w-full h-40 object-cover rounded-t-lg" />
                           <h3 className="text-lg font-semibold mt-2">{course.title}</h3>
                           <button className="mt-4 bg-yellow-400 text-white px-4 py-2 rounded hover:bg-blue-500">Chi tiết</button>
                        </div>
                     ))
                  }


               </Slider>
            </div>
         </div>



         {/* Section 4: Lịch thi */}
         <div className="max-w-5xl mx-auto bg-gray-100 rounded-xl shadow p-4">
            <h2 className="text-2xl md:text-3xl font-bold text-blue-700 mb-4 text-center">Lịch thi</h2>
            <p className="text-gray-700 mb-12 max-w-3xl mx-auto text-center">
               Lịch thi được sắp xếp linh hoạt, phù hợp với từng khóa học và trình độ học viên.
            </p>
            <div className="grid grid-cols-4 font-semibold text-gray-700 px-6 py-3 border-b">
               <div className="col-span-1 text-left">Thời gian</div>
               <div className="col-span-1">Hình thức thi</div>
               <div className="col-span-1">Địa điểm</div>
               <div className="col-span-1">Lệ phí</div>
               <div className="col-span-1"></div>
            </div>

            {[
               {
                  time: "8:00",
                  date: "27-7-2025",
                  type: "Thi máy",
                  location: "IIG",
                  fee: "1.500.000 VND",
                  deadline: "16-7-2025",
               },
               {
                  time: "8:00",
                  date: "29-7-2025",
                  type: "Thi giấy",
                  location: "IIG",
                  fee: "1.500.000 VND",
                  deadline: "16-7-2025",
               },
               {
                  time: "8:00",
                  date: "29-7-2025",
                  type: "Thi giấy",
                  location: "IIG",
                  fee: "1.500.000 VND",
                  deadline: "16-7-2025",
               },
               {
                  time: "8:00",
                  date: "29-7-2025",
                  type: "Thi giấy",
                  location: "IIG",
                  fee: "1.500.000 VND",
                  deadline: "16-7-2025",
               },
            ].map((exam, index) => (
               <div
                  key={index}
                  className="grid grid-cols-5 items-center px-4 py-4 border rounded-lg my-2"
               >
                  <div className="col-span-1 font-bold text-left">
                     <div className="text-lg">{exam.time}</div>
                     <div className="text-lg">{exam.date}</div>
                  </div>

                  <div className="col-span-1 text-center">{exam.type}</div>
                  <div className="col-span-1 text-center">{exam.location}</div>
                  <div className="col-span-1 text-center text-blue-600 font-bold">
                     {exam.fee}
                  </div>
                  <div className="col-span-1 text-center">
                     <button className="bg-red-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-semibold">
                        Đăng ký thi
                     </button>
                     <div className="text-gray-600 text-sm mt-1">Hạn: {exam.deadline}</div>
                  </div>
               </div>
            ))}
         </div>

         {/* Banner 2 */}
         <div className="w-full relative overflow-hidden space-y-8">
            <img
               src={banner01}
               alt="Banner"
               className="w-full h-auto object-contain"
            />
         </div>


         <div className="text-center my-12">
            <h2 className="text-2xl md:text-3xl font-bold text-blue-700 mb-2">
               Chia sẻ từ học viên
            </h2>
            <p className="text-gray-600 mb-8 max-w-xl mx-auto">
               Những chia sẻ chân thực từ học viên giúp bạn hiểu rõ hơn về chất lượng đào tạo tại FLIC.
            </p>

            <div className="flex justify-center gap-8 flex-wrap">
               {/* Box học viên 1 */}
               <div className="bg-gray-50 rounded-xl shadow p-6 w-[400px] text-left">
                  <div className="flex items-center mb-4">
                     <div className="w-10 h-10 bg-pink-200 rounded-full mr-4"></div>
                     <div>
                        <p className="font-semibold">Nguyen Thu Hue</p>
                        <p className="text-sm text-gray-500">07/07/2025</p>
                     </div>
                  </div>
                  <p className="text-gray-800 mb-4">
                     akmansanmansanmansmansmansnam
                  </p>
                  <div className="flex space-x-1">
                     {Array(5)
                        .fill(0)
                        .map((_, index) => (
                           <svg
                              key={index}
                              xmlns="http://www.w3.org/2000/svg"
                              className={`w-5 h-5 ${index < 4 ? 'text-yellow-400 drop-shadow-md' : 'text-gray-300'
                                 }`}
                              fill="currentColor"
                              viewBox="0 0 20 20"
                           >
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.044 3.21a1 1 0 00.95.69h3.376c.969 0 1.371 1.24.588 1.81l-2.73 1.985a1 1 0 00-.364 1.118l1.044 3.21c.3.921-.755 1.688-1.538 1.118l-2.73-1.985a1 1 0 00-1.175 0l-2.73 1.985c-.783.57-1.838-.197-1.538-1.118l1.044-3.21a1 1 0 00-.364-1.118L2.09 8.637c-.783-.57-.38-1.81.588-1.81h3.376a1 1 0 00.95-.69l1.044-3.21z" />
                           </svg>
                        ))}
                  </div>
               </div>

               {/* Box học viên 2 */}
               <div className="bg-gray-50 rounded-xl shadow p-6 w-[400px] text-left">
                  <div className="flex items-center mb-4">
                     <div className="w-10 h-10 bg-pink-200 rounded-full mr-4"></div>
                     <div>
                        <p className="font-semibold">Nguyen Thu Hue</p>
                        <p className="text-sm text-gray-500">07/07/2025</p>
                     </div>
                  </div>
                  <p className="text-gray-800 mb-4">
                     akmansanmansanmansmansmansnam
                  </p>
                  <div className="flex space-x-1">
                     {Array(5)
                        .fill(0)
                        .map((_, index) => (
                           <svg
                              key={index}
                              xmlns="http://www.w3.org/2000/svg"
                              className={`w-5 h-5 ${index < 5 ? 'text-yellow-400 drop-shadow-md' : 'text-gray-300'
                                 }`}
                              fill="currentColor"
                              viewBox="0 0 20 20"
                           >
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.044 3.21a1 1 0 00.95.69h3.376c.969 0 1.371 1.24.588 1.81l-2.73 1.985a1 1 0 00-.364 1.118l1.044 3.21c.3.921-.755 1.688-1.538 1.118l-2.73-1.985a1 1 0 00-1.175 0l-2.73 1.985c-.783.57-1.838-.197-1.538-1.118l1.044-3.21a1 1 0 00-.364-1.118L2.09 8.637c-.783-.57-.38-1.81.588-1.81h3.376a1 1 0 00.95-.69l1.044-3.21z" />
                           </svg>
                        ))}
                  </div>
               </div>

               {/* Box học viên 2 */}
               <div className="bg-gray-50 rounded-xl shadow p-6 w-[400px] text-left">
                  <div className="flex items-center mb-4">
                     <div className="w-10 h-10 bg-pink-200 rounded-full mr-4"></div>
                     <div>
                        <p className="font-semibold">Nguyen Thu Hue</p>
                        <p className="text-sm text-gray-500">07/07/2025</p>
                     </div>
                  </div>
                  <p className="text-gray-800 mb-4">
                     akmansanmansanmansmansmansnam
                  </p>
                  <div className="flex space-x-1">
                     {Array(5)
                        .fill(0)
                        .map((_, index) => (
                           <svg
                              key={index}
                              xmlns="http://www.w3.org/2000/svg"
                              className={`w-5 h-5 ${index < 3 ? 'text-yellow-400 drop-shadow-md' : 'text-gray-300'
                                 }`}
                              fill="currentColor"
                              viewBox="0 0 20 20"
                           >
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.044 3.21a1 1 0 00.95.69h3.376c.969 0 1.371 1.24.588 1.81l-2.73 1.985a1 1 0 00-.364 1.118l1.044 3.21c.3.921-.755 1.688-1.538 1.118l-2.73-1.985a1 1 0 00-1.175 0l-2.73 1.985c-.783.57-1.838-.197-1.538-1.118l1.044-3.21a1 1 0 00-.364-1.118L2.09 8.637c-.783-.57-.38-1.81.588-1.81h3.376a1 1 0 00.95-.69l1.044-3.21z" />
                           </svg>
                        ))}
                  </div>

               </div>
            </div>
         </div>


         <div className="py-16 px-4 bg-white text-center">
            <h2 className="text-2xl font-bold text-blue-700 mb-8">Đối tác tin tưởng chúng tôi</h2>
            <div className="grid grid-cols-3 gap-8 justify-items-center max-w-3xl mx-auto">
               <img src="https://upload.wikimedia.org/wikipedia/vi/thumb/5/5a/Logo_tr%C6%B0%E1%BB%9Dng_%C4%90%E1%BA%A1i_h%E1%BB%8Dc_C%C3%B4ng_ngh%E1%BB%87_th%C3%B4ng_tin_v%C3%A0_Truy%E1%BB%81n_th%C3%B4ng_Vi%E1%BB%87t_-_H%C3%A0n%2C_%C4%90%E1%BA%A1i_h%E1%BB%8Dc_%C4%90%C3%A0_N%E1%BA%B5ng.svg/2560px-Logo_tr%C6%B0%E1%BB%9Dng_%C4%90%E1%BA%A1i_h%E1%BB%8Dc_C%C3%B4ng_ngh%E1%BB%87_th%C3%B4ng_tin_v%C3%A0_Truy%E1%BB%81n_th%C3%B4ng_Vi%E1%BB%87t_-_H%C3%A0n%2C_%C4%90%E1%BA%A1i_h%E1%BB%8Dc_%C4%90%C3%A0_N%E1%BA%B5ng.svg.png" alt="IIG" className="w-20 h-20 object-contain grayscale hover:grayscale-0 transition" />
               <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/11/FPT_logo_2010.svg/1200px-FPT_logo_2010.svg.png" alt="Partner 1" className="w-20 h-20 object-contain grayscale hover:grayscale-0 transition" />
               <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/11/FPT_logo_2010.svg/1200px-FPT_logo_2010.svg.png" alt="Partner 2" className="w-20 h-20 object-contain grayscale hover:grayscale-0 transition" />
               <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAhFBMVEUYd/L///8AbPEAcvEWePIAcfIAbvHx9/6kwvgAa/GStveLs/cKdPIAc/Ht9P5fmfWvyflZlvVQkfS60frW5PzB1vvg6/1onvXj7f2pxvmavPj5/P/L3fvh7P1vovaev/h5qPYof/NBifQugfNUk/SDrffG2vtGjPPS4fu0zfktgPMAZ/HLu3KUAAAK1UlEQVR4nN3d2YLiqhYG4AQEjdJGy6nU6nKqQeu8//udaDnFhARY/MHd62rvi27zdQjjAqK4kVj2/47fJqPD4BiH0eRt/Le/bOanI/DfP510PtNtSzDGpJTiN7L/yv5ftLbp52oyBUtxwv7XYrbLXIIrFZWHUlxk1p/Z4qsPew6McDp435xsGtoD9OjczOZTyLP4F/YPs4gJbmS7Dy5YNBv4f5eehePulkl73VUp2a479vtIPoXT3oYJs4KpDyXYpucT6U3YX+3ovHNw9rPwVlw9Cb9Sb7xTZG9yOPHzaD6E7VWL+eSdkSxatD08HV34upbCO+83hFy/BhdOZ4l71VkfPEmptQ5NOE0Z0ncysiHNSBG+Yt/fJVSSUsqqu7C9hr+/S3C2dq9znIUrh44ZwSgXDQvfNrJB3zHk5qtBYXuW+G//6iL7HJ2Kqotw0GgBvQWX80aE7SEL4jsGe7HvrloLD4TBET0UO6CFs3Av8DdYajmvYycct0K+wN/g0R4n7ACGEPahkhVKGLyEXoKlEGF/hxok2QffmPdUjYV7w6nBZkKJN9/CQxIa9RCJaetvKOw+GzAj9nwK189Sx9wHe/cnTJseSJiFHPoSvjxPJZoP8e1H+P2swKzV2PoQfofvqOnDgFgrfOI3eIx6Yp3wab/BS/C6b7FGmD47MKtuamrUauH6OZuJfMjqdrFS2H3Ghr4YrLJ3UyV8ur6oLir7qBXC/X8FmBErRhp6Yf+Z28HHEPrxol64e6bxYF2ojb1w1lQ7ofgxSYqd4pQ2xfUpRvrg2okNnbDTRDXKBWObj/ViMHrbj8fj/dvX6DBf9N7TbUsmx4wji3kFplu60QjHeOAxQaiz105+9seTeW+2Vcx0fi/RTDJqhC3wR8iTjWFmUH+fmj5L+b9WuXCGrUeFXFusXPcMH0bzKZYKD9AyKqRdFompMGIDU2Eb2RvlrGe58GAsjFjZylSZcAgso2xovT5mLlQvZsIBrowqab04ZiOMWEkHtShs45p6sXPJx7MQRrL4hReFuHpUzhx8dsKS+rQgfIONKNinE9BKGCWFjMaCcINq66vHqb6EUatOuEK1FNLxDdoKC6lFD0JYNSNsFjUpwkJl8yBcg6oZtXMG2gr5w8RUXviKagolIbvQUhix/L6NvBDVUpT3GEFCnp9AzQmnoJZCfRCA1sIoyQ1ccsIU9QpJ2drWwvw/6L1wCvoKhWtL6CiM2P1LvBeivkJJ239nL1T3X+Kd8BX0FYouCeggjJK76vROiGoLS/r7aOF9m3gTokb2fE0DuggjeRum3YQrUIctoW4JcRHefRk3Ycs/7hQbItBJGKmi8AvVVBDrGUehHBWExvOulsHIuyXd3uG11b8I+6g+d2FE2ozw1o+6CFH1zONYpjHh9eu4CFGrhcJqVNEf9dLtJlJ/7sPxyTZ5IapL+jhYq4zBd2K8h9/gl8c5YQ81eyGNfXMuvZYj/pkTombYlEFq3SnaW++lqHUvhBVS04rm7x//nWK2vxN2YVNsZtsG+67VSeVv9+6EW9Q0sOFKDOT31c9NCGvuI2a0aWCBGdb8Nvon4QG2JGrUWCxBPy/mVyFuual0VbbwClH9qfQqxPzAMYzG9z+oWoBfhLC2IisoBpNQf3HreeOzcIBb9eUGrxD386JzFr7jMhNMhKgZsOzXZ2fhBvULZsIXXP5V61eIaw3NhMA0z2OLmAm/gAlCJkLUFFgWcnISopqjYwQWHgf6ETZNL7BQpSchrMGNgguPVU0mRCYihhYmy0wI7NGEF2a9miieQHMtAwvlKBN2kEn5oYVikQk/oaeRBRbydSZELVj8/kJgofrIhLA5mmMEF+4yIfIHggsjFUdL6O6f4EK5jJAjiycQsn709x8XTiPsDqfgQrmP3qCbmcMLvyJop+0JhKNo9G8LxSE6/NuthRhEwMnS6BmEcw9CJfSRGMx5c1nxFwji44kOXajSeUcbJmfH6f/0Mea0V+xDSE/rqg7a8/0HhMRJluw7JNelYCGxvc7qUnJ7CBYS09Gy9pDcpwELiStTWZ+G3C8FC79pUxBZv5Q8tgALiXMs8o0+PsQK+8Ql8Gx8SB7jY4V74uNlY3zyPA1WOCBWE7JNn2vDCt0ShG+hPMyXYoXE+Wr142HOGyv8oT3cac6bum4BFVJridO6BTVLHyqkLm6e1p6o3TaokPpwp/VD8j8TUkgtYKc14OUzC6kZYad1fGouBlRI7HefczGI+TRQ4R8a8JxPQ8yJQgrbxH73OSeKmNeGFFL73ee8NuLoAimkptifcxOJ+aVIIbXffc4vJVY1SCG1352ehXNSVYMUEpNrxSr2kasPFFL73ddcfdp+C6CQOod03W9B+xCBQmK/W932zJAmQ4BC6nz3bd8TqUUECon97ru9a6Q6i/eWbX0YOLR/dknrd5/Ph/awh5QzbST/M1gDlonuj9PaCn6/hxSWNhRyHT+3Dxi2MSikMLeXm9wB1EVA4cN+fFQxDSg8F9LruRigbSUBhZdDVS5C0OancMLC2SagRNpwwsL5NPEQUkyDCW8HX1+FE8hLDCYsOScKs2U9mPD2wzchpK4JJSw9rw1y5l4oISs7cw+yazyQsPzcRMjZl4GEmrMvEUfQhhHqzi9FdE7DCNn9lTO5c4T9t/pBhPlrLnLCsfcvMYgwf2tQ/jxv719iCOHD2drgM9lDCCvPZPfeJgYQ8od7Qh7vRvDcsQkglA9HUz3eb+H5YLHmhYUJavAdJc0La+8oib+8thiNC1n9PTN+W4ymhbx4dW7JfU8+v8SmhSUn4JXc2TX32Cg2LJSd4l9fdu/ai79y2qxQld1gXSb0OLPYrDApuykEfP9ho8Kye+V0d1h6q0+bFJbUo3rhMvLU7jcpVDb3kHq7sbpBoe7mat19wCs/n2JzQqlLmNDe6Zx6mSBuTKj5CKuEfrrgTQlVS5sSoRe++niJTQkr7nXTC73cZtmQsHhzpZEwntOJzQhZSXfUSBj3yBVqI8Lq6zErhfE7dSTVhFBUX1FbLYyH1L1jeKEou8jZXBh/03qoeCGvu0GjThhvSUS4kG/rcgNrhTQiWsh3tcmP9UISESysf4NGwvjbvbrBCoUB0EgYD50bDaiwrha1EMbvrk0/Umh4VbuZMO45duCAQtOr2g2Frn1UnDCp6ou6COM34TJeRAmVrBhNOArj141DqwES8pb5HcrmwjhO7esbjFAOLW4YthHGC+uPESJMrHbpWAnjfWR7z7l/IVdGt2Q5CuOlZUn1L2Q2JdRBGMcDq706voUqKV2b8CqM+y8Wr9GzUH6b3AFGFWatvzT+Gr0KeeWMky5chHE7TQyLqk8hG9q/wNhRGMeTltlww59QtIx7MflwFB5Ti0yKqi8h1y681IazMG6/s3qjH6Fi704F9BTuwjie1n+OPoQq+bC4VLgQFGEcjz9q3iNdqNjLvv7vqAiaMDOmSZWRKuTJkOajC7Oyupb6mSqaULB3Svn8Dbow6+V0le7CaYJQSd51r19u4UOYxeiDlb5IZ6FgL6P6P2oSnoRx/LrYlNQ6bkLOWl3zQXxNeBNmMf5ssYfZHHuhynif1NrlPnwKsxj3dkxwZ6ESbNPzyYu9C7N4naf8qrQQcsF4OvdWOK/hX3iMcWfWYlIoZSRUSkjWSldjyLNghMfoT7ppy+TkjwzXnfh/d5fACU9hdHoL9hHAwieI/wPUzqiIllohsgAAAABJRU5ErkJggg==" alt="Partner 3" className="w-20 h-20 object-contain grayscale hover:grayscale-0 transition" />
               <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQSVkGzXBaKankW7oHKlMcLHtaPedcLH_E2Hg&s" alt="Partner 4" className="w-20 h-20 object-contain grayscale hover:grayscale-0 transition" />
               <img src="https://upload.wikimedia.org/wikipedia/vi/thumb/5/5a/Logo_tr%C6%B0%E1%BB%9Dng_%C4%90%E1%BA%A1i_h%E1%BB%8Dc_C%C3%B4ng_ngh%E1%BB%87_th%C3%B4ng_tin_v%C3%A0_Truy%E1%BB%81n_th%C3%B4ng_Vi%E1%BB%87t_-_H%C3%A0n%2C_%C4%90%E1%BA%A1i_h%E1%BB%8Dc_%C4%90%C3%A0_N%E1%BA%B5ng.svg/2560px-Logo_tr%C6%B0%E1%BB%9Dng_%C4%90%E1%BA%A1i_h%E1%BB%8Dc_C%C3%B4ng_ngh%E1%BB%87_th%C3%B4ng_tin_v%C3%A0_Truy%E1%BB%81n_th%C3%B4ng_Vi%E1%BB%87t_-_H%C3%A0n%2C_%C4%90%E1%BA%A1i_h%E1%BB%8Dc_%C4%90%C3%A0_N%E1%BA%B5ng.svg.png" alt="Partner 5" className="w-20 h-20 object-contain grayscale hover:grayscale-0 transition" />
            </div>
         </div>





      </div>
   );
};

export default Home;



