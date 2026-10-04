import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  increaseQuantity,
  decreaseQuantity,
  removeFromCart,
} from "../store/cartSlice";
import { Link } from "react-router-dom";

function Cart() {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);
  const userData = useSelector((state) => state.auth.userData);
  console.log("user hai kya", userData);
  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
  console.log("CART ITEMS", cartItems);
  if (cartItems.length === 0) {
    return <p className="p-6 text-center">Your cart is empty 🛒</p>;
  }
  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">Your Cart</h2>
      <div className="space-y-4">
        {cartItems.map((item) => (
          <div
            key={item.$id}
            className="flex items-center justify-between border p-4 rounded-lg"
          >
            {/* Left */}
            <div className="flex items-center gap-4">
              <img
                src={item.image}
                className="w-20 h-20 object-cover rounded"
              />
              <div>
                <h3 className="font-semibold">{item.title}</h3>
                <p className="text-gray-500">{item.price}</p>
              </div>

              {/* Quantity */}
              <div className="flex items-center gap-3">
                <button
                  onClick={() => dispatch(decreaseQuantity(item.$id))}
                  className="px-2 border rounded"
                >
                  -
                </button>
                <span>{item.quantity}</span>
                <button
                  onClick={() => dispatch(increaseQuantity(item.$id))}
                  className="px-2 border rounded"
                >
                  +
                </button>
              </div>

              {/* Remove */}
              <button
                onClick={() => dispatch(removeFromCart(item.$id))}
                className="text-red-500"
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>
      {/* Total */}
      <div className="mt-6 text-right">
        <h3 className="text-xl font-bold">Total: ₹{totalPrice}</h3>
        <Link to="/checkout">
          <button className="mt-4 bg-black text-white px-6 py-2 rounded-lg">
            Checkout
          </button>
        </Link>
      </div>
    </div>
  );
}

export default Cart;
