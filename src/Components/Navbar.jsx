import { useState } from "react";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="w-full bg-white fixed top-0 left-0 z-50">
      <div className="max-w-[1300px] mx-auto px-4 sm:px-6 flex items-center justify-between py-[30px]">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <div className="w-[52px] h-[52px]">
            <img src="/logo.svg" className="w-full h-full object-contain" />
          </div>

          <h1 className="text-lg font-semibold tracking-wide">
            ARCHI<span className="text-red-500">VEK</span>
          </h1>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-[120px] text-sm tracking-wide text-gray-600">
          <a href="#about" className="hover:text-black transition">
            |About|
          </a>
          <a href="#services" className="hover:text-black transition">
            |Services|
          </a>
          <a href="#projects" className="hover:text-black transition">
            |Projects|
          </a>
          <a href="#contact" className="hover:text-black transition">
            |Contact|
          </a>
        </div>

        {/* Hamburger */}
        <button
          className="md:hidden flex flex-col justify-center items-center w-8 h-8 relative"
          onClick={() => setOpen(!open)}
        >
          <span
            className={`absolute w-6 h-[2px] bg-black transition-all duration-300 ${
              open ? "rotate-45" : "-translate-y-2"
            }`}
          ></span>

          <span
            className={`absolute w-6 h-[2px] bg-black transition-all duration-300 ${
              open ? "opacity-0" : ""
            }`}
          ></span>

          <span
            className={`absolute w-6 h-[2px] bg-black transition-all duration-300 ${
              open ? "-rotate-45" : "translate-y-2"
            }`}
          ></span>
        </button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden flex flex-col items-center gap-6 py-6 text-sm text-gray-700 bg-white border-t">
          <a href="#about" onClick={() => setOpen(false)}>
            About
          </a>
          <a href="#services" onClick={() => setOpen(false)}>
            Services
          </a>
          <a href="#projects" onClick={() => setOpen(false)}>
            Projects
          </a>
          <a href="#contact" onClick={() => setOpen(false)}>
            Contact
          </a>
        </div>
      )}
    </nav>
  );
}
