import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "../hooks/axios";

const BASE_URL = "https://dealbuzzz-backend-with-typescript.onrender.com";

const emptyProduct = {
  title: "",
  price: "",
  discountPrice: "",
  description: "",
  category: "Electronics",
  tag: "",
  images: [""],
};

export default function ProductManager() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState("add");
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

  const totalItems = products.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = products.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const goToNextPage = () =>
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  const goToPrevPage = () => setCurrentPage((prev) => Math.max(prev - 1, 1));

  useEffect(() => {
    if (currentPage > totalPages && totalPages > 0) {
      setCurrentPage(totalPages);
    }
  }, [products.length, currentPage, totalPages]);

  // ================= MODAL HANDLERS =================
  const openModal = (mode, product = null) => {
    setModalMode(mode);
    if (mode === "edit" && product) {
      setFormData({
        _id: product._id || product.id,
        title: product.title || product.name || "",
        price: product.price || "",
        discountPrice: product.discountPrice || "",
        description: product.description || product.desc || "",
        category: product.category || "Electronics",
        tag: product.tag || "",
        images: product.images?.length ? product.images : [product.image || ""],
      });
    } else {
      setFormData(emptyProduct);
    }
    setIsModalOpen(true);
    document.body.style.overflow = "hidden";
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setFormData(emptyProduct);
    document.body.style.overflow = "unset";
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    setFormData({ ...formData, images: [e.target.value] });
  };

  // ================= SUBMIT HANDLER (CREATE & UPDATE) =================
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const payload = {
      ...formData,
      price: Number(formData.price),
      discountPrice: formData.discountPrice
        ? Number(formData.discountPrice)
        : null,
    };

    try {
      if (modalMode === "add") {
        // Updated to hit /create-product matching your backend router
        await axios.post(`${BASE_URL}/product/create-product`, payload);
      } else {
        const targetId = formData._id || formData.id;
        // Updated to use PATCH and hit /update-product/:id
        await axios.patch(
          `${BASE_URL}/product/update-product/${targetId}`,
          payload,
        );
      }

      await fetchProducts();
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
    if (!window.confirm("Are you sure you want to delete this product?"))
      return;

    try {
      // Updated to hit /delete-product/:id matching your backend router
      await axios.delete(`${BASE_URL}/product/delete-product/${id}`);
      setProducts(products.filter((p) => p._id !== id && p.id !== id));
    } catch (error) {
      console.error("Error deleting product:", error);
      alert("Failed to delete product.");
    }
  };

  return (
    <div className="flex h-screen bg-[#0E1117] text-gray-300 font-sans overflow-hidden">
      {/* ================= LEFT SIDEBAR ================= */}
      <aside className="w-[240px] bg-[#141821] border-r border-[#242936] flex flex-col hidden md:flex shrink-0 z-10">
        <div className="p-6">
          <div className="flex items-center gap-3 text-white font-bold text-xl tracking-wider mb-1">
            <div className="grid grid-cols-2 gap-1 w-5 h-5">
              <div className="bg-indigo-500 rounded-sm"></div>
              <div className="bg-indigo-500 rounded-sm"></div>
              <div className="bg-indigo-500 rounded-sm"></div>
              <div className="bg-indigo-500 rounded-sm"></div>
            </div>
            DEALBUZZ
          </div>
          <p className="text-xs text-gray-500 font-medium ml-8">
            Admin Console
          </p>
        </div>

        <nav className="flex-1 px-4 py-4 space-y-1">
          {[
            {
              name: "Dashboard",
              path: "/",
              icon: "M3 3h7v7H3z M14 3h7v7h-7z M14 14h7v7h-7z M3 14h7v7H3z",
            },
            {
              name: "Products",
              path: "/products",
              icon: "M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4",
              active: true,
            },
            {
              name: "Customers",
              path: "#",
              icon: "M12 12a4 4 0 100-8 4 4 0 000 8zm-8 9a8 8 0 1116 0",
            },
            {
              name: "Orders",
              path: "#",
              icon: "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2",
            },
            {
              name: "Analytics",
              path: "#",
              icon: "M18 20V10 M12 20V4 M6 20v-6",
            },
            {
              name: "Settings",
              path: "#",
              icon: "M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z M15 12a3 3 0 11-6 0 3 3 0 016 0z",
            },
          ].map((item) => (
            <Link
              key={item.name}
              to={item.path}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-colors ${
                item.active
                  ? "bg-indigo-500 text-white shadow-lg shadow-indigo-500/20"
                  : "text-gray-400 hover:bg-[#1E2330] hover:text-white"
              }`}
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d={item.icon}
                ></path>
              </svg>
              {item.name}
            </Link>
          ))}
        </nav>
      </aside>

      {/* ================= MAIN CONTENT ================= */}
      <div className="flex-1 flex flex-col h-full overflow-hidden relative">
        <header className="h-[72px] border-b border-[#242936] flex items-center justify-between px-8 shrink-0 bg-[#0E1117] z-10">
          <div className="flex items-center gap-8">
            <h2 className="text-white font-bold tracking-wider hidden lg:block">
              DEALBUZZ
            </h2>
            <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-gray-400">
              <a href="#" className="hover:text-white transition-colors">
                New Arrivals
              </a>
              <a href="#" className="hover:text-white transition-colors">
                Best Sellers
              </a>
              <a href="#" className="hover:text-white transition-colors">
                Categories
              </a>
            </nav>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto p-8 flex gap-8">
          <div className="w-64 shrink-0 hidden xl:flex flex-col gap-6">
            <div className="bg-[#141821] rounded-xl p-5 border border-[#242936]">
              <h3 className="text-white font-bold text-lg mb-4">Filters</h3>
              <div className="mb-6">
                <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
                  Categories
                </h4>
                <div className="space-y-2.5">
                  {[
                    "Electronics",
                    "Wearables",
                    "Audio Gear",
                    "Accessories",
                  ].map((cat, i) => (
                    <label
                      key={cat}
                      className="flex items-center gap-3 text-sm text-gray-300 cursor-pointer"
                    >
                      <input
                        type="checkbox"
                        defaultChecked={i === 0}
                        className="w-4 h-4 rounded bg-[#1A202C] border-[#2A3143] text-indigo-500"
                      />
                      {cat}
                    </label>
                  ))}
                </div>
              </div>
            </div>

            <div className="bg-[#141821] rounded-xl p-5 border border-[#242936]">
              <div className="flex justify-between items-center mb-2">
                <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Active Inventory
                </h4>
                <svg
                  className="w-4 h-4 text-green-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                  ></path>
                </svg>
              </div>
              <p className="text-2xl font-bold text-white mb-2">
                {totalItems} Items
              </p>
              <div className="w-full bg-[#1A202C] h-1.5 rounded-full overflow-hidden">
                <div className="bg-green-400 w-2/3 h-full rounded-full"></div>
              </div>
            </div>
          </div>

          <div className="flex-1 flex flex-col min-w-0">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
              <div>
                <h1 className="text-2xl font-bold text-white mb-1">
                  Product Catalog
                </h1>
                <p className="text-sm text-gray-400">
                  Showing {totalItems === 0 ? 0 : indexOfFirstItem + 1}-
                  {Math.min(indexOfLastItem, totalItems)} of {totalItems}{" "}
                  products
                </p>
              </div>
              <div className="flex items-center gap-4">
                <button
                  onClick={() => openModal("add")}
                  className="bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-medium py-2.5 px-5 rounded-lg transition-colors flex items-center gap-2 shadow-lg shadow-indigo-600/20"
                >
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    strokeWidth="2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 4v16m8-8H4"
                    ></path>
                  </svg>
                  Add Product
                </button>
              </div>
            </div>

            {loading ? (
              <div className="flex-1 flex justify-center items-center">
                <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-indigo-500"></div>
              </div>
            ) : totalItems === 0 ? (
              <div className="flex-1 flex flex-col justify-center items-center bg-[#141821] border border-[#242936] rounded-xl border-dashed">
                <p className="text-gray-400 text-lg mb-4">No products found.</p>
                <button
                  onClick={() => openModal("add")}
                  className="text-indigo-400 hover:text-indigo-300 font-medium"
                >
                  Add your first product
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {currentItems.map((product) => (
                  <div
                    key={product._id || product.id}
                    className="bg-[#141821] rounded-xl border border-[#242936] overflow-hidden group flex flex-col hover:border-indigo-500/50 transition-colors"
                  >
                    <div className="h-48 relative bg-gradient-to-b from-[#1E2330] to-[#141821] p-6 flex items-center justify-center">
                      {product.tag && (
                        <span
                          className={`absolute top-3 right-3 text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-wider z-10 ${
                            product.tag.toLowerCase().includes("sale")
                              ? "bg-[#00E676]/20 text-[#00E676]"
                              : "bg-indigo-500/20 text-indigo-400"
                          }`}
                        >
                          {product.tag}
                        </span>
                      )}
                      <img
                        src={
                          product.images?.[0] ||
                          product.image ||
                          "https://via.placeholder.com/200?text=No+Image"
                        }
                        alt={product.title}
                        className="max-w-full max-h-full object-contain drop-shadow-2xl group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <div className="p-5 flex-1 flex flex-col">
                      <div className="flex justify-between items-start gap-2 mb-1">
                        <h3 className="text-white font-bold text-lg leading-tight line-clamp-2">
                          {product.title || product.name}
                        </h3>
                      </div>
                      <p className="text-sm text-gray-400 line-clamp-2 mb-4 mt-2">
                        {product.description ||
                          "No description provided for this item."}
                      </p>
                      <div className="mt-auto flex items-end justify-between">
                        <div>
                          {product.discountPrice && (
                            <span className="text-xs text-gray-500 line-through mr-2">
                              ${Number(product.price).toFixed(2)}
                            </span>
                          )}
                          <span className="text-[#00E676] font-bold text-xl tracking-tight">
                            $
                            {Number(
                              product.discountPrice || product.price,
                            ).toFixed(2)}
                          </span>
                        </div>
                        <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button
                            onClick={() => openModal("edit", product)}
                            className="p-1.5 bg-[#1A202C] text-gray-300 hover:text-white hover:bg-indigo-600 rounded-md transition-colors"
                            title="Edit"
                          >
                            <svg
                              className="w-4 h-4"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                              ></path>
                            </svg>
                          </button>
                          <button
                            onClick={() =>
                              handleDelete(product._id || product.id)
                            }
                            className="p-1.5 bg-[#1A202C] text-gray-300 hover:text-white hover:bg-red-600 rounded-md transition-colors"
                            title="Delete"
                          >
                            <svg
                              className="w-4 h-4"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                              ></path>
                            </svg>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {!loading && totalPages > 1 && (
              <div className="mt-8 mb-4 flex justify-center items-center gap-2">
                <button
                  onClick={goToPrevPage}
                  disabled={currentPage === 1}
                  className="w-8 h-8 flex items-center justify-center rounded bg-[#141821] border border-[#242936] text-gray-400 hover:text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M15 19l-7-7 7-7"
                    ></path>
                  </svg>
                </button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                  (number) => (
                    <button
                      key={number}
                      onClick={() => paginate(number)}
                      className={`w-8 h-8 flex items-center justify-center rounded transition-colors ${
                        currentPage === number
                          ? "bg-indigo-500 text-white font-medium"
                          : "bg-[#141821] border border-[#242936] text-gray-400 hover:text-white"
                      }`}
                    >
                      {number}
                    </button>
                  ),
                )}
                <button
                  onClick={goToNextPage}
                  disabled={currentPage === totalPages}
                  className="w-8 h-8 flex items-center justify-center rounded bg-[#141821] border border-[#242936] text-gray-400 hover:text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 5l7 7-7 7"
                    ></path>
                  </svg>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-[#1f2130] w-full max-w-md rounded-xl border border-gray-800 shadow-2xl overflow-hidden animate-[fadeIn_0.2s_ease-out]">
            <div className="flex items-center justify-between p-6 border-b border-gray-800">
              <h2 className="text-xl font-semibold text-white">
                {modalMode === "add" ? "Add New Product" : "Edit Product"}
              </h2>
              <button
                onClick={closeModal}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  ></path>
                </svg>
              </button>
            </div>
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-sm text-gray-400 mb-1">
                  Title
                </label>
                <input
                  type="text"
                  name="title"
                  required
                  value={formData.title}
                  onChange={handleInputChange}
                  className="w-full bg-[#151620] border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-indigo-500"
                  placeholder="Product name"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-gray-400 mb-1">
                    Price ($)
                  </label>
                  <input
                    type="number"
                    name="price"
                    step="0.01"
                    required
                    value={formData.price}
                    onChange={handleInputChange}
                    className="w-full bg-[#151620] border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-indigo-500"
                    placeholder="99.99"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-1">
                    Discount Price
                  </label>
                  <input
                    type="number"
                    name="discountPrice"
                    step="0.01"
                    value={formData.discountPrice}
                    onChange={handleInputChange}
                    className="w-full bg-[#151620] border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-indigo-500"
                    placeholder="Optional"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-gray-400 mb-1">
                    Category
                  </label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    className="w-full bg-[#151620] border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-indigo-500"
                  >
                    <option value="Electronics">Electronics</option>
                    <option value="Wearables">Wearables</option>
                    <option value="Audio Gear">Audio Gear</option>
                    <option value="Accessories">Accessories</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-1">
                    Tag/Badge
                  </label>
                  <input
                    type="text"
                    name="tag"
                    value={formData.tag}
                    onChange={handleInputChange}
                    className="w-full bg-[#151620] border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-indigo-500"
                    placeholder="e.g., Sale -20%"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-1">
                  Image URL
                </label>
                <input
                  type="text"
                  name="images"
                  value={formData.images[0]}
                  onChange={handleImageChange}
                  className="w-full bg-[#151620] border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-indigo-500"
                  placeholder="https://..."
                />
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-1">
                  Description
                </label>
                <textarea
                  name="description"
                  rows="3"
                  required
                  value={formData.description}
                  onChange={handleInputChange}
                  className="w-full bg-[#151620] border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-indigo-500 resize-none"
                  placeholder="Details..."
                />
              </div>
              <div className="pt-4 flex justify-end gap-3 border-t border-gray-800">
                <button
                  type="button"
                  onClick={closeModal}
                  className="px-4 py-2 rounded-lg text-gray-400 hover:bg-gray-800 hover:text-white transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-colors disabled:opacity-50"
                >
                  {isSubmitting
                    ? "Saving..."
                    : modalMode === "add"
                      ? "Create Product"
                      : "Save Changes"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      <style
        dangerouslySetInnerHTML={{
          __html: `@keyframes fadeIn { from { opacity: 0; transform: scale(0.95); } to { opacity: 1; transform: scale(1); } }`,
        }}
      />
    </div>
  );
}
