import React from 'react';
import { useUser } from '../../auth/hooks/useAuth';
import { Navigate, Link } from 'react-router-dom';

const DashboardCard = ({ title, description, to, icon, colorClass }) => (
  <Link
    to={to}
    className="group bg-white dark:bg-[#1f2028] p-6 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-white/5 flex flex-col h-full"
  >
    <div className={`w-12 h-12 rounded-xl ${colorClass} flex items-center justify-center text-white mb-4 group-hover:scale-110 transition-transform duration-300`}>
      {icon}
    </div>
    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{title}</h3>
    <p className="text-gray-500 dark:text-gray-400 text-sm flex-1">{description}</p>
    <div className="mt-4 flex items-center text-sm font-bold text-indigo-600 dark:text-indigo-400">
      Accéder <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
    </div>
  </Link>
);

const Dashboard = () => {
  const { data: user, isLoading, isError } = useUser();

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (isError || !user) {
    return <Navigate to="/login" replace />;
  }

  const role = user.role?.toLowerCase().trim() || '';

  const renderAdminDashboard = () => (
    <div className="space-y-8">
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-3xl p-8 text-white shadow-2xl shadow-indigo-500/20">
        <h1 className="text-3xl font-black mb-2">Tableau de Bord Administrateur</h1>
        <p className="text-indigo-100 opacity-90 text-lg">Bienvenue, {user.nom}. Vous avez le contrôle total sur la plateforme.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <DashboardCard
          title="Utilisateurs"
          description="Gérez les comptes, les rôles et les accès des membres."
          to="/admin/users"
          colorClass="bg-blue-500"
          icon={<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /></svg>}
        />
        <DashboardCard
          title="Filières"
          description="Configurez et organisez les différentes filières académiques."
          to="/admin/filieres"
          colorClass="bg-purple-500"
          icon={<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5" /></svg>}
        />
        <DashboardCard
          title="Modération"
          description="Surveillez et gérez tous les événements de la plateforme."
          to="/admin/moderation"
          colorClass="bg-red-500"
          icon={<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>}
        />
      </div>
    </div>
  );

  const renderOrganisateurDashboard = () => (
    <div className="space-y-8">
      <div className="bg-gradient-to-r from-emerald-600 to-teal-600 rounded-3xl p-8 text-white shadow-2xl shadow-emerald-500/20">
        <h1 className="text-3xl font-black mb-2">Espace Organisateur</h1>
        <p className="text-emerald-100 opacity-90 text-lg">Gérez vos événements et suivez vos inscriptions en temps réel.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <DashboardCard
          title="Mes Événements"
          description="Créez, modifiez ou annulez vos événements."
          to="/events/manage"
          colorClass="bg-emerald-500"
          icon={<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>}
        />
        <DashboardCard
          title="Inscriptions"
          description="Consultez et gérez les participants à vos événements."
          to="/events/registrations"
          colorClass="bg-amber-500"
          icon={<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" /></svg>}
        />
      </div>
    </div>
  );

  const renderEtudiantDashboard = () => (
    <div className="space-y-8">
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-3xl p-8 text-white shadow-2xl shadow-blue-500/20">
        <h1 className="text-3xl font-black mb-2">Bonjour, {user.nom} !</h1>
        <p className="text-blue-100 opacity-90 text-lg">Découvrez les derniers événements et gérez vos participations.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <DashboardCard
          title="Explorer"
          description="Trouvez des événements qui vous correspondent."
          to="/events"
          colorClass="bg-indigo-500"
          icon={<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>}
        />
        <DashboardCard
          title="Mes Inscriptions"
          description="Retrouvez tous les événements auxquels vous participez."
          to="/my-inscriptions"
          colorClass="bg-pink-500"
          icon={<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" /></svg>}
        />
      </div>
    </div>
  );

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
      {role === 'admin' && renderAdminDashboard()}
      {role === 'organisateur' && renderOrganisateurDashboard()}
      {(role === 'etudiant' || role === 'étudiant') && renderEtudiantDashboard()}
    </div>
  );
};

export default Dashboard;
