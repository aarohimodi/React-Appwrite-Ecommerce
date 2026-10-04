import React, { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import productService from "../appwrite/productService";

function Shop() {
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);
  useEffect(() => {
    productService.getProducts().then((res) => {
      if (res) {
        setProducts(res.rows);
      }
      setLoading(false);
    });
  }, []);
  if (loading) {
    return (
      <div className="p-6 text-center">
        <p className="text-gray-500">Loading products...</p>
      </div>
    );
  }
  return (
    <div className="p-4">
      <h1 className="text-2xl font-semibold mb-4">Products</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((item) => (
          <ProductCard key={item.$id} product={item} />
        ))}
      </div>
    </div>
  );
}

export default Shop;
