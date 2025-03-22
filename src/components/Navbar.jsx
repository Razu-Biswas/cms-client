import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react"; // Install Lucide Icons: npm install lucide-react

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/logout-success");
    window.location.reload(); // Refresh to update the navbar
  };

  return (
    <nav className="bg-blue-600 shadow-md">
      <div className="container mx-auto flex justify-between items-center p-4">
        {/* Logo */}
        <Link to="/" className="text-white text-2xl font-bold">
          CMS
        </Link>

        {/* Desktop Links */}
        <ul className="hidden md:flex space-x-6">
          <li>
            <Link to="/" className="text-white hover:text-gray-200">
              Home
            </Link>
          </li>

          <li>
            <Link to="/contact" className="text-white hover:text-gray-200">
              Contact Us
            </Link>
          </li>
          {/* <div> */}
          {user?.email ? (
            <>
              <li>
                <Link
                  to="/dashboard"
                  className="text-white hover:text-gray-200"
                >
                  Dashboard
                </Link>
              </li>
              <span className="text-white">Welcome, {user?.fullName}!</span>
              <button
                onClick={handleLogout}
                className="text-orange-500 mx-2 font-bold"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="text-white mx-2">
                Login
              </Link>
              <Link to="/signup" className="text-white mx-2">
                Signup
              </Link>
            </>
          )}
          {/* </div> */}
        </ul>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-white"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden absolute top-14 left-0 w-full bg-blue-400 shadow-md transition-transform ${
          isOpen ? "block" : "hidden"
        }`}
      >
        <ul className="text-center space-y-4 py-4">
          <li>
            <Link
              to="/"
              className="text-white block py-2"
              onClick={() => setIsOpen(false)}
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              to="/signup"
              className="text-white block py-2"
              onClick={() => setIsOpen(false)}
            >
              Signup
            </Link>
          </li>
          <li>
            <Link
              to="/login"
              className="text-white block py-2"
              onClick={() => setIsOpen(false)}
            >
              Login
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
