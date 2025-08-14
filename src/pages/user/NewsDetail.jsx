"use client";

import { useParams } from "react-router-dom";
import { Calendar, User, Tag, Facebook, Twitter, Link } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ieltsImg from "../../assets/images/IELTS.jpg";
import vkuImg from "../../assets/images/vku.jpg";
import mosImg from "../../assets/images/mos.webp";
import viteImg from "../../assets/images/vku.jpg";
import vstepImg from "../../assets/images/VSTEP.jpg";
import toeicImg from "../../assets/images/toeic.jpg";
import { getNewsDetail, getNews } from "../../services/Student/News";

export default function NewsDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [article, setArticle] = useState(null);
  const [relatedNews, setRelatedNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingRelated, setLoadingRelated] = useState(false);
  const [error, setError] = useState(null);
  const [permissionWarning, setPermissionWarning] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchNewsDetail();
  }, [id]);

  const fetchNewsDetail = async () => {
    try {
      setLoading(true);
      setError(null);
      setPermissionWarning(null);
      
      console.log(`Fetching news detail for ID: ${id}`);
      
      // Lấy chi tiết tin tức theo ID từ API
      const newsDetail = await getNewsDetail(id);
      
      console.log('News detail response:', newsDetail);
      
      // Kiểm tra response và xử lý dữ liệu
      if (newsDetail) {
        setArticle(newsDetail);
        
        // Lấy danh sách tin tức để tìm bài liên quan
        try {
          setLoadingRelated(true);
          console.log('Fetching related news...');
          const allNews = await getNews();
          console.log('All news response:', allNews);
          
          // Kiểm tra allNews có phải là array không
          if (Array.isArray(allNews)) {
            // Tìm bài liên quan (loại trừ bài hiện tại)
            let related = allNews.filter(
              (item) => item.id !== newsDetail.id
            );
            
            // Chỉ lấy tối đa 4 bài
            setRelatedNews(related.slice(0, 4));
            console.log('Related news set:', related.slice(0, 4));
          } else {
            console.warn('All news is not an array:', allNews);
            setRelatedNews([]);
          }
        } catch (relatedError) {
          console.warn("Không thể tải tin tức liên quan:", relatedError);
          setRelatedNews([]);
        } finally {
          setLoadingRelated(false);
        }
      } else {
        throw new Error("Dữ liệu tin tức không hợp lệ");
      }
      
    } catch (err) {
      console.error("Error fetching news detail:", err);
      console.error("Error details:", {
        message: err.message,
        response: err.response,
        status: err.response?.status,
        data: err.response?.data
      });
      // Fallback khi bị 403: thử lấy danh sách và hiển thị thông tin cơ bản
      if (err.response?.status === 403) {
        try {
          setLoadingRelated(true);
          const allNews = await getNews();
          if (Array.isArray(allNews)) {
            const fallbackItem = allNews.find((n) => String(n.id) === String(id));
            if (fallbackItem) {
              setArticle(fallbackItem);
              // setPermissionWarning(
              //   "Bạn không có quyền xem toàn bộ nội dung. Đang hiển thị thông tin cơ bản."
              // );
              const related = allNews.filter((item) => item.id !== fallbackItem.id);
              setRelatedNews(related.slice(0, 4));
              return;
            }
          }
        } catch (fallbackErr) {
          console.warn("Fallback list fetch failed:", fallbackErr);
        } finally {
          setLoadingRelated(false);
        }
      }

      if (err.response?.status === 404) {
        setError("Không tìm thấy tin tức với ID này");
      } else if (err.response?.status >= 500) {
        setError("Lỗi server, vui lòng thử lại sau");
      } else if (err.message.includes("Network Error") || err.message.includes("timeout")) {
        setError("Không thể kết nối đến server. Vui lòng kiểm tra kết nối mạng");
      } else {
        setError(`Không thể tải chi tiết tin tức: ${err.message}`);
      }
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Đang tải...</p>
        </div>
      </div>
    );
  }

  if (error || !article) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center py-20">
          <div className="text-red-500 text-xl mb-4">
            {error || "404. Không tìm thấy tin tức"}
          </div>
          <button 
            onClick={fetchNewsDetail}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Thử lại
          </button>
        </div>
      </div>
    );
  }

  return (
    <main className="container mx-auto px-4 py-8">
      {/* Breadcrumb */}
      {/* <div className="text-blue-600 text-sm mb-6">
        <span>Trang chủ</span>
        <span className="mx-2 text-gray-400">»</span>
        <span>Tin Tức</span>
      </div> */}

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Main Content */}
        <div className="flex-1">
          <article className="bg-white rounded-lg shadow-sm overflow-hidden">
            {/* Article Header */}
            <div className="p-6 border-b">
              {permissionWarning && (
                <div className="mb-4 p-3 rounded bg-yellow-50 text-yellow-800 text-sm">
                  {permissionWarning}
                </div>
              )}
              <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4 leading-tight">
                {article.title}
              </h1>

              {/* Article Meta */}
              <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 mb-4">
                <div className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  <span>{new Date(article.publishedAt).toLocaleDateString('vi-VN')}</span>
                </div>
                <div className="flex items-center gap-1">
                  <User className="w-4 h-4" />
                  <span>ID: {article.id}</span>
                </div>
              </div>

              {/* Share Buttons */}
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-600">Chia sẻ:</span>
                <button className="p-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors">
                  <Facebook className="w-4 h-4" />
                </button>
                <button className="p-2 bg-sky-500 text-white rounded hover:bg-sky-600 transition-colors">
                  <Twitter className="w-4 h-4" />
                </button>
                <button className="p-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition-colors">
                  <Link className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Article Image */}
            <div className="relative">
              <img
                src={article.avatarUrl || vkuImg}
                alt={article.title}
                className="w-full h-96 object-cover"
              />
            </div>

            {/* Article Content */}
            <div className="p-6">
              <div
                className="prose prose-lg max-w-none text-gray-700 leading-relaxed"
                dangerouslySetInnerHTML={{ __html: article.content || '' }}
              />

              {/* Comment Section */}
              <div className="card mt-6">
                <div className="card-content p-6">
                  <h3 className="text-lg font-semibold mb-4">Bình luận (3)</h3>
                  <div className="space-y-4">
                    {/* Comment 1 */}
                    <div className="flex gap-3">
                      <div className="avatar w-10 h-10">
                        <img
                          src={vstepImg}
                          alt="avatar"
                          className="rounded-full w-10 h-10 object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <div className="bg-gray-100 rounded-lg p-3">
                          <div className="font-medium text-sm">Nguyễn Thu Huệ</div>
                          <p className="text-sm text-gray-700 mt-1">
                            Chúc mừng các bạn sinh viên VKU! Hy vọng các bạn sẽ
                            bảo vệ khóa luận thành công và có những định hướng
                            tốt cho tương lai.
                          </p>
                        </div>
                        <div className="flex items-center gap-4 mt-2 text-xs text-gray-500">
                          <span>2 giờ trước</span>
                          <button className="hover:text-blue-600">Thích</button>
                          <button className="hover:text-blue-600">
                            Trả lời
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Comment 2 */}
                    <div className="flex gap-3">
                      <div className="avatar w-10 h-10">
                        <img
                          src="/vu.jpg?height=40&width=40"
                          alt="avatar"
                          className="rounded-full"
                        />
                      </div>
                      <div className="flex-1">
                        <div className="bg-gray-100 rounded-lg p-3">
                          <div className="font-medium text-sm">Minh Tuấn</div>
                          <p className="text-sm text-gray-700 mt-1">
                            Trường VKU luôn chú trọng chất lượng đào tạo. Rất tự
                            hào khi là sinh viên của trường!
                          </p>
                        </div>
                        <div className="flex items-center gap-4 mt-2 text-xs text-gray-500">
                          <span>1 giờ trước</span>
                          <button className="hover:text-blue-600">Thích</button>
                          <button className="hover:text-blue-600">
                            Trả lời
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Comment 3 */}
                    <div className="flex gap-3">
                      <div className="avatar w-10 h-10">
                        <img
                          src={vkuImg}
                          alt="avatar"
                          className="rounded-full"
                        />
                      </div>
                      <div className="flex-1">
                        <div className="bg-gray-100 rounded-lg p-3">
                          <div className="font-medium text-sm">Thu Hà</div>
                          <p className="text-sm text-gray-700 mt-1">
                            Cảm ơn nhà trường đã tổ chức buổi thông tin rất hữu
                            ích. Chúng em sẽ chuẩn bị thật tốt cho khóa luận!
                          </p>
                        </div>
                        <div className="flex items-center gap-4 mt-2 text-xs text-gray-500">
                          <span>30 phút trước</span>
                          <button className="hover:text-blue-600">Thích</button>
                          <button className="hover:text-blue-600">
                            Trả lời
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </article>
        </div>

        {/* Sidebar */}
        <div className="lg:w-80">
          {/* Related News */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
              <div className="w-2 h-5 rounded-full bg-red-500"></div>
              Tin tức liên quan
            </h3>
            {loadingRelated ? (
              <div className="text-center py-4">
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600 mx-auto"></div>
                <p className="mt-2 text-sm text-gray-600">Đang tải...</p>
              </div>
            ) : relatedNews.length > 0 ? (
              <div className="space-y-4">
                {relatedNews.map((news) => (
                  <div
                    key={news.id}
                    className="flex gap-3 cursor-pointer hover:bg-gray-50 p-2 rounded transition-colors"
                    onClick={() => navigate(`/news/${news.id}`)}
                  >
                    <img
                      src={news.avatarUrl || vkuImg}
                      alt={news.title}
                      className="w-16 h-16 object-cover rounded"
                    />
                    <div className="flex-1">
                      <h4 className="text-sm font-medium text-gray-900 line-clamp-2 mb-1">
                        {news.title}
                      </h4>
                      <p className="text-xs text-gray-500">
                        {new Date(news.publishedAt).toLocaleDateString('vi-VN')}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-4 text-gray-500">
                <p className="text-sm">Không có tin tức liên quan</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
