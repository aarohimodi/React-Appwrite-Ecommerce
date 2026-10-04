import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../store/cartSlice";
import { closeWishlist } from "../../store/uiSlice";
import { removeFromWishlist } from "../../store/wishlistSlice";
import productService from "../../appwrite/productService";

function WishlistDrawer() {
  const dispatch = useDispatch();
  const isOpen = useSelector((state) => state.ui.isWishlistOpen);
  const items = useSelector((state) => state.wishlist.items);
  return (
    <>
      {/* Overlay */}

      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
          onClick={() => dispatch(closeWishlist())}
        ></div>
      )}

      {/* Drawer */}

      <div
        className={`fixed top-0 right-0 h-full w-full sm:w-80 bg-white shadow-xl z-50 transform  transition-transform duration-500
        ${isOpen ? "translate-x-0" : "translate-x-full"}`}
      >
        {/* Header */}

        <div className="p-4 border-b flex justify-between">
          <h2 className="font-semibold text-lg">Wishlist ❤️</h2>
          <button onClick={() => dispatch(closeWishlist())}>X</button>
        </div>

        {/* Items */}
        <div className="p-4 space-y-4">
          {items.length === 0 ? (
            <div className="text-center text-gray-500 mt-10">
              <p className="text-lg">Your wishlist is empty 💔</p>
              <p className="text-sm mt-2">Start adding items you love</p>
            </div>
          ) : (
            items.map((item) => (
              <div
                key={item.$id}
                className="border p-4 rounded-xl shadow-sm hover:shadow-md transition bg-white"
              >
                <div className="flex gap-3">
                  <img
                    src={
                      item.image
                        ? productService.getImagePreview(item.image).toString()
                        : "https://via.placeholder.com/300"
                    }
                    alt={item.title}
                    className="w-16 h-16 object-cover rounded-lg"
                  />
                  <div className="flex-1">
                    <p className="font-medium"> {item.title}</p>
                    <p className="text-sm text-gray-500">₹{item.price}</p>
                  </div>
                </div>
                <div className="flex justify-between mt-3 items-center">
                  <button
                    onClick={() => {
                      dispatch(addToCart(item));
                      dispatch(removeFromWishlist(item.$id));
                      alert("Moved to cart ✅");
                    }}
                    className="text-indigo-500 text-xs font-medium hover:underline"
                  >
                    Move to Cart
                  </button>
                  <button
                    onClick={() => dispatch(removeFromWishlist(item.$id))}
                    className="text-red-500 text-xs font-medium hover:underline"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* End Div */}
      </div>
    </>
  );
}

export default WishlistDrawer;
