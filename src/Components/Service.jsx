import { useState } from "react";

export default function Services({ editMode }) {
  const [services, setServices] = useState([
    {
      id: 1,
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
      id: 2,
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
      id: 3,
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
      id: 4,
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
    const updated = [...services];
    updated[activeIndex] = editData;
    setServices(updated);

    // BACKEND UPDATE
    // await fetch(`/services/${editData.id}`, {
    //   method: "PUT",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify(editData),
    // });

    setOpenModal(false);
  };

  // ================= DELETE =================
  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete?")) return;

    setServices((prev) => prev.filter((item) => item.id !== id));

    // BACKEND DELETE
    // await fetch(`http://localhost:5000/services/${id}`, {
    //   method: "DELETE",
    // });
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
      id: Date.now(),
      bg: "#e9e9e9",
      text: "#2d2205",
    };

    setServices((prev) => [...prev, newService]);

    // BACKEND CREATE
    // await fetch("http://localhost:5000/services", {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify(newService),
    // });

    setOpenAddModal(false);

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
            key={item.id}
            className="p-5 sm:p-6 md:p-8 flex flex-col justify-between relative group transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
            style={{ background: item.bg }}
          >
            {/* EDIT + DELETE (HOVER) */}
            {editMode && (
              <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300">
                <button
                  onClick={() => handleEdit(index)}
                  className="bg-black text-white text-xs px-3 py-1 rounded-md shadow hover:bg-gray-800"
                >
                  Edit
                </button>

                <button
                  onClick={() => handleDelete(item.id)}
                  className="bg-red-500 text-white text-xs px-3 py-1 rounded-md shadow hover:bg-red-600"
                >
                  Delete
                </button>
              </div>
            )}

            {/* ORIGINAL DESIGN */}
            <div>
              <p className="text-[10px] uppercase bg-[#d9d9d9] px-2 py-[2px] inline-block mb-3">
                {item.tag}
              </p>

              <h2
                className="text-xl sm:text-2xl md:text-[36px] font-semibold mb-4"
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

                <button className="bg-black text-white text-[10px] px-3 py-2 flex items-center gap-2 w-fit">
                  SERVICE{" "}
                  <span className="bg-[#E7A800] text-black px-1">↗</span>
                </button>
              </div>

              <div
                className="flex justify-between text-[10px] sm:text-[11px] mb-4"
                style={{ color: item.text }}
              >
                <div>
                  <p>PROJECTS</p>
                  <p className="font-semibold">{item.projects}</p>
                </div>
                <div>
                  <p>EXPERIENCE</p>
                  <p className="font-semibold">{item.exp}</p>
                </div>
                <div>
                  <p>IMPACT</p>
                  <p className="font-semibold">{item.impact}</p>
                </div>
              </div>
            </div>

            <img
              src={item.img}
              className="w-full h-[200px] sm:h-[240px] md:h-[300px] lg:h-[360px] object-cover"
            />
          </div>
        ))}
      </div>

      {/* EDIT MODAL (UNCHANGED) */}
      {openModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-6 w-[90%] max-w-[500px] rounded-lg">
            <img src={editData.img} className="w-full h-40 object-cover mb-3" />
            <input type="file" onChange={handleImageChange} className="mb-3" />

            <input
              name="title"
              value={editData.title}
              onChange={handleChange}
              className="w-full border p-2 mb-2"
            />
            <textarea
              name="desc"
              value={editData.desc}
              onChange={handleChange}
              className="w-full border p-2 mb-2"
            />

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setOpenModal(false)}
                className="border px-4 py-2"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="bg-black text-white px-4 py-2"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ADD MODAL (UNCHANGED) */}
      {openAddModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-6 w-[90%] max-w-[500px] rounded-lg">
            <h2 className="mb-4 font-semibold">Add Service</h2>

            <input
              name="tag"
              placeholder="Tag"
              onChange={handleNewChange}
              className="w-full border p-2 mb-2"
            />
            <input
              name="title"
              placeholder="Title"
              onChange={handleNewChange}
              className="w-full border p-2 mb-2"
            />

            <textarea
              name="desc"
              placeholder="Description"
              onChange={handleNewChange}
              className="w-full border p-2 mb-2"
            />

            <input
              name="projects"
              placeholder="Projects"
              onChange={handleNewChange}
              className="w-full border p-2 mb-2"
            />
            <input
              name="exp"
              placeholder="Experience"
              onChange={handleNewChange}
              className="w-full border p-2 mb-2"
            />
            <input
              name="impact"
              placeholder="Impact"
              onChange={handleNewChange}
              className="w-full border p-2 mb-3"
            />

            <input type="file" onChange={handleNewImage} className="mb-4" />

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setOpenAddModal(false)}
                className="border px-4 py-2"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmitNew}
                className="bg-black text-white px-4 py-2"
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
