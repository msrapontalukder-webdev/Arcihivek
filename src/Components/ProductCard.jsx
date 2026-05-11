import React, { useState, useEffect } from "react";

export default function ProductCard({
  isOpen,
  onClose,
  onSave,
  productToEdit,
}) {
  const [formData, setFormData] = useState({
    title: "",
    price: "",
    discountPrice: "",
    description: "",
    category: "Electronics",
    images: [""], // Using an array to match your Mongoose schema
  });

  // Populate form if editing
  useEffect(() => {
    if (productToEdit) {
      setFormData({
        title: productToEdit.title || "",
        price: productToEdit.price || "",
        discountPrice: productToEdit.discountPrice || "",
        description: productToEdit.description || "",
        category: productToEdit.category || "Electronics",
        images: productToEdit.images?.length ? productToEdit.images : [""],
      });
    } else {
      setFormData({
        title: "",
        price: "",
        discountPrice: "",
        description: "",
        category: "Electronics",
        images: [""],
      });
    }
  }, [productToEdit, isOpen]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    setFormData((prev) => ({ ...prev, images: [e.target.value] }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Convert string prices to numbers for the backend
    const payload = {
      ...formData,
      price: Number(formData.price),
      discountPrice: formData.discountPrice
        ? Number(formData.discountPrice)
        : null,
    };
    onSave(payload, productToEdit?._id);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="bg-[#1f2130] w-full max-w-md rounded-xl border border-gray-800 shadow-2xl overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-800 flex justify-between items-center">
          <h2 className="text-xl font-semibold text-white">
            {productToEdit ? "Edit Product" : "Add New Product"}
          </h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white">
            &times;
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-sm text-gray-400 mb-1">Title</label>
            <input
              required
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full bg-[#151620] border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-gray-400 mb-1">
                Price ($)
              </label>
              <input
                required
                type="number"
                step="0.01"
                name="price"
                value={formData.price}
                onChange={handleChange}
                className="w-full bg-[#151620] border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-1">
                Discount Price
              </label>
              <input
                type="number"
                step="0.01"
                name="discountPrice"
                value={formData.discountPrice}
                onChange={handleChange}
                className="w-full bg-[#151620] border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500"
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
              className="w-full bg-[#151620] border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-400 mb-1">
              Description
            </label>
            <textarea
              required
              rows="3"
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="w-full bg-[#151620] border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500"
            ></textarea>
          </div>

          <div className="pt-4 flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-lg text-gray-400 hover:text-white transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
            >
              {productToEdit ? "Save Changes" : "Create Product"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
