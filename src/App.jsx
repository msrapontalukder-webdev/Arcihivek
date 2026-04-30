import About from "./Components/About";
import Navbar from "./Components/Navbar";

export default function App() {
  return (
    <div>
      <Navbar />

      <div className="pt-24 ">
        <section
          id="about"
          className="h-screen flex items-center justify-center bg-[#ffffff]"
        >
          <div>
            <About></About>
          </div>
        </section>

        <section
          id="services"
          className="h-screen flex items-center justify-center bg-gray-200"
        >
          Services Section
        </section>

        <section
          id="projects"
          className="h-screen flex items-center justify-center bg-gray-300"
        >
          Projects Section
        </section>

        <section
          id="contact"
          className="h-screen flex items-center justify-center bg-gray-400"
        >
          Contact Section
        </section>
      </div>
    </div>
  );
}
