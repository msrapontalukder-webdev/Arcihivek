import { useState, useEffect } from "react";
// Make sure this path points to your axios instance
import axios from "../hooks/axios";

// Base API URL
const BASE_URL = "https://dealbuzzz-backend-with-typescript.onrender.com";

const emptyProduct = {
  title: "",
  price: "",
  description: "",
  tag: "",
  image: "",
};

export default function ProductManager() {
  // --- STATE ---
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Modal & Form State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState("add"); // 'add' or 'edit'
  const [formData, setFormData] = useState(emptyProduct);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // ================= FETCH DATA (READ) =================
  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${BASE_URL}/product/get-product`);

      const productData = response.data?.data || response.data;
      if (Array.isArray(productData)) {
        setProducts(productData);
      } else if (
        productData &&
        productData.length > 0 &&
        productData[0].items
      ) {
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

  useEffect(() => {
    fetchProducts();
  }, []);

  // ================= MODAL HANDLERS =================
  const openModal = (mode, product = null) => {
    setModalMode(mode);
    if (mode === "edit" && product) {
      setFormData({
        _id: product._id || product.id,
        title: product.title || product.name || "",
        price: product.price || "",
        description: product.description || product.desc || "",
        tag: product.tag || "",
        image: product.images?.[0] || product.image || "",
      });
    } else {
      setFormData(emptyProduct);
    }
    setIsModalOpen(true);
    document.body.style.overflow = "hidden"; // Prevent background scrolling
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setFormData(emptyProduct);
    document.body.style.overflow = "unset";
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // ================= SUBMIT HANDLER (CREATE & UPDATE) =================
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      if (modalMode === "add") {
        // Hitting your exact backend route for create
        await axios.post(`${BASE_URL}/product/create`, formData);
      } else {
        // Hitting your exact backend route for update (assuming ID in URL)
        const targetId = formData._id || formData.id;
        await axios.put(`${BASE_URL}/product/update/${targetId}`, formData);
      }

      await fetchProducts(); // Refresh the list
      closeModal();
    } catch (error) {
      console.error(`Error ${modalMode}ing product:`, error);
      alert(`Failed to ${modalMode} product. Please check console.`);
    } finally {
      setIsSubmitting(false);
    }
  };

  // ================= DELETE HANDLER =================
  const handleDelete = async (id) => {
    if (!id) return;

    if (!window.confirm("Are you sure you want to delete this product?")) {
      return;
    }

    try {
      await axios.delete(`${BASE_URL}/product/delete/${id}`);
      // Optimistically remove from UI
      setProducts(products.filter((p) => p._id !== id && p.id !== id));
    } catch (error) {
      console.error("Error deleting product:", error);
      alert("Failed to delete product.");
    }
  };

  return (
    <section className="bg-white py-16 md:py-24 min-h-screen">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
        {/* ================= SECTION HEADER ================= */}
        <div className="flex flex-col gap-4 mb-10">
          <div className="flex items-center gap-4">
            <div className="w-5 h-10 bg-[#DB4444] rounded-[4px]"></div>
            <span className="text-[#DB4444] font-bold tracking-wide">
              Admin Dashboard
            </span>
          </div>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <h2 className="text-3xl md:text-4xl font-bold text-black tracking-wide">
              Manage Products
            </h2>

            <button
              onClick={() => openModal("add")}
              className="bg-[#DB4444] text-white font-medium py-3 px-8 rounded-[4px] hover:bg-[#c33a3a] transition-colors flex items-center gap-2 shadow-sm"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="12" y1="5" x2="12" y2="19"></line>
                <line x1="5" y1="12" x2="19" y2="12"></line>
              </svg>
              Add New Product
            </button>
          </div>
        </div>

        {/* ================= DATA TABLE ================= */}
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <p className="text-gray-500 font-medium text-lg animate-pulse">
              Loading inventory...
            </p>
          </div>
        ) : (
          <div className="bg-white border border-gray-200 rounded-[4px] shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-[#F5F5F5] text-gray-600 text-sm uppercase tracking-wider">
                    <th className="p-4 font-medium">Image</th>
                    <th className="p-4 font-medium">Product Title</th>
                    <th className="p-4 font-medium">Price</th>
                    <th className="p-4 font-medium">Tag</th>
                    <th className="p-4 font-medium text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {products.length === 0 ? (
                    <tr>
                      <td
                        colSpan="5"
                        className="p-8 text-center text-gray-500 font-medium"
                      >
                        No products found in the database.
                      </td>
                    </tr>
                  ) : (
                    products.map((product, index) => (
                      <tr
                        key={product._id || product.id || index}
                        className="hover:bg-gray-50 transition-colors"
                      >
                        <td className="p-4">
                          <div className="w-16 h-16 bg-[#F5F5F5] rounded-[4px] flex items-center justify-center overflow-hidden p-1">
                            <img
                              src={
                                product.images?.[0] ||
                                product.image ||
                                "/placeholder.png"
                              }
                              alt="thumb"
                              className="max-w-full max-h-full object-contain mix-blend-multiply"
                            />
                          </div>
                        </td>
                        <td className="p-4 font-medium text-black">
                          {product.title || product.name}
                        </td>
                        <td className="p-4 text-[#DB4444] font-medium">
                          ${Number(product.price).toFixed(2)}
                        </td>
                        <td className="p-4">
                          {product.tag ? (
                            <span className="bg-gray-100 text-gray-600 text-[12px] font-semibold px-2.5 py-1 rounded-[4px] uppercase">
                              {product.tag}
                            </span>
                          ) : (
                            <span className="text-gray-400 text-sm">-</span>
                          )}
                        </td>
                        <td className="p-4">
                          <div className="flex justify-end gap-3">
                            {/* Edit Button */}
                            <button
                              onClick={() => openModal("edit", product)}
                              className="text-gray-500 hover:text-black transition-colors"
                              title="Edit"
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="20"
                                height="20"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              >
                                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                                <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                              </svg>
                            </button>
                            {/* Delete Button */}
                            <button
                              onClick={() =>
                                handleDelete(product._id || product.id)
                              }
                              className="text-gray-500 hover:text-[#DB4444] transition-colors"
                              title="Delete"
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="20"
                                height="20"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              >
                                <polyline points="3 6 5 6 21 6"></polyline>
                                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                              </svg>
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {/* ================= MODAL ================= */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm transition-opacity">
          <div className="bg-white rounded-[4px] w-full max-w-lg shadow-xl overflow-hidden animate-[fadeIn_0.2s_ease-out]">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-100">
              <h3 className="text-xl font-bold text-black tracking-wide">
                {modalMode === "add" ? "Add New Product" : "Edit Product"}
              </h3>
              <button
                onClick={closeModal}
                className="text-gray-400 hover:text-black transition-colors"
              >
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
                >
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
            </div>

            {/* Modal Form */}
            <form onSubmit={handleSubmit} className="p-6 flex flex-col gap-5">
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium text-gray-700">
                  Product Title
                </label>
                <input
                  type="text"
                  name="title"
                  required
                  value={formData.title}
                  onChange={handleInputChange}
                  className="border border-gray-300 rounded-[4px] p-2.5 outline-none focus:border-[#DB4444] transition-colors"
                  placeholder="e.g., Wireless Gaming Headset"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-medium text-gray-700">
                    Price ($)
                  </label>
                  <input
                    type="number"
                    name="price"
                    step="0.01"
                    required
                    value={formData.price}
                    onChange={handleInputChange}
                    className="border border-gray-300 rounded-[4px] p-2.5 outline-none focus:border-[#DB4444] transition-colors"
                    placeholder="99.99"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-medium text-gray-700">
                    Tag / Badge
                  </label>
                  <input
                    type="text"
                    name="tag"
                    value={formData.tag}
                    onChange={handleInputChange}
                    className="border border-gray-300 rounded-[4px] p-2.5 outline-none focus:border-[#DB4444] transition-colors"
                    placeholder="e.g., NEW"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium text-gray-700">
                  Image URL
                </label>
                <input
                  type="text"
                  name="image"
                  value={formData.image}
                  onChange={handleInputChange}
                  className="border border-gray-300 rounded-[4px] p-2.5 outline-none focus:border-[#DB4444] transition-colors text-sm"
                  placeholder="https://example.com/image.jpg"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium text-gray-700">
                  Description
                </label>
                <textarea
                  name="description"
                  rows="3"
                  required
                  value={formData.description}
                  onChange={handleInputChange}
                  className="border border-gray-300 rounded-[4px] p-2.5 outline-none focus:border-[#DB4444] transition-colors resize-none"
                  placeholder="Enter product details..."
                />
              </div>

              <div className="mt-2 flex justify-end gap-3 pt-4 border-t border-gray-100">
                <button
                  type="button"
                  onClick={closeModal}
                  className="px-6 py-2.5 rounded-[4px] text-gray-600 font-medium hover:bg-gray-100 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-[#DB4444] text-white font-medium px-6 py-2.5 rounded-[4px] hover:bg-[#c33a3a] transition-colors disabled:opacity-50"
                >
                  {isSubmitting
                    ? "Saving..."
                    : modalMode === "add"
                      ? "Save Product"
                      : "Update Product"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Global styles for the fade animation */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
        @keyframes fadeIn {
          from { opacity: 0; transform: scale(0.98); }
          to { opacity: 1; transform: scale(1); }
        }
      `,
        }}
      />
    </section>
  );
}
