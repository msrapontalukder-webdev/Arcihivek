import { useState, useEffect } from "react";
import axios from "../hooks/axios";

// Base API URL
const BASE_URL = "https://archivek-professional-architecture.vercel.app";

export default function Services({ editMode }) {
  const [services, setServices] = useState([
    {
      id: "1",
      tag: "BUILT TO PERFORM",
      title: "Commercial construction",
      desc: "FULL-CYCLE CONSTRUCTION OF OFFICE BUILDINGS...",
      projects: "95+",
      exp: "28+ YEARS",
      impact: "€1.8B",
      img: "/service1.png",
      bg: "#E7A800",
      text: "black",
    },
    {
      id: "2",
      tag: "BUILT AT SCALE",
      title: "Large-Scale Construction",
      desc: "FULL-CYCLE CONSTRUCTION OF BUSINESS CENTERS...",
      projects: "140+",
      exp: "30+ YEARS",
      impact: "€1.8B",
      img: "/service2.png",
      bg: "#e9e9e9",
      text: "#2d2205",
    },
    {
      id: "3",
      tag: "FLEET AVAILABLE NOW",
      title: "Equipment rental",
      desc: "SHORT AND LONG-TERM RENTAL OF EXCAVATORS...",
      projects: "95+",
      exp: "28+ YEARS",
      impact: "€1.8B",
      img: "/service3.png",
      bg: "#e9e9e9",
      text: "#2d2205",
    },
    {
      id: "4",
      tag: "MINIMAL DOWNTIME",
      title: "Commercial refurbishment",
      desc: "FULL-CYCLE CONSTRUCTION OF OFFICE BUILDINGS...",
      projects: "95+",
      exp: "28+ YEARS",
      impact: "€1.8B",
      img: "/service4.png",
      bg: "#e9e9e9",
      text: "#2d2205",
    },
  ]);

  // REQUIRED: State to store the MongoDB Master Document ID
  const [parentId, setParentId] = useState(null);

  const [openModal, setOpenModal] = useState(false);
  const [openAddModal, setOpenAddModal] = useState(false);
  const [activeIndex, setActiveIndex] = useState(null);
  const [editData, setEditData] = useState(null);

  const [newData, setNewData] = useState({
    tag: "",
    title: "",
    desc: "",
    projects: "",
    exp: "",
    impact: "",
    img: "",
  });

  // ================= FETCH DATA ON LOAD =================
  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/services`);

        // Backend returns: [{ _id: "...", items: [...] }]
        if (response.data && response.data.length > 0) {
          const document = response.data[0];
          setParentId(document._id); // Save the Master ID

          if (document.items && document.items.length > 0) {
            setServices(document.items);
          }
        }
      } catch (error) {
        console.error("Error fetching services:", error);
      }
    };
    fetchServices();
  }, []);

  // ================= EDIT =================
  const handleEdit = (index) => {
    setActiveIndex(index);
    setEditData(services[index]);
    setOpenModal(true);
  };

  const handleChange = (e) => {
    setEditData({ ...editData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const preview = URL.createObjectURL(file);
      setEditData({ ...editData, img: preview });
    }
  };

  const handleSave = async () => {
    const originalTitle = services[activeIndex].title;

    const updated = [...services];
    updated[activeIndex] = editData;
    setServices(updated);
    setOpenModal(false);

    // 2. BACKEND UPDATE WITH AXIOS (PUT /service/:id/:name)
    try {
      if (parentId) {
        await axios.put(
          `${BASE_URL}/service/${parentId}/${originalTitle}`,
          editData,
        );
      }
    } catch (error) {
      console.error("Error updating service:", error);
    }
  };

  // ================= DELETE =================
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete?")) return;

    const itemToDelete = services.find((item) => item.id === id);

    setServices((prev) => prev.filter((item) => item.id !== id));

    // 2. BACKEND DELETE WITH AXIOS (PUT /delete/service/:id/:name)
    try {
      if (itemToDelete && parentId) {
        await axios.put(
          `${BASE_URL}/delete/service/${parentId}/${itemToDelete.title}`,
        );
      }
    } catch (error) {
      console.error("Error deleting service:", error);
    }
  };

  // ================= ADD =================
  const handleNewChange = (e) => {
    setNewData({ ...newData, [e.target.name]: e.target.value });
  };

  const handleNewImage = (e) => {
    const file = e.target.files[0];
    if (file) {
      const preview = URL.createObjectURL(file);
      setNewData({ ...newData, img: preview });
    }
  };

  const handleSubmitNew = async () => {
    const newService = {
      ...newData,
      id: Date.now().toString(),
      bg: "#e9e9e9",
      text: "#2d2205",
    };

    // 1. Update UI instantly
    setServices((prev) => [...prev, newService]);
    setOpenAddModal(false);

    // 2. BACKEND CREATE WITH AXIOS (PUT /addServiceList/:id)
    try {
      if (parentId) {
        await axios.put(`${BASE_URL}/addServiceList/${parentId}`, newService);
      }
    } catch (error) {
      console.error("Error creating service:", error);
    }

    setNewData({
      tag: "",
      title: "",
      desc: "",
      projects: "",
      exp: "",
      impact: "",
      img: "",
    });
  };

  return (
    <section className="bg-white py-12 md:py-16">
      {/* TITLE */}
      <div className="max-w-[1300px] mx-auto px-4 sm:px-6 mb-10">
        <h1 className="text-3xl md:text-6xl font-bold text-center">SERVICES</h1>
      </div>

      {/* ADD BUTTON (MODERN) */}
      {editMode && (
        <div className="max-w-[1300px] mx-auto px-4 flex justify-end mb-6">
          <button
            onClick={() => setOpenAddModal(true)}
            className="bg-black text-white px-5 py-2 rounded-full shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300"
          >
            + Add Service
          </button>
        </div>
      )}

      {/* GRID */}
      <div className="max-w-[1300px] mx-auto px-4 sm:px-6 grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8">
        {services.map((item, index) => (
          <div
            key={item.id || index}
            className="p-5 sm:p-6 md:p-8 flex flex-col justify-between relative group transition-all duration-300 hover:shadow-xl hover:-translate-y-1 rounded-md"
            style={{ background: item.bg }}
          >
            {/* EDIT + DELETE (HOVER) */}
            {editMode && (
              <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300">
                <button
                  onClick={() => handleEdit(index)}
                  className="bg-black text-white text-xs px-3 py-1 rounded-md shadow hover:bg-gray-800 transition-colors"
                >
                  Edit
                </button>

                <button
                  onClick={() => handleDelete(item.id)}
                  className="bg-red-500 text-white text-xs px-3 py-1 rounded-md shadow hover:bg-red-600 transition-colors"
                >
                  Delete
                </button>
              </div>
            )}

            {/* ORIGINAL DESIGN */}
            <div>
              {/* Only render tag if it exists */}
              {item.tag && (
                <p className="text-[10px] uppercase bg-[#d9d9d9] px-2 py-[2px] inline-block mb-3 rounded-sm">
                  {item.tag}
                </p>
              )}

              <h2
                className="text-xl sm:text-2xl md:text-[36px] font-semibold mb-4 leading-tight"
                style={{ color: item.text }}
              >
                {item.title}
              </h2>

              <div className="border border-black p-3 md:p-4 flex flex-col sm:flex-row gap-3 sm:justify-between mb-4">
                <p
                  className="text-[11px] sm:text-xs sm:max-w-[65%]"
                  style={{ color: item.text }}
                >
                  {item.desc}
                </p>

                <button className="bg-black text-white text-[10px] px-3 py-2 flex items-center gap-2 w-fit hover:bg-gray-800 transition-colors">
                  SERVICE{" "}
                  <span className="bg-[#E7A800] text-black px-1">↗</span>
                </button>
              </div>

              <div
                className="flex justify-between text-[10px] sm:text-[11px] mb-4"
                style={{ color: item.text }}
              >
                {/* Conditionals added: Deleting the text in the edit menu will remove the section entirely */}
                {item.projects && (
                  <div>
                    <p className="opacity-80">PROJECTS</p>
                    <p className="font-semibold">{item.projects}</p>
                  </div>
                )}
                {item.exp && (
                  <div>
                    <p className="opacity-80">EXPERIENCE</p>
                    <p className="font-semibold">{item.exp}</p>
                  </div>
                )}
                {item.impact && (
                  <div>
                    <p className="opacity-80">IMPACT</p>
                    <p className="font-semibold">{item.impact}</p>
                  </div>
                )}
              </div>
            </div>

            <img
              src={item.img}
              className="w-full h-[200px] sm:h-[240px] md:h-[300px] lg:h-[360px] object-cover rounded-sm"
              alt={item.title}
            />
          </div>
        ))}
      </div>

      {/* EDIT MODAL */}
      {openModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white p-6 md:p-8 w-full max-w-[500px] rounded-2xl shadow-2xl">
            <h2 className="text-xl font-bold mb-4">Edit Service</h2>
            <img
              src={editData.img}
              className="w-full h-40 object-cover mb-4 rounded-lg border border-gray-200"
              alt="Preview"
            />
            <input
              type="file"
              onChange={handleImageChange}
              className="mb-4 text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-gray-100 file:text-black hover:file:bg-gray-200"
            />

            <div className="grid grid-cols-2 gap-3 mb-3">
              <input
                name="tag"
                value={editData.tag || ""}
                onChange={handleChange}
                placeholder="Tag"
                className="col-span-2 w-full border border-gray-300 rounded-md p-2.5 focus:outline-none focus:ring-2 focus:ring-black transition-all"
              />
              <input
                name="title"
                value={editData.title || ""}
                onChange={handleChange}
                placeholder="Title"
                className="col-span-2 w-full border border-gray-300 rounded-md p-2.5 focus:outline-none focus:ring-2 focus:ring-black transition-all"
              />
            </div>

            <textarea
              name="desc"
              value={editData.desc || ""}
              onChange={handleChange}
              rows="3"
              placeholder="Description"
              className="w-full border border-gray-300 rounded-md p-2.5 mb-3 focus:outline-none focus:ring-2 focus:ring-black transition-all"
            />

            {/* Added Inputs for Projects, Experience, and Impact */}
            <div className="grid grid-cols-3 gap-3 mb-4">
              <input
                name="projects"
                value={editData.projects || ""}
                placeholder="Projects (95+)"
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md p-2.5 focus:outline-none focus:ring-2 focus:ring-black transition-all text-sm"
              />
              <input
                name="exp"
                value={editData.exp || ""}
                placeholder="Exp (28+ YEARS)"
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md p-2.5 focus:outline-none focus:ring-2 focus:ring-black transition-all text-sm"
              />
              <input
                name="impact"
                value={editData.impact || ""}
                placeholder="Impact (€1.8B)"
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md p-2.5 focus:outline-none focus:ring-2 focus:ring-black transition-all text-sm"
              />
            </div>

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setOpenModal(false)}
                className="border border-gray-300 rounded-md px-5 py-2 hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="bg-black text-white rounded-md px-5 py-2 hover:bg-gray-800 shadow-md transition-all"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ADD MODAL */}
      {openAddModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white p-6 md:p-8 w-full max-w-[500px] rounded-2xl shadow-2xl">
            <h2 className="text-xl font-bold mb-5">Add New Service</h2>

            <div className="grid grid-cols-2 gap-3 mb-3">
              <input
                name="tag"
                placeholder="Tag (e.g. MINIMAL DOWNTIME)"
                onChange={handleNewChange}
                className="col-span-2 w-full border border-gray-300 rounded-md p-2.5 focus:outline-none focus:ring-2 focus:ring-black transition-all"
              />
              <input
                name="title"
                placeholder="Title"
                onChange={handleNewChange}
                className="col-span-2 w-full border border-gray-300 rounded-md p-2.5 focus:outline-none focus:ring-2 focus:ring-black transition-all"
              />
            </div>

            <textarea
              name="desc"
              placeholder="Description"
              onChange={handleNewChange}
              rows="2"
              className="w-full border border-gray-300 rounded-md p-2.5 mb-3 focus:outline-none focus:ring-2 focus:ring-black transition-all"
            />

            <div className="grid grid-cols-3 gap-3 mb-4">
              <input
                name="projects"
                placeholder="Projects (95+)"
                onChange={handleNewChange}
                className="w-full border border-gray-300 rounded-md p-2.5 focus:outline-none focus:ring-2 focus:ring-black transition-all text-sm"
              />
              <input
                name="exp"
                placeholder="Exp (28+ YEARS)"
                onChange={handleNewChange}
                className="w-full border border-gray-300 rounded-md p-2.5 focus:outline-none focus:ring-2 focus:ring-black transition-all text-sm"
              />
              <input
                name="impact"
                placeholder="Impact (€1.8B)"
                onChange={handleNewChange}
                className="w-full border border-gray-300 rounded-md p-2.5 focus:outline-none focus:ring-2 focus:ring-black transition-all text-sm"
              />
            </div>

            <input
              type="file"
              onChange={handleNewImage}
              className="mb-5 text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-gray-100 file:text-black hover:file:bg-gray-200 w-full"
            />

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setOpenAddModal(false)}
                className="border border-gray-300 rounded-md px-5 py-2 hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmitNew}
                className="bg-black text-white rounded-md px-5 py-2 hover:bg-gray-800 shadow-md transition-all"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
