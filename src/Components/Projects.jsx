import { useState } from "react";

export default function Projects({ editMode }) {
  const [projects, setProjects] = useState([
    {
      id: 1,
      img: "/project1.png",
      desc: "This architecture project explores the balance between modern design and functionalliving, focusing on clean geometry, natural lighting, and efficient space planning. The concept emphasizes simplicity while maintaining a strong visual identitythroug theuse of minimal materials and structured forms..",
      align: "left",
    },
    {
      id: 2,
      img: "/project2.png",
      desc: "Large openings and thoughtful layouts create a seamless connection between interior and exterior environments, enhancing both comfort and sustainability. The design not only reflects contemporary aesthetics but also prioritizes user experience, ensuring that every space serves a clear purpose while contributing to the overall harmony of the structure..",
      align: "right",
    },
    {
      id: 3,
      img: "/project3.png",
      desc: "this project focuses on creating a dynamic and adaptable space that responds to both user needs and environmental conditions. the design integrates open-plan layouts with strategic zoning to ensure privacy while maintaining visual continuity.",
      align: "left",
    },
    {
      id: 4,
      img: "/project4.png",
      desc: "emphasis is placed on material contrast, combining textures and tones to add depth and character to the structure. natural ventilation and lighting are used as key elements to improve energy efficiency and coverall, the project presents a modern architectural approach that balances aesthetics, functionality, ",
      align: "right",
    },
  ]);

  const [openAddModal, setOpenAddModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);

  const [activeIndex, setActiveIndex] = useState(null);
  const [editData, setEditData] = useState(null);

  const [newData, setNewData] = useState({
    desc: "",
    img: "",
  });

  // ================= ADD =================
  const handleChange = (e) => {
    setNewData({ ...newData, [e.target.name]: e.target.value });
  };

  const handleImage = (e) => {
    const file = e.target.files[0];
    if (file) {
      const preview = URL.createObjectURL(file);
      setNewData({ ...newData, img: preview });
    }
  };

  const handleAdd = async () => {
    const newProject = {
      ...newData,
      id: Date.now(),
      align: projects.length % 2 === 0 ? "left" : "right",
    };

    setProjects((prev) => [...prev, newProject]);

    // BACKEND CREATE
    // await fetch("/projects", {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify(newProject),
    // });

    setOpenAddModal(false);
    setNewData({ desc: "", img: "" });
  };

  // ================= EDIT =================
  const handleEdit = (index) => {
    setActiveIndex(index);
    setEditData(projects[index]);
    setOpenEditModal(true);
  };

  const handleEditChange = (e) => {
    setEditData({ ...editData, [e.target.name]: e.target.value });
  };

  const handleEditImage = (e) => {
    const file = e.target.files[0];
    if (file) {
      const preview = URL.createObjectURL(file);
      setEditData({ ...editData, img: preview });
    }
  };

  const handleUpdate = async () => {
    const updated = [...projects];
    updated[activeIndex] = editData;
    setProjects(updated);

    // BACKEND UPDATE
    // await fetch(`/projects/${editData.id}`, {
    //   method: "PUT",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify(editData),
    // });

    setOpenEditModal(false);
  };

  // ================= DELETE =================
  const handleDelete = async (id) => {
    if (!confirm("Delete this project?")) return;

    setProjects((prev) => prev.filter((item) => item.id !== id));

    // BACKEND DELETE
    // await fetch(`/projects/${id}`, {
    //   method: "DELETE",
    // });
  };

  return (
    <section id="projects" className="bg-[#ffffff] py-16">
      <div className="max-w-[1200px] mx-auto px-4">
        {/* TITLE */}
        <h1 className="text-3xl md:text-5xl font-bold text-center mb-16">
          PROJECTS
        </h1>

        {/* ADD BUTTON */}
        {editMode && (
          <div className="flex justify-end mb-10">
            <button
              onClick={() => setOpenAddModal(true)}
              className="bg-black text-white px-4 py-2"
            >
              + Add Project
            </button>
          </div>
        )}

        {/* PROJECT LIST */}
        {projects.map((item, index) => (
          <div
            key={item.id}
            className={`mb-20 flex flex-col md:flex-row ${
              item.align === "right" ? "md:justify-end" : "items-start"
            } gap-10`}
          >
            <div className="w-full md:w-1/2 relative">
              {/* EDIT + DELETE */}
              {editMode && (
                <div className="absolute top-3 right-3 flex gap-2">
                  <button
                    onClick={() => handleEdit(index)}
                    className="bg-black text-white text-xs px-2 py-1"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => handleDelete(item.id)}
                    className="bg-red-500 text-white text-xs px-2 py-1"
                  >
                    Delete
                  </button>
                </div>
              )}

              {/* NUMBER */}
              <span className="absolute top-3 left-3 bg-gray-200 text-sm px-3 py-1">
                {String(index + 1).padStart(2, "0")}
              </span>

              <img
                src={item.img}
                className="w-full h-[300px] md:h-[350px] object-cover"
              />

              <p className="text-xs bg-[#D9D9D9] p-3 text-gray-600">
                {item.desc}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* ADD MODAL */}
      {openAddModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
          <div className="bg-white p-6 w-[400px]">
            <textarea
              name="desc"
              onChange={handleChange}
              className="border p-2 w-full mb-2"
            />
            <input type="file" onChange={handleImage} className="mb-3" />

            <button
              onClick={handleAdd}
              className="bg-black text-white px-4 py-2"
            >
              Add
            </button>
          </div>
        </div>
      )}

      {/* EDIT MODAL */}
      {openEditModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
          <div className="bg-white p-6 w-[400px]">
            <textarea
              name="desc"
              value={editData.desc}
              onChange={handleEditChange}
              className="border p-2 w-full mb-2"
            />

            <input type="file" onChange={handleEditImage} className="mb-3" />

            <button
              onClick={handleUpdate}
              className="bg-black text-white px-4 py-2"
            >
              Update
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
