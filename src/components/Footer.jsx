const Footer = () => {
  return (
    <footer className="bg-blue-800 text-white py-8 mt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-8">

          {/* Left: Contact & Courses */}
          <div className="space-y-4 md:w-2/3">
            <div>
              <h3 className="text-xl font-medium mb-2">Trung tâm Ngoại ngữ - Tin học</h3>
              <p className="text-white text-sm">
                Địa chỉ: 470 Trần Đại Nghĩa, Q. Ngũ Hành Sơn, Tp. Đà Nẵng
                <br />
                Điện thoại: 0236.3.667.117
                <br />
                Email: flic@vku.edu.vn
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Khóa học</h4>
              <ul className="text-blue-100 text-sm grid grid-cols-2 gap-x-4 gap-y-1 md:block md:space-y-1">
                <li>TOEIC Listening & Reading</li>
                <li>TOEIC Speaking & Writing</li>
                <li>MOS Office</li>
                <li>VSTEP</li>
              </ul>
            </div>
          </div>

          {/* Right: Follow & Copyright */}
          <div className="md:w-1/3 flex flex-col items-center md:items-start space-y-4">
            <div className="text-center md:text-right">
              <h4 className="font-semibold mb-2">Theo dõi chúng tôi</h4>
              <div className="flex justify-center md:justify-start space-x-3">
                <a href="#" className="text-blue-100 hover:text-white transition-colors">Facebook</a>
                <a href="#" className="text-blue-100 hover:text-white transition-colors">Zalo</a>
              </div>
            </div>
            <p className="text-blue-100 text-xs text-center md:text-right mt-2 border-t border-blue-500 pt-2 w-full md:w-auto">
              © 2025 Trung tâm Ngoại ngữ - Tin học. Tất cả quyền được bảo lưu.
            </p>
          </div>

        </div>
      </div>
    </footer>
  )
}
export default Footer;