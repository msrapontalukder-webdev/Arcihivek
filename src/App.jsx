import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import About from "./Components/About";
import Product from "./Components/Product";

import Navbar from "./Components/Navbar";
import Services from "./Components/Service";

import DealBuzzDashboard from "./Pages/DealBuzzDashboard";
import ProductCard from "./Components/ProductCard";

import ProductManager from "./Pages/ProductManager";

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
    </>
  );
}

export default function App() {
  return (
    <Router>
      <Routes>
        {/* Default route loads the Dashboard */}
        <Route path="/" element={<DealBuzzDashboard />} />
        {/* /products route loads the Product Manager */}
        <Route path="/products" element={<ProductManager />} />
      </Routes>
    </Router>
  );
}
