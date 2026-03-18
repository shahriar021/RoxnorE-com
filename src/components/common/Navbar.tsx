import { Link, useLocation } from "react-router-dom";
import { AppstoreOutlined } from "@ant-design/icons";

const Navbar = () => {
  const location = useLocation();
  const isDetail = location.pathname.includes("/products/");

  return (
    <nav
      className="bg-white border-b border-gray-100 px-8 py-0 flex items-center justify-between sticky top-0 z-50"
      style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.06)" }}
    >
      <Link to="/" className="flex items-center gap-2 py-4 text-gray-900 no-underline">
        <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
          <AppstoreOutlined style={{ color: "#fff", fontSize: 16 }} />
        </div>
        <span style={{ fontWeight: 700, fontSize: 18, letterSpacing: "-0.3px", color: "#0f172a" }}>Roxnor</span>
      </Link>

      <div className="flex items-center gap-6">
        <Link
          to="/"
          style={{
            fontSize: 14,
            fontWeight: 500,
            color: isDetail ? "#64748b" : "#6366f1",
            textDecoration: "none",
            borderBottom: isDetail ? "none" : "2px solid #6366f1",
            paddingBottom: 2,
          }}
        >
          Products
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
