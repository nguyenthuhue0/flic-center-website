"use client";

import { useParams } from "react-router-dom";
import { Calendar, User, Tag, Facebook, Twitter, Link } from "lucide-react";
// import { Card, CardContent } from "@/components/ui/card"
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ieltsImg from "../../assets/images/IELTS.jpg";
import vkuImg from "../../assets/images/vku.jpg";
import mosImg from "../../assets/images/mos.webp";
import viteImg from "../../assets/images/vku.jpg";
import vstepImg from "../../assets/images/VSTEP.jpg";
import toeicImg from "../../assets/images/toeic.jpg";

const newsData = [
  {
    id: 1,
    title:
      "VKU: Bảo vệ khóa luận tốt nghiệp, khẳng định chất lượng và định hướng mạnh mẽ hội nhập toàn cầu",
    content: `
      <p>Từ ngày 30/6 đến ngày 5/7/2025, Trường Đại học Công nghệ Thông tin và Truyền thông Việt – Hàn (VKU), Đại học Đà Nẵng đã tổ chức thành công lễ bảo vệ khóa luận tốt nghiệp...</p>
      <p>Điểm nhấn nổi bật của kỳ bảo vệ năm nay là 100% sinh viên thực hiện và trình bày khóa luận tốt nghiệp hoàn toàn bằng tiếng Anh...</p>
    `,
    image: vkuImg,
    author: "Binh luận",
    date: "09 - 07 - 2025",
    category: "FLIC",
    tags: ["VKU", "Tốt nghiệp", "2021-2025", "FLIC", "Bảo vệ khóa luận"],
    views: 35,
  },
  {
    id: 2,
    title: "FLIC: Khai giảng khóa học Tin học ứng dụng mới",
    content:
      "<p>Khóa học Tin học ứng dụng tại FLIC thu hút đông đảo sinh viên tham gia.</p>",
    image: vkuImg,
    author: "FLIC Team",
    date: "10 - 07 - 2025",
    category: "FLIC",
    tags: ["FLIC", "Tin học", "Khóa học"],
    views: 20,
  },
  {
    id: 3,
    title: "TOEIC: Cập nhật lịch thi tháng 7/2025",
    content:
      "<p>Lịch thi TOEIC mới nhất đã được cập nhật, sinh viên chú ý đăng ký đúng hạn.</p>",
    image: toeicImg,
    author: "TOEIC Center",
    date: "11 - 07 - 2025",
    category: "TOEIC",
    tags: ["TOEIC", "Lịch thi"],
    views: 15,
  },
  {
    id: 4,
    title: "IELTS: Chia sẻ kinh nghiệm đạt 8.0+ từ sinh viên VKU",
    content:
      "<p>Sinh viên VKU chia sẻ bí quyết học IELTS hiệu quả, đạt điểm cao trong kỳ thi.</p>",
    image: ieltsImg,
    author: "IELTS Club",
    date: "12 - 07 - 2025",
    category: "IELTS",
    tags: ["IELTS", "Kinh nghiệm"],
    views: 10,
  },
  {
    id: 5,
    title: "VSTEP: Hướng dẫn đăng ký thi và ôn tập hiệu quả",
    content:
      "<p>Các bước đăng ký thi VSTEP và tài liệu ôn tập dành cho sinh viên.</p>",
    image: vstepImg,
    author: "VSTEP Team",
    date: "13 - 07 - 2025",
    category: "VSTEP",
    tags: ["VSTEP", "Ôn tập"],
    views: 8,
  },
  {
    id: 6,
    title: "MOS: Kết quả thi và trao chứng chỉ tháng 6/2025",
    content:
      "<p>Danh sách sinh viên đạt chứng chỉ MOS tháng 6/2025 đã được công bố.</p>",
    image: mosImg,
    author: "MOS Center",
    date: "14 - 07 - 2025",
    category: "MOS",
    tags: ["MOS", "Chứng chỉ"],
    views: 12,
  },
  {
    id: 7,
    title: "FLIC: Workshop kỹ năng mềm cho sinh viên năm nhất",
    content:
      "<p>Workshop giúp sinh viên năm nhất nâng cao kỹ năng mềm, chuẩn bị cho học kỳ mới.</p>",
    image: vkuImg,
    author: "FLIC Team",
    date: "15 - 07 - 2025",
    category: "FLIC",
    tags: ["FLIC", "Kỹ năng mềm"],
    views: 9,
  },
  {
    id: 8,
    title: "VKU: Đạt giải thưởng sáng tạo trẻ toàn quốc",
    content:
      "<p>Nhóm sinh viên VKU xuất sắc giành giải thưởng sáng tạo trẻ năm 2025.</p>",
    image: vkuImg,
    author: "Admin VKU",
    date: "16 - 07 - 2025",
    category: "VKU",
    tags: ["VKU", "Sáng tạo trẻ"],
    views: 14,
  },
];

