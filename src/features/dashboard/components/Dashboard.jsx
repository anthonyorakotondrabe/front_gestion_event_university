import React from 'react';
import { useUser } from '../../auth/hooks/useAuth';
import { Navigate, Link } from 'react-router-dom';
import { useEvents } from '../../events/hooks/useEvents';
import { useMyInscriptions } from '../../inscriptions/hooks/useInscriptions';
import { useUsersList } from '../../users/hooks/useUsers';
import { formatRelativeTime } from '../../../utils/dateUtils';
import OrganisateurSyntheticView from './OrganisateurSyntheticView';
import { useQueries } from '@tanstack/react-query';
import { inscriptionService } from '../../inscriptions/api/inscriptionService';

/**
 * Composant DashboardCard pour la navigation vers les différentes sections.
 * @param {Object} props - Propriétés du composant.
 * @param {string} props.title - Titre de la carte.
 * @param {string} props.description - Description de la carte.
 * @param {string} props.to - Chemin de navigation.
 * @param {React.ReactNode} props.icon - Élément icône.
 * @param {string} props.colorClass - Classe CSS pour la couleur de fond.
 */
const DashboardCard = ({ title, description, to, icon, colorClass }) => (
  <Link
    to={to}
    className="group bg-white dark:bg-[#1f2028] p-6 md:p-8 rounded-[2rem] shadow-[0_10px_30px_rgba(0,0,0,0.02)] hover:shadow-[0_20px_50px_rgba(79,70,229,0.1)] transition-all duration-500 border border-gray-100 dark:border-white/5 flex flex-col h-full relative overflow-hidden"
  >
    <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/5 rounded-full -mr-16 -mt-16 blur-2xl group-hover:bg-indigo-500/10 transition-colors"></div>
    <div className={`w-14 h-14 rounded-2xl ${colorClass} flex items-center justify-center text-white mb-6 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500 shadow-lg shadow-current/20`}>
      {icon}
    </div>
    <h3 className="text-2xl font-black text-gray-900 dark:text-white mb-3 tracking-tight">{title}</h3>
    <p className="text-gray-500 dark:text-gray-400 text-sm font-medium leading-relaxed flex-1">{description}</p>
    <div className="mt-6 flex items-center text-xs font-black uppercase tracking-widest text-indigo-600 dark:text-indigo-400">
      Explorer <span className="ml-2 group-hover:translate-x-2 transition-transform duration-300">→</span>
    </div>
  </Link>
);

/**
 * Vue AdminDashboard pour la supervision de la plateforme.
 * @param {Object} props - Propriétés du composant.
 * @param {Object} props.user - Objet utilisateur authentifié.
 */
