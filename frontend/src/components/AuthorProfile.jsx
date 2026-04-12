import { NavLink, Outlet, useNavigate } from "react-router";
import { useAuth } from "../store/authStore";
import { pageWrapper, navLinkClass, divider, navLinkActiveClass } from "../styles/common";

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
      <div className="flex flex-col md:flex-row gap-8">
        {/* Sidebar/Header with Author Info */}
        <div className="w-full md:w-1/4">
          <div className="flex flex-col items-center p-6 bg-white rounded-lg shadow-sm border">
            {currentUser?.profileImageUrl ? (
              <img
                src={currentUser.profileImageUrl}
                className="w-24 h-24 rounded-full object-cover border-4 border-[#0066cc]/20"
                alt="profile"
              />
            ) : (
              <div className="w-24 h-24 rounded-full bg-[#0066cc]/10 text-[#0066cc] flex items-center justify-center text-3xl font-semibold">
                {currentUser?.firstName?.charAt(0).toUpperCase()}
              </div>
            )}
            <h2 className="mt-4 text-xl font-bold">{currentUser?.firstName} {currentUser?.lastName}</h2>
            <p className="text-gray-500 text-sm">{currentUser?.email}</p>
            
            <div className={divider}></div>

            {/* Sub-navigation required by Architecture */}
            <nav className="flex flex-col w-full gap-2">
              <NavLink 
                to="articles" 
                className={({ isActive }) => isActive ? `${navLinkClass} ${navLinkActiveClass}` : navLinkClass}
              >
                My Articles
              </NavLink>
              <NavLink 
                to="write-article" 
                className={({ isActive }) => isActive ? `${navLinkClass} ${navLinkActiveClass}` : navLinkClass}
              >
                Write New Article
              </NavLink>
              <button 
                onClick={onLogout} 
                className="mt-4 px-4 py-2 text-sm text-red-600 hover:bg-red-50 rounded-md transition-colors text-left"
              >
                Logout
              </button>
            </nav>
          </div>
        </div>

        {/* Right side for Child Components (AuthorArticles / WriteArticles) */}
        <div className="flex-1">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default AuthorProfile;