import React, { useState } from "react";
import {
  FaBars,
  FaHeart,
  FaShoppingCart,
  FaTimes,
  FaUser,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import { openCart, openWishlist, openProfile } from "../../store/uiSlice";
import { useDispatch, useSelector } from "react-redux";
import MobileMenu from "./MobileMenu";
function Navbar() {
  const userData = useSelector((state) => state.auth.userData);
  const dispatch = useDispatch();
  const authStatus = useSelector((state) => state.auth.status);
  const [menuOpen, setMenuOpen] = useState(false);
  const cartItems = useSelector((state) => state.cart.items);
  const totalItems = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );
  const navItems = [
    { name: "Home", path: "/", show: true },
    { name: "Shop", path: "/shop", show: true },
    {
      name: "Orders",
      path: "/orders",
      show: authStatus && userData?.email !== "chinkymodi@gmail.com",
    },
    { name: "Login", path: "/login", show: !authStatus },
    { name: "Sign Up", path: "/signup", show: !authStatus },
    {
      name: "Admin",
      path: "/admin/products",
      show: userData?.email === "chinkymodi@gmail.com",
    },
    {
      name: "Add Products",
      path: "/admin/add-product",
      show: userData?.email === "chinkymodi@gmail.com",
    },
    {
      name: "Add Category",
      path: "/admin/add-category",
      show: userData?.email === "chinkymodi@gmail.com",
    },
  ];
  return (
    <nav className="bg-white px-4 py-7 flex justify-between items-center max-w-[1200px] mx-auto ">
      {/* Logo */}
      <h1 className="text-xl font-bold">My Ecom</h1>
      {/* Desktop Links */}
      <div className="hidden md:flex gap-6 items-center">
        {navItems.map((item) =>
          item.show ? (
            <Link
              key={item.name}
              to={item.path}
              className="hover:text-indigo-500 transition"
            >
              {item.name}
            </Link>
          ) : null
        )}

        <FaHeart
          onClick={() => dispatch(openWishlist())}
          className="cursor-pointer text-lg hover:text-indigo-500 transition active:scale-90"
        />
        <div className="relative cursor-pointer">
          <FaShoppingCart
            onClick={() => dispatch(openCart())}
            className="cursor-pointer text-lg hover:text-indigo-500 transition active:scale-90"
          />
          {totalItems > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-1.5 rounded-full">
              {totalItems > 9 ? "9+" : totalItems}
            </span>
          )}
        </div>
        <FaUser
          onClick={() => dispatch(openProfile())}
          className="cursor-pointer text-lg hover:text-indigo-500 transition active:scale-90"
        />
      </div>

      {/* Mobile*/}

      <div className="flex items-center gap-4 md:hidden">
        <FaHeart
          onClick={() => dispatch(openWishlist())}
          className="cursor-pointer text-lg hover:text-indigo-500 transition active:scale-90"
        />
        <div className="relative cursor-pointer">
          <FaShoppingCart
            onClick={() => dispatch(openCart())}
            className="text-lg hover:text-indigo-500 transition active:scale-90"
          />

          {totalItems > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-1.5 rounded-full">
              {totalItems > 9 ? "9+" : totalItems}
            </span>
          )}
        </div>
        <FaUser
          onClick={() => dispatch(openProfile())}
          className="cursor-pointer text-lg hover:text-indigo-500 transition active:scale-90"
        />

        {menuOpen ? (
          <FaTimes
            className={`text-lg cursor-pointer transition-transform duration-300 ${
              menuOpen && "rotate-90"
            }`}
            onClick={() => setMenuOpen(false)}
          />
        ) : (
          <FaBars
            className="md:hidden text-lg cursor-pointer "
            onClick={() => setMenuOpen(true)}
          />
        )}
      </div>
      <MobileMenu
        menuOpen={menuOpen}
        setMenuOpen={setMenuOpen}
        navItems={navItems}
      />
    </nav>
  );
}

export default Navbar;
