import React, { useEffect, useState } from "react";
import productService from "../../appwrite/productService";
import { useNavigate } from "react-router-dom";
import { isAdmin } from "../../utils/isAdmin";
import { useSelector } from "react-redux";
function ManageProducts() {
  const [products, setProducts] = useState([]);
  const userData = useSelector((state) => state.auth.userData);
  const navigate = useNavigate();
  useEffect(() => {
    if (!isAdmin(userData)) {
      navigate("/");
    }
  }, [userData]);
  useEffect(() => {
    productService.getProducts().then((res) => {
      if (res) {
        setProducts(res.rows);
      }
    });
  }, []);
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Delete this Product");
    if (!confirmDelete) return;
    await productService.deleteProduct(id);
    setProducts((prev) => prev.filter((p) => p.$id !== id));
  };
  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">Manage Products</h2>
      <div className="grid md:grid-cols-3 gap-4">
        {products.map((item) => (
          <div
            key={item.$id}
            className="border p-4 rounded-xl shadow-sm bg-white"
          >
            <img
              src={item.image}
              alt={item.title}
              className="h-40 w-full object-cover rounded"
            />
            <h3 className="mt-2 font-semibold">{item.title}</h3>
            <p className="text-sm text-gray-500">₹{item.price}</p>
            <div className="flex justify-between items-center">
              <button
                onClick={() => handleDelete(item.$id)}
                className="mt-3 text-red-500 text-sm hover:underline"
              >
                Delete
              </button>
              <button
                onClick={() => navigate(`/admin/edit/${item.$id}`)}
                className="text-indigo-500 text-sm hover:underline mr-3"
              >
                Edit
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ManageProducts;
