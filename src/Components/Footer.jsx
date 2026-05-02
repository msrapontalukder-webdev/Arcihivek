export default function Footer() {
  return (
    <footer className="bg-black text-white pt-16 pb-8">
      <div className="max-w-[1200px] mx-auto px-4">
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 border-b border-gray-900 pb-10">
          {/* Column 1 */}
          <div>
            <h2 className="text-xl font-semibold mb-4">STRUCTURE</h2>
            <p className="text-sm text-gray-400 leading-relaxed max-w-[250px]">
              Building the future of business, delivers high-performance
              commercial spaces.
            </p>
          </div>

          {/* Column 2 */}
          <div className="">
            <ul className="space-y-2 text-sm text-gray-400">
              <li>Contact Us</li>
              <li>Portfolio</li>
              <li>Professionals</li>
              <li>Packages</li>
              <li>Privacy Policy</li>
              <li>Terms And Conditions</li>
            </ul>
          </div>

          {/* Column 3 */}
          <div className="">
            <ul className="space-y-2 text-sm text-gray-400">
              <li>Style Guide</li>
              <li>License</li>
              <li>Changelog</li>
              <li>401 Password</li>
              <li>404 Error</li>
            </ul>
          </div>

          {/* Column 4 */}
          <div className="">
            <p className="text-sm text-gray-400 mb-2">+(084)456-0789</p>
            <p className="text-sm text-gray-400 mb-4">supportteam@gmail.com</p>

            <div className="flex gap-6 text-sm text-[#E7A800]">
              <a
                href="https://facebook.com"
                target="_blank"
                className="hover:underline"
              >
                FACEBOOK
              </a>

              <a
                href="https://instagram.com"
                target="_blank"
                className="hover:underline"
              >
                INSTAGRAM
              </a>

              <a
                href="https://twitter.com"
                target="_blank"
                className="hover:underline"
              >
                TWITTER
              </a>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="text-center mt-6 text-xs text-gray-500">
          © Powered by Webflow created by{" "}
          <span className="text-[#E7A800]">PeacefulQode</span>
        </div>
      </div>
    </footer>
  );
}
