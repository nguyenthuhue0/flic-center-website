"use client"

import { useState } from "react"
import { ChevronLeft, ChevronRight, Calendar } from "lucide-react"
import React, { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import ieltsImg from "../../assets/images/IELTS.jpg";
import vkuImg from "../../assets/images/vku.jpg";
import mosImg from "../../assets/images/mos.webp";
import viteImg from "../../assets/images/vku.jpg"; 
import vstepImg from "../../assets/images/VSTEP.jpg";
import toeicImg from "../../assets/images/toeic.jpg";


export default function News() {
  const [activeCategory, setActiveCategory] = useState("all")

  const categories = [
    { id: "all", name: "Tất cả", tag: "#ALL" },
    { id: "vku", name: "VKU", tag: "#VKU" },
    { id: "flic", name: "FLIC", tag: "#FLIC" },
    { id: "toeic", name: "TOEIC", tag: "#TOEIC" },
    { id: "ielts", name: "IELTS", tag: "#IELTS" },
    { id: "vstep", name: "VSTEP", tag: "#VSTEP" },
    { id: "mos", name: "MOS", tag: "#MOS" },
  ]

  // Thêm nhiều tin nổi bật để có thể slide
  const featuredNews = [
    {
      id: 1,
      title: "VKU: Bảo vệ khóa luận tốt nghiệp, khẳng định chất lượng và định hướng mạnh mẽ hội nhập toàn cầu",
      excerpt:
        "Trung tâm Ngoại ngữ - Tin học là đơn vị trực thuộc Trường Đại học Công nghệ Thông tin và Truyền thông Việt - Hàn...",
      image: vkuImg,
      category: "VKU",
      date: "09/07/2025",
      author: "FLIC",
      views: 35,
    },
    {
      id: 2,
      title: "FLIC: Khai giảng khóa học mới, mở rộng cơ hội cho sinh viên",
      excerpt:
        "Khóa học mới tại FLIC giúp sinh viên nâng cao kỹ năng ngoại ngữ và tin học, đáp ứng nhu cầu hội nhập...",
      image: vkuImg,
      category: "FLIC",
      date: "10/07/2025",
      author: "Admin",
      views: 20,
    },
    {
      id: 3,
      title: "TOEIC: Cập nhật lịch thi và các lưu ý quan trọng cho thí sinh",
      excerpt:
        "Các thí sinh cần chú ý lịch thi TOEIC mới nhất và chuẩn bị đầy đủ giấy tờ cần thiết...",
      image: vkuImg,
      category: "TOEIC",
      date: "11/07/2025",
      author: "FLIC",
      views: 15,
    },
  ]

  // Sắp xếp featuredNews theo lượt xem giảm dần
  const sortedFeaturedNews = [...featuredNews].sort((a, b) => b.views - a.views);

  // State cho index của tin nổi bật đang hiển thị
  const [featuredIndex, setFeaturedIndex] = useState(1) // bắt đầu từ 1 vì slides sẽ được clone
  const [isTransitioning, setIsTransitioning] = useState(true)
  const [isPaused, setIsPaused] = useState(false)

  // Tạo slides với clone đầu/cuối dựa trên sortedFeaturedNews
  const slides = [
    sortedFeaturedNews[sortedFeaturedNews.length - 1],
    ...sortedFeaturedNews,
    sortedFeaturedNews[0],  
  ]

  // Hàm chuyển slide
  const handlePrev = () => {
    if (isTransitioning) {
      setFeaturedIndex((prev) => prev - 1)
    }
  }
  const handleNext = () => {
    if (isTransitioning) {
      setFeaturedIndex((prev) => prev + 1)
    }
  }

  // Khi transition kết thúc, xử lý nhảy về slide thực sự nếu ở clone
  const handleTransitionEnd = () => {
    if (featuredIndex === 0) {
      setIsTransitioning(false)
      setFeaturedIndex(sortedFeaturedNews.length)
    } else if (featuredIndex === slides.length - 1) {
      setIsTransitioning(false)
      setFeaturedIndex(1)
    }
  }

  // Khi index thay đổi mà không transition, bật lại transition
  React.useEffect(() => {
    if (!isTransitioning) {
      setTimeout(() => setIsTransitioning(true), 20)
    }
  }, [isTransitioning])

  // Auto-play: tự động chuyển slide khi không pause
  React.useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setFeaturedIndex((prev) => prev + 1)
    }, 2000)
    return () => clearInterval(interval)
  }, [isPaused])

  // Khi click dot
  const handleDotClick = (idx) => {
    setFeaturedIndex(idx + 1)
  }

  // Đảm bảo recentNews có trường views
  const recentNews = [
    {
      id: 1,
      title: "VKU: Bảo vệ khóa luận tốt nghiệp, khẳng định chất lượng và hội nhập toàn cầu",
      excerpt: "Lễ bảo vệ khóa luận tốt nghiệp diễn ra thành công, khẳng định chất lượng đào tạo của VKU.",
      image: vkuImg,
      category: "VKU",
      date: "09 - 07 - 2025",
      author: "Admin VKU",
      views: 35,
    },
    {
      id: 2,
      title: "FLIC: Khai giảng khóa học Tin học ứng dụng mới",
      excerpt: "Khóa học Tin học ứng dụng tại FLIC thu hút đông đảo sinh viên tham gia.",
      image: vkuImg,
      category: "FLIC",
      date: "10 - 07 - 2025",
      author: "FLIC Team",
      views: 20,
    },
    {
      id: 3,
      title: "TOEIC: Cập nhật lịch thi tháng 7/2025",
      excerpt: "Lịch thi TOEIC mới nhất đã được cập nhật, sinh viên chú ý đăng ký đúng hạn.",
      image: toeicImg,
      category: "TOEIC",
      date: "11 - 07 - 2025",
      author: "TOEIC Center",
      views: 15,
    },
    {
      id: 4,
      title: "IELTS: Chia sẻ kinh nghiệm đạt 8.0+ từ sinh viên VKU",
      excerpt: "Sinh viên VKU chia sẻ bí quyết học IELTS hiệu quả, đạt điểm cao trong kỳ thi.",
      image: ieltsImg,
      category: "IELTS",
      date: "12 - 07 - 2025",
      author: "IELTS Club",
      views: 10,
    },
    {
      id: 5,
      title: "VSTEP: Hướng dẫn đăng ký thi và ôn tập hiệu quả",
      excerpt: "Các bước đăng ký thi VSTEP và tài liệu ôn tập dành cho sinh viên.",
      image: vstepImg,
      category: "VSTEP",
      date: "13 - 07 - 2025",
      author: "VSTEP Team",
      views: 8,
    },
    {
      id: 6,
      title: "MOS: Kết quả thi và trao chứng chỉ tháng 6/2025",
      excerpt: "Danh sách sinh viên đạt chứng chỉ MOS tháng 6/2025 đã được công bố.",
      image: mosImg,
      category: "MOS",
      date: "14 - 07 - 2025",
      author: "MOS Center",
      views: 12,
    },
    {
      id: 7,
      title: "FLIC: Workshop kỹ năng mềm cho sinh viên năm nhất",
      excerpt: "Workshop giúp sinh viên năm nhất nâng cao kỹ năng mềm, chuẩn bị cho học kỳ mới.",
      image: vkuImg,
      category: "FLIC",
      date: "15 - 07 - 2025",
      author: "FLIC Team",
      views: 9,
    },
    {
      id: 8,
      title: "VKU: Đạt giải thưởng sáng tạo trẻ toàn quốc",
      excerpt: "Nhóm sinh viên VKU xuất sắc giành giải thưởng sáng tạo trẻ năm 2025.",
      image: vkuImg,
      category: "VKU",
      date: "16 - 07 - 2025",
      author: "Admin VKU",
      views: 14,
    },
  ];

  // Sắp xếp recentNews theo views giảm dần để lấy sidebarNews
  const sidebarNews = [...recentNews].sort((a, b) => b.views - a.views).slice(0, 4);

  // State cho index của nhóm recentNews đang hiển thị
  const [recentIndex, setRecentIndex] = useState(0)
  const recentPerPage = 4
  const maxRecentIndex = Math.max(0, recentNews.length - recentPerPage)

  const handleRecentPrev = () => {
    setRecentIndex((prev) => Math.max(0, prev - 1))
  }
  const handleRecentNext = () => {
    setRecentIndex((prev) => Math.min(maxRecentIndex, prev + 1))
  }

  const navigate = useNavigate();

  // Hàm chuyển đổi date string về dạng Date để so sánh
  function parseDate(dateStr) {
    // Hỗ trợ cả '09 - 07 - 2025' và '09/07/2025'
    const parts = dateStr.includes('/') ? dateStr.split('/') : dateStr.split(' - ');
    // parts: [day, month, year]
    return new Date(parts[2], parts[1] - 1, parts[0]);
  }

  // Sắp xếp recentNews theo ngày giảm dần
  const sortedRecentNews = [...recentNews].sort((a, b) => parseDate(b.date) - parseDate(a.date));

  // Lọc recentNews theo category
  const filteredRecentNews = activeCategory === "all"
    ? sortedRecentNews
    : sortedRecentNews.filter(news => news.category.toLowerCase() === activeCategory.toLowerCase());

  // Phân trang trên filteredRecentNews
  const paginatedRecentNews = filteredRecentNews.slice(recentIndex, recentIndex + recentPerPage);

  useEffect(() => {
    if (recentIndex >= filteredRecentNews.length) {
      setRecentIndex(0);
    }
  }, [activeCategory, filteredRecentNews.length]);

  return (
    <main className="container mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <div className="text-blue-600 text-sm mb-6">
        <span>Trang chủ</span>
        <span className="mx-2 text-gray-400">»</span>
        <span>Tin tức</span>
      </div>

      {/* Category Tags */}
      <div className="flex flex-wrap gap-2 mb-8 overflow-x-auto">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => {
              setActiveCategory(category.id);
              setRecentIndex(0);
            }}
            className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${activeCategory === category.id ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
          >
            {category.tag}
          </button>
        ))}
        <button className="p-2 rounded-full bg-gray-200 hover:bg-gray-300 transition-colors">
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      {activeCategory === "all" ? (
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main Content */}
          <div className="flex-1">
            {/* Featured News Carousel */}
            <div className="relative mb-8">
              <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                <div
                  className="relative h-80"
                  onMouseEnter={() => setIsPaused(true)}
                  onMouseLeave={() => setIsPaused(false)}
                >
                  {/* Slide wrapper */}
                  <div
                    className="w-full h-80 flex"
                    style={{
                      transform: `translateX(-${featuredIndex * 100}%)`,
                      transition: isTransitioning ? 'transform 0.5s' : 'none',
                    }}
                    onTransitionEnd={handleTransitionEnd}
                  >
                    {slides.map((item, idx) => (
                      <img
                        key={idx + '-' + item.id}
                        src={item.image || "/placeholder.svg"}
                        alt={item.title}
                        className="w-full h-80 object-cover flex-shrink-0 flex-grow-0 cursor-pointer"
                        style={{ minWidth: "100%" }}
                        onClick={() => navigate(`/news/${item.id}`)}
                      />
                    ))}
                  </div>
                  {/* Nút chuyển trái/phải */}
                  <button
                    className="absolute top-1/2 left-4 -translate-y-1/2 bg-black/40 hover:bg-blue-600 active:scale-95 text-white p-2 rounded-full z-20 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-400"
                    onClick={handlePrev}
                    aria-label="Previous"
                    tabIndex={0}
                    style={{ pointerEvents: 'auto' }}
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    className="absolute top-1/2 right-4 -translate-y-1/2 bg-black/40 hover:bg-blue-600 active:scale-95 text-white p-2 rounded-full z-20 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-400"
                    onClick={handleNext}
                    aria-label="Next"
                    tabIndex={0}
                    style={{ pointerEvents: 'auto' }}
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                  {/* Overlay info */}
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6 pointer-events-none">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="bg-blue-600 text-white px-2 py-1 rounded text-xs font-medium">
                        {slides[featuredIndex].category}
                      </span>
                    </div>
                    <h2 className="text-white text-xl font-bold mb-2 line-clamp-2">{slides[featuredIndex].title}</h2>
                    <p className="text-gray-200 text-sm line-clamp-2 mb-2">{slides[featuredIndex].excerpt}</p>
                  </div>
                </div>
              </div>

              {/* Carousel Dots */}
              <div className="flex justify-center gap-2 mt-4">
                {sortedFeaturedNews.map((_, idx) => (
                  <button
                    key={idx}
                    className={`w-2 h-2 rounded-full transition-colors ${featuredIndex === idx + 1 ? "bg-blue-600" : "bg-gray-300"}`}
                    onClick={() => handleDotClick(idx)}
                    aria-label={`Go to slide ${idx + 1}`}
                  />
                ))}
              </div>
            </div>

            {/* Recent News Section */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                  <div className="w-2 h-5 rounded-full bg-red-500"></div>
                  Tin tức gần đây
                </h2>
                {/* Bỏ nút chuyển trái/phải */}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {paginatedRecentNews.map((news) => (
                  <div
                    key={news.id}
                    className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow cursor-pointer"
                    onClick={() => navigate(`/news/${news.id}`)}
                  >
                    <img src={news.image || "/placeholder.svg"} alt={news.title} className="w-full h-48 object-cover" />
                    <div className="p-4">
                      <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2 text-sm">{news.title}</h3>
                      <p className="text-gray-600 text-xs mb-3 line-clamp-2">{news.excerpt}</p>
                      <div className="flex items-center justify-between text-xs text-gray-500">
                        <div className="flex items-center gap-1">
                          <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center">
                            <span className="text-white text-xs font-medium">{news.category.charAt(0)}</span>
                          </div>
                          <span>{news.category}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          <span>{news.date}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Phân trang dựa trên filteredRecentNews */}
              <div className="flex justify-center mt-6 gap-2">
                {Array.from({ length: Math.ceil(filteredRecentNews.length / recentPerPage) }).map((_, pageIdx) => (
                  <button
                    key={pageIdx}
                    className={`w-8 h-8 rounded-full font-semibold border transition-colors ${recentIndex / recentPerPage === pageIdx ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-blue-600 border-blue-300 hover:bg-blue-100'}`}
                    onClick={() => setRecentIndex(pageIdx * recentPerPage)}
                  >
                    {pageIdx + 1}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:w-80">
            {/* Tags */}
            <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
              {/* <h3 className="font-bold text-gray-900 mb-4">
                <Circle className="text-red-600 fill-red-600 w-4 h-4 rounded-full" />Tags
              </h3> */}
              <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                <div className="w-2 h-5 rounded-full bg-red-500"></div>
                Tags
              </h3>
              <div className="flex flex-wrap gap-2">
                <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">VKU</span>
                <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">Tốt nghiệp</span>
                <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">2021-2025</span>
                <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">FLIC</span>
                <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">Bảo vệ khóa luận</span>
              </div>
            </div>

            {/* Featured News */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                <div className="w-2 h-5 rounded-full bg-red-500"></div>
                Tin tức nổi bật
              </h3>
              <div className="space-y-4">
                {sidebarNews.map((news) => (
                  <div key={news.id} className="flex gap-3 cursor-pointer" onClick={() => navigate(`/news/${news.id}`)}>
                    <img
                      src={news.image || "/placeholder.svg"}
                      alt={news.title}
                      className="w-16 h-16 object-cover rounded"
                    />
                    <div className="flex-1">
                      <h4 className="text-sm font-medium text-gray-900 line-clamp-2 mb-1">{news.title}</h4>
                      <p className="text-xs text-gray-500">{news.date}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      ) : (
        // Khi lọc category, chỉ hiển thị recentNews dạng list, ẩn các phần khác
        <div className="max-w-2xl mx-auto">
          <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2 mb-6">
            <div className="w-2 h-5 rounded-full bg-red-500"></div>
            {categories.find(c => c.id === activeCategory)?.tag || "#TAG"}
          </h2>
          <div className="flex flex-col gap-6">
            {paginatedRecentNews.length === 0 ? (
              <div className="text-center text-gray-500 py-8">Không có bài viết nào thuộc chủ đề này.</div>
            ) : (
              paginatedRecentNews.map((news) => (
                <div
                  key={news.id}
                  className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow cursor-pointer flex"
                  onClick={() => navigate(`/news/${news.id}`)}
                >
                  <img src={news.image || "/placeholder.svg"} alt={news.title} className="w-40 h-32 object-cover flex-shrink-0" />
                  <div className="p-4 flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2 text-base">{news.title}</h3>
                      <p className="text-gray-600 text-xs mb-3 line-clamp-2">{news.excerpt}</p>
                    </div>
                    <div className="flex items-center justify-between text-xs text-gray-500 mt-2">
                      <div className="flex items-center gap-1">
                        <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center">
                          <span className="text-white text-xs font-medium">{news.category.charAt(0)}</span>
                        </div>
                        <span>{news.category}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        <span>{news.date}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
          {/* Phân trang */}
          {filteredRecentNews.length > recentPerPage && (
            <div className="flex justify-center mt-6 gap-2">
              {Array.from({ length: Math.ceil(filteredRecentNews.length / recentPerPage) }).map((_, pageIdx) => (
                <button
                  key={pageIdx}
                  className={`w-8 h-8 rounded-full font-semibold border transition-colors ${recentIndex / recentPerPage === pageIdx ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-blue-600 border-blue-300 hover:bg-blue-100'}`}
                  onClick={() => setRecentIndex(pageIdx * recentPerPage)}
                >
                  {pageIdx + 1}
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </main>
  )
}
