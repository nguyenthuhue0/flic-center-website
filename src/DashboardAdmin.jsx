import { Outlet } from 'react-router-dom'
import './App.css'

import SideBarLecture from './components/SideBarAdmin'

function DashboardAdmin() {
  return (
   <>
      
      <div className="flex min-h-screen ">
        {/* Sidebar bên trái */}
        <SideBarLecture />

        {/* Nội dung trang con (Outlet) bên phải */}
        <div className="flex-1 p-4">
          <Outlet />
        </div>
      </div>
      
    </>
  )
}

export default DashboardAdmin


