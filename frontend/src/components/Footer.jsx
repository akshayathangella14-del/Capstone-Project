import {
  mutedText,
  linkClass,
} from "../styles/common";

function Footer() {
  return (
    <footer className="border-t border-[#e8e8ed] mt-20">
      <div className="max-w-5xl mx-auto px-6 py-10 text-center">
        
        <p className={mutedText}>
          © {new Date().getFullYear()} BlogSphere. All rights reserved.
        </p>

        <div className="flex justify-center gap-6 mt-4">
          <a href="/" className={linkClass}>
            Home
          </a>
          <a href="/articles" className={linkClass}>
            Articles
          </a>
          <a href="/login" className={linkClass}>
            Login
          </a>
        </div>

      </div>
    </footer>
  );
}

export default Footer;