# FLIC - Trung tâm Ngoại ngữ Tin học VKU

## Giới thiệu dự án

FLIC là website giới thiệu các khoá học, lịch thi, tin tức, và chia sẻ học viên và quản lý học viên, giáo viên của Trung tâm Ngoại ngữ - Tin học, Trường Đại học Công nghệ Thông tin & Truyền thông Việt Hàn (VKU). 

Các chức năng chính:
- Trang chủ, giới thiệu trung tâm
- Quản lý khoá học, lịch thi, tin tức, người dùng
- Đăng ký học, đăng nhập/đăng ký tài khoản
- Giao diện cho admin, giảng viên, học viên
- Giao diện sáng/tối cho học viên

## Cấu trúc thư mục

```
├── public/
│   ├── logo.svg
│   └── vite.svg
├── src/
│   ├── App.jsx, App.css
│   ├── Layout.jsx, main.jsx
│   ├── components/      # Header, Footer, Modal, Profile, SideBar, ThemeToggle,...
│   ├── pages/           # Trang người dùng, admin, giảng viên, học viên, auth,...
│   ├── assets/          # Hình ảnh, icon,...
│   ├── utils/, services/, config/
├── package.json
├── vite.config.js
├── tailwind.config.js
├── eslint.config.js
├── index.html
└── README.md
```

## Yêu cầu hệ thống

- Node.js >= 16
- npm >= 8

## Cách chạy dự án

1. **Clone dự án về máy:**
   ```sh
   git clone <đường dẫn repo>
   cd FLIC
   ```

2. **Cài đặt các package:**
   ```sh
   npm install
   ```

3. **Chạy dự án ở môi trường phát triển:**
   ```sh
   npm run dev
   ```
   Truy cập [http://localhost:5173](http://localhost:5173) trên trình duyệt.

4. **Build dự án để deploy:**
   ```sh
   npm run build
   ```
   Kết quả build nằm trong thư mục `dist/`.

## Công nghệ sử dụng

- [React](https://react.dev/)
- [Vite](https://vitejs.dev/)
- [TailwindCSS](https://tailwindcss.com/)
- [React Router](https://reactrouter.com/)
- [React Toastify](https://fkhadra.github.io/react-toastify/)
- [ESLint](https://eslint.org/)

## Tác giả & liên hệ

- Trung tâm Ngoại ngữ - Tin học VKU
- Địa chỉ: 470 Trần Đại Nghĩa, Q. Ngũ Hành Sơn, Tp. Đà Nẵng
- Email: flic@vku.edu.vn

---

> © 2025 Trung tâm Ngoại ngữ - Tin học VKU. Tất cả quyền được bảo lưu.