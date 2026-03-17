import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-white shadow-sm border-b px-6 py-4">
      <Link to="/" className="text-lg font-semibold text-blue-600">
        Roxnor Products
      </Link>
    </nav>
  );
};

export default Navbar;
