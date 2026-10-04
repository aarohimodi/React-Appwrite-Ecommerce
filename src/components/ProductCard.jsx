import React from "react";
import { FaHeart } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../store/cartSlice";
import { toggleWishlist } from "../store/wishlistSlice";
import { Link, useNavigate } from "react-router-dom";

import toast from "react-hot-toast";
import productService from "../appwrite/productService";
function ProductCard({ product }) {
  const dispatch = useDispatch();
  const wishlistItems = useSelector((state) => state.wishlist.items);
  const isWishlisted = wishlistItems.find((i) => i.$id === product.$id);
  const navigate = useNavigate();
  const cleanProduct = {
    $id: product.$id,
    title: product.title,
    price: Number(product.price),
    image: product.image,
  };

  return (
    <div
      onClick={() => {
        navigate(`/product/${product.$id}`);
      }}
      className="bg-white rounded-xl shadow-md p-4 hover:shadow-xl hover:scale-105 transition duration-300"
    >
      <img
        src={
          product.image
            ? productService.getImagePreview(product.image).toString()
            : "https://via.placeholder.com/300"
        }
        alt={product.title}
        className="rounded-lg w-full h-48 object-cover"
      />
      <div className="mt-3">
        <h3 className="font-semibold text-lg">{product.title}</h3>
        <p className="text-gray-500">₹{product.price}</p>
      </div>

      <div className="flex justify-between items-center mt-3">
        <button
          onClick={(e) => {
            e.stopPropagation();
            dispatch(addToCart(cleanProduct));
            toast.success("Added to cart 🛒");
          }}
          className="bg-black text-white px-3 py-1 rounded-lg text-sm hover:bg-indigo-600 transition"
        >
          Add to Cart
        </button>
        <FaHeart
          onClick={(e) => {
            e.stopPropagation();
            dispatch(toggleWishlist(cleanProduct));
            toast.success("Added to wishlist ❤️");
          }}
          className={`cursor-pointer  hover:text-red-500 transition
          ${isWishlisted ? "text-red-500" : "text-gray-400"}
          `}
        />
      </div>
    </div>
  );
}

export default ProductCard;
