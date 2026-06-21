import React from 'react';
import { useUser } from '../../auth/hooks/useAuth';
import { Navigate, Link } from 'react-router-dom';
import { useEvents } from '../../events/hooks/useEvents';
import { useMyInscriptions } from '../../inscriptions/hooks/useInscriptions';
import { formatRelativeTime } from '../../../utils/dateUtils';

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

const AdminDashboard = ({ user }) => (
  <div className="space-y-8">
    <div className="relative overflow-hidden bg-white dark:bg-[#1f2028] rounded-[2.5rem] p-10 shadow-2xl shadow-indigo-500/10 border border-gray-100 dark:border-white/5">
      <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 rounded-full -mr-20 -mt-20 blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-48 h-48 bg-purple-500/10 rounded-full -ml-10 -mb-10 blur-2xl"></div>

      <div className="relative flex flex-col md:flex-row md:items-center justify-between gap-8">
        <div className="space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-50 dark:bg-indigo-500/10 rounded-full border border-indigo-100 dark:border-indigo-500/20">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
            </span>
            <span className="text-[10px] font-black text-indigo-600 dark:text-indigo-400 uppercase tracking-widest">Panel de contrôle</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white tracking-tight leading-tight">
            Bonjour, <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">Admin {user.nom}</span>
          </h1>
          <p className="text-gray-500 dark:text-gray-400 text-lg max-w-xl font-medium">
            Prêt à superviser la plateforme aujourd'hui ? Tous les systèmes sont opérationnels.
          </p>
        </div>
      </div>
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

const OrganisateurDashboard = ({ user }) => (
  <div className="space-y-8">
    <div className="relative overflow-hidden bg-white dark:bg-[#1f2028] rounded-[2.5rem] p-10 shadow-2xl shadow-emerald-500/10 border border-gray-100 dark:border-white/5">
      <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full -mr-20 -mt-20 blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-48 h-48 bg-teal-500/10 rounded-full -ml-10 -mb-10 blur-2xl"></div>

      <div className="relative flex flex-col md:flex-row md:items-center justify-between gap-8">
        <div className="space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-50 dark:bg-emerald-500/10 rounded-full border border-emerald-100 dark:border-emerald-500/20">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="text-[10px] font-black text-emerald-600 dark:text-emerald-400 uppercase tracking-widest">Espace Créatif</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white tracking-tight leading-tight">
            Ravi de vous voir, <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-600">{user.nom}</span>
          </h1>
          <p className="text-gray-500 dark:text-gray-400 text-lg max-w-xl font-medium">
            Vos événements attendent leur public. Qu'allez-vous organiser aujourd'hui ?
          </p>
        </div>
      </div>
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

const EtudiantDashboard = ({ user }) => {
  const { data: events, isLoading: isLoadingEvents } = useEvents();
  const { data: inscriptions, isLoading: isLoadingInscriptions } = useMyInscriptions();

  const recentEvents = events
    ?.filter(e => e.statut_evenement === 'Publie')
    ?.sort((a, b) => new Date(b.date_creation) - new Date(a.date_creation))
    ?.slice(0, 3);

  const recentInscriptions = inscriptions
    ?.sort((a, b) => new Date(b.date_inscription) - new Date(a.date_inscription))
    ?.slice(0, 3);

  return (
    <div className="space-y-8">
      <div className="relative overflow-hidden bg-white dark:bg-[#1f2028] rounded-[2.5rem] p-10 shadow-2xl shadow-blue-500/10 border border-gray-100 dark:border-white/5">
        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full -mr-20 -mt-20 blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-indigo-500/10 rounded-full -ml-10 -mb-10 blur-2xl"></div>

        <div className="relative flex flex-col md:flex-row md:items-center justify-between gap-8">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 dark:bg-blue-500/10 rounded-full border border-blue-100 dark:border-blue-500/20">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
              </span>
              <span className="text-[10px] font-black text-blue-600 dark:text-blue-400 uppercase tracking-widest">Connecté en tant qu'étudiant</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white tracking-tight leading-tight">
              Salut, <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">{user.nom} !</span>
            </h1>
            <p className="text-gray-500 dark:text-gray-400 text-lg max-w-xl font-medium">
              Découvrez les activités qui boosteront votre parcours académique cette semaine.
            </p>
          </div>

          <div className="hidden lg:block">
            <div className="flex gap-4">
              <div className="bg-gray-50 dark:bg-white/5 p-6 rounded-[2rem] border border-gray-100 dark:border-white/5 text-center">
                <div className="text-2xl font-black text-indigo-600 dark:text-indigo-400">{inscriptions?.length || 0}</div>
                <div className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Inscriptions</div>
              </div>
              <div className="bg-gray-50 dark:bg-white/5 p-6 rounded-[2rem] border border-gray-100 dark:border-white/5 text-center">
                <div className="text-2xl font-black text-blue-600 dark:text-blue-400">{events?.filter(e => e.statut_evenement === 'Publie')?.length || 0}</div>
                <div className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Événements</div>
              </div>
            </div>
          </div>
        </div>
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

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Événements Récents */}
        <div className="space-y-4">
          <div className="flex items-center justify-between px-2">
            <h2 className="text-xl font-black text-gray-900 dark:text-white uppercase tracking-tight">
              Événements <span className="text-indigo-600">Récents</span>
            </h2>
            <Link to="/events" className="text-xs font-bold text-indigo-600 hover:underline">Voir tout</Link>
          </div>

          <div className="space-y-3">
            {isLoadingEvents ? (
              [1, 2, 3].map(i => <div key={i} className="h-20 bg-gray-100 dark:bg-white/5 rounded-2xl animate-pulse"></div>)
            ) : !recentEvents || recentEvents.length === 0 ? (
              <div className="bg-white dark:bg-[#1f2028] p-6 rounded-2xl border border-dashed border-gray-200 dark:border-white/10 text-center text-sm text-gray-500">
                Aucun événement récent.
              </div>
            ) : (
              recentEvents.map(event => (
                <div key={event.id_evenement} className="bg-white dark:bg-[#1f2028] p-4 rounded-2xl border border-gray-100 dark:border-white/5 shadow-sm flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-indigo-50 dark:bg-indigo-500/10 flex items-center justify-center text-indigo-600 dark:text-indigo-400 shrink-0">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                  </div>
                  <div className="min-w-0 flex-1">
                    <h4 className="text-sm font-bold text-gray-900 dark:text-white truncate">{event.titre}</h4>
                    <p className="text-[10px] text-gray-500 dark:text-gray-400 font-medium">
                      Publié {formatRelativeTime(event.date_creation)}
                    </p>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Inscriptions Récentes */}
        <div className="space-y-4">
          <div className="flex items-center justify-between px-2">
            <h2 className="text-xl font-black text-gray-900 dark:text-white uppercase tracking-tight">
              Mes <span className="text-pink-600">Inscriptions</span> Récentes
            </h2>
            <Link to="/my-inscriptions" className="text-xs font-bold text-pink-600 hover:underline">Voir tout</Link>
          </div>

          <div className="space-y-3">
            {isLoadingInscriptions ? (
              [1, 2, 3].map(i => <div key={i} className="h-20 bg-gray-100 dark:bg-white/5 rounded-2xl animate-pulse"></div>)
            ) : !recentInscriptions || recentInscriptions.length === 0 ? (
              <div className="bg-white dark:bg-[#1f2028] p-6 rounded-2xl border border-dashed border-gray-200 dark:border-white/10 text-center text-sm text-gray-500">
                Vous n'avez pas d'inscriptions récentes.
              </div>
            ) : (
              recentInscriptions.map(ins => {
                const event = events?.find(e => e.id_evenement === ins.id_evenement);
                return (
                  <div key={ins.id_inscription} className="bg-white dark:bg-[#1f2028] p-4 rounded-2xl border border-gray-100 dark:border-white/5 shadow-sm flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-pink-50 dark:bg-pink-500/10 flex items-center justify-center text-pink-600 dark:text-pink-400 shrink-0">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" /></svg>
                    </div>
                    <div className="min-w-0 flex-1">
                      <h4 className="text-sm font-bold text-gray-900 dark:text-white truncate">
                        {event?.titre || 'Chargement...'}
                      </h4>
                      <p className="text-[10px] text-gray-500 dark:text-gray-400 font-medium">
                        Inscrit {formatRelativeTime(ins.date_inscription)}
                      </p>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

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

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
      {role === 'admin' && <AdminDashboard user={user} />}
      {role === 'organisateur' && <OrganisateurDashboard user={user} />}
      {(role === 'etudiant' || role === 'étudiant') && <EtudiantDashboard user={user} />}
    </div>
  );
};

export default Dashboard;
