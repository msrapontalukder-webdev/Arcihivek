import AboutSnd from "../Components/AboutSnd";
export default function About() {
  return (
    <section className="bg-white pt-[100px] md:pt-[140px] pb-12 overflow-hidden">
      {/* TEXT */}
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
        <div className="max-w-[650px]">
          <h1 className="font-nunito text-2xl sm:text-3xl md:text-[56px] lg:text-[64px]  font-semibold leading-tight text-black">
            WE are the leaders in
          </h1>

          <h2 className="text-2xl sm:text-3xl md:text-[56px] lg:text-[64px] font-semibold text-[#E1033D] leading-tight mt-2">
            Architectural Design
          </h2>
        </div>
      </div>

      {/* IMAGE */}
      <div className="mt-10 md:mt-[80px]  flex justify-center md:justify-center md:pl-40 lg:pl-60">
        <img
          src="/hero 1.jpg"
          alt="architecture"
          className="
            w-full
            max-w-[980px]
            h-[250px]
            sm:h-[320px]
            md:h-[500px]
            lg:h-[640px]
            object-cover
          "
        />
      </div>
    </section>
  );
}
