import { Link, useLocation } from "react-router-dom";
import { breadcrumbNameMap } from "../utils/Constants";

const Breadcrumb = () => {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter((x) => x);

  return (
    <div className="bg-gray-50/50">
      <div className="mx-auto max-w-7xl px-4 py-3 text-sm text-gray-500">
        <Link to="/" className="text-blue-600">
          Trang chủ
        </Link>

        {pathnames.map((value, index) => {
          const to = `/${pathnames.slice(0, index + 1).join("/")}`;
          const isLast = index === pathnames.length - 1;

          return (
            <span key={to}>
              <span className="mx-2">»</span>
              {isLast ? (
                <span>{breadcrumbNameMap[to] || value}</span>
              ) : (
                <Link to={to} className="text-blue-600">
                  {breadcrumbNameMap[to] || value}
                </Link>
              )}
            </span>
          );
        })}
      </div>
    </div>
  );
}
export default Breadcrumb