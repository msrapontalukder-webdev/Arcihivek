import { useState, useEffect } from "react";
import API from "../hooks/axios";

// Base API URL
const BASE_URL = "https://archivek-professional-architecture.vercel.app";

const initialProjects = [
  {
    id: "1",
    img: "/project1.png",
    desc: "This architecture project explores the balance between modern design...",
    align: "left",
  },
  {
    id: "2",
    img: "/project2.png",
    desc: "Large openings and thoughtful layouts create a seamless connection...",
    align: "right",
  },
  {
    id: "3",
    img: "/project3.png",
    desc: "this project focuses on creating a dynamic and adaptable space...",
    align: "left",
  },
  {
    id: "4",
    img: "/project4.png",
    desc: "emphasis is placed on material contrast...",
    align: "right",
  },
];

export default function Projects({ editMode }) {
  // Initialized with the JSON formatted data
  const [projects, setProjects] = useState(initialProjects);

  // REQUIRED: State to store the MongoDB Master Document ID
  const [parentId, setParentId] = useState(null);

  const [openAddModal, setOpenAddModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);

  const [activeIndex, setActiveIndex] = useState(null);
  const [editData, setEditData] = useState(null);

  const [newData, setNewData] = useState({
    desc: "",
    img: "",
    file: null,
  });

  // ================= FETCH =================
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await API.get(`${BASE_URL}/projects`);

        // Backend returns: [{ _id: "...", items: [...] }]
        if (res.data && res.data.length > 0) {
          const document = res.data[0];
          setParentId(document._id); // Save the Master ID

          // Only overwrite the JSON state if the database actually has items
          if (document.items && document.items.length > 0) {
            setProjects(document.items);
          }
        }
      } catch (err) {
        console.error("Failed to fetch backend projects:", err);
      }
    };
    fetchProjects();
  }, []);

  // ================= ADD =================
  const handleChange = (e) => {
    setNewData({ ...newData, [e.target.name]: e.target.value });
  };

  const handleImage = (e) => {
    const file = e.target.files[0];
    if (file) {
      const preview = URL.createObjectURL(file);
      setNewData({ ...newData, img: preview, file: file });
    }
  };

  const handleAdd = async () => {
    // Determine alignment based on current length for the backend data
    const align = projects.length % 2 === 0 ? "left" : "right";

    const newProject = {
      id: Date.now().toString(),
      desc: newData.desc,
      img: newData.img,
      align: align,
    };

    // 1. Update UI instantly
    setProjects((prev) => [...prev, newProject]);
    setOpenAddModal(false);

    // 2. BACKEND CREATE (PUT /addProjectsList/:id)
    try {
      if (parentId) {
        await API.put(`${BASE_URL}/addProjectsList/${parentId}`, newProject);
      }
    } catch (err) {
      console.error("Error creating project:", err);
    }

    setNewData({ desc: "", img: "", file: null });
  };

  // ================= EDIT =================
  const handleEdit = (index) => {
    setActiveIndex(index);
    setEditData({ ...projects[index], file: null });
    setOpenEditModal(true);
  };

  const handleEditChange = (e) => {
    setEditData({ ...editData, [e.target.name]: e.target.value });
  };

  const handleEditImage = (e) => {
    const file = e.target.files[0];
    if (file) {
      const preview = URL.createObjectURL(file);
      setEditData({ ...editData, img: preview, file: file });
    }
  };

  const handleUpdate = async () => {
    const targetItemsId = editData.id;

    // 1. Update UI instantly
    const updated = [...projects];
    updated[activeIndex] = editData;
    setProjects(updated);
    setOpenEditModal(false);

    // 2. BACKEND UPDATE (PUT /project/:id/:items_id)
    try {
      if (parentId) {
        await API.put(
          `${BASE_URL}/project/${parentId}/${targetItemsId}`,
          editData,
        );
      }
    } catch (err) {
      console.error("Error updating project:", err);
    }
  };

  // ================= DELETE =================
  const handleDelete = async (id) => {
    if (!window.confirm("Delete this project?")) return;

    // Find the item to get its specific items_id
    const itemToDelete = projects.find((item) => (item._id || item.id) === id);
    const targetItemsId = itemToDelete?.id;

    // 1. Update UI instantly
    setProjects((prev) => prev.filter((item) => (item._id || item.id) !== id));

    // 2. BACKEND DELETE (PUT /delete/project/:id/:items_id)
    try {
      if (parentId && targetItemsId) {
        await API.put(
          `${BASE_URL}/delete/project/${parentId}/${targetItemsId}`,
        );
      }
    } catch (err) {
      console.error("Error deleting project:", err);
    }
  };

  return (
    <section id="projects" className="bg-[#ffffff] py-16">
      <div className="max-w-[1200px] mx-auto px-4">
        <h1 className="text-3xl md:text-5xl font-bold text-center mb-16">
          PROJECTS
        </h1>

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

        {projects.map((item, index) => (
          <div
            key={item._id || item.id || index}
            // DYNAMIC ALIGNMENT: Forces perfectly alternating left and right blocks based on index
            className={`mb-20 flex flex-col md:flex-row gap-10 ${
              index % 2 !== 0 ? "md:justify-end" : "md:justify-start"
            }`}
          >
            <div className="w-full md:w-1/2 relative">
              {editMode && (
                <div className="absolute top-3 right-3 flex gap-2 z-10">
                  <button
                    onClick={() => handleEdit(index)}
                    className="bg-black text-white text-xs px-2 py-1"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => handleDelete(item._id || item.id)}
                    className="bg-red-500 text-white text-xs px-2 py-1"
                  >
                    Delete
                  </button>
                </div>
              )}

              <span className="absolute top-3 left-3 bg-gray-200 text-sm px-3 py-1 z-10">
                {String(index + 1).padStart(2, "0")}
              </span>

              <img
                src={item.img}
                alt={`Project ${index + 1}`}
                className="w-full h-[300px] md:h-[350px] object-cover relative z-0"
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
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-6 w-[400px]">
            <textarea
              name="desc"
              value={newData.desc}
              onChange={handleChange}
              className="border p-2 w-full mb-2"
              placeholder="Project Description"
            />
            <input type="file" onChange={handleImage} className="mb-3" />

            <div className="flex justify-end gap-2">
              <button
                onClick={() => setOpenAddModal(false)}
                className="bg-gray-300 px-4 py-2"
              >
                Cancel
              </button>
              <button
                onClick={handleAdd}
                className="bg-black text-white px-4 py-2"
              >
                Add
              </button>
            </div>
          </div>
        </div>
      )}

      {/* EDIT MODAL */}
      {openEditModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-6 w-[400px]">
            <textarea
              name="desc"
              value={editData?.desc || ""}
              onChange={handleEditChange}
              className="border p-2 w-full mb-2"
            />

            <input type="file" onChange={handleEditImage} className="mb-3" />

            <div className="flex justify-end gap-2">
              <button
                onClick={() => setOpenEditModal(false)}
                className="bg-gray-300 px-4 py-2"
              >
                Cancel
              </button>
              <button
                onClick={handleUpdate}
                className="bg-black text-white px-4 py-2"
              >
                Update
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
