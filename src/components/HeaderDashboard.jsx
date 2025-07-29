import React, { useState } from "react";
import { TiArrowSortedUp } from "react-icons/ti";
import { CgLogOut } from "react-icons/cg";
import { NavLink, useNavigate } from "react-router-dom";
import { IoMdMenu } from "react-icons/io";
import Breadcrumb from "./Breadcrumb";
import { navItemsLink } from "../utils/Constants";

const HeaderDashboard = () => {
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  return (
    <div className="sticky top-0 z-10 flex flex-col bg-white font-sans">
      {/* Header */}
      <header className=" bg-white shadow-sm">
        {/* Top color bar */}
        <div className="flex h-[10px] ">
          <div className="relative w-2/5 bg-red-500">
            <TiArrowSortedUp className="absolute right-[-9px] top-[-5.5px] rotate-90 h-[22px] text-red-500 z-10" />
          </div>
          <div className="relative flex-grow bg-blue-700">
            <TiArrowSortedUp className="absolute right-[-9px] top-[-5.5px] rotate-90 h-[22px] text-blue-700" />
          </div>
          <div className="w-1/4 bg-yellow-400"></div>
        </div>

        {/* Navigation Bar */}
        <nav className="mx-auto flex max-w-7xl items-center justify-between p-4">
          {/* Logo Placeholder */}
          <div>
            {/* <img src="/logo.png" alt="Logo" className="h-10" /> */}
            {/* Bạn có thể thay thế bằng logo của mình */}
          </div>

          {/* Mobile Menu Toggle Button */}
          <div className="md:hidden w-full ">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-blue-600 hover:text-red-600 focus:outline-none w-full block"
            >
              <IoMdMenu className="text-2xl text-end" />
            </button>
          </div>

          {/* Navigation Links */}
          <ul className="hidden items-center space-x-8 md:flex">
            {navItemsLink.map((item) => (
              <li key={item.name}>
                <NavLink
                  to={item.href}
                  className={({ isActive }) =>
                    `block text-base font-bold p-2 ${
                      isActive
                        ? "text-red-600"
                        : "text-blue-500 hover:text-red-600"
                    }`
                  }
                >
                  {item.name}
                </NavLink>
              </li>
            ))}
          </ul>

          {/* Action Buttons */}
          <div className="hidden md:flex items-center space-x-6">
            <button className="rounded-full bg-red-600 px-5 py-2 text-sm font-bold text-white shadow-sm transition hover:bg-red-700">
              Đăng ký học
            </button>
            <a
              onClick={() => navigate("/login")}
              className="flex items-center space-x-2 text-sm font-bold text-blue-600 hover:text-red-600 cursor-pointer"
            >
              <span>Đăng nhập</span>
              <div className="relative">
                <CgLogOut className="absolute right-[-8px] top-[-5px]" />
              </div>
            </a>
          </div>
        </nav>

        {mobileMenuOpen && (
          <div className="md:hidden px-4 pb-4 text-center ">
            <ul className="space-y-2">
              {navItemsLink.map((item) => (
                <li key={item.name}>
                  <NavLink
                    to={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={({ isActive }) =>
                      `block text-base font-bold p-2 ${
                        isActive
                          ? "text-red-600"
                          : "text-blue-500 hover:text-red-600"
                      }`
                    }
                  >
                    {item.name}
                  </NavLink>
                </li>
              ))}
            </ul>
            <div className="mt-4 space-y-2">
              <button className="w-full rounded-full bg-red-600 px-5 py-2 text-md font-bold text-white shadow-sm transition hover:bg-red-700">
                Đăng ký học
              </button>
              <button
                onClick={() => navigate("/login")}
                className="w-full flex items-center justify-center space-x-2 text-sm font-bold text-blue-600 hover:text-red-600"
              >
                <div className="mx-auto flex items-center space-x-1 w-fit p-3 relative">
                  <span className="text-lg">Đăng nhập</span>
                  <CgLogOut className="text-xl absolute right-[-6px] bottom-[14px] " />
                </div>
              </button>
            </div>
          </div>
        )}
      </header>
    </div>
  );
};

export default HeaderDashboard;
