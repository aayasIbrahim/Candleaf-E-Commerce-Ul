
import { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { HiMiniChevronDown } from "react-icons/hi2";
import { AiOutlineMenu } from "react-icons/ai";
import { RxCross1 } from "react-icons/rx";
import { BsCart3 } from "react-icons/bs";
import logo from "../assets/logo.png";
import { useSelector } from "react-redux";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const navigate = useNavigate();

  // Redux or store js থেকে cart items আনা
  const cartItem = useSelector((state) => state.cart.cartItems);

  const totalQuantity = cartItem.reduce(
    (total, item) => total + item.quantity,
    0
  );
  

  // Auth Context থেকে ডেটা আনা
  const { user, isAuthenticated, isAdmin, isUser, loading, logout } = useAuth();
  console.log(user, isAuthenticated, isUser, isAdmin, loading, logout);
  console.log(`Admin is`, isAdmin);
  console.log(`User is`, isUser);

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="w-full px-4 md:px-[30px] py-4 shadow-sm text-white">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Left Side */}
        <div className="flex items-center gap-3 md:w-auto">
          {/* Mobile Menu Icon */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden"
          >
            {isMenuOpen ? (
              <RxCross1 color="black" size={24} />
            ) : (
              <AiOutlineMenu color="black" size={22} />
            )}
          </button>

          {/* Mobile Menu List */}
          {isMenuOpen && (
            <div
              onClick={() => {
                setIsMenuOpen(!isMenuOpen);
              }}
              className="absolute z-50 left-0 top-[58px] w-full bg-white shadow-md md:hidden"
            >
              <div className="flex flex-col text-[20px] px-[30px] py-[20px] space-y-[20px] text-gray-700 font-medium border-t border-b border-green-600">
                <a className="flex items-center" href="#">
                  <HiMiniChevronDown />
                  <span className="ms-1">Discovery</span>
                </a>
                <a className="ms-6" href="#">
                  About
                </a>
                <a href="#" className="ms-6">
                  Contact us
                </a>
                {isAdmin && (
                  <Link to="admin" className="ms-6">
                    Admin
                  </Link>
                )}
              </div>
            </div>
          )}

          {/* Logo for desktop */}
          <div className="hidden md:block">
            <img src={logo} alt="Logo" className="h-[34px] w-[126px]" />
          </div>
        </div>

        {/* Middle Menu */}
        <div className="md:flex justify-center hidden">
          <div className="flex justify-between gap-6 text-[16px] text-gray-700 font-medium">
            <a className="flex items-center" href="#">
              <span>Discovery</span>
              <HiMiniChevronDown />
            </a>
            <a href="#">About</a>
            <a href="#">Contact us</a>
            {isAdmin && <Link to="admin">Admin</Link>}
          </div>
        </div>

        {/* Logo centered for mobile */}
        <div className="md:hidden flex justify-center">
          <img src={logo} alt="Logo" className="h-7 ms-4" />
        </div>

        {/* Right Side */}
        <div className="md:gap-[20px] flex justify-end items-center gap-4">
          {isAuthenticated ? (
            <>
              <button
                onClick={logout}
                className="bg-green-600 hover:bg-red-600  text-white px-4 py-1.5 rounded transition-all duration-300 shadow-md hover:shadow-lg"
              >
                Logout
              </button>
            </>
          ) : (
            <button
              onClick={() => navigate("login")}
              className="bg-gradient-to-r from-green-500 to-green-700 hover:from-green-600 hover:to-green-800 text-white px-5 py-1.5 rounded shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-300"
            >
              Login
            </button>
          )}

          {/* Cart Button */}
          <button className="relative">
            <BsCart3 size={25} color="black" />
            {totalQuantity > 0 && (
              <span className="absolute -top-2 -right-3 bg-red-500 text-white text-xs font-bold px-[6px] py-[1px] rounded-full">
                {totalQuantity}
              </span>
            )}
          </button>
        </div>
      </div>
    </nav>
  );
}
