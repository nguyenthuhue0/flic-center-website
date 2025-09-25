import { useEffect, useRef, useState } from "react";
import imageTest from "../../assets/images/demo.jpg";
import Modal from "../../components/Modal";
import { ImQuotesLeft } from "react-icons/im";
import { ImQuotesRight } from "react-icons/im";
import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";
import { FaBell } from "react-icons/fa";
import { getAllCourse } from "../../services/Student/Course";
import Slider from "react-slick";
import { CiStar } from "react-icons/ci";

const FeedbackStudent = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [dataCourse, setDataCourse] = useState([]);
  const students = Array(6).fill({
    name: "NGUYỄN VĂN A",
    role: "HỌC VIÊN",
    image: "", // placeholder ảnh
    link: "#",
  });
  useEffect(() => {
    fetchDataCourse();
  }, []);
  const fetchDataCourse = async () => {
    let data = await getAllCourse();
    setDataCourse(data);
  };
  const sliderRef = useRef(null);

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    pauseOnHover: true,
    arrows: false,
    responsive: [
      {
        breakpoint: 1024,
        settings: { slidesToShow: 3 },
      },
      {
        breakpoint: 768,
        settings: { slidesToShow: 2 },
      },
      {
        breakpoint: 480,
        settings: { slidesToShow: 1 },
      },
    ],
  };

  return (
    <div className="max-w-7xl mx-auto px-4 ">
      <div data-aos="fade-up" className="text-center mb-8">
        <h2 className="text-4xl font-bold text-blue-700">
          Cảm nhận của học viên sau khi học tại
        </h2>
        <p className="text-5xl font-bold tracking-wide py-2">
          <span className="text-blue-600">F</span>
          <span className="text-yellow-400">L</span>
          <span className="text-red-600">I</span>
          <span className="text-orange-500">C</span>
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 px-6">
        {students.map((student, index) => (
          <div
            key={index}
            data-aos="fade-up"
            className="bg-white shadow-md rounded-lg overflow-hidden text-center p-10 transition-all duration-300 ease-in-out hover:-translate-y-2 hover:scale-105 hover:shadow-lg"
          >
            <div className=" h-55 w-full">
              <img src={imageTest} alt="" className="shadow-md rounded-b-lg" />
            </div>

            <div className="p-3">
              <p className="text-red-600 font-semibold text-xl">
                👤 {student.role}
              </p>
              <h3 className="font-bold text-2xl mt-2">{student.name}</h3>
              <button
                onClick={() => setIsModalOpen(true)}
                className="inline-block mt-4 bg-yellow-400 hover:bg-yellow-500 text-sm font-medium text-blue-700 py-3 px-7 rounded-full transition hover:cursor-pointer"
              >
                Chi tiết nhận xét →
              </button>
            </div>
          </div>
        ))}
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <div className="max-w-3xl mx-auto p-2  rounded-2xl flex flex-col md:flex-row gap-6 bg-white">
          <div className="flex flex-col items-center w-full md:w-1/2">
            {/* Avatar lớn */}
            <div className="w-75 h-75 rounded-3xl  border-2 border-red-400/40 flex items-center justify-center text-xl font-semibold">
              <img
                src={imageTest}
                alt=""
                className="w-full h-full object-cover rounded-3xl"
              />
            </div>

            {/* Tên */}
            <div className="text-center mt-4 font-bold text-2xl">
              NGUYỄN VĂN A
            </div>
            {/* Khóa học */}
            <div className="text-center font-semibold text-lg">
              Lập trình căn bản
            </div>

            {/* 3 avatar nhỏ */}
            <div className="flex gap-4 mt-6">
              <div className="w-16 h-16 rounded-xl border-2 border-red-400/40 flex items-center justify-center text-sm text-gray-500">
                <img
                  src={imageTest}
                  alt=""
                  className="w-full h-full object-cover rounded-xl"
                />
              </div>
              <div className="w-16 h-16 rounded-xl border-2 border-yellow-400/40 flex items-center justify-center text-sm text-gray-500">
                <img
                  src={imageTest}
                  alt=""
                  className="w-full h-full object-cover rounded-xl"
                />
              </div>
              <div className="w-16 h-16 rounded-xl border-2 border-blue-400/40 flex items-center justify-center text-sm text-gray-500">
                <img
                  src={imageTest}
                  alt=""
                  className="w-full h-full object-cover rounded-xl"
                />
              </div>
            </div>
          </div>

          {/* Right - Nội dung nhận xét */}
          <div className="relative w-full md:w-1/2 p-4 ">
            <div className="text-center">
              <h1 className="text-5xl font-bold mb-4">
                <span className="text-blue-500">F</span>
                <span className="text-yellow-500">L</span>
                <span className="text-orange-500">I</span>
                <span className="text-red-500">C</span>
              </h1>
            </div>
            <div className="mt-4 shadow-md shadow-red-200 min-h-96 rounded-2xl">
              <p className="text-black-700 leading-relaxed indent-4 p-4">
                “Mình đã tham gia khoá học Kiểm thử phần mềm tại đây. Nhờ sự
                giảng dạy rất nhiệt tình, sự tư vấn và hỗ trợ tìm việc làm sau
                khoá học rất tận tâm của các thầy cô ở trung tâm mà mình đã tìm
                được việc làm phù hợp. Xin chân thành cám ơn các thầy cô và mọi
                người ở trung tâm nhiều.”
              </p>
            </div>
            <ImQuotesLeft className="absolute rotate-180 bottom-0 right-0 text-5xl text-red-600" />
            <ImQuotesRight className="absolute scale-x-[-1] top-[40px] left-0 text-5xl text-red-600" />
          </div>
        </div>
      </Modal>

      <h2 className="text-2xl md:text-3xl font-bold text-center text-blue-600 mb-8 mt-10">
        Các khóa học của FLIC
      </h2>

      {/* Khóa học */}
      <div className="relative px-10">
        {/* Slider */}
        <Slider ref={sliderRef} {...settings}>
          {dataCourse.map((course, idx) => (
            <div key={idx} className="p-2 cursor-pointer">
              <div className="bg-white rounded-xl shadow-md overflow-hidden">
                <div className="h-40 flex items-center justify-center text-white font-semibold text-lg">
                  <img src={course.imageUrl} alt="" />
                </div>
                <div className="p-4 space-y-2">
                  <h3 className="text-md font-semibold">{course.title}</h3>
                  <p className="text-sm text-blue-500">
                    Đánh giá: {course.rating}{" "}
                    <span className="inline-block text-yellow-500">
                      <CiStar />
                    </span>
                  </p>
                  <p className="text-sm text-gray-500">{course.desc}</p>
                  <div className="flex justify-between items-center pt-2">
                    <span className="text-sm text-gray-600">
                      Khai giảng : {course.startMonth}
                    </span>
                    <button className="bg-yellow-300 hover:bg-yellow-400 text-xs px-3 py-1 rounded-full font-semibold">
                      Chi tiết →
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </Slider>

        {/* Nút điều hướng */}
        <button
          onClick={() => sliderRef.current.slickPrev()}
          className="absolute top-1/2 -left-2 transform -translate-y-1/2 z-10 bg-white rounded-full shadow p-2 hover:bg-gray-200"
        >
          <IoIosArrowBack className="text-2xl" />
        </button>

        <button
          onClick={() => sliderRef.current.slickNext()}
          className="absolute top-1/2 -right-2 transform -translate-y-1/2 z-10 bg-white rounded-full shadow p-2 hover:bg-gray-200"
        >
          <IoIosArrowForward className="text-2xl" />
        </button>
      </div>

      {/* Form đăng ký */}
      <div className="border border-blue-600 mt-16 p-10 rounded-xl mr-16 ml-16 text-center mb-16">
        <h3 className="text-center text-white font-bold text-2xl bg-red-500 py-2 rounded-md mr-45 ml-45">
          Đăng kí nhận thông tin khóa học
        </h3>
        <p className="text-center text-black mt-6 text-xl mb-6">
          Nhận thông tin khóa học mới nhất cũng như các chương trình ưu đãi
        </p>

        <div className="mt-6 flex flex-col md:flex-row items-center justify-center gap-4">
          <div className="flex items-center bg-white rounded-lg px-6 py-5 shadow-md w-full md:w-96 relative">
            {/* <FaBell className="text-red-500 mr-2" /> */}
            <input
              type="email"
              placeholder="Nhập email của bạn"
              className="flex-1 outline-none text-md"
            />
            <FaBell className="absolute top-[-3px] left-[-16px] text-red-600 text-3xl" />
          </div>
          <button className="bg-yellow-300 hover:bg-yellow-400 px-8 py-3 rounded-full font-bold text-blue-800 ml-6">
            Đăng kí →
          </button>
        </div>
      </div>
    </div>
  );
};
export default FeedbackStudent;
