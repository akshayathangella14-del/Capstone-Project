import {
  mutedText,
  linkClass,
} from "../styles/common";
import { useNavigate } from "react-router";

function Footer() {
  const navigate = useNavigate();

  return (
    <footer className="bg-white/50 backdrop-blur-md border-t border-gray-100 mt-24">
      <div className="max-w-6xl mx-auto px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          
          {/* Brand Section */}
          <div className="col-span-1 md:col-span-2">
            <h2 className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-purple-500 bg-clip-text text-transparent mb-4">
              BlogSphere
            </h2>
            <p className={`${mutedText} max-w-xs leading-relaxed`}>
              A premium space for creators to share insights, stories, and expertise with a global audience.
            </p>
          </div>

          {/* Navigation Links */}
          <div>
            <h3 className="text-sm font-bold text-gray-900 uppercase tracking-widest mb-5">
              Platform
            </h3>
            <ul className="flex flex-col gap-3">
              <li><button onClick={() => navigate("/")} className={`${linkClass} text-sm !no-underline`}>Home</button></li>
              <li><button onClick={() => navigate("/articles")} className={`${linkClass} text-sm !no-underline`}>Articles</button></li>
              <li><button onClick={() => navigate("/login")} className={`${linkClass} text-sm !no-underline`}>Login</button></li>
            </ul>
          </div>

          {/* Social / Info */}
          <div>
            <h3 className="text-sm font-bold text-gray-900 uppercase tracking-widest mb-5">
              Community
            </h3>
            <ul className="flex flex-col gap-3 text-sm text-gray-500">
              <li className="hover:text-indigo-600 cursor-pointer transition-colors">Twitter / X</li>
              <li className="hover:text-indigo-600 cursor-pointer transition-colors">LinkedIn</li>
              <li className="hover:text-indigo-600 cursor-pointer transition-colors">Newsletter</li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-gray-50 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className={`${mutedText} text-[13px]`}>
            © {new Date().getFullYear()} BlogSphere. Crafted with passion for writers.
          </p>
          
          <div className="flex gap-8 text-[13px] text-gray-400">
            <span className="hover:text-gray-600 cursor-pointer">Privacy Policy</span>
            <span className="hover:text-gray-600 cursor-pointer">Terms of Service</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;