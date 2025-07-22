import { Route, Routes } from "react-router-dom";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import App from "./App";
import { ToastContainer } from "react-toastify";
import Home from "./pages/user/Home";
import Schedule from "./pages/user/Schedule";
import News from "./pages/user/News";
import NewsDetail from "./pages/user/NewsDetail";
import MaterialsDashboard from "./pages/user/MaterialsDashboard";


const NotFound = () =>{
    return(
        <div className="container mt-3 alert alert-danger">404.Not found data</div>
    );
}
const Layout = () => {
    return (
        <>
        <Routes>
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
            <Route path="/" element={<App />} >
                <Route index element={<Home />} />
                <Route path="schedule" element={<Schedule />} />
                <Route path="news" element={<News/>} />
                <Route path="/news/:id" element={<NewsDetail />} />
                
            </Route>
            <Route path="/lecturer" element={<App />} >
                <Route path="materialsdashboard" element={<MaterialsDashboard/>} />
                
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
    )
}
export default Layout;