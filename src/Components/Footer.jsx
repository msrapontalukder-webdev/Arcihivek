import { useState, useEffect } from "react";
import axios from "../hooks/axios"; // Adjust path if your axios hook is elsewhere

const BASE_URL = "https://archivek-professional-architecture.vercel.app";

export default function Footer({ editMode }) {
  // 1. Initial State (Fallback data)
  const [footer, setFooter] = useState({
    desc: "Building the future of business, delivers high-performance commercial spaces.",
    phone: "+(084)456-0789",
    email: "supportteam@gmail.com",
    facebook: "https://facebook.com",
    instagram: "https://instagram.com",
    twitter: "https://twitter.com",
  });

  const [parentId, setParentId] = useState(null);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [editData, setEditData] = useState(footer);

  // ================= FETCH DATA =================
  useEffect(() => {
    const fetchFooter = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/footer`);

        // If the database has a footer document, extract the ID and Data
        if (res.data && res.data.length > 0) {
          const document = res.data[0];
          setParentId(document._id); // We need this ID to save changes!

          // Safely map your database's 'grid1' and 'grid4' objects to our state
          setFooter({
            desc: document.grid1?.paragraph || footer.desc,
            phone: document.grid4?.phone || footer.phone,
            email: document.grid4?.email || footer.email,
            facebook: document.grid4?.facebook || footer.facebook,
            instagram: document.grid4?.instagram || footer.instagram,
            twitter: document.grid4?.twitter || footer.twitter,
          });
        }
      } catch (err) {
        console.error("Failed to fetch footer:", err);
      }
    };
    fetchFooter();
  }, []);

  // ================= EDIT ACTIONS =================
  const handleEditClick = () => {
    setEditData(footer);
    setOpenEditModal(true);
  };

  const handleChange = (e) => {
    setEditData({ ...editData, [e.target.name]: e.target.value });
  };

  // ================= SAVE TO INDEX.JS ROUTES =================
  const handleSave = async () => {
    // 1. Instantly update the UI so it feels responsive
    setFooter(editData);
    setOpenEditModal(false);

    // 2. Send the updates to your backend
    try {
      if (parentId) {
        // A. Send the Description to the detailes route
        await axios.put(`${BASE_URL}/editFooterDetailes/${parentId}`, {
          paragraph: editData.desc,
        });

        // B. Send the Contacts & Links to the link route
        await axios.put(`${BASE_URL}/editFooterLink/${parentId}`, {
          phone: editData.phone,
          email: editData.email,
          facebook: editData.facebook,
          instagram: editData.instagram,
          twitter: editData.twitter,
        });
      } else {
        // This triggers if the database is completely empty
        alert(
          "Error: Cannot save because no database ID was found. You must insert a blank document into MongoDB first!",
        );
      }
    } catch (err) {
      console.error("Error updating footer:", err);
    }
  };

  return (
    <footer className="bg-black text-white pt-16 pb-8 relative">
      {/* EDIT BUTTON (Only visible when editMode is true) */}
      {editMode && (
        <div className="absolute top-4 right-4 md:right-10 z-10">
          <button
            onClick={handleEditClick}
            className="bg-white text-black text-xs font-bold px-4 py-2 rounded shadow hover:bg-gray-200 transition-colors"
          >
            Edit Footer
          </button>
        </div>
      )}

      <div className="max-w-[1200px] mx-auto px-4">
        {/* ================= TOP GRID ================= */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 border-b border-gray-900 pb-10">
          {/* Column 1: Description */}
          <div>
            <h2 className="text-xl font-semibold mb-4">STRUCTURE</h2>
            <p className="text-sm text-gray-400 leading-relaxed max-w-[250px]">
              {footer.desc}
            </p>
          </div>

          {/* Column 2: Static Links */}
          <div className="">
            <ul className="space-y-2 text-sm text-gray-400">
              <li>Contact Us</li>
              <li>Portfolio</li>
              <li>Professionals</li>
              <li>Packages</li>
              <li>Privacy Policy</li>
              <li>Terms And Conditions</li>
            </ul>
          </div>

          {/* Column 3: Static Links */}
          <div className="">
            <ul className="space-y-2 text-sm text-gray-400">
              <li>Style Guide</li>
              <li>License</li>
              <li>Changelog</li>
              <li>401 Password</li>
              <li>404 Error</li>
            </ul>
          </div>

          {/* Column 4: Contact & Socials */}
          <div className="">
            <p className="text-sm text-gray-400 mb-2">{footer.phone}</p>
            <p className="text-sm text-gray-400 mb-4">{footer.email}</p>

            <div className="flex gap-6 text-sm text-[#E7A800]">
              <a
                href={footer.facebook}
                target="_blank"
                rel="noreferrer"
                className="hover:underline"
              >
                FACEBOOK
              </a>
              <a
                href={footer.instagram}
                target="_blank"
                rel="noreferrer"
                className="hover:underline"
              >
                INSTAGRAM
              </a>
              <a
                href={footer.twitter}
                target="_blank"
                rel="noreferrer"
                className="hover:underline"
              >
                TWITTER
              </a>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="text-center mt-6 text-xs text-gray-500">
          © Powered by <span className="text-[#E7A800]">MSR Creation</span>
        </div>
      </div>

      {/* ================= EDIT MODAL ================= */}
      {openEditModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white text-black p-6 md:p-8 w-full max-w-[500px] rounded-lg shadow-2xl">
            <h2 className="text-xl font-bold mb-4">Edit Footer Details</h2>

            {/* Description */}
            <label className="block text-sm font-semibold mb-1 text-gray-700">
              Description
            </label>
            <textarea
              name="desc"
              value={editData.desc}
              onChange={handleChange}
              rows="3"
              className="w-full border border-gray-300 rounded-md p-2 mb-3 focus:outline-none focus:ring-2 focus:ring-black"
            />

            {/* Phone & Email */}
            <div className="grid grid-cols-2 gap-3 mb-3">
              <div>
                <label className="block text-sm font-semibold mb-1 text-gray-700">
                  Phone
                </label>
                <input
                  name="phone"
                  value={editData.phone}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-black"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-1 text-gray-700">
                  Email
                </label>
                <input
                  name="email"
                  value={editData.email}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-black"
                />
              </div>
            </div>

            {/* Social Links */}
            <label className="block text-sm font-semibold mb-1 text-gray-700 mt-2">
              Social Links
            </label>
            <input
              name="facebook"
              value={editData.facebook}
              onChange={handleChange}
              placeholder="Facebook URL"
              className="w-full border border-gray-300 rounded-md p-2 mb-2 focus:outline-none focus:ring-2 focus:ring-black text-sm"
            />
            <input
              name="instagram"
              value={editData.instagram}
              onChange={handleChange}
              placeholder="Instagram URL"
              className="w-full border border-gray-300 rounded-md p-2 mb-2 focus:outline-none focus:ring-2 focus:ring-black text-sm"
            />
            <input
              name="twitter"
              value={editData.twitter}
              onChange={handleChange}
              placeholder="Twitter URL"
              className="w-full border border-gray-300 rounded-md p-2 mb-4 focus:outline-none focus:ring-2 focus:ring-black text-sm"
            />

            {/* Action Buttons */}
            <div className="flex justify-end gap-3 mt-2">
              <button
                onClick={() => setOpenEditModal(false)}
                className="border border-gray-300 rounded-md px-5 py-2 hover:bg-gray-100 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="bg-black text-white rounded-md px-5 py-2 hover:bg-gray-800 shadow-md transition-all"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </footer>
  );
}
