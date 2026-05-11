import { useState, useEffect } from "react";
// Make sure this path points to your axios instance
import axios from "../hooks/axios";

// Base API URL
const BASE_URL = "https://dealbuzzz-backend-with-typescript.onrender.com";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // ================= FETCH DATA ON LOAD =================
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        // Hitting your exact backend route
        const response = await axios.get(`${BASE_URL}/product/get-product`);

        // Safely extract the data (handles both flat arrays and standard JSON wrappers)
        const productData = response.data?.data || response.data;

        if (Array.isArray(productData)) {
          setProducts(productData);
        } else if (
          productData &&
          productData.length > 0 &&
          productData[0].items
        ) {
          // Fallback if your DB uses a master-document structure
          setProducts(productData[0].items);
        } else {
          setProducts([]);
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Reusable Star Rating Component (Fallback for mock data if missing from DB)
  const StarRating = ({ rating = 5, count = 0 }) => {
    return (
      <div className="flex items-center gap-1">
        <div className="flex text-[#FFAD33]">
          {[1, 2, 3, 4, 5].map((star) => (
            <svg
              key={star}
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill={star <= rating ? "currentColor" : "none"}
              stroke="currentColor"
              strokeWidth="2"
              className={`w-4 h-4 ${star > rating ? "text-gray-300" : ""}`}
            >
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
            </svg>
          ))}
        </div>
        <span className="text-gray-500 text-sm ml-1 font-medium">
          ({count})
        </span>
      </div>
    );
  };

  return (
    <section className="bg-white py-16 md:py-24">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
        {/* ================= SECTION HEADER ================= */}
        <div className="flex flex-col gap-4 mb-10">
          {/* Tagline */}
          <div className="flex items-center gap-4">
            <div className="w-5 h-10 bg-[#DB4444] rounded-[4px]"></div>
            <span className="text-[#DB4444] font-bold tracking-wide">
              Our Products
            </span>
          </div>

          {/* Main Title & Nav Arrows */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <h2 className="text-3xl md:text-4xl font-bold text-black tracking-wide">
              Explore Our Products
            </h2>

            {/* Top Right Arrows */}
            <div className="flex items-center gap-2">
              <button className="w-11 h-11 rounded-full bg-[#F5F5F5] flex items-center justify-center hover:bg-gray-200 transition-colors">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-black"
                >
                  <line x1="19" y1="12" x2="5" y2="12"></line>
                  <polyline points="12 19 5 12 12 5"></polyline>
                </svg>
              </button>
              <button className="w-11 h-11 rounded-full bg-[#F5F5F5] flex items-center justify-center hover:bg-gray-200 transition-colors">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-black"
                >
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                  <polyline points="12 5 19 12 12 19"></polyline>
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* ================= STATES ================= */}
        {loading && (
          <div className="flex justify-center items-center py-20">
            <p className="text-gray-500 font-medium text-lg animate-pulse">
              Loading products...
            </p>
          </div>
        )}

        {!loading && products.length === 0 && (
          <p className="text-center text-gray-500 py-20 font-medium border-2 border-dashed border-gray-200 rounded-lg">
            No products available at the moment.
          </p>
        )}

        {/* ================= PRODUCTS GRID ================= */}
        {!loading && products.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {products.map((product, index) => {
              // Creating alternating mock tags/data since DB might not have them
              const isNew = index % 4 === 0 || index % 5 === 0;
              const mockReviewCount = Math.floor(Math.random() * 200) + 20;
              const mockRating = Math.floor(Math.random() * 2) + 4; // 4 or 5 stars

              return (
                <div
                  key={product._id || product.id || index}
                  className="group flex flex-col cursor-pointer"
                >
                  {/* Image Container with #F5F5F5 background */}
                  <div className="w-full h-[250px] bg-[#F5F5F5] rounded-[4px] mb-4 relative overflow-hidden flex items-center justify-center p-6">
                    {/* Badge (NEW) */}
                    {isNew && (
                      <div className="absolute top-3 left-3 bg-[#00FF66] text-white text-[12px] font-bold px-3 py-1 rounded-[4px]">
                        NEW
                      </div>
                    )}

                    {/* Top Right Actions */}
                    <div className="absolute top-3 right-3 flex flex-col gap-2 z-10">
                      <button className="w-[34px] h-[34px] bg-white rounded-full flex items-center justify-center text-black hover:bg-[#DB4444] hover:text-white transition-colors shadow-sm">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="18"
                          height="18"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                        </svg>
                      </button>
                      <button className="w-[34px] h-[34px] bg-white rounded-full flex items-center justify-center text-black hover:bg-[#DB4444] hover:text-white transition-colors shadow-sm">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="18"
                          height="18"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                          <circle cx="12" cy="12" r="3"></circle>
                        </svg>
                      </button>
                    </div>

                    {/* Product Image */}
                    <img
                      src={
                        product.images?.[0] ||
                        product.image ||
                        "/placeholder.png"
                      }
                      alt={product.title || product.name || "Product"}
                      className="max-w-full max-h-full object-contain mix-blend-multiply transition-transform duration-300 group-hover:scale-110"
                    />

                    {/* Add to Cart Hover Button */}
                    <button className="absolute bottom-0 left-0 w-full bg-black text-white text-base font-medium py-2.5 translate-y-full group-hover:translate-y-0 transition-transform duration-300 rounded-b-[4px]">
                      Add To Cart
                    </button>
                  </div>

                  {/* Product Info Area */}
                  <div className="flex flex-col gap-1.5">
                    {/* Title */}
                    <h3 className="text-base font-medium text-black line-clamp-1">
                      {product.title || product.name}
                    </h3>

                    {/* Price and Rating Row */}
                    <div className="flex items-center gap-3">
                      <span className="text-base font-medium text-[#DB4444]">
                        {product.price
                          ? `Tk${Number(product.price).toFixed(2)}`
                          : "TK0.00"}
                      </span>
                      <StarRating
                        rating={product.rating || mockRating}
                        count={product.reviews || mockReviewCount}
                      />
                    </div>

                    {/* Color Swatches (Mocked based on index for layout accuracy) */}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* ================= BOTTOM ACTION ================= */}
        {!loading && products.length > 0 && (
          <div className="mt-14 flex justify-center">
            <button className="bg-[#DB4444] text-white font-medium py-3.5 px-10 rounded hover:bg-[#c33a3a] transition-colors">
              View All Products
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
