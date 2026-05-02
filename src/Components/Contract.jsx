export default function Contact() {
  return (
    <section id="contact" className="bg-[#ffffff] py-20">
      <div className="max-w-[1200px] mx-auto px-4">
        {/* Title */}
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold">Contact Us</h1>
          <p className="text-gray-500 mt-2">
            Any question or remarks? Just write us a message!
          </p>
        </div>

        {/* Main Box */}
        <div className="bg-white rounded-lg shadow-lg grid md:grid-cols-2 overflow-hidden min-h-[650px]">
          {/* LEFT SIDE */}
          <div className="bg-black text-white p-8 relative flex flex-col justify-between min-h-[650px]">
            <div>
              <h2 className="text-xl font-semibold mb-2">
                Contact Information
              </h2>
              <p className="text-gray-400 mb-8">
                Say something to start a live chat!
              </p>

              <div className="space-y-6 text-sm">
                <p> +1012 3456 789</p>
                <p> demo@gmail.com</p>
                <p>
                  132 Dartmouth Street Boston, Massachusetts 02156 United States
                </p>
              </div>
            </div>

            {/* Social */}
            <div className="flex gap-4 mt-6">
              <span className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center">
                <img src="/Vector.png" alt="" />
              </span>
              <span className="w-8 h-8 bg-white text-black rounded-full flex items-center justify-center">
                <img src="/insta.png" alt="" />
              </span>
              <span className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center">
                <img src="/yws.png" alt="" />
              </span>
            </div>

            {/* Decorative */}
            <div className="absolute bottom-0 right-0 w-40 h-40 bg-white/10 rounded-full blur-2xl"></div>
          </div>

          {/* RIGHT SIDE */}
          <div className="p-8 flex flex-col justify-between min-h-[650px]">
            <div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <input
                  type="text"
                  placeholder="First Name"
                  className="border-b border-gray-400 outline-none py-2"
                />
                <input
                  type="text"
                  placeholder="Last Name"
                  className="border-b border-gray-400 outline-none py-2"
                />
                <input
                  type="email"
                  placeholder="Email"
                  className="border-b border-gray-400 outline-none py-2"
                />
                <input
                  type="text"
                  placeholder="Phone Number"
                  className="border-b border-gray-400 outline-none py-2"
                />
              </div>

              {/* Radio */}
              <div className="mt-8">
                <p className="mb-3 font-medium">Select Subject?</p>

                <div className="flex flex-wrap gap-6 text-sm">
                  <label>
                    <input type="radio" name="subject" /> General Inquiry
                  </label>
                  <label>
                    <input type="radio" name="subject" /> General Inquiry
                  </label>
                  <label>
                    <input type="radio" name="subject" /> General Inquiry
                  </label>
                  <label>
                    <input type="radio" name="subject" /> General Inquiry
                  </label>
                </div>
              </div>

              {/* Message */}
              <div className="mt-8">
                <textarea
                  placeholder="Write your message..."
                  className="w-full border-b border-gray-400 outline-none py-2 resize-none"
                />
              </div>
            </div>

            {/* Button */}
            <div className="mt-8 flex justify-end">
              <button className="bg-black text-white px-6 py-3 rounded-md shadow-md">
                Send Message
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
