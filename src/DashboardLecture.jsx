import { Outlet } from 'react-router-dom'
import './App.css'
import Header from './components/Header'
import Footer from './components/Footer'
import SideBarLecture from './components/SideBarLecture'

function DashboardLecture() {
  return (
   <>
      <Header />
      <div className="flex min-h-screen ">
        {/* Sidebar bên trái */}
        <SideBarLecture />

        {/* Nội dung trang con (Outlet) bên phải */}
        <div className="flex-1 p-4">
          <Outlet />
        </div>
      </div>
      <Footer />
    </>
  )
}

export default DashboardLecture


