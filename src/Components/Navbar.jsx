import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  // Animation variants for the mobile menu container
  const menuVariants = {
    closed: {
      opacity: 0,
      height: 0,
      transition: {
        when: "afterChildren",
        staggerChildren: 0.05,
        staggerDirection: -1,
      },
    },
    open: {
      opacity: 1,
      height: "auto",
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.1,
      },
    },
  };

  // Animation variants for individual links
  const linkVariants = {
    closed: { x: -20, opacity: 0 },
    open: { x: 0, opacity: 1 },
  };

  return (
    <nav className="w-full bg-white fixed top-0 left-0 z-50 ">
      <div className="max-w-[1300px] mx-auto px-4 sm:px-6 flex items-center justify-between py-[10px]">
        {/* Logo */}
        <div className="flex items-center gap-1">
          <div className="w-[40px] h-[40px]">
            <img
              src="/logo.svg"
              className="w-full h-full object-contain"
              alt="Logo"
            />
          </div>
          <h1 className="text-lg font-bold tracking-wide">
            ARCHI<span className="text-red-500">VEK</span>
          </h1>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-[120px] text-sm tracking-wide text-gray-600">
          {["about", "services", "projects", "contact"].map((item) => (
            <motion.a
              key={item}
              href={`#${item}`}
              whileHover={{ scale: 1.1, color: "#000" }}
              className="transition-colors capitalize"
            >
              |{item}|
            </motion.a>
          ))}
        </div>

        {/* Hamburger Button */}
        <button
          className="md:hidden flex flex-col justify-center items-center w-8 h-8 relative focus:outline-none"
          onClick={() => setOpen(!open)}
        >
          <motion.span
            animate={open ? { rotate: 45, y: 0 } : { rotate: 0, y: -8 }}
            className="absolute w-6 h-[2px] bg-black"
          />
          <motion.span
            animate={open ? { opacity: 0 } : { opacity: 1 }}
            className="absolute w-6 h-[2px] bg-black"
          />
          <motion.span
            animate={open ? { rotate: -45, y: 0 } : { rotate: 0, y: 8 }}
            className="absolute w-6 h-[2px] bg-black"
          />
        </button>
      </div>

      {/* Animated Mobile Menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial="closed"
            animate="open"
            exit="closed"
            variants={menuVariants}
            className="md:hidden flex flex-col items-center gap-6 py-6 text-sm text-gray-700 bg-white border-t overflow-hidden"
          >
            {["about", "services", "projects", "contact"].map((item) => (
              <motion.a
                key={item}
                variants={linkVariants}
                href={`#${item}`}
                onClick={() => setOpen(false)}
                className="hover:text-black transition-colors capitalize font-medium"
              >
                {item}
              </motion.a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
