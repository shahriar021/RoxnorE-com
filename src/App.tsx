import { Outlet } from "react-router-dom";
import Navbar from "./components/common/Navbar";

const App = () => {
  return (
    <div style={{ minHeight: "100vh", background: "#f8fafc" }}>
      <Navbar />
      <main style={{ maxWidth: 1200, margin: "0 auto", padding: "32px 24px" }}>
        <Outlet />
      </main>
    </div>
  );
};

export default App;
