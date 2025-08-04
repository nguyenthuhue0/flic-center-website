import { Outlet } from 'react-router-dom'
import './App.css'
import Header from './components/Header'
import Footer from './components/Footer'
import SideBar from './components/SideBarLecture'
import SideBarStudent from './components/SideBarStudent'



function DashboardStudent() {
  return (
   <>
      <Header />
      <div className="flex min-h-screen ">
        {/* Sidebar bên trái */}
        <SideBarStudent />

        {/* Nội dung trang con (Outlet) bên phải */}
        <div className="flex-1 p-4">
          <Outlet />
        </div>
      </div>
      <Footer />
    </>
  )
}

export default DashboardStudent


