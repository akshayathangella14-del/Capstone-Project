import { NavLink, Outlet, useNavigate } from "react-router";
import { useAuth } from "../store/authStore";
// Import cardClass and other typography/button styles
import { 
  pageWrapper, 
  navLinkClass, 
  divider, 
  navLinkActiveClass, 
  cardClass, 
  headingClass, 
  mutedText,
  primaryBtn // or a custom logout style
} from "../styles/common";

function AuthorProfile() {
  const currentUser = useAuth((state) => state.currentUser);
  const logout = useAuth((state) => state.logout);
  const navigate = useNavigate();

  const onLogout = async () => {
    await logout();
    navigate("/login");
  };

  return (
    <div className={pageWrapper}>
      <div className="flex flex-col md:flex-row gap-12 items-start">
        {/* Sidebar - Now using the Premium Card Style */}
        <aside className="w-full md:w-80 sticky top-32">
          <div className={cardClass}>
            <div className="flex flex-col items-center text-center">
              {/* Profile Image with Glow */}
              <div className="relative group">
                 <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-cyan-500 rounded-full blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
                {currentUser?.profileImageUrl ? (
                  <img
                    src={currentUser.profileImageUrl}
                    className="relative w-28 h-28 rounded-full object-cover border-2 border-white/10"
                    alt="profile"
                  />
                ) : (
                  <div className="relative w-28 h-28 rounded-full bg-white/5 border-2 border-white/10 text-white flex items-center justify-center text-4xl font-black">
                    {currentUser?.firstName?.charAt(0).toUpperCase()}
                  </div>
                )}
              </div>

              <h2 className={`${headingClass} mt-6 mb-1`}>
                {currentUser?.firstName} {currentUser?.lastName}
              </h2>
              <p className={mutedText.replace("mb-2 block", "")}>{currentUser?.email}</p>
              
              <div className="w-full h-px bg-white/5 my-8"></div>

              {/* Sidebar Navigation */}
              <nav className="flex flex-col w-full gap-4">
                <NavLink 
                  to="articles" 
                  className={({ isActive }) => 
                    isActive ? `${navLinkClass} ${navLinkActiveClass} py-2` : `${navLinkClass} py-2 hover:translate-x-1 transition-transform`
                  }
                >
                  My Articles
                </NavLink>
                <NavLink 
                  to="write-article" 
                  className={({ isActive }) => 
                    isActive ? `${navLinkClass} ${navLinkActiveClass} py-2` : `${navLinkClass} py-2 hover:translate-x-1 transition-transform`
                  }
                >
                  Write New Article
                </NavLink>
                
                <button 
                  onClick={onLogout} 
                  className="mt-6 text-xs font-black text-rose-500 uppercase tracking-[0.3em] hover:text-rose-400 text-center transition-colors border border-rose-500/20 py-3 rounded-xl hover:bg-rose-500/5"
                >
                  Logout
                </button>
              </nav>
            </div>
          </div>
        </aside>

        {/* Content Area */}
        <main className="flex-1 w-full">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default AuthorProfile;