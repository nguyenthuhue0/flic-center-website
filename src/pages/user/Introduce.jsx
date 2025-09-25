import React, { useEffect } from 'react';
import { FaStar, FaShieldAlt, FaCheckCircle } from 'react-icons/fa';
import AOS from "aos";
import image from "../../assets/images/demo.jpg"

const visionItems = [
    {
        icon: <FaStar size={24} color="#3B82F6" />,
        title: 'Nhân bản - Phụng sự - Khai phóng',
        desc: 'Thể hiện tinh thần giáo dục lấy con người làm trung tâm, cống hiến cho cộng đồng và thúc đẩy tư duy tự do, sáng tạo.',
        border: '#3B82F6',
    },
    {
        icon: <FaShieldAlt size={24} color="#FACC15" />,
        title: 'Chất lượng hàng đầu',
        desc: 'Đảm bảo chất lượng giảng dạy xuất sắc với đội ngũ giảng viên chuyên môn cao, giáo trình chuẩn quốc tế và phương pháp giảng dạy hiện đại.',
        border: '#FACC15',
    },
    {
        icon: <FaCheckCircle size={24} color="#3B82F6" />,
        title: 'Kỹ năng thực tế',
        desc: 'Trang bị kỹ năng thực tế, ứng dụng được ngay vào công việc và cuộc sống thông qua các dự án thực tế và bài tập ứng dụng.',
        border: '#EF4444',
    },
    {
        icon: <FaCheckCircle size={24} color="#3B82F6" />,
        title: 'Cơ hội nghề nghiệp',
        desc: 'Mở ra nhiều cơ hội việc làm và phát triển sự nghiệp trong môi trường quốc tế, kết nối với các doanh nghiệp uy tín.',
        border: '#3B82F6',
    },
    {
        icon: <FaStar size={24} color="#EF4444" />,
        title: 'Cam kết chất lượng',
        desc: 'Đảm bảo học viên đạt được mục tiêu học tập và nhận được chứng chỉ uy tín được công nhận rộng rãi.',
        border: '#EF4444',
    },
];

const trainingFields = [
    {
        title: 'Công nghệ thông tin',
        desc: 'Lập trình, thiết kế web, phân tích dữ liệu',
    },
    {
        title: 'Ngoại ngữ',
        desc: 'Tiếng Anh, Tiếng Nhật, Tiếng Hàn',
    },
    {
        title: 'Tổ chức thi',
        desc: 'Đa dạng, linh hoạt phù hợp với mọi học viên',
    },
];


const Introduce = () => {
       useEffect(() => {
        AOS.init({ duration: 2000, once: true }); // once: true => chỉ chạy 1 lần
      }, []);
    return (
        <div className="container">
            <h1 data-aos="fade-up" className="section-title-h1" style={{ textAlign: 'center' }}>ĐÔI NÉT VỀ TRUNG TÂM NGOẠI NGỮ TIN HỌC FLIC</h1>
            <section data-aos="zoom-in-up" className="intro">
                <div className="intro-left">
                    <p>
                        Được thành lập theo Quyết định của Giám đốc Đại học Đà Nẵng về việc thành lập các đơn vị thuộc, trực thuộc Trường Đại học Công nghệ Thông tin và Truyền thông Việt - Hàn.
                    </p>
                    <p>
                        Trung tâm hoạt động độc lập, có tư cách pháp nhân và con dấu riêng, tuân thủ các quy định của pháp luật cũng như quy chế của trường VKU. FLIC là địa chỉ uy tín trong việc tổ chức các khóa học và cấp chứng chỉ thuộc hệ thống giáo dục quốc dân.
                    </p>
                </div>
                <div className="intro-right">
                    <div className="placeholder"><img src={image} alt="" /></div>
                </div>
            </section>

            {/* TẦM NHÌN SỨ MỆNH */}
            <h2 data-aos="fade-up" className="section-title">TẦM NHÌN - SỨ MỆNH</h2>
            <div className="vision-list">
                {visionItems.map((item, i) => (
                    <div data-aos="fade-up" className="vision-card" key={i} style={{ borderColor: item.border }}>
                        <div className="vision-icon">{item.icon}</div>
                        <div className="vision-content">
                            <h3>{item.title}</h3>
                            <p>{item.desc}</p>
                        </div>
                    </div>
                ))}
            </div>

            {/* CÁN BỘ VIÊN CHỨC */}
            <h2 data-aos="fade-up" className="section-title" style={{ color: '#EF4444' }}>CÁC LĨNH VỰC ĐÀO TẠO</h2>
            <div data-aos="fade-up" className="field-list">
                {trainingFields.map((field, i) => (
                    <div className="field-card" key={i}>
                        <div className="field-icon">🔴</div>
                        <h4>{field.title}</h4>
                        <p>{field.desc}</p>
                    </div>
                ))}
            </div>

            <h2 data-aos="fade-up" className="section-title" style={{ color: '#EF4444' }}>DANH SÁCH CÁN BỘ VIÊN CHỨC</h2>
            <div data-aos="fade-up" className="bg-white rounded-[2rem] shadow-xl text-center px-4 py-6 max-w-xs mx-auto mb-8">
                {/* Hình tròn nền vàng và ảnh */}
                <div className="relative w-28 h-28 mx-auto">
                    <div className="absolute inset-0 rounded-full bg-yellow-400 z-0" />
                    <img
                        src="https://vku.udn.vn/wp-content/uploads/2023/10/Huynh-Ngoc-Tho.png"
                        alt="TS. Huỳnh Ngọc Thọ"
                        className="relative w-full h-full object-cover rounded-full"
                    />
                </div>

                {/* Tên & mô tả */}
                <h3 className="text-lg font-bold text-blue-900 mt-4 leading-snug">
                    TS. Huỳnh Ngọc Thọ
                </h3>
                <h4 className="text-lg font-bold text-red-500 mt-4 leading-snug">
                    Giám Đốc
                </h4>

                <p className="border-t text-center text-gray-600">
                    <br />
                    <a class="link" target="_blank" href="http://scv.udn.vn/huynhngoctho" rel="noopener">Scientific CV</a><br />
                    <a href="mailto:hntho@vku.udn.vn" className="text-gray-600 hover:underline">hntho@vku.udn.vn</a><br />
                    <a href="tel:+842363962378" className="text-gray-600 hover:underline">0236.3.962.378</a>
                </p>


            </div>
            <div data-aos="fade-up" className="bg-white rounded-[2rem] shadow-xl text-center px-4 py-6 max-w-xs mx-auto">
                {/* Hình tròn nền vàng và ảnh */}
                <div className="relative w-28 h-28 mx-auto">
                    <div className="absolute inset-0 rounded-full bg-yellow-400 z-0" />
                    <img
                        src="https://vku.udn.vn/wp-content/uploads/2023/08/Nguyen-Thi-Thu-Ngan.png"
                        alt="ThS. Nguyễn Thị Thu Ngân"
                        className="relative w-full h-full object-cover rounded-full"
                    />
                </div>
                {/* Tên & mô tả */}
                <h3 className="text-lg font-bold text-blue-900 mt-4 leading-snug">
                    ThS. Nguyễn Thị Thu Ngân
                </h3>
                <h4 className="text-lg font-bold text-red-500 mt-4 leading-snug">
                    Phó Giám Đốc
                </h4>

                <p className="border-t text-center text-gray-600">
                    <br />
                    <a class="link" target="_blank" href="https://scv.udn.vn/ngannt" rel="noopener">Scientific CV</a><br />
                    <a href="mailto:hntho@vku.udn.vn" className="text-gray-600 hover:underline">hntho@vku.udn.vn</a><br />
                    <a href="tel:+842363962378" className="text-gray-600 hover:underline">0236.3.962.378</a>
                </p>

            </div>

        </div>
    );
};

export default Introduce;


