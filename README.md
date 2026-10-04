# 🛒 Ecommerce Project – Flow Overview

## 📁 Project Structure

### 🔹 Appwrite (Backend Services)

- `auth.js` → Login / Signup / Logout logic
- `productService.js` → Products fetch/add/update/delete
- `orderService.js` → Order place & fetch

---

### 🔹 Components

#### Auth

- `Login.jsx` → Login form UI + logic
- `Signup.jsx` → Signup form UI + logic

#### Drawer

- `CartDrawer.jsx` → Cart sidebar
- `WishlistDrawer.jsx` → Wishlist sidebar
- `ProfileDrawer.jsx` → User info sidebar

#### Header

- `Navbar.jsx` → Main navigation
- `MobileMenu.jsx` → Mobile responsive menu

#### Common Components

- `Button.jsx` → Reusable button
- `Input.jsx` → Reusable input
- `ProductCard.jsx` → Product UI card
- `AuthLayout.jsx` → Protected routes wrapper

---

### 🔹 Pages

#### User Pages

- `Home.jsx` → All products
- `ProductDetail.jsx` → Single product
- `Cart.jsx` → Cart page
- `Checkout.jsx` → Order place
- `Orders.jsx` → Order history
- `Login.jsx`, `Signup.jsx`

#### Admin Pages

- `AddProduct.jsx`
- `EditProduct.jsx`
- `ManageProduct.jsx`

---

### 🔹 Store (Redux)

- `store.js` → Main store
- `authSlice.js` → User state
- `cartSlice.js` → Cart state
- `wishlistSlice.js` → Wishlist state
- `uiSlice.js` → Drawer & UI control

---

### 🔹 Config

- `config.js` → Appwrite config (API keys, project ID)

---

### 🔹 Utils

- `isAdmin.js` → Check admin access

---

### 🔹 Root Files

- `App.jsx` → Routing + layout
- `main.jsx` → React entry point

---

## 🔄 Flow Summary

1. User Signup/Login → `authSlice` update
2. Products fetch → `productService`
3. Add to cart/wishlist → Redux store
4. Checkout → `orderService`
5. Admin manage products → CRUD via Appwrite
