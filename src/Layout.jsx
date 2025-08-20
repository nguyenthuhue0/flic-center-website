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
import CourseDetail from "./pages/user/Coursedetail"; // kiểm tra đúng tên file/thư mục
import ScheduleGrid from "./pages/user/ScheduleGrid";
import News from "./pages/user/News";
import NewsDetail from "./pages/user/NewsDetail";

import Introduce from "./pages/user/Introduce";
import RegisterForm from "./pages/user/RegisterForm";
import MaterialsDashboard from "./pages/lecturer/MaterialsDashboard";
import Teachingschedule from "./pages/lecturer/Teachingschedule";
import Rollcall from "./pages/lecturer/Rollcall";
import RollcallDetail from "./pages/lecturer/RollcallDetail";
import StudentSchedule from "./pages/student/StudentSchedule";
import DashboardStudent from "./DashboardStudent";
import DashboardLecture from "./DashboardLecture";
import LearningPathDetail from "./pages/lecturer/LearningPathDetail";
import LearningPathList from "./pages/lecturer/LearningPathList";
import Progress from "./pages/lecturer/Progress";

import DocumentList from "./pages/lecturer/DocumentList";
import DocumentDetail from "./pages/lecturer/DocumentDetail";
import DocumentUpload from "./pages/lecturer/DocumentUpload";
import StudentCourse from "./pages/student/StudentCourse";
import StudentScheduleDetail from "./pages/student/StudentScheduleDetail";
import StudentCourseDetail from "./pages/student/StudentCourseDetail";
import StudentSubmission from "./pages/student/StudentSubmission";
import StudentInformation from "./pages/student/StudentInformation";
import StudentEditProfile from "./pages/student/StudentEditProfile";

import DashboardAdmin from "./DashboardAdmin";
import StudentManagement from "./pages/admin/StudentManagement";
import EditStudent from "./pages/admin/EditStudent";
import LecturerManagement from "./pages/admin/LecturerManagement";
import AddLecturer from "./pages/admin/AddLecturer";
import EditLecturer from "./pages/admin/EditLecturer";

import CourseManagement from "./pages/admin/CourseManagement";
import AddCourse from "./pages/admin/AddCourse";
import EditCourse from "./pages/admin/EditCourse";

import StudentDetail from "./pages/admin/StudentDetail";
import LecturerDetail from "./pages/admin/LecturerDetail";
import CourseDetailAdmin from "./pages/admin/CourseDetailAdmin";
import RequireAuth from "./pages/auth/RequireAuth";
import LecturerInformation from "./pages/lecturer/LecturerInformation";
import LecturerEditProfile from "./pages/lecturer/LecturerEditProfile";
import SuccessPage from "./pages/user/SuccessPage";
const NotFound = () => {
  return (
    <div className="container mt-3 alert alert-danger">404.Not found data</div>
  );
};
const Layout = () => {
  return (
    <>
      <Routes>
        {/* Auth */}
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="forgotPassword" element={<ForgotPassword />} />

        {/* Public */}
        <Route path="/" element={<App />}>
          <Route index element={<Home />} />
          <Route path="introduce" element={<Introduce />} />
          <Route path="registerform" element={<RegisterForm />} />
          <Route path="successpage" element={<SuccessPage />} />
          <Route path="feedback" element={<FeedbackStudent />} />
          <Route path="schedule" element={<Schedule />} />
          <Route path="course" element={<Course />} />
          <Route path="coursedetail" element={<CourseDetail />} />
          <Route path="scheduleGrid" element={<ScheduleGrid />} />
          <Route path="news" element={<News />} />
          <Route path="news/:id" element={<NewsDetail />} />
        </Route>

        <Route element={<RequireAuth roles={["INSTRUCTOR", "ADMIN"]} />}>
          <Route path="lecturer" element={<DashboardLecture />}>
            <Route index element={<MaterialsDashboard />} />
            <Route path="teachingschedule" element={<Teachingschedule />} />
            <Route
              path="lecturerinformation"
              element={<LecturerInformation />}
            />
            <Route
              path="lecturerinformationEdit"
              element={<LecturerEditProfile />}
            />
            <Route path="rollcall" element={<Rollcall />} />
            <Route path="rollcalldetail" element={<RollcallDetail />} />

            {/* Tài liệu học tập */}
            <Route path="documentlist" element={<DocumentList />} />
            <Route path="documentdetail/:courseId" element={<DocumentDetail />} />
            <Route path="documentupload" element={<DocumentUpload />} />

            {/* Lộ trình học tập */}
            <Route path="learningpathdetail" element={<LearningPathDetail />} />
            <Route path="learningpathlist" element={<LearningPathList />} />
            {/* Tiến độ học tập */}
            <Route path="progress" element={<Progress />} />
          </Route>
        </Route>

        <Route element={<RequireAuth roles={["ADMIN"]} />}>
          <Route path="admin" element={<DashboardAdmin />}>
            <Route index element={<StudentManagement />} />
            <Route path="studentManagement" element={<StudentManagement />} />

            <Route path="lecturerManagement" element={<LecturerManagement />} />
            <Route path="addlecturer" element={<AddLecturer />} />
            <Route path="lecturer/:id/edit" element={<EditLecturer />} />

            <Route path="courseManagement" element={<CourseManagement />} />
            <Route path="addcourse" element={<AddCourse />} />
            <Route path="courses/:id/edit" element={<EditCourse />} />
            <Route path="courses/:id" element={<CourseDetailAdmin />} />

            {/* Users */}
            <Route path="users/:id" element={<StudentDetail />} />
            <Route path="users/:id/edit" element={<EditStudent />} />
            <Route path="lecturer/:id" element={<LecturerDetail />} />
          </Route>
        </Route>

        <Route element={<RequireAuth roles={["STUDENT", "ADMIN"]} />}>
          <Route path="student" element={<DashboardStudent />}>
            <Route index element={<StudentSchedule />} />
            <Route path="studentcourse" element={<StudentCourse />} />
            <Route path="studentprofile" element={<StudentInformation />} />
            <Route path="studentprofileEdit" element={<StudentEditProfile />} />
            <Route path="studentcourse/:id" element={<StudentCourseDetail />} />
            <Route
              path="studentsubmission/:id"
              element={<StudentSubmission />}
            />
            <Route path="studentschedule" element={<StudentSchedule />} />
            <Route path="scheduledetail" element={<StudentScheduleDetail />} />
          </Route>
        </Route>

        <Route path="*" element={<NotFound />}></Route>
      </Routes>

      <ToastContainer
        position="top-right"
        autoClose={1000}
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
