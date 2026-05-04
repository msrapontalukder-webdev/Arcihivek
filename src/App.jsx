import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import About from "./Components/About";
import Contact from "./Components/Contract";
import Navbar from "./Components/Navbar";
import Services from "./Components/Service";
import Projects from "./Components/Projects";
import Footer from "./Components/Footer";
import AboutSnd from "./Components/AboutSnd";

//  Main Layout
function Home({ editMode }) {
  return (
    <>
      <Navbar />

      <div className="pt-[100px]">
        <section id="about">
          <About editMode={editMode} />
          <AboutSnd editMode={editMode} />
        </section>

        <section id="services">
          <Services editMode={editMode} />
        </section>

        <section id="projects">
          <Projects editMode={editMode} />
        </section>

        <section id="contact">
          <Contact editMode={editMode} />
        </section>
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
