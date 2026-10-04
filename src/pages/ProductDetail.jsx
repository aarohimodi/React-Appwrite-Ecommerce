import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { addToCart } from "../store/cartSlice";
import productService from "../appwrite/productService";
import { FaHeart } from "react-icons/fa";

import toast from "react-hot-toast";
function ProductDetail() {
  const [loading, setLoading] = useState(true);
  const { id } = useParams();

  const dispatch = useDispatch();
  const [qty, setQty] = useState(1);
  const [product, setProduct] = useState(null);
  useEffect(() => {
    productService.getProduct(id).then((res) => {
      if (res) setProduct(res);
      setLoading(false);
    });
  }, [id]);
  if (loading) {
    return (
      <div className="p-6 text-center">
        <p className="text-gray-500">Loading product</p>
      </div>
    );
  }
  if (!product) {
    return <p>Product Not Available</p>;
  } else {
    return (
      <div
        className="p-6 max-w-6xl mx-auto grid 
        md:grid-cols-2
     gap-10"
      >
        <div className="overflow-hidden rounded-xl">
          <img
            src={
              product.image
                ? productService.getImagePreview(product.image).toString()
                : "https://via.placeholder.com/300"
            }
            alt={product.title}
            className="rounded-xl w-full hover:scale-110 transition duration-500 cursor-pointer"
          />
        </div>
        <div>
          <h2 className="text-3xl font-bold">{product.title}</h2>
          <p className="text-2xl text-indigo-600 mt-2">₹{product.price}</p>
          <p className="mt-4 text-gray-600">{product.description}</p>

          {/* Quantity Selector */}
          <div className="flex items-center gap-4 mt-6">
            <button
              onClick={() => qty > 1 && setQty(qty - 1)}
              className="px-3 py-1 border rounded"
            >
              -
            </button>
            <span className="text-lg">{qty}</span>
            <button
              onClick={() => setQty(qty + 1)}
              className="px-3 py-1 border rounded"
            >
              +
            </button>
          </div>
          <div className="flex gap-4 mt-6">
            <button
              onClick={() => {
                const NeededData = {
                  $id: product.$id,
                  title: product.title,
                  price: Number(product.price),
                  image: product.image,
                  quantity: qty,
                };
                dispatch(addToCart(NeededData));
                toast.success("Added to cart 🛒");
              }}
              className="mt-6 bg-indigo-500 text-white px-6 py-2 rounded-lg hover:bg-indigo-600 transition"
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default ProductDetail;
