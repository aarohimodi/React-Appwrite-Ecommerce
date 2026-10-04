import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { closeProfile } from "../../store/uiSlice";
import { Link } from "react-router-dom";
import { logout as authLogout } from "../../store/authSlice";
import authService from "../../appwrite/auth";
function ProfileDrawer() {
  const dispatch = useDispatch();
  const isProfileOpen = useSelector((state) => state.ui.isProfileOpen);
  const authStatus = useSelector((state) => state.auth.status);
  const userData = useSelector((state) => state.auth.userData);

  const handleLogout = async () => {
    try {
      await authService.logout();
      dispatch(authLogout());
      dispatch(closeProfile());
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      {isProfileOpen && (
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
          onClick={() => dispatch(closeProfile())}
        ></div>
      )}
      <div
        className={`fixed top-0 right-0 w-full h-full sm:w-80 bg-white shadow-xl z-50 tranform 
        ${
          isProfileOpen ? "translate-x-0" : "translate-x-full"
        } transition-transform duration-300`}
      >
        <div className="p-4 border-b flex justify-between items-center">
          <h2 className="font-semibold text-lg">Profile</h2>
          <button
            onClick={() => dispatch(closeProfile())}
            className="cursor-pointer"
          >
            X
          </button>
        </div>
        <div className="p-4 space-y-4">
          {authStatus ? (
            <>
              <div className="border p-3 rounded-lg">
                <p className="font-medium">Hi, {userData?.name}</p>
                <p className="text-sm text-gray-500">{userData?.email}</p>
              </div>
              <div className="flex flex-col gap-3">
                <Link
                  to="/profile"
                  onClick={() => dispatch(closeProfile())}
                  className="border p-2 rounded hover:bg-gray-100"
                >
                  My Profile
                </Link>
                <Link
                  to="/orders"
                  onClick={() => dispatch(closeProfile())}
                  className="border p-2 rounded hover:bg-gray-100"
                >
                  My Orders
                </Link>
                <button
                  onClick={handleLogout}
                  className="border p-2 rounded text-red-500 hover:bg-red-50"
                >
                  Logout
                </button>
              </div>
            </>
          ) : (
            // Guest View
            <div className="flex flex-col gap-3">
              <Link
                to="/login"
                onClick={() => dispatch(closeProfile())}
                className="border p-2 rounded hover:bg-gray-900 text-center bg-blue-500 text-white"
              >
                Login
              </Link>
              <Link
                to="/signup"
                onClick={() => dispatch(closeProfile())}
                className="border p-2 rounded hover:bg-gray-900 text-center bg-blue-950 text-white"
              >
                Signup
              </Link>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default ProfileDrawer;
