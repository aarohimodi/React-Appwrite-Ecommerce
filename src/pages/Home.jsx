import React, { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
// import { products } from "../utils/Products";
// import { useSelector } from "react-redux";
import productService from "../appwrite/productService";
import BannerSlider from "../components/homeBanner/BannerSlider";
import categoryService from "../appwrite/categoryService";

function Home() {
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const prodRes = await productService.getProducts();
        const catRes = await categoryService.getCategories();
        if (prodRes?.rows) setProducts(prodRes.rows);
        if (catRes?.rows) setCategory(catRes.rows);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="p-6 text-center">
        <p className="text-gray-500">Loading products...</p>
      </div>
    );
  }

  return (
    <>
      {<BannerSlider />}
      <section className="max-w-[1200px] mx-auto justify-between items-center py-20">
        <div className="flex justify-between gap-10 ">
          {category.map((item) => (
            <div>
              <img
                className="rounded-lg"
                src={
                  item.image
                    ? categoryService.getImage(item.image).toString()
                    : "https://via.placeholder.com/300"
                }
              />
            </div>
          ))}
        </div>
      </section>
      <div className="bg-[#DDB195] py-20 ">
        <div className="max-w-[1200px] mx-auto justify-between items-center  ">
          <h1 className="text-4xl mb-10 font-semibold mb-4 text-center text-white">
            Products
          </h1>
          <hr className="mb-10" />
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map((item) => (
              <ProductCard key={item.$id} product={item} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
