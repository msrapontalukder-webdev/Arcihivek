# 🏗️ ArchiVek – Architecture Portfolio Website

A modern, responsive architecture portfolio website built with React and Tailwind CSS.
This project includes dynamic sections with edit, add, and delete functionality ready for backend API integration.

---

## 👨‍💻 Author

Developed by [Apon Talukder]

## 🚀 Features

- ✅ Fully Responsive Design (Mobile, Tablet, Desktop)
- ✅ Modern UI using Tailwind CSS
- ✅ Dynamic Sections:
  - About
  - Story (Our Story)
  - Services
  - Projects
  - Contact

- ✅ Edit Mode (`/edit` route)
- ✅ Add / Edit / Delete functionality (Frontend + API ready)
- ✅ Image Upload Preview Support
- ✅ Clean Component-Based Structure

---

## 🛠️ Technologies Used

- ⚛️ React (Functional Components)
- 🎨 Tailwind CSS
- 🔀 React Router DOM
- 📦 JavaScript (ES6+)

---

## 📁 Project Structure

```
src/
│
├── Components/
│   ├── Navbar.jsx
│   ├── About.jsx
│   ├── AboutSnd.jsx
│   ├── Service.jsx
│   ├── Projects.jsx
│   ├── Contact.jsx
│   ├── Footer.jsx
│
├── App.jsx
└── main.jsx
```

---

## 🧠 How Edit Mode Works

- `/` → Normal View
- `/edit` → Edit Mode Enabled

In edit mode:

- ✏️ Edit buttons appear
- 🗑 Delete option available
- ➕ Add new content via modal

---

## 🔗 Backend Integration (Ready)

API integration is prepared using fetch.

### Example:

```js
// CREATE
fetch("/services", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(data),
});

// UPDATE
fetch(`/services/${id}`, {
  method: "PUT",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(data),
});

// DELETE
fetch(`/services/${id}`, {
  method: "DELETE",
});
```

---

## 🖼 Image Upload

Uses preview system:

```js
const preview = URL.createObjectURL(file);
```

Backend upload can be added using FormData.

---

## ⚙️ Installation

```bash
npm install
npm run dev
```

---

## 🌐 Routing

```jsx
<Route path="/" element={<Home editMode={false} />} />
<Route path="/edit" element={<Home editMode={true} />} />
```

---

## ✨ Future Improvements

- 🔐 Admin Authentication
- 🧑‍💻 Dashboard Panel
- ☁️ Cloud Image Upload
- 📦 Database Integration (MongoDB / Firebase)
- 🎨 Animation Enhancements

---

---

## 📄 License

This project is open-source and free to use.
