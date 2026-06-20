import React from 'react';
import { useUser } from '../../auth/hooks/useAuth';
import { Navigate, Link } from 'react-router-dom';

const Dashboard = () => {
  const { data: user, isLoading, isError } = useUser();

  console.log('Current User Data:', user);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (isError || !user) {
    return <Navigate to="/login" replace />;
  }

  const renderDashboardContent = () => {
    // Normalisation du rôle : suppression des espaces et conversion en minuscules
    const role = user.role?.toLowerCase().trim() || '';

    console.log('Normalized role for switch:', role);

    if (role === 'admin') {
      return (
        <div className="bg-red-50 border-l-4 border-red-400 p-8 rounded-lg shadow-sm">
          <h1 className="text-3xl font-bold text-red-800 mb-4">Tableau de Bord Admin</h1>
          <p className="text-red-700 text-lg mb-6">
            Bienvenue dans l'espace d'administration. Vous avez accès à la gestion globale du système.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Link
              to="/admin/users"
              className="flex items-center p-6 bg-white rounded-xl border border-red-100 shadow-sm hover:shadow-md transition-all group"
            >
              <div className="p-3 bg-red-100 rounded-lg text-red-600 group-hover:bg-red-600 group-hover:text-white transition-colors">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
              <div className="ml-4">
                <h3 className="text-xl font-bold text-gray-900">Gérer les utilisateurs</h3>
                <p className="text-gray-500">Ajouter, modifier ou supprimer des comptes</p>
              </div>
            </Link>
          </div>
        </div>
      );
    }

    if (role === 'organisateur') {
      return (
        <div className="bg-green-50 border-l-4 border-green-400 p-8 rounded-lg shadow-sm">
          <h1 className="text-3xl font-bold text-green-800 mb-4">Tableau de Bord Organisateur</h1>
          <p className="text-green-700 text-lg">
            Gérez vos événements, suivez les inscriptions et interagissez avec les participants.
          </p>
        </div>
      );
    }

    if (role === 'etudiant' || role === 'étudiant') {
      return (
        <div className="bg-blue-50 border-l-4 border-blue-400 p-8 rounded-lg shadow-sm">
          <h1 className="text-3xl font-bold text-blue-800 mb-4">Tableau de Bord Étudiant</h1>
          <p className="text-blue-700 text-lg">
            Découvrez des événements passionnants et gérez vos inscriptions.
          </p>
        </div>
      );
    }

    // Cas par défaut si aucun rôle ne correspond
    return (
      <div className="bg-gray-50 border-l-4 border-gray-400 p-8 rounded-lg shadow-sm">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">Tableau de Bord</h1>
        <p className="text-gray-700 text-lg">
          Bienvenue sur votre espace personnel ({user.role}).
        </p>
      </div>
    );
  };

  return (
    <div className="max-w-4xl mx-auto mt-8">
      {renderDashboardContent()}
    </div>
  );
};

export default Dashboard;
