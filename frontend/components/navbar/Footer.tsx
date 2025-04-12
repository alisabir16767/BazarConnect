// components/Footer.js
import { Button } from "../ui/button";
export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-10">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="text-center md:text-left">
          <h2 className="text-2xl font-bold">BazzarConnect</h2>
          <p className="mt-2 text-gray-400">
            Selling made simple , Buying made easy.
          </p>
        </div>

        <div className="text-center md:text-left">
          <h3 className="text-lg font-semibold">Quick Links</h3>
          <ul className="mt-2 space-y-2">
            <li>
              <a href="/" className="text-gray-400 hover:text-white">
                Home
              </a>
            </li>
            <li>
              <a href="/about" className="text-gray-400 hover:text-white">
                About
              </a>
            </li>
            <li>
              <a href="/services" className="text-gray-400 hover:text-white">
                Services
              </a>
            </li>
            <li>
              <a href="/contact" className="text-gray-400 hover:text-white">
                Contact
              </a>
            </li>
          </ul>
        </div>

        <div className="text-center md:text-left">
          <h3 className="text-lg font-semibold">Stay Updated</h3>
          <p className="mt-2 text-gray-400">
            Subscribe to our newsletter for the latest updates.
          </p>
          <div className="mt-4 flex flex-col md:flex-row md:items-center gap-2">
            <input
              type="email"
              placeholder="Your email"
              className="w-full md:w-auto px-4 py-2 rounded-md border border-gray-600 bg-gray-800 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <Button className="w-full md:w-auto">Subscribe</Button>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-700 mt-10 pt-6 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} MyBrand. All Rights Reserved.
      </div>
    </footer>
  );
}
