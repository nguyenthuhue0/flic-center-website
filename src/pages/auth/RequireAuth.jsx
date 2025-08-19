import { jwtDecode } from "jwt-decode";
import { Navigate, Outlet } from "react-router-dom";
import { toast } from "react-toastify";

const RequireAuth = ({ roles = [] }) => {
  const token = sessionStorage.getItem("access_token");

  if (!token) {
    toast.error("Bạn cần đăng nhập!");
    return <Navigate to="/login" replace />;
  }

  try {
    const decoded = jwtDecode(token);

    if (roles.length > 0 && !roles.includes(decoded.role)) {
      toast.error("Bạn không có quyền truy cập!");
      sessionStorage.clear();
      return <Navigate to="/login" replace />;
    }
  } catch {
    toast.error("Token không hợp lệ!");
    return <Navigate to="/login" replace />;
  }

 return <Outlet />; 
};

export default RequireAuth;
