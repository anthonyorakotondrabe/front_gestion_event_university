import { Link } from 'react-router-dom';
import { useUser } from '../features/auth/hooks/useAuth';
import { useSearch } from '../context/SearchContext';

const Navbar = ({ onMenuClick }) => {
  const { data: user } = useUser();
  const { searchQuery, setSearchQuery } = useSearch();

  return (
    <nav className="h-16 bg-[#0a0a1a] border-b border-[#1e1e3a] flex items-center justify-between px-7 sticky top-0 z-50 transition-all duration-300">
      <div className="flex items-center gap-4 flex-1">
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

        {/* Global Search Input */}
        {user && (
          <div className="relative max-w-md w-full hidden sm:block">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#64748b]">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </span>
            <input
              type="text"
              placeholder="Rechercher..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#161630] border border-[#1e1e3a] rounded-xl py-2 pl-10 pr-4 text-sm text-white placeholder-[#64748b] focus:outline-none focus:ring-1 focus:ring-[#4f46e5] transition-all"
            />
          </div>
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
          <div className="flex items-center gap-4">
            {/* Mobile Search Icon - Could be improved with a toggleable overlay later */}
            <button className="p-2 text-[#94a3b8] sm:hidden">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>

            <div className="text-right">
              <p className="text-sm font-semibold text-[#e2e8f0] leading-tight">{user.nom}</p>
              <p className="text-[11px] font-medium text-[#64748b] uppercase tracking-wider">{user.role}</p>
            </div>
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
