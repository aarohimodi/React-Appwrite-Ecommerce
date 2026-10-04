import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  decreaseQuantity,
  increaseQuantity,
  removeFromCart,
} from "../../store/cartSlice";
import { closeCart } from "../../store/uiSlice";
import { useNavigate } from "react-router-dom";

function CartDrawer() {
  const dispatch = useDispatch();
  const isCartOpen = useSelector((state) => state.ui.isCartOpen);
  const items = useSelector((state) => state.cart.items);
  const navigate = useNavigate();
  // Subtotal

  const subTotal = items.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  //   Delivery Charges

  let deliveryCharges = 0;
  if (subTotal > 0 && subTotal <= 499) {
    deliveryCharges = Math.max(subTotal * 0.02, 20);
  }
  const total = subTotal + deliveryCharges;
  return (
    <>
      {/* {overlay} */}
      {isCartOpen && (
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
          onClick={() => dispatch(closeCart())}
        ></div>
      )}
      {/* // Drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-full sm:w-80 bg-white shadow-xl z-50 transform 
        ${
          isCartOpen ? "translate-x-0" : "translate-x-full"
        } transition-transform duration-300`}
      >
        {/* Header */}
        <div className="p-4 border-b flex justify-between items-center">
          <h2 className="font-semibold text-lg">Your Cart</h2>
          <button
            onClick={() => dispatch(closeCart())}
            className="cursor-pointer"
          >
            X
          </button>
        </div>
        {/* Items */}
        <div className="p-4 space-y-4 overflow-y-auto h-[60%]">
          {items.length === 0 ? (
            <p className="text-gray-500">Your Cart is Empty</p>
          ) : (
            items.map((item) => (
              <div
                key={item.$id}
                className="flex justify-between items-start border p-3 rounded-lg"
              >
                {/* Left */}
                <div>
                  <p className="font-medium">{item.title}</p>
                  <p className="text-sm text-gray-500">₹{item.price}</p>

                  {/* Quantity */}

                  <div className="flex items-center gap-2 mt-2">
                    <button
                      className="px-2 border rounded"
                      onClick={() => dispatch(decreaseQuantity(item.$id))}
                    >
                      -
                    </button>
                    <span>{item.quantity}</span>
                    <button
                      className="px-2 border rounded"
                      onClick={() => dispatch(increaseQuantity(item.$id))}
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Right */}

                <div className="text-right">
                  <p className="font-medium">₹{item.price * item.quantity}</p>
                  <button onClick={() => dispatch(removeFromCart(item.$id))}>
                    Remove
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}

        <div className="p-4 border-t space-y-2">
          {/* SubTotal */}
          <div className="flex justify-between">
            <span>Subtotal</span>
            <span>₹{subTotal}</span>
          </div>
          {/* delivery */}
          <div className="flex justify-between">
            <span>Delivery</span>
            <span>
              {deliveryCharges === 0 && subTotal > 0
                ? "Free 🎉"
                : `${deliveryCharges.toFixed(0)}`}
            </span>
          </div>
          {/* Free Delivery Hint    */}

          {subTotal < 500 && subTotal > 0 && (
            <p className="text-sm text-shadow-gray-500">
              Add ₹{500 - subTotal} more for Free Delivery
            </p>
          )}
          <hr />
          {/* Total */}
          <div className="flex justify-between font-semibold text-lg">
            <span>Total</span>
            <span>₹{total.toFixed(0)}</span>
          </div>

          <button
            onClick={() => {
              dispatch(closeCart());
              navigate("/cart");
            }}
            className="w-full bg-indigo-500 text-white py-2 rounded-lg hover:bg-indigo-600 transition active:scale-95"
          >
            Go to Cart
          </button>
        </div>
      </div>
    </>
  );
}

export default CartDrawer;
