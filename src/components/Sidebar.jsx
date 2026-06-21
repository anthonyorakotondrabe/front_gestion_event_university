import { NavLink, Link, useNavigate } from 'react-router-dom';
import { useUser, useLogout } from '../features/auth/hooks/useAuth';

const SidebarItem = ({ to, label, onClick, icon }) => (
  <NavLink
    to={to}
    onClick={onClick}
    className={({ isActive }) =>
      `flex items-center gap-3 px-3 py-2.5 rounded-lg text-[13px] font-medium transition-all duration-300 relative group ${
        isActive
          ? 'bg-[#4f46e51f] text-white font-semibold after:content-[""] after:absolute after:left-[-16px] after:top-1/2 after:-translate-y-1/2 after:w-[3px] after:height-[20px] after:bg-[#818cf8] after:rounded-r-[3px] after:shadow-[0_0_10px_#818cf8]'
          : 'text-[#94a3b8] hover:bg-[#161630] hover:text-[#e2e8f0]'
      }`
    }
  >
    {icon && <span className="opacity-70 group-hover:opacity-100 transition-opacity">{icon}</span>}
    {label}
  </NavLink>
);

const NavSectionTitle = ({ children }) => (
  <div className="text-[10px] uppercase tracking-[1.5px] text-[#64748b] px-3 pt-4 pb-2 font-semibold">
    {children}
  </div>
);

const Sidebar = ({ isOpen, onClose }) => {
  const { data: user } = useUser();
  const logout = useLogout();
  const navigate = useNavigate();
  const role = user?.role?.toLowerCase().trim() || '';

  const handleLogout = () => {
    logout();
    navigate('/login');
    onClose();
  };

  const renderAdminMenu = () => (
    <div className="mb-2">
      <NavSectionTitle>Administration</NavSectionTitle>
      <SidebarItem to="/" label="Dashboard Global" onClick={onClose} />
      <SidebarItem to="/admin/users" label="Gestion Utilisateurs" onClick={onClose} />
      <SidebarItem to="/admin/filieres" label="Gestion Filières" onClick={onClose} />
      <SidebarItem to="/admin/categories" label="Gestion Catégories" onClick={onClose} />
      <SidebarItem to="/admin/lieux" label="Gestion Lieux" onClick={onClose} />
      <SidebarItem to="/admin/moderation" label="Modération globale" onClick={onClose} />
    </div>
  );

  const renderOrganisateurMenu = () => (
    <div className="mb-2">
      <NavSectionTitle>Organisation</NavSectionTitle>
      <SidebarItem to="/" label="Dashboard" onClick={onClose} />
      <SidebarItem to="/events/manage" label="Mes Événements" onClick={onClose} />
      <SidebarItem to="/events/registrations" label="Gestion Inscriptions" onClick={onClose} />
    </div>
  );

  const renderEtudiantMenu = () => (
    <div className="mb-2">
      <NavSectionTitle>Espace Étudiant</NavSectionTitle>
      <SidebarItem to="/" label="Dashboard" onClick={onClose} />
      <SidebarItem to="/events" label="Catalogue Événements" onClick={onClose} />
      <SidebarItem to="/my-inscriptions" label="Mes Inscriptions" onClick={onClose} />
    </div>
  );

  if (!user) return null;

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[90] md:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar Container */}
      <aside className={`
        fixed inset-y-0 left-0 w-[260px] h-screen bg-[#0a0a1a] border-r border-[#1e1e3a] flex flex-col z-[100] transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] p-5
        md:translate-x-0 md:static
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        {/* Brand Logo Section */}
        <div className="flex items-center gap-3 px-3 mb-8">
          <Link to="/" className="flex items-center gap-3 group" onClick={onClose}>
            <div className="w-9 h-9 bg-gradient-to-br from-[#4f46e5] to-[#22d3ee] rounded-[10px] flex items-center justify-center shadow-[0_4px_16px_rgba(79,70,229,0.3)] transition-transform group-hover:scale-105">
              <svg className="w-[18px] h-[18px] fill-white" viewBox="0 0 24 24">
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
              </svg>
            </div>
            <h2 className="text-[18px] font-bold text-white tracking-[-0.3px]">
              Uni<span className="bg-gradient-to-r from-[#818cf8] to-[#22d3ee] bg-clip-text text-transparent">Event</span>
            </h2>
          </Link>
          {/* Close button for mobile */}
          <button onClick={onClose} className="ml-auto md:hidden text-[#94a3b8] hover:text-white p-1">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Navigation Section */}
        <nav className="flex-1 overflow-y-auto scrollbar-hide flex flex-col gap-1">
          <div className="mb-2">
            <NavSectionTitle>Main</NavSectionTitle>
            <SidebarItem to="/profile" label="Profil Utilisateur" onClick={onClose} />
          </div>

          <div className="h-[1px] bg-[#1e1e3a] mx-3 my-2 opacity-50"></div>

          {role === 'admin' && renderAdminMenu()}
          {role === 'organisateur' && renderOrganisateurMenu()}
          {(role === 'etudiant' || role === 'étudiant') && renderEtudiantMenu()}
        </nav>

        {/* User Card Footer with Logout Icon */}
        <div className="border-t border-[#1e1e3a] pt-4 mt-auto">
          <div className="flex items-center justify-between gap-3 px-3 py-2 rounded-2xl bg-[#111128] border border-[#1e1e3a]">
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-[34px] h-[34px] rounded-full bg-gradient-to-br from-[#4f46e5] to-[#22d3ee] flex items-center justify-center text-white font-bold text-sm shadow-sm shrink-0">
                {user.nom?.charAt(0).toUpperCase()}
              </div>
              <div className="flex flex-col min-w-0">
                <div className="text-[13px] font-semibold text-[#e2e8f0] truncate">{user.nom}</div>
                <div className="text-[10px] text-[#64748b] truncate capitalize font-medium">{user.role}</div>
              </div>
            </div>

            {/* Logout Button (Logo Only) */}
            <button
              onClick={handleLogout}
              className="p-2 text-[#94a3b8] hover:text-red-400 hover:bg-red-400/10 rounded-xl transition-all group"
              title="Déconnexion"
            >
              <svg className="w-5 h-5 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
            </button>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
