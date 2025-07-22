import { Route, Routes } from "react-router-dom";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import App from "./App";
import { ToastContainer } from "react-toastify";
import Home from "./pages/user/Home";
import Introduce from "./pages/user/Introduce";
import RegisterForm from "./pages/user/RegisterForm";

const NotFound = () => {
    return (
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
                    <Route path="introduce" element={<Introduce />} />
                    <Route path="registerform" element={<RegisterForm />} />
                    <Route path="home" element={<Home />} />
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