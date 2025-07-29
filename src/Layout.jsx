import { Route, Routes } from "react-router-dom";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import App from "./App";
import { ToastContainer } from "react-toastify";
import Home from "./pages/user/Home";
import FeedbackStudent from "./pages/user/FeedbackStudent";
import ForgotPassword from "./pages/auth/ForgotPassword";
import Schedule from "./pages/user/Schedule";
import Course from "./pages/user/Course";
import CourseDetail from "./pages/user/Coursedetail";
import ScheduleGrid from "./pages/user/ScheduleGrid";
// import News from "./pages/user/News";
// import NewsDetail from "./pages/user/NewsDetail";
// import MaterialsDashboard from "./pages/user/MaterialsDashboard";

import Introduce from "./pages/user/Introduce";
import RegisterForm from "./pages/user/RegisterForm";
import Dashboard from "./Dashboard";
import MaterialsDashboard from "./pages/lecturer/MaterialsDashboard";
import Teachingschedule from "./pages/lecturer/Teachingschedule";
import  Rollcall from "./pages/lecturer/Rollcall";
import RollcallDetail from "./pages/lecturer/RollcallDetail";
// import Teachingschedule from "./pages/lecturer/Teachingschedule";
const NotFound = () => {
  return (
    <div className="container mt-3 alert alert-danger">404.Not found data</div>
  );
};
const Layout = () => {
  return (
    <>
      <Routes>
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="forgotPassword" element={<ForgotPassword />} />
        <Route path="/" element={<App />}>
          <Route index element={<Home />} />
          <Route path="introduce" element={<Introduce />} />
          <Route path="registerform" element={<RegisterForm />} />
          <Route path="feedback" element={<FeedbackStudent />} />
          <Route path="schedule" element={<Schedule />} />
          <Route path="course" element={<Course />} />
          <Route path="coursedetail" element={<CourseDetail />} />
          <Route path="scheduleGrid" element={<ScheduleGrid />} />
          {/* <Route path="news" element={<News />} />
          <Route path="/news/:id" element={<NewsDetail />} /> */}
        </Route>
        <Route path="lecturer" element={<Dashboard />}>
          <Route path="materialsdashboard" element={<MaterialsDashboard   />} />
          <Route path="teachingschedule" element={<Teachingschedule   />} />
          <Route path="rollcall" element={<Rollcall   />} />
          <Route path="rollcalldetail" element={<RollcallDetail   />} />
        </Route>
        <Route path="*" element={<NotFound />}></Route>
      </Routes>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </>
  );
};
export default Layout;
