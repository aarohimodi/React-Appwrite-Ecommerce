import React, { useState, useEffect } from "react";
import config from "../../config/config";
import { Client, Query, TablesDB, Storage, ID } from "appwrite";
import categoryService from "../../appwrite/categoryService";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { isAdmin } from "../../utils/isAdmin";

function AddCategory() {
  const userData = useSelector((state) => state.auth.userData);
  const navigate = useNavigate();
  useEffect(() => {
    if (!isAdmin(userData)) {
      navigate("/");
    }
  }, [userData]);
  const [form, setForm] = useState({
    category: "",
    image: null,
  });
  const [loading, setLoading] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.category || !form.image) {
      alert("All fields required");
      return;
    }
    const categoryData = {
      title: "category",
      userId: userData.$id,
      email: userData.email,
      items: "",
      total: 0,
      type: "category",
      price: "0",
      image: form.image,
      category: form.category,
    };
    try {
      setLoading(true);
      await categoryService.createCategory(categoryData);
      alert("Category Added ✅");

      setForm({ name: "", image: null });
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter Category Name"
          value={form.category}
          onChange={(e) => setForm({ ...form, category: e.target.value })}
        />
        <input
          type="file"
          placeholder="Enter Category Name"
          onChange={(e) => setForm({ ...form, image: e.target.files[0] })}
        />
        <button type="submit">{loading ? "Adding..." : "Submit"}</button>
      </form>
    </div>
  );
}

export default AddCategory;
