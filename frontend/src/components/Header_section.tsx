import { useState, useRef, useEffect } from 'react';
import { ShoppingCart, User, LogOut, ChevronDown, ShoppingBag } from 'lucide-react';
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from 'react-redux';
import { CartItem } from '../types/types';

const Header = () => {
  const reduxData = useSelector((state: { carts: CartItem[] }) => state.carts).slice(1);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const profileDropdownRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const handleLogout = () => {
    sessionStorage.removeItem("logged_in_user");
    navigate("/login");
  };

  const handleGoToCart = (e: React.FormEvent) => {
    e.preventDefault();
    navigate('/cart');
  };

  const user = JSON.parse(sessionStorage.getItem("logged_in_user") || "{}");

  // Close the profile dropdown when clicking outside
  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (
        profileDropdownRef.current &&
        !profileDropdownRef.current.contains(event.target as Node)
      ) {
        setIsProfileDropdownOpen(false);
      }
    };

    if (isProfileDropdownOpen) {
      document.addEventListener('mousedown', handleOutsideClick);
    }

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [isProfileDropdownOpen]);

  return (
    <header className="fixed top-0 left-0 w-full shadow-md z-50 bg-indigo-600 text-white">
      <div className="container mx-auto flex justify-between items-center h-20 px-4">
        {/* Logo Section */}
        <Link to="/">
          <div className="flex items-center">
            <ShoppingBag className="h-8 w-8 ml-10" />
            <h1 className="text-2xl font-bold">ShopNow</h1>
          </div>
        </Link>
        {/* Right Side - Cart and Profile */}
        <div className="flex items-center space-x-4">
          {/* Cart Icon */}
          <div className="relative" onClick={handleGoToCart}>
            <ShoppingCart className="cursor-pointer" size={24} />
            <span className="cursor-pointer absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
              {reduxData.length}
            </span>
          </div>
          {/* Profile Section */}
          <div className="relative" ref={profileDropdownRef}>
            {!user.email_address ? (
              <Link to="/login" className="flex items-center cursor-pointer">
                <User size={24} />
                <span className="ml-2 text-sm">Login</span>
              </Link>
            ) : (
              <div onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}>
                <div className="flex items-center cursor-pointer">
                  <User size={24} />
                  <ChevronDown className="ml-1" size={16} />
                </div>
                {isProfileDropdownOpen && (
                  <div
                    className="absolute right-0 mt-2 w-64 bg-white border rounded-lg shadow-lg p-4"
                  >
                    <div className="mb-4">
                      <h2 className="text-sm font-semibold text-gray-800">
                        {user.first_name.charAt(0).toUpperCase() + user.first_name.slice(1)}{" "}
                        {user.last_name.charAt(0).toUpperCase() + user.last_name.slice(1)}
                      </h2>
                      <p className="text-sm text-gray-500">{user.email_address}</p>
                    </div>
                    <hr className="my-2" />
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center text-left text-sm cursor-pointer text-red-500 hover:bg-gray-100 p-2 rounded"
                    >
                      <LogOut size={16} className="mr-2" />
                      Logout
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
