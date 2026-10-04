import React, { useEffect, useState } from "react";
import productService from "../../appwrite/productService";
import categoryService from "../../appwrite/categoryService";

function AddProduct() {
  const [category, setCategory] = useState([]);
  const [form, setForm] = useState({
    title: "",
    price: "",
    image: null,
    category: "",
    oldprice: "",
    description: "",
    newArrival: "",
    onSale: "",
    stock: "",
    rating: "",
  });
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  useEffect(() => {
    const fetchCat = async () => {
      try {
        const catRes = await categoryService.getCategories();
        if (catRes?.rows) {
          setCategory(catRes.rows);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchCat();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      ...form,
      price: String(form.price),
      oldprice: String(form.oldprice),
      stock: String(form.stock),
      rating: String(form.rating),
      newArrival: form.newArrival === "true",
      onSale: form.onSale === "true",
      type: "product",
    };

    const res = await productService.createProduct(data);
    if (res) {
      alert("Product Added");
      setForm({
        title: "",
        price: "",
        image: null,
        category: "",
        oldprice: "",
        description: "",
        newArrival: "",
        onSale: "",
        stock: "",
        rating: "",
      });
    }
  };
  return (
    <div className="p-6 max-w-xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Add Product</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <label>Title</label>
        <input
          type="text"
          name="title"
          value={form.title}
          onChange={handleChange}
          placeholder="Product Title"
          className="w-full border p-2 rounded"
        />
        <label>Price</label>
        <input
          type="text"
          name="price"
          value={form.price}
          onChange={handleChange}
          placeholder="Price"
          className="w-full border p-2 rounded"
        />
        <label>Old Price</label>
        <input
          type="text"
          name="oldprice"
          value={form.oldprice}
          onChange={handleChange}
          placeholder="Old Price"
          className="w-full border p-2 rounded"
        />
        <label>Product Image</label>
        <input
          type="file"
          name="image"
          onChange={(e) =>
            setForm({
              ...form,
              image: e.target.files[0],
            })
          }
          placeholder="Product Image URL"
          className="w-full border p-2 rounded"
        />
        {form.image && (
          <img src={URL.createObjectURL(form.image)} className="h-20 mt-2" />
        )}
        <label>Category</label>
        {/* <input
          name="category"
          value={form.category}
          onChange={handleChange}
          placeholder="Category"
          className="w-full border p-2 rounded"
        /> */}
        <select
          name="category"
          value={form.category}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        >
          <option value="">Select Catrgory</option>
          {category.map((cat) => (
            <option key={cat.$id} value={cat.category}>
              {cat.category}
            </option>
          ))}
        </select>
        <label>Description</label>
        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          placeholder="Product Description"
          className="w-full border p-2 rounded"
        >
          {form.description}
        </textarea>
        <label>New Arriaval</label>
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
          type="text"
          name="stock"
          value={form.stock}
          onChange={handleChange}
          placeholder="Stock"
          className="w-full border p-2 rounded"
        />
        <label>Rating</label>
        <input
          type="text"
          name="rating"
          value={form.rating}
          onChange={handleChange}
          placeholder="Rating"
          className="w-full border p-2 rounded"
        />
        <button className="bg-indigo-500 text-white px-4 py-2 rounded">
          Add Product
        </button>
      </form>
    </div>
  );
}

export default AddProduct;