export default function NewsDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const article = newsData.find((item) => String(item.id) === String(id));

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!article) {
    return (
      <div className="text-center text-red-500 text-xl py-20">
        404. Not found data
      </div>
    );
  }

  // Lấy các bài liên quan cùng category (trừ bài hiện tại)
  let related = newsData.filter(
    (item) => item.id !== article.id && item.category === article.category
  );
  // Nếu chưa đủ 4 bài, bổ sung theo tag
  if (related.length < 4) {
    const tagRelated = newsData.filter(
      (item) =>
        item.id !== article.id &&
        item.category !== article.category &&
        item.tags.some((tag) => article.tags.includes(tag))
    );
    related = [...related, ...tagRelated];
  }
  // Nếu vẫn chưa đủ, bổ sung các bài khác (trừ bài hiện tại và đã có trong related)
  if (related.length < 4) {
    const others = newsData.filter(
      (item) => item.id !== article.id && !related.some((r) => r.id === item.id)
    );
    related = [...related, ...others];
  }
  // Chỉ lấy tối đa 4 bài
  related = related.slice(0, 4);

  return (
    <main className="container mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <div className="text-blue-600 text-sm mb-6">
        <span>Trang chủ</span>
        <span className="mx-2 text-gray-400">»</span>
        <span>Tin Tức</span>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Main Content */}
        <div className="flex-1">
          <article className="bg-white rounded-lg shadow-sm overflow-hidden">
            {/* Article Header */}
            <div className="p-6 border-b">
              <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4 leading-tight">
                {article.title}
              </h1>

              {/* Article Meta */}
              <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 mb-4">
                <div className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  <span>{article.date}</span>
                </div>
                <div className="flex items-center gap-1">
                  <User className="w-4 h-4" />
                  <span>Bình luận: {article.views}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Tag className="w-4 h-4" />
                  <span>Tác giả: {article.category}</span>
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
                src={article.image || vkuImg}
                alt={article.title}
                className="w-full h-96 object-cover"
              />
            </div>

            {/* Article Content */}
            <div className="p-6">
              <div
                className="prose prose-lg max-w-none text-gray-700 leading-relaxed"
                dangerouslySetInnerHTML={{ __html: article.content }}
              />

              {/* Tags */}
              <div className="mt-8 pt-6 border-t">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-sm font-medium text-gray-700">
                    Tags:
                  </span>
                  {article.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm hover:bg-gray-200 cursor-pointer transition-colors"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

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
          {/* Tags Widget */}
          <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
            <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
              <div className="w-2 h-5 rounded-full bg-red-500"></div>
              Tags
            </h3>
            <div className="flex flex-wrap gap-2">
              {article.tags.map((tag, index) => (
                <span
                  key={index}
                  className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm hover:bg-gray-200 cursor-pointer transition-colors"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Featured News */}
          <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
            <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
              <div className="w-2 h-5 rounded-full bg-red-500"></div>
              Tin tức nổi bật
            </h3>
            <div className="space-y-4">
              {related.map((news) => (
                <div
                  key={news.id}
                  className="flex gap-3 cursor-pointer hover:bg-gray-50 p-2 rounded transition-colors"
                  onClick={() => navigate(`/news/${news.id}`)}
                >
                  <img
                    src={news.image || vkuImg}
                    alt={news.title}
                    className="w-16 h-16 object-cover rounded"
                  />
                  <div className="flex-1">
                    <h4 className="text-sm font-medium text-gray-900 line-clamp-2 mb-1">
                      {news.title}
                    </h4>
                    <p className="text-xs text-gray-500">{news.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Related News */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
              <div className="w-2 h-5 rounded-full bg-red-500"></div>
              Tin tức liên quan
            </h3>
            <div className="space-y-4">
              {related.map((news) => (
                <div
                  key={news.id}
                  className="flex gap-3 cursor-pointer hover:bg-gray-50 p-2 rounded transition-colors"
                  onClick={() => navigate(`/news/${news.id}`)}
                >
                  <img
                    src={news.image || vkuImg}
                    alt={news.title}
                    className="w-16 h-16 object-cover rounded"
                  />
                  <div className="flex-1">
                    <h4 className="text-sm font-medium text-gray-900 line-clamp-2 mb-1">
                      {news.title}
                    </h4>
                    <p className="text-xs text-gray-500">{news.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
