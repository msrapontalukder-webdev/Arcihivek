import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import About from "./Components/About";
import Product from "./Components/Product";

import Navbar from "./Components/Navbar";
import Services from "./Components/Service";

import Footer from "./Components/Footer";

import DealBuzzDashboard from "./Components/DealBuzzDashboard";
import ProductCard from "./Components/ProductCard";
import ProductManager from "./Components/ProductManager";

//  Main Layout
function Home({ editMode }) {
  return (
    <>
      <Navbar />

      <div className="pt-[100px]">
        <section id="about">
          <About editMode={editMode} />
          <Product editMode={editMode} />

          <DealBuzzDashboard editMode={editMode} />
          <ProductCard editMode={editMode} />
        </section>

        <section id="services">
          <Services editMode={editMode} />
          <ProductManager editMode={editMode} />
        </section>

        <section id="projects"></section>

        <section id="contact"></section>
      </div>

      <Footer editMode={editMode} />
    </>
  );
}

export default function App() {
  return (
    <Router>
      <Routes>
        {/* NORMAL PAGE */}
        <Route path="/" element={<Home editMode={false} />} />
        {/* EDIT PAGE */}
        <Route path="/edit" element={<Home editMode={true} />} />
      </Routes>
    </Router>
  );
}
