import { useEffect, useState } from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Navbar from "./components/Header/Navbar";
import CartDrawer from "./components/Drawers/CartDrawer";
import WishlistDrawer from "./components/Drawers/WishlistDrawer";
import ProductDetail from "./pages/ProductDetail";
import ProfileDrawer from "./components/Drawers/ProfileDrawer";
import AuthLayout from "./components/AuthLayout";
import { useDispatch } from "react-redux";
import authService from "./appwrite/auth";
import { login as authLogin } from "../src/store/authSlice";
// import Profile from "./pages/Profile";
import { Toaster } from "react-hot-toast";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Orders from "./pages/Orders";
import AddProduct from "./pages/admin/AddProduct";
import ManageProducts from "./pages/admin/ManageProducts";
import EditProduct from "./pages/admin/EditProduct";
import AddCategory from "./pages/admin/AddCategory";
import Shop from "./pages/Shop";
import Footer from "./components/Footer/Footer";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    authService
      .getCurrentUser()
      .then((userData) => {
        dispatch(
          authLogin({
            $id: userData.$id,
            name: userData.name,
            email: userData.email,
          }),
        );
      })
      .catch(() => {});
  }, []);

  return (
    <BrowserRouter>
      <Navbar />
      <Toaster position="top-right" />

      <CartDrawer />
      <WishlistDrawer />
      <ProfileDrawer />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/login"
          element={
            <AuthLayout authentication={false}>
              <Login />
            </AuthLayout>
          }
        />
        <Route
          path="/signup"
          element={
            <AuthLayout authentication={false}>
              {" "}
              <Signup />
            </AuthLayout>
          }
        />
        {/* <Route
          path="/profile"
          element={
            <AuthLayout authentication={true}>
              {" "}
              <Profile />
            </AuthLayout>
          }
        /> */}
        <Route
          path="/orders"
          element={
            <AuthLayout authentication={true}>
              <Orders />
            </AuthLayout>
          }
        />
        <Route path="/shop" element={<Shop />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/admin/add-product" element={<AddProduct />} />
        <Route path="/admin/products" element={<ManageProducts />} />
        <Route path="/admin/edit/:id" element={<EditProduct />} />
        <Route path="/admin/add-category" element={<AddCategory />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
