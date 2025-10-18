// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import LogoutBtn from "./LogoutBtn";
import { useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import {FaBars} from 'react-icons/fa'

const Header = () => {
  // Get authentication state from Redux
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  const navigate = useNavigate();

  const navItems = [
    {
      name: "Home",
      path: "/",
      active: true,
    },
    {
      name: "Login",
      path: "/login",
      active: !isAuthenticated,
    },
    {
      name: "Signup",
      path: "/signup",
      active: !isAuthenticated,
    },
    {
      name: "AddBlog",
      path: "/add-blog",
      active: isAuthenticated,
    },
    {
      name: "MyBlogs",
      path: "/my-blogs",
      active: isAuthenticated,
    },
  ];

  const handleNavItemClick = (path) => {
    navigate(path);
    setIsMenuOpen(false); // Close menu after clicking a nav item
  };

  // State to toggle mobile menu
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="flex items-center justify-between py-4 px-4 shadow-md bg-gradient-to-r from-[#72D2F3] to-[#0A5455] text-white relative">
      <div className="flex items-center">
        <Link to="/" className="flex items-center text-xl font-bold">
          <h2 className="font-serif">
            <span className="text-orange-700">Blog</span>{" "}
            <span className="text-blue-700">Site</span>
          </h2>
        </Link>
      </div>
      <nav className="flex space-x-4">
        {/* Desktop Navigation */}
        <div className="hidden md:flex md:space-x-4">
          {navItems.map(
            (navItem) =>
              navItem.active && (
                <button
                  key={navItem.name}
                  className="px-6 py-2 rounded-full hover:bg-gray-600 hover:text-gray-200 focus:outline-none focus:ring-1 focus:ring-offset-1 focus:ring-gray-500"
                  onClick={() => handleNavItemClick(navItem.path)}
                >
                  {navItem.name}
                </button>
              )
          )}
          {isAuthenticated && <LogoutBtn />}
        </div>

        {/* Mobile Menu Button and Dropdown */}
        <div className="md:hidden">
          <button
            className="px-4 py-2  hover:bg-gray-600 focus:outline-none focus:ring-1 focus:ring-offset-1 focus:ring-gray-500"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
             <FaBars size={30}/>
          </button>
          {isMenuOpen && (
            <div className="absolute top-16 right-1 bg-gray-800 text-white p-4 rounded-lg shadow-lg z-10">
              {navItems.map(
                (navItem) =>
                  navItem.active && (
                    <button
                      key={navItem.name}
                      className="block w-full text-left px-4 py-2 rounded hover:bg-gray-700"
                      onClick={() => handleNavItemClick(navItem.path)}
                    >
                      {navItem.name}
                    </button>
                  )
              )}
              {isAuthenticated && (
                <div className="block w-full text-left px-4 py-2">
                  <LogoutBtn />
                </div>
              )}
            </div>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;
