import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import orderService from "../appwrite/orderService";
import { clearCart } from "../store/cartSlice";
function Checkout() {
  const cartItems = useSelector((state) => state.cart.items);
  const [address, setAddress] = useState("");
  const navigate = useNavigate();
  const userData = useSelector((state) => state.auth.userData);
  const dispatch = useDispatch();
  useEffect(() => {
    if (!userData) {
      navigate("/login");
    }
  }, [navigate, userData]);
  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
  const handleOrder = async () => {
    if (!address) {
      alert("please enter Address");
    } else {
      const orderData = {
        title: "Order",
        userId: userData.$id,
        email: userData.email,
        items: JSON.stringify(cartItems),
        total: Number(totalPrice),
        address,
        type: "order",
        price: String(totalPrice),
        image: "",
        category: "",
      };
      try {
        const res = await orderService.createOrder(orderData);
        if (res) {
          alert("Order placed successfully");
          dispatch(clearCart());
          navigate("/orders");
        }
      } catch (error) {
        console.log("Order failed", error);
      }
    }
  };

  if (!userData) return null;
  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">Checkout</h2>
      <div>
        <p className="text-sm text-gray-500">Logged in as: {userData.email}</p>
      </div>
      <textarea
        placeholder="Enter Your Address"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        className="w-full border p-3 rounded-lg mb-4"
      />
      <div className="border p-4 rounded-lg">
        <h3 className="font-semibold mb-2">Order Summary</h3>
        {cartItems.map((item) => (
          <div key={item.$id} className="flex justify-between">
            <p>
              {item.title} x {item.quantity}
            </p>
            <p>₹{item.price * item.quantity}</p>
          </div>
        ))}
        <hr className="my-2" />
        <h3 className="font-bold text-lg">Total : ₹{totalPrice}</h3>
      </div>
      <button
        onClick={handleOrder}
        className="mt-6 bg-black text-white px-6 py-2 rounded-lg"
      >
        Place Order
      </button>
    </div>
  );
}

export default Checkout;
