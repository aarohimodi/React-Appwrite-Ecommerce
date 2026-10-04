import React from "react";
import { FaBars, FaShoppingCart, FaTimes } from "react-icons/fa";
import { Link } from "react-router-dom";
import { openCart } from "../../store/uiSlice";
import { useDispatch } from "react-redux";

function MobileMenu({ menuOpen, setMenuOpen, navItems }) {
  const dispatch = useDispatch();
  return (
    <>
      {menuOpen && (
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
          onClick={() => setMenuOpen(false)}
        />
      )}

      <div
        className={`fixed top-0 left-0 h-full w-64 bg-white shadow-lg transform ${
          menuOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 z-50`}
      >
        <div className="p-4 flex justify-between border-b">
          <h2 className="font-semibold text-lg">Menu</h2>
          <FaTimes
            onClick={() => setMenuOpen(false)}
            className="cursor-pointer "
          />
        </div>
        <div className="flex flex-col gap-4 p-4">
          {navItems.map((item) =>
            item.show ? (
              <Link
                key={item.name}
                to={item.path}
                onClick={() => setMenuOpen(false)}
              >
                {item.name}
              </Link>
            ) : null
          )}
        </div>
      </div>
    </>
  );
}

export default MobileMenu;
