import { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { HiMiniChevronDown } from "react-icons/hi2";
import { AiOutlineMenu } from "react-icons/ai";
import { RxCross1 } from "react-icons/rx";
import { VscAccount } from "react-icons/vsc";
import { BsCart3 } from "react-icons/bs";
import logo from "../assets/logo.png";
import { useSelector } from "react-redux";

export default function Navbar() {
  const navigate=useNavigate()
  const cartItem = useSelector((state) => state.cart.cartItems);
  const totalQuantity = cartItem.reduce(
    (total, item) => total + item.quantity,
    0
  );
  console.log(totalQuantity);

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  return (
    <nav className="w-full px-4 md:px-[30px] py-4  shadow-sm text-white ">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Left Side */}
        <div className="flex items-center gap-3  md:w-auto">
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
              className="absolute  z-100000 left-0 top-[58px] w-full bg-white shadow-md md:hidden "
            >
              <div className="flex flex-col  text-[20px] px-[30px] py-[20px] space-y-[20px] text-gray-700 font-medium border-t-1 border-b-1 border-green-600">
                <a className="flex items-center " href="#">
                  <span className="">
                    <HiMiniChevronDown />
                  </span>
                  <span className="ms-1 "> Discovery</span>
                </a>
                <a className="ms-6" href="#">
                  About
                </a>
                <a href="#" className="ms-6">
                  Contact us
                </a>
                <Link to="admin" href="#" className="ms-6">
                  Admin
                </Link>
              </div>
            </div>
          )}
          {/* Logo for desktop */}
          <div className="hidden md:block">
            <img src={logo} alt="Logo" className="h-[34px] w-[126px]" />
          </div>
        </div>

        {/* Middle */}
        <div className=" md:flex justify-center  hidden  ">
          <div className="flex justify-between gap-6 text-[16px] text-gray-700 font-medium">
            <a className="flex items-center " href="#">
              <span>Discovery</span>
              <span>
                <HiMiniChevronDown />
              </span>
            </a>
            <a href="#" className="">
              About
            </a>
            <a href="#" className="">
              Contact us
            </a>
            <Link to="admin" className="">
              Admin
            </Link>
          </div>
        </div>

        {/* Logo centered for mobile */}
        <div className="md:hidden  flex justify-center">
          <img src={logo} alt="Logo" className="h-7 ms-4" />
        </div>

        {/* Right Side */}
        <div className=" md:gap-[20px]  flex justify-end items-center gap-4 ">
          <button onClick={()=>navigate("login")}>
            <VscAccount size={25} color="black" />
          </button>
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
