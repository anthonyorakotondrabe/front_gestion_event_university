import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-white shadow-sm">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="text-xl font-bold text-blue-600">
          Gestion Événements
        </Link>
        <div className="space-x-4">
          <Link to="/events" className="text-gray-600 hover:text-blue-600">Événements</Link>
          <Link to="/profile" className="text-gray-600 hover:text-blue-600">Mon Profil</Link>
          <button className="text-gray-600 hover:text-red-600">Déconnexion</button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
