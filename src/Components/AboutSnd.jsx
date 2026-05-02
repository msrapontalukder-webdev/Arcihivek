import { useState } from "react";

export default function Story({ editMode }) {
  const [data, setData] = useState({
    years: "10",
    builds: "250",
    clients: "220",
    title: "Our story",
    desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquamtortor ante, suscipit vitae malesuada a, interdum a lectus. Nuncviverra, sapien non faucibus convallis, nulla ligula interdum nisi, eusagittis mi magna nec nibh. Aenean varius feugiat nisi non sagittis.Sed quis interdum augue, quis tincidunt orci. Nullam ac varius orci.Mauris commodo facilisis imperdiet. Proin tristique risus ac auguemollis, at egestas elit facilisis. Nulla venenatis dui metus, mattisvestibulum ipsum fermentum ac.",
    img: "/Home.png",
  });

  const [openEditModal, setOpenEditModal] = useState(false);
  const [editData, setEditData] = useState(data);

  // ===== EDIT =====
  const handleEdit = () => {
    setEditData(data);
    setOpenEditModal(true);
  };

  const handleChange = (e) => {
    setEditData({ ...editData, [e.target.name]: e.target.value });
  };

  const handleImage = (e) => {
    const file = e.target.files[0];
    if (file) {
      const preview = URL.createObjectURL(file);
      setEditData({ ...editData, img: preview });

      //  BACKEND IMAGE UPLOAD
      // const formData = new FormData();
      // formData.append("image", file);
      // await fetch("/upload", { method: "POST", body: formData });
    }
  };

  const handleUpdate = async () => {
    setData(editData);

    //  BACKEND UPDATE
    // await fetch("/story", {
    //   method: "PUT",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify(editData),
    // });

    setOpenEditModal(false);
  };

  // ===== DELETE =====
  const handleDelete = async () => {
    if (!confirm("Delete this section?")) return;

    setData({
      years: "",
      builds: "",
      clients: "",
      title: "",
      desc: "",
      img: "",
    });

    //  BACKEND DELETE
    // await fetch("/story", {
    //   method: "DELETE",
    // });
  };

  return (
    <section className="bg-[#f4f4f4] relative">
      {/* EDIT / DELETE BUTTON */}
      {editMode && (
        <div className="absolute top-4 right-4 flex gap-2 z-10">
          <button
            onClick={handleEdit}
            className="bg-black text-white text-xs px-3 py-1"
          >
            Edit
          </button>

          <button
            onClick={handleDelete}
            className="bg-red-500 text-white text-xs px-3 py-1"
          >
            Delete
          </button>
        </div>
      )}

      {/* ===== TOP STATS ===== */}
      <div className="max-w-[1200px] mx-auto px-4 pt-16 flex justify-end">
        <div className="bg-black text-white px-10 py-8 flex gap-12">
          <div>
            <h2 className="text-xl font-semibold">{data.years}</h2>
            <p className="text-xs text-gray-400">years experience</p>
          </div>

          <div>
            <h2 className="text-xl font-semibold">{data.builds}</h2>
            <p className="text-xs text-gray-400">properties build</p>
          </div>

          <div>
            <h2 className="text-xl font-semibold">{data.clients}</h2>
            <p className="text-xs text-gray-400">total clients</p>
          </div>
        </div>
      </div>

      {/* ===== MAIN CONTENT ===== */}
      <div className="max-w-[1200px] mx-auto px-4 py-20 grid md:grid-cols-2 gap-10 items-start">
        {/* IMAGE */}
        <div className="w-full md:w-[1100px] md:h-[748px]">
          <img
            src={data.img}
            className="w-full h-full object-contain opacity-70"
          />
        </div>

        {/* TEXT */}
        <div className="md:-mt-10">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-[60px] h-[2px] bg-black"></div>
            <h2 className="text-2xl md:text-3xl font-semibold">{data.title}</h2>
          </div>

          <p className="text-sm text-gray-600 leading-relaxed max-w-[450px]">
            {data.desc}
          </p>
        </div>
      </div>

      {/* ===== BOTTOM QUOTE ===== */}
      <div className="bg-black relative">
        {/* CONTENT (width komano + height barano) */}
        <div className="max-w-[1000px] mx-auto px-4 py-28 text-center text-white">
          <h2 className="text-xl md:text-3xl font-medium leading-relaxed">
            “A <span className="text-red-500">design</span> isn’t finished until{" "}
            <br />
            someone is <span className="text-red-500">using</span> it.”
          </h2>
        </div>

        {/* RED BAR */}
        <div className="absolute right-0 top-0 h-full w-[80px] bg-red-600 flex items-center justify-center">
          <span className="rotate-90 text-white text-sm tracking-widest">
            ARCHIVEK
          </span>
        </div>
      </div>

      {/* ===== EDIT MODAL ===== */}
      {openEditModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-6 w-[400px]">
            <input
              name="title"
              value={editData.title}
              onChange={handleChange}
              className="border p-2 w-full mb-2"
            />

            <textarea
              name="desc"
              value={editData.desc}
              onChange={handleChange}
              className="border p-2 w-full mb-2"
            />

            <input type="file" onChange={handleImage} className="mb-3" />

            <button
              onClick={handleUpdate}
              className="bg-black text-white px-4 py-2"
            >
              Save
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