const AdminDashboard = ({ user }) => {
  const { data: events } = useEvents();
  const { data: users } = useUsersList();

  const totalStudents = users?.filter(u =>
    u.role?.toLowerCase().trim() === 'etudiant' ||
    u.role?.toLowerCase().trim() === 'étudiant'
  )?.length || 0;

  const ongoingEvents = events?.filter(e =>
    e.statut_evenement === 'Publie'
  )?.length || 0;

  return (
    <div className="space-y-8 md:space-y-12">
      <div className="relative overflow-hidden bg-white dark:bg-[#1f2028] rounded-[2.5rem] p-8 md:p-12 shadow-[0_20px_50px_rgba(79,70,229,0.1)] border border-white/40 dark:border-white/5 backdrop-blur-xl">
        <div className="absolute top-0 right-0 w-80 h-80 bg-indigo-500/10 rounded-full -mr-32 -mt-32 blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-500/10 rounded-full -ml-20 -mb-20 blur-3xl animate-pulse delay-700"></div>

        <div className="relative flex flex-col lg:flex-row lg:items-center justify-between gap-10">
          <div className="space-y-6 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-50 dark:bg-indigo-500/10 rounded-full border border-indigo-100 dark:border-indigo-500/20 mx-auto lg:mx-0">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
              </span>
              <span className="text-[10px] font-black text-indigo-600 dark:text-indigo-400 uppercase tracking-[0.2em]">Panneau de Contrôle</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-black text-gray-900 dark:text-white tracking-tight leading-none">
              Content de vous revoir, <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">Admin {user.nom}</span>
            </h1>
            <p className="text-gray-500 dark:text-gray-400 text-lg md:text-xl max-w-xl font-medium mx-auto lg:mx-0">
              Prêt à superviser la plateforme aujourd'hui ? Tous les systèmes sont opérationnels.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4 w-full lg:w-auto">
            <div className="bg-white/50 dark:bg-white/5 backdrop-blur-md p-6 rounded-[2rem] border border-white dark:border-white/5 text-center shadow-sm group hover:scale-105 transition-transform duration-300">
              <div className="text-3xl font-black text-indigo-600 dark:text-indigo-400 tracking-tight">{totalStudents}</div>
              <div className="text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest mt-1">Étudiants</div>
            </div>
            <div className="bg-white/50 dark:bg-white/5 backdrop-blur-md p-6 rounded-[2rem] border border-white dark:border-white/5 text-center shadow-sm group hover:scale-105 transition-transform duration-300">
              <div className="text-3xl font-black text-purple-600 dark:text-purple-400 tracking-tight">{ongoingEvents}</div>
              <div className="text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest mt-1">En Cours</div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
        <DashboardCard
          title="Utilisateurs"
          description="Gérer les comptes, les rôles et les accès des membres de la communauté."
          to="/admin/users"
          colorClass="bg-blue-600"
          icon={<svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /></svg>}
        />
        <DashboardCard
          title="Filières"
          description="Configurer et organiser les différents domaines académiques de l'institution."
          to="/admin/filieres"
          colorClass="bg-purple-600"
          icon={<svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5" /></svg>}
        />
        <DashboardCard
          title="Modération"
          description="Surveiller et valider tous les événements publiés sur la plateforme."
          to="/admin/moderation"
          colorClass="bg-red-600"
          icon={<svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>}
        />
      </div>
    </div>
  );
};

/**
 * Vue OrganisateurDashboard pour les créateurs d'événements.
 * @param {Object} props - Propriétés du composant.
 * @param {Object} props.user - Objet utilisateur authentifié.
 */
const OrganisateurDashboard = ({ user }) => {
  const { data: events, isLoading: isLoadingEvents } = useEvents();

  const myEvents = events?.filter(e => e.createur_id === user.id_utilisateur) || [];

  // Requêtes parallèles pour récupérer les inscriptions de chaque événement
  const inscriptionsQueries = useQueries({
    queries: myEvents.map(event => ({
      queryKey: ['inscriptions', 'event', event.id_evenement],
      queryFn: () => inscriptionService.getEventInscriptions(event.id_evenement),
    })),
  });

  const isLoadingStats = inscriptionsQueries.some(q => q.isLoading);

  // Agrégation des statistiques globales à partir de toutes les inscriptions
  const stats = inscriptionsQueries.reduce((acc, query, index) => {
    if (!query.data) return acc;

    const event = myEvents[index];
    const confirmed = query.data.filter(ins => ins.statut_inscription?.toLowerCase() === 'confirme');
    const pending = query.data.filter(ins =>
      ins.statut_inscription === 'EnAttente' ||
      ins.statut_inscription?.toLowerCase() === 'en attente' ||
      !ins.statut_inscription
    );

    acc.confirmedCount += confirmed.length;
    acc.pendingCount += pending.length;
    acc.totalRevenue += confirmed.length * event.prix;
    acc.totalCapacity += event.capacite_max;

    return acc;
  }, { confirmedCount: 0, pendingCount: 0, totalRevenue: 0, totalCapacity: 0 });

  const remainingPlaces = Math.max(0, stats.totalCapacity - stats.confirmedCount);

  return (
    <div className="space-y-8 md:space-y-12">
      <div className="relative overflow-hidden bg-white dark:bg-[#1f2028] rounded-[2.5rem] p-8 md:p-12 shadow-[0_20px_50px_rgba(16,185,129,0.1)] border border-white/40 dark:border-white/5 backdrop-blur-xl">
        <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-500/10 rounded-full -mr-32 -mt-32 blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-teal-500/10 rounded-full -ml-20 -mb-20 blur-3xl animate-pulse delay-700"></div>

        <div className="relative flex flex-col lg:flex-row lg:items-center justify-between gap-10">
          <div className="space-y-6 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-50 dark:bg-emerald-500/10 rounded-full border border-emerald-100 dark:border-emerald-500/20 mx-auto lg:mx-0">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span className="text-[10px] font-black text-emerald-600 dark:text-emerald-400 uppercase tracking-[0.2em]">Espace Créateur</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-black text-gray-900 dark:text-white tracking-tight leading-none">
              Bienvenue, <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-600">{user.nom}</span>
            </h1>
            <p className="text-gray-500 dark:text-gray-400 text-lg md:text-xl max-w-xl font-medium mx-auto lg:mx-0">
              Vos événements attendent leur public. Quelle est la prochaine étape ?
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full lg:w-auto">
            <div className="bg-white/50 dark:bg-white/5 backdrop-blur-md p-6 rounded-[2rem] border border-white dark:border-white/5 text-center shadow-sm group hover:scale-105 transition-transform duration-300">
              {isLoadingStats ? (
                <div className="h-8 w-24 bg-gray-200 dark:bg-gray-700 animate-pulse rounded mx-auto mb-2"></div>
              ) : (
                <div className="text-2xl font-black text-emerald-600 dark:text-emerald-400 tracking-tight">
                  {stats.totalRevenue.toLocaleString()} <span className="text-sm">Ar</span>
                </div>
              )}
              <div className="text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest mt-1">Revenu</div>
            </div>

            <div className="bg-white/50 dark:bg-white/5 backdrop-blur-md p-6 rounded-[2rem] border border-white dark:border-white/5 text-center shadow-sm group hover:scale-105 transition-transform duration-300">
              {isLoadingStats ? (
                <div className="h-8 w-12 bg-gray-200 dark:bg-gray-700 animate-pulse rounded mx-auto mb-2"></div>
              ) : (
                <div className="text-2xl font-black text-amber-500 tracking-tight">{stats.pendingCount}</div>
              )}
              <div className="text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest mt-1">En Attente</div>
            </div>

            <div className="bg-white/50 dark:bg-white/5 backdrop-blur-md p-6 rounded-[2rem] border border-white dark:border-white/5 text-center shadow-sm group hover:scale-105 transition-transform duration-300">
              {isLoadingStats ? (
                <div className="h-8 w-12 bg-gray-200 dark:bg-gray-700 animate-pulse rounded mx-auto mb-2"></div>
              ) : (
                <div className="text-2xl font-black text-blue-500 tracking-tight">{remainingPlaces}</div>
              )}
              <div className="text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest mt-1">Places Libres</div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
        <DashboardCard
          title="Mes Événements"
          description="Gérer vos événements existants ou lancer de nouveaux projets passionnants."
          to="/events/manage"
          colorClass="bg-emerald-600"
          icon={<svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>}
        />
        <DashboardCard
          title="Inscriptions"
          description="Suivre la progression des inscriptions et gérer la liste des participants en temps réel."
          to="/events/registrations"
          colorClass="bg-amber-500"
          icon={<svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" /></svg>}
        />
      </div>

      {isLoadingEvents ? (
        <div className="h-96 bg-gray-100/50 dark:bg-white/5 rounded-[3rem] animate-pulse"></div>
      ) : (
        <OrganisateurSyntheticView events={myEvents} />
      )}
    </div>
  );
};

/**
 * Vue EtudiantDashboard pour les utilisateurs étudiants.
 * @param {Object} props - Propriétés du composant.
 * @param {Object} props.user - Objet utilisateur authentifié.
 */
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
    <div className="space-y-8 md:space-y-12">
      <div className="relative overflow-hidden bg-white dark:bg-[#1f2028] rounded-[2.5rem] p-8 md:p-12 shadow-[0_20px_50px_rgba(37,99,235,0.1)] border border-white/40 dark:border-white/5 backdrop-blur-xl">
        <div className="absolute top-0 right-0 w-80 h-80 bg-blue-500/10 rounded-full -mr-32 -mt-32 blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-indigo-500/10 rounded-full -ml-20 -mb-20 blur-3xl animate-pulse delay-700"></div>

        <div className="relative flex flex-col lg:flex-row lg:items-center justify-between gap-10">
          <div className="space-y-6 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 dark:bg-blue-500/10 rounded-full border border-blue-100 dark:border-blue-500/20 mx-auto lg:mx-0">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
              </span>
              <span className="text-[10px] font-black text-blue-600 dark:text-blue-400 uppercase tracking-[0.2em]">Espace Étudiant</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-black text-gray-900 dark:text-white tracking-tight leading-none">
              Salut, <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">{user.nom} !</span>
            </h1>
            <p className="text-gray-500 dark:text-gray-400 text-lg md:text-xl max-w-xl font-medium mx-auto lg:mx-0">
              Découvrez les activités qui boosteront votre parcours académique cette semaine.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4 w-full lg:w-auto">
            <div className="bg-white/50 dark:bg-white/5 backdrop-blur-md p-6 rounded-[2rem] border border-white dark:border-white/5 text-center shadow-sm group hover:scale-105 transition-transform duration-300">
              <div className="text-3xl font-black text-indigo-600 dark:text-indigo-400 tracking-tight">{inscriptions?.length || 0}</div>
              <div className="text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest mt-1">Inscriptions</div>
            </div>
            <div className="bg-white/50 dark:bg-white/5 backdrop-blur-md p-6 rounded-[2rem] border border-white dark:border-white/5 text-center shadow-sm group hover:scale-105 transition-transform duration-300">
              <div className="text-3xl font-black text-blue-600 dark:text-blue-400 tracking-tight">{events?.filter(e => e.statut_evenement === 'Publie')?.length || 0}</div>
              <div className="text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest mt-1">Événements</div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
        <DashboardCard
          title="Explorer"
          description="Trouver des événements adaptés à vos intérêts et élargir vos horizons."
          to="/events"
          colorClass="bg-indigo-600"
          icon={<svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>}
        />
        <DashboardCard
          title="Mes Inscriptions"
          description="Consulter vos événements enregistrés et gérer votre emploi du temps personnel."
          to="/my-inscriptions"
          colorClass="bg-pink-600"
          icon={<svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" /></svg>}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
        <div className="space-y-6">
          <div className="flex items-center justify-between px-2">
            <h2 className="text-2xl font-black text-gray-900 dark:text-white uppercase tracking-tight">
              À ne pas <span className="text-indigo-600">Manquer</span>
            </h2>
            <Link to="/events" className="text-xs font-black text-indigo-600 hover:underline uppercase tracking-widest">Tout voir</Link>
          </div>

          <div className="space-y-4">
            {isLoadingEvents ? (
              [1, 2, 3].map(i => <div key={i} className="h-24 bg-gray-100 dark:bg-white/5 rounded-3xl animate-pulse"></div>)
            ) : !recentEvents || recentEvents.length === 0 ? (
              <div className="bg-white dark:bg-[#1f2028] p-10 rounded-[2.5rem] border border-dashed border-gray-200 dark:border-white/10 text-center text-sm text-gray-400 font-bold uppercase tracking-widest">
                Aucun événement récent trouvé.
              </div>
            ) : (
              recentEvents.map(event => (
                <Link to={`/events/${event.id_evenement}`} key={event.id_evenement} className="bg-white dark:bg-[#1f2028] p-5 rounded-3xl border border-gray-100 dark:border-white/5 shadow-sm flex items-center gap-5 hover:scale-[1.02] transition-transform duration-300 group">
                  <div className="w-14 h-14 rounded-2xl bg-indigo-50 dark:bg-indigo-500/10 flex items-center justify-center text-indigo-600 dark:text-indigo-400 shrink-0 group-hover:bg-indigo-600 group-hover:text-white transition-colors duration-300">
                    <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                  </div>
                  <div className="min-w-0 flex-1">
                    <h4 className="text-base font-black text-gray-900 dark:text-white truncate group-hover:text-indigo-600 transition-colors">{event.titre}</h4>
                    <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-1">
                      Publié {formatRelativeTime(event.date_creation)}
                    </p>
                  </div>
                  <svg className="w-5 h-5 text-gray-300 group-hover:text-indigo-600 group-hover:translate-x-1 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" /></svg>
                </Link>
              ))
            )}
          </div>
        </div>

        <div className="space-y-6">
          <div className="flex items-center justify-between px-2">
            <h2 className="text-2xl font-black text-gray-900 dark:text-white uppercase tracking-tight">
              Mes <span className="text-pink-600">Activités</span>
            </h2>
            <Link to="/my-inscriptions" className="text-xs font-black text-pink-600 hover:underline uppercase tracking-widest">Tout voir</Link>
          </div>

          <div className="space-y-4">
            {isLoadingInscriptions ? (
              [1, 2, 3].map(i => <div key={i} className="h-24 bg-gray-100 dark:bg-white/5 rounded-3xl animate-pulse"></div>)
            ) : !recentInscriptions || recentInscriptions.length === 0 ? (
              <div className="bg-white dark:bg-[#1f2028] p-10 rounded-[2.5rem] border border-dashed border-gray-200 dark:border-white/10 text-center text-sm text-gray-400 font-bold uppercase tracking-widest">
                Aucune inscription récente trouvée.
              </div>
            ) : (
              recentInscriptions.map(ins => {
                const event = events?.find(e => e.id_evenement === ins.id_evenement);
                return (
                  <div key={ins.id_inscription} className="bg-white dark:bg-[#1f2028] p-5 rounded-3xl border border-gray-100 dark:border-white/5 shadow-sm flex items-center gap-5">
                    <div className="w-14 h-14 rounded-2xl bg-pink-50 dark:bg-pink-500/10 flex items-center justify-center text-pink-600 dark:text-pink-400 shrink-0">
                      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" /></svg>
                    </div>
                    <div className="min-w-0 flex-1">
                      <h4 className="text-base font-black text-gray-900 dark:text-white truncate">
                        {event?.titre || 'Chargement...'}
                      </h4>
                      <div className="flex items-center gap-2 mt-1">
                        <span className={`px-2 py-0.5 rounded-full text-[8px] font-black uppercase tracking-tighter ${
                          ins.statut_inscription?.toLowerCase() === 'confirme'
                            ? 'bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10'
                            : 'bg-amber-50 text-amber-600 dark:bg-amber-500/10'
                        }`}>
                          {ins.statut_inscription || 'En attente'}
                        </span>
                        <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">
                          Inscrit {formatRelativeTime(ins.date_inscription)}
                        </p>
                      </div>
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

/**
 * Composant Dashboard principal qui route vers les vues spécifiques basées sur le rôle.
 * @returns {React.ReactNode} Le tableau de bord rendu pour le rôle de l'utilisateur.
 */
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
