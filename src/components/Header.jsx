import React from 'react';
import { TiArrowSortedUp } from "react-icons/ti";
import { CgLogOut } from "react-icons/cg";



const Header = () => {
  const navItems = [
    { name: 'Trang chủ', href: '#' },
    { name: 'Giới thiệu', href: '#', current: true },
    { name: 'Các khoá học', href: '#' },
    { name: 'Lịch thi', href: '#' },
    { name: 'Chia sẻ học viên', href: '#' },
    { name: 'Tin tức', href: '#' },
  ];

  return (
    <div className="flex flex-col bg-white font-sans">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-white shadow-sm">
        {/* Top color bar */}
        <div className="flex h-[10px] ">
          <div className="relative w-2/5 bg-red-500">
            <TiArrowSortedUp className='absolute right-[-9px] top-[-5.5px] rotate-90 h-[22px] text-red-500 z-10'/>
          </div>
          <div className="relative flex-grow bg-blue-700">
            <TiArrowSortedUp className='absolute right-[-9px] top-[-5.5px] rotate-90 h-[22px] text-blue-700'/>

          </div>
          <div className="w-1/4 bg-yellow-400">
          </div>
        </div>

        {/* Navigation Bar */}
        <nav className="mx-auto flex max-w-7xl items-center justify-between p-4">
          {/* Logo Placeholder */}
          <div>
            {/* <img src="/logo.png" alt="Logo" className="h-10" /> */}
            {/* Bạn có thể thay thế bằng logo của mình */}
          </div>

          {/* Navigation Links */}
          <ul className="hidden items-center space-x-8 md:flex">
            {navItems.map((item) => (
              <li key={item.name}>
                <a
                  href={item.href}
                  className={`text-base font-bold ${
                    item.current
                      ? 'text-red-600'
                      : 'text-blue-500 hover:text-red-600'
                  }`}
                >
                  {item.name}
                </a>
              </li>
            ))}
          </ul>

          {/* Action Buttons */}
          <div className="flex items-center space-x-6">
            <button className="rounded-full bg-red-600 px-5 py-2 text-sm font-bold text-white shadow-sm transition hover:bg-red-700">
              Đăng ký học
            </button>
            <a
              href="#"
              className="flex items-center space-x-2 text-sm font-bold text-blue-600 hover:text-red-600"
            >
              <span>Đăng nhập</span>
              <div className='relative'>
                <CgLogOut className='absolute right-[-8px] top-[-5px]'/>
              </div>
            </a>
          </div>
        </nav>
      </header>
      
      {/* Breadcrumbs */}
        <div className=" bg-gray-50/50">
            <div className="mx-auto max-w-7xl px-4 py-3 text-sm text-gray-500">
                <a href="#" className="text-blue-600">Trang chủ</a>
                <span className="mx-2">»</span>
                <span>Giới thiệu</span>
            </div>
        </div>

     
    </div>
  );
};

export default Header;