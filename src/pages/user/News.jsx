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
import { getNews } from "../../services/Student/News";


export default function News() {

  const [activeCategory, setActiveCategory] = useState("all");
  const [newsList, setNewsList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const categories = [
    { id: "all", name: "Tất cả", tag: "#ALL" },
    { id: "vku", name: "VKU", tag: "#VKU" },
    { id: "flic", name: "FLIC", tag: "#FLIC" },
    { id: "toeic", name: "TOEIC", tag: "#TOEIC" },
    { id: "ielts", name: "IELTS", tag: "#IELTS" },
    { id: "vstep", name: "VSTEP", tag: "#VSTEP" },
    { id: "mos", name: "MOS", tag: "#MOS" },
  ];

  useEffect(() => {
    setLoading(true);
    getNews()
      .then((data) => {
        console.log('News page - API response:', data);
        // Handle different possible response structures
        let newsData = [];
        if (Array.isArray(data)) {
          newsData = data;
        } else if (data && Array.isArray(data.value)) {
          // API trả về object với property 'value' chứa array
          newsData = data.value;
        } else if (data && Array.isArray(data.data)) {
          newsData = data.data;
        } else if (data && data.content && Array.isArray(data.content)) {
          newsData = data.content;
        }
        setNewsList(newsData);
        setLoading(false);
      })
      .catch((err) => {
        console.error('News page - API error:', err);
        setError("Lỗi khi tải tin tức");
        setLoading(false);
      });
  }, []);

  // Xử lý phân loại, phân trang, nổi bật dựa trên newsList
  // featuredNews: top 3 bài mới nhất
  const sortedNews = [...newsList].sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt));
  const featuredNews = sortedNews.slice(0, 3);
  const sortedFeaturedNews = [...featuredNews].sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt));
  const [featuredIndex, setFeaturedIndex] = useState(1); // bắt đầu từ 1 vì slides sẽ được clone
  const [isTransitioning, setIsTransitioning] = useState(true);
  const [isPaused, setIsPaused] = useState(false);
  
  // Safely create slides array with fallback for empty data
  const slides = sortedFeaturedNews.length > 0 ? [
    sortedFeaturedNews[sortedFeaturedNews.length - 1],
    ...sortedFeaturedNews,
    sortedFeaturedNews[0],
  ] : [];

  // recentNews: tất cả tin, trừ featured
  const recentNews = sortedNews.filter(n => !featuredNews.some(f => f.id === n.id));
  // Sắp xếp recentNews theo ngày giảm dần
  const sortedRecentNews = [...recentNews].sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt));
  const filteredRecentNews = activeCategory === "all"
    ? sortedRecentNews
    : sortedRecentNews.filter(news => (news.category || '').toLowerCase() === activeCategory.toLowerCase());
  const [recentIndex, setRecentIndex] = useState(0);
  const recentPerPage = 4;
  const maxRecentIndex = Math.max(0, filteredRecentNews.length - recentPerPage);
  const paginatedRecentNews = filteredRecentNews.slice(recentIndex, recentIndex + recentPerPage);

  useEffect(() => {
    if (recentIndex >= filteredRecentNews.length) {
      setRecentIndex(0);
    }
  }, [activeCategory, filteredRecentNews.length]);

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

  const navigate = useNavigate();

  if (loading) {
    return <div className="text-center py-20 text-blue-600 text-xl">Đang tải tin tức...</div>;
  }
  if (error) {
    return <div className="text-center py-20 text-red-500 text-xl">{error}</div>;
  }

  return (
    <main className="container mx-auto px-4 py-8">
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
                {slides.length > 0 ? (
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
                    {slides.map((item, idx) => {
                      // Safety check for undefined items
                      if (!item) return null;
                      return (
                        <img
                          key={idx + '-' + (item.id || idx)}
                          src={item.avatarUrl || item.image || "/placeholder.svg"}
                          alt={item.title || "News image"}
                          className="w-full h-80 object-cover flex-shrink-0 flex-grow-0 cursor-pointer"
                          style={{ minWidth: "100%" }}
                          onClick={() => navigate(`/news/${item.id}`)}
                        />
                      );
                    })}
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
                  {slides[featuredIndex] && (
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6 pointer-events-none">
                      <h2 className="text-white text-xl font-bold mb-2 line-clamp-2">{slides[featuredIndex].title}</h2>
                      <p className="text-gray-200 text-sm line-clamp-2 mb-2">
                        {new Date(slides[featuredIndex].publishedAt).toLocaleDateString('vi-VN')}
                      </p>
                    </div>
                  )}
                  </div>
                ) : (
                  <div className="h-80 flex items-center justify-center bg-gray-100">
                    <div className="text-center text-gray-500">
                      <p className="text-lg">Không có tin tức nổi bật</p>
                      <p className="text-sm">Hãy thử lại sau</p>
                    </div>
                  </div>
                )}
              </div>

              {/* Carousel Dots */}
              {slides.length > 0 && (
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
              )}
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
                    <img src={news.avatarUrl || "/placeholder.svg"} alt={news.title} className="w-full h-48 object-cover" />
                    <div className="p-4">
                      <h3 className="font-semibold text-gray-900 mb-2 text-sm line-clamp-2 min-h-[40px]">
                        {news.title}
                      </h3>
                      <div className="flex items-center justify-between text-xs text-gray-500">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          <span>{new Date(news.publishedAt).toLocaleDateString('vi-VN')}</span>
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
                {sortedFeaturedNews.length > 0 ? sortedFeaturedNews.map((news) => (
                  <div key={news.id} className="flex gap-3 cursor-pointer" onClick={() => navigate(`/news/${news.id}`)}>
                    <img
                      src={news.avatarUrl || "/placeholder.svg"}
                      alt={news.title}
                      className="w-16 h-16 object-cover rounded"
                    />
                    <div className="flex-1">
                      <h4 className="text-sm font-medium text-gray-900 line-clamp-2 mb-1">{news.title}</h4>
                      <p className="text-xs text-gray-500">
                        {new Date(news.publishedAt).toLocaleDateString('vi-VN')}
                      </p>
                    </div>
                  </div>
                )) : (
                  <div className="text-center text-gray-500 py-4">
                    <p className="text-sm">Không có tin tức nổi bật</p>
                  </div>
                )}
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
                  <img src={news.avatarUrl || "/placeholder.svg"} alt={news.title} className="w-40 h-32 object-cover flex-shrink-0" />
                  <div className="p-4 flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2 text-base">{news.title}</h3>
                    </div>
                    <div className="flex items-center justify-between text-xs text-gray-500 mt-2">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        <span>{new Date(news.publishedAt).toLocaleDateString('vi-VN')}</span>
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
