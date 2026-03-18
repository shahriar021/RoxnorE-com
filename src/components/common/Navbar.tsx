import { Link, useLocation } from "react-router-dom";
import { AppstoreOutlined, HistoryOutlined, CloseOutlined } from "@ant-design/icons";
import { Dropdown } from "antd";
import { useRecentlyViewed } from "../../hooks/useRecentlyViewed";

const Navbar = () => {
  const location = useLocation();
  const isDetail = location.pathname.includes("/products/");
  const { recentlyViewed, clearRecentlyViewed } = useRecentlyViewed();

  const dropdownContent = (
    <div
      style={{
        background: "#fff",
        borderRadius: 12,
        boxShadow: "0 8px 32px rgba(0,0,0,0.12)",
        border: "1px solid #f1f5f9",
        width: 280,
        overflow: "hidden",
      }}
    >
     
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "12px 16px",
          borderBottom: "1px solid #f1f5f9",
        }}
      >
        <span style={{ fontWeight: 600, fontSize: 13, color: "#0f172a" }}>Recently Viewed</span>
        {recentlyViewed.length > 0 && (
          <button
            onClick={clearRecentlyViewed}
            style={{
              background: "none",
              border: "none",
              fontSize: 11,
              color: "#94a3b8",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: 4,
            }}
          >
            <CloseOutlined style={{ fontSize: 10 }} /> Clear
          </button>
        )}
      </div>

      
      {recentlyViewed.length === 0 ? (
        <div style={{ padding: "20px 16px", textAlign: "center", color: "#94a3b8", fontSize: 13 }}>No recently viewed products</div>
      ) : (
        recentlyViewed.map((product) => (
          <Link key={product.id} to={`/products/${product.id}`} style={{ textDecoration: "none" }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
                padding: "10px 16px",
                transition: "background 0.15s",
                cursor: "pointer",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = "#f8f7ff")}
              onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
            >
              <img
                src={product.thumbnail}
                alt={product.title}
                style={{ width: 40, height: 40, borderRadius: 8, objectFit: "cover", flexShrink: 0 }}
              />
              <div style={{ flex: 1, minWidth: 0 }}>
                <div
                  style={{
                    fontSize: 13,
                    fontWeight: 500,
                    color: "#0f172a",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  {product.title}
                </div>
                <div style={{ fontSize: 12, color: "#6366f1", fontWeight: 600 }}>${product.price}</div>
              </div>
            </div>
          </Link>
        ))
      )}
    </div>
  );

  return (
    <nav
      style={{
        background: "#ffffff",
        borderBottom: "1px solid #e2e8f0",
        padding: "0 32px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        height: 64,
        position: "sticky",
        top: 0,
        zIndex: 50,
        boxShadow: "0 1px 3px rgba(0,0,0,0.06)",
      }}
    >
    
      <Link to="/" style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none" }}>
        <div
          style={{
            width: 36,
            height: 36,
            background: "#6366f1",
            borderRadius: 10,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <AppstoreOutlined style={{ color: "#fff", fontSize: 18 }} />
        </div>
        <span style={{ fontWeight: 700, fontSize: 18, color: "#0f172a", letterSpacing: "-0.3px" }}>Roxnor</span>
      </Link>

     
      <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
        <Link
          to="/"
          style={{
            fontSize: 14,
            fontWeight: 500,
            color: isDetail ? "#64748b" : "#6366f1",
            textDecoration: "none",
            paddingBottom: 4,
            borderBottom: isDetail ? "2px solid transparent" : "2px solid #6366f1",
          }}
        >
          Products
        </Link>

        <Dropdown dropdownRender={() => dropdownContent} trigger={["click"]} placement="bottomRight">
          <button
            style={{
              display: "flex",
              alignItems: "center",
              gap: 6,
              background: recentlyViewed.length > 0 ? "#f0f4ff" : "#f8fafc",
              border: "1.5px solid",
              borderColor: recentlyViewed.length > 0 ? "#e0e7ff" : "#e2e8f0",
              borderRadius: 8,
              padding: "6px 12px",
              fontSize: 13,
              fontWeight: 500,
              color: recentlyViewed.length > 0 ? "#6366f1" : "#94a3b8",
              cursor: "pointer",
              transition: "all 0.2s",
            }}
          >
            <HistoryOutlined />
            Recently Viewed
            {recentlyViewed.length > 0 && (
              <span
                style={{
                  background: "#6366f1",
                  color: "#fff",
                  borderRadius: 10,
                  padding: "1px 7px",
                  fontSize: 11,
                  fontWeight: 700,
                }}
              >
                {recentlyViewed.length}
              </span>
            )}
          </button>
        </Dropdown>
      </div>
    </nav>
  );
};

export default Navbar;
