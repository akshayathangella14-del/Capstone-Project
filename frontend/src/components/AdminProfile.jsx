import { NavLink, Outlet, useNavigate } from "react-router";
import { useAuth } from "../store/authStore";
import {
  navLinkClass,
  navLinkActiveClass,
  divider,
  pageBackground,
} from "../styles/common";

function AdminProfile() {
  const currentUser = useAuth((state) => state.currentUser);
  const logout = useAuth((state) => state.logout);
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

return (
    <div className={`flex min-h-screen ${pageBackground}`}>
      {/* SIDEBAR - Reduced width and better padding */}
      <aside className="w-64 bg-white/90 backdrop-blur-md border-r border-gray-100 flex flex-col sticky top-0 h-screen overflow-y-auto shrink-0">
        
        {/* PROFILE CARD - More compact vertical spacing */}
        <div className="p-8 flex flex-col items-center text-center">
          <div className="mb-4">
            {currentUser?.profileImageUrl ? (
              <img
                src={currentUser.profileImageUrl}
                alt="admin"
                className="w-20 h-20 rounded-full object-cover ring-4 ring-indigo-50 shadow-sm"
              />
            ) : (
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 text-white flex items-center justify-center text-2xl font-bold shadow-md">
                {currentUser?.firstName?.charAt(0).toUpperCase()}
              </div>
            )}
          </div>

          <h2 className="text-lg font-bold text-gray-900 leading-tight">
            {currentUser?.firstName} {currentUser?.lastName}
          </h2>
          <p className="text-xs text-gray-400 mt-1">{currentUser?.email}</p>
          <span className="mt-3 px-3 py-0.5 rounded-full text-[10px] bg-indigo-50 text-indigo-600 font-bold uppercase tracking-wider">
            {currentUser?.role}
          </span>
        </div>

        {/* NAV - Balanced padding */}
        <nav className="flex flex-col gap-1 px-4 mb-8">
          {[
            { name: 'Users', path: 'users' },
            { name: 'Authors', path: 'authors' },
            { name: 'Articles', path: 'articles' }
          ].map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) =>
                `px-4 py-3 rounded-xl transition-all duration-200 font-medium text-sm flex items-center ${
                  isActive
                    ? "bg-indigo-600 text-white shadow-lg shadow-indigo-100"
                    : "text-gray-500 hover:bg-gray-50 hover:text-indigo-600"
                }`
              }
            >
              {item.name}
            </NavLink>
          ))}
        </nav>

        {/* LOGOUT - Pushed to bottom */}
        <div className="mt-auto p-4 border-t border-gray-50">
          <button
            onClick={handleLogout}
            className="w-full px-4 py-3 rounded-xl text-red-500 hover:bg-red-50 transition-colors text-left font-semibold text-sm"
          >
            Logout
          </button>
        </div>
      </aside>

      {/* MAIN CONTENT - Centered with better horizontal breathing room */}
      <main className="flex-1 overflow-x-hidden">
        <div className="max-w-5xl mx-auto px-8 py-12 lg:px-12">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
export default AdminProfile;