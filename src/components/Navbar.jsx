import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useUser, useLogout } from '../features/auth/hooks/useAuth';

const Navbar = () => {
  const { data: user } = useUser();
  const logout = useLogout();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="bg-white shadow-sm">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="text-xl font-bold text-blue-600">
          Gestion Événements
        </Link>
        <div className="flex items-center space-x-4">
          <Link to="/events" className="text-gray-600 hover:text-blue-600">Événements</Link>

          {user ? (
            <>
              <Link to="/profile" className="text-gray-600 hover:text-blue-600">
                {user.nom || 'Mon Profil'}
              </Link>
              <button
                onClick={handleLogout}
                className="text-gray-600 hover:text-red-600 font-medium"
              >
                Déconnexion
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="text-gray-600 hover:text-blue-600">Connexion</Link>
              <Link to="/register" className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
                Inscription
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
