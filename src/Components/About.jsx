export default function About() {
  return (
    <section id="home" className="w-full min-h-screen bg-[#ffffff] pt-28">
      <div className="max-w-[1200px] mx-auto px-6 grid md:grid-cols-2 gap-10 items-start">
        {/* Left Text */}
        <div>
          <h1 className="text-4xl md:text-5xl font-bold leading-tight">
            WE are the leaders in
          </h1>

          <h2 className="text-4xl md:text-5xl font-bold text-red-500 mt-2">
            Architectural Design
          </h2>
        </div>

        {/* Right Image */}
        <div className="flex justify-end mt-[120px]">
          <img
            src="/hero 1.jpg"
            alt="architecture"
            className="w-[130%] md:w-[130%] h-[400px] md:h-[500px] object-cover"
          />
        </div>
      </div>
    </section>
  );
}
