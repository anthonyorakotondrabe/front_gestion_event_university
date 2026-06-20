import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useUser, useLogout } from '../features/auth/hooks/useAuth';

const Navbar = ({ onMenuClick }) => {
  const { data: user } = useUser();
  const logout = useLogout();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="h-16 bg-[#0a0a1a] border-b border-[#1e1e3a] flex items-center justify-between px-7 sticky top-0 z-50 transition-all duration-300">
      <div className="flex items-center gap-4">
        {/* Hamburger button for mobile */}
        {user && (
          <button
            onClick={onMenuClick}
            className="p-2 mr-2 rounded-lg text-[#94a3b8] hover:bg-[#161630] md:hidden transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        )}

        {!user && (
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-9 h-9 bg-gradient-to-br from-[#4f46e5] to-[#22d3ee] rounded-[10px] flex items-center justify-center shadow-lg transition-transform group-hover:scale-105">
              <svg className="w-[18px] h-[18px] fill-white" viewBox="0 0 24 24">
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
              </svg>
            </div>
            <h2 className="text-[18px] font-bold text-white tracking-[-0.3px]">
              Uni<span className="bg-gradient-to-r from-[#818cf8] to-[#22d3ee] bg-clip-text text-transparent">Event</span>
            </h2>
          </Link>
        )}
      </div>

      <div className="flex items-center gap-4">
        {user ? (
          <div className="flex items-center gap-6">
            <div className="hidden sm:block text-right">
              <p className="text-sm font-semibold text-[#e2e8f0] leading-tight">{user.nom}</p>
              <p className="text-[11px] font-medium text-[#64748b] uppercase tracking-wider">{user.role}</p>
            </div>
            <button
              onClick={handleLogout}
              className="px-5 py-2 bg-[#4f46e5] hover:bg-[#4338ca] text-white text-xs font-bold rounded-lg transition-all shadow-md active:scale-95"
            >
              Quitter
            </button>
          </div>
        ) : (
          <div className="flex items-center gap-4">
            <Link to="/login" className="text-sm font-semibold text-[#94a3b8] hover:text-[#e2e8f0] transition-colors">
              Connexion
            </Link>
            <Link to="/register" className="px-5 py-2 bg-[#4f46e5] hover:bg-[#4338ca] text-white text-xs font-bold rounded-lg transition-all shadow-md active:scale-95">
              S'inscrire
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
