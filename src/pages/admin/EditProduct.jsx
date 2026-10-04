import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import productService from "../../appwrite/productService";

function EditProduct() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    price: "",
    image: "",
    category: "",
    oldprice: "",
    description: "",
    newArrival: "",
    onSale: "",
    stock: "",
    rating: "",
  });

  // 🔥 Load existing data
  useEffect(() => {
    productService.getProduct(id).then((res) => {
      if (res) {
        setForm({
          title: res.title || "",
          price: res.price || "",
          image: res.image || "",
          category: res.category || "",
          oldprice: res.oldprice || "",
          description: res.description || "",
          newArrival: String(res.newArrival), // 🔥 important
          onSale: String(res.onSale), // 🔥 important
          stock: res.stock || "",
          rating: res.rating || "",
        });
      }
    });
  }, [id]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    const data = {
      ...form,
      price: String(form.price),
      oldprice: String(form.oldprice),
      stock: String(form.stock),
      rating: String(form.rating),

      newArrival: form.newArrival === "true",
      onSale: form.onSale === "true",
    };

    await productService.updateProduct(id, data);

    alert("Product Updated ✅");
    navigate("/admin/products");
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Edit Product</h2>

      <form onSubmit={handleUpdate} className="space-y-4">
        <label>Title</label>
        <input
          name="title"
          value={form.title}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />

        <label>Price</label>
        <input
          name="price"
          value={form.price}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />

        <label>Old Price</label>
        <input
          name="oldprice"
          value={form.oldprice}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />

        <label>Image</label>
        <input
          name="image"
          value={form.image}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />

        <label>Category</label>
        <input
          name="category"
          value={form.category}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />

        <label>Description</label>
        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />

        <label>New Arrival</label>
        <select
          name="newArrival"
          value={form.newArrival}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        >
          <option value="">Select</option>
          <option value="true">Yes</option>
          <option value="false">No</option>
        </select>

        <label>On Sale</label>
        <select
          name="onSale"
          value={form.onSale}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        >
          <option value="">Select</option>
          <option value="true">Yes</option>
          <option value="false">No</option>
        </select>

        <label>Stock</label>
        <input
          name="stock"
          value={form.stock}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />

        <label>Rating</label>
        <input
          name="rating"
          value={form.rating}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />

        <button className="bg-indigo-500 text-white px-4 py-2 rounded">
          Update Product
        </button>
      </form>
    </div>
  );
}

export default EditProduct;
