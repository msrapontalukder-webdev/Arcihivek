import { useState, useEffect } from "react";
// Make sure this path points to your axios instance
import axios from "../hooks/axios";
// Base API URL
const BASE_URL = "https://dealbuzzz-backend-with-typescript.onrender.com";

export default function HomeProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // ================= FETCH DATA ON LOAD =================
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        // FIXED: Combined the app path ("/product") with the router path ("/get-product")
        const response = await axios.get(`${BASE_URL}/product/get-product`);

        // Check if the backend wraps the array in a "data" property
        const productData = response.data?.data || response.data;

        // Safely set the products depending on how your controller formats the JSON
        if (Array.isArray(productData)) {
          setProducts(productData);
        } else if (
          productData &&
          productData.length > 0 &&
          productData[0].items
        ) {
          setProducts(productData[0].items);
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <section className="bg-[#f4f4f4] py-16 md:py-24">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="mb-12 text-center md:text-left">
          <h2 className="text-3xl md:text-5xl font-bold text-black mb-4">
            OUR <span className="text-[#E1033D]">PRODUCTS</span>
          </h2>
          <div className="w-[80px] h-[3px] bg-black mx-auto md:mx-0"></div>
        </div>

        {/* Loading State */}
        {loading && (
          <p className="text-center text-gray-500 py-10 font-medium">
            Loading products...
          </p>
        )}

        {/* Empty State */}
        {!loading && products.length === 0 && (
          <p className="text-center text-gray-500 py-10 font-medium">
            No products available at the moment.
          </p>
        )}

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
          {!loading &&
            products.map((product, index) => (
              <div
                key={product._id || product.id || index}
                className="bg-white p-4 rounded-lg shadow-sm hover:shadow-xl transition-all duration-300 group cursor-pointer"
              >
                {/* Product Image */}
                <div className="w-full h-[250px] bg-gray-100 rounded-md mb-4 overflow-hidden relative">
                  <img
                    src={product.images[0] || "/placeholder.png"}
                    alt={product.title || product.name || "Product"}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>

                {/* Product Details */}
                <div className="flex flex-col gap-1">
                  {/* Tag (if your product data includes one) */}
                  {product.tag && (
                    <span className="text-[10px] text-gray-500 uppercase tracking-wider font-semibold">
                      {product.tag}
                    </span>
                  )}

                  {/* Title/Name */}
                  <h3 className="text-lg font-bold text-black line-clamp-1">
                    {product.title || product.name}
                  </h3>

                  {/* Description */}
                  <p className="text-sm text-gray-600 line-clamp-2 mt-1">
                    {product.desc || product.description}
                  </p>

                  {/* Bottom Action Area */}
                  <div className="mt-4 flex items-center justify-between">
                    <span className="font-semibold text-lg">
                      {product.price ? `$${product.price}` : "Details"}
                    </span>
                    <div className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center group-hover:bg-[#E1033D] transition-colors">
                      ↗
                    </div>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </section>
  );
}
