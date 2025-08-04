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
import News from "./pages/user/News";
import NewsDetail from "./pages/user/NewsDetail";
// import MaterialsDashboard from "./pages/user/MaterialsDashboard";

import Introduce from "./pages/user/Introduce";
import RegisterForm from "./pages/user/RegisterForm";
import MaterialsDashboard from "./pages/lecturer/MaterialsDashboard";
import Teachingschedule from "./pages/lecturer/Teachingschedule";
import  Rollcall from "./pages/lecturer/Rollcall";
import RollcallDetail from "./pages/lecturer/RollcallDetail";
import StudentSchedule from "./pages/student/StudentSchedule";
import DashboardStudent from "./DashboardStudent";
import DashboardLecture from "./DashboardLecture";
// import Teachingschedule from "./pages/lecturer/Teachingschedule";

import DocumentList from "./pages/lecturer/DocumentList";
import DocumentDetail from "./pages/lecturer/DocumentDetail";
import DocumentUpload from "./pages/lecturer/DocumentUpload";
import StudentCourse from "./pages/student/StudentCourse";
import StudentScheduleDetail from "./pages/student/StudentScheduleDetail";
import StudentCourseDetail from "./pages/student/StudentCourseDetail";
import StudentSubmission from "./pages/student/StudentSubmission";
import StudentInformation from "./pages/student/StudentInformation";
import StudentEditProfile from "./pages/student/StudentEditProfile";

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
          <Route path="news" element={<News />} />
          <Route path="/news/:id" element={<NewsDetail />} />
        </Route>
        <Route path="lecturer" element={<DashboardLecture />}>
          <Route path="materialsdashboard" element={<MaterialsDashboard   />} />
          <Route path="teachingschedule" element={<Teachingschedule   />} />
          <Route path="rollcall" element={<Rollcall   />} />
          <Route path="rollcalldetail" element={<RollcallDetail   />} />

          {/* Tài liệu học tập */}
          <Route path="documentlist" element={<DocumentList />} />
          <Route path="documentdetail" element={<DocumentDetail />} />
          <Route path="documentupload" element={<DocumentUpload />} />
        </Route>
        <Route path="student" element={<DashboardStudent />}>
          <Route index element={<StudentSchedule />} />
          <Route path="studentcourse" element={<StudentCourse />} />
          <Route path="studentprofile" element={<StudentInformation />} />
          <Route path="studentprofile/:id" element={<StudentEditProfile />} />
          <Route path="studentcourse/:id" element={<StudentCourseDetail />} />
          <Route path="studentsubmission/:id" element={<StudentSubmission />} />
          <Route path="studentschedule" element={<StudentSchedule />} />
          <Route path="scheduledetail" element={<StudentScheduleDetail />} />

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
