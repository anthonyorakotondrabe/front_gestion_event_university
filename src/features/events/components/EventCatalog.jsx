import { useEvents, useRegisterForEvent } from '../hooks/useEvents';
import { useMyInscriptions, useCancelInscription } from '../../inscriptions/hooks/useInscriptions';
import { useCategories, useLieux } from '../../catalog/hooks/useCatalog';
import EventStatusBadge from './EventStatusBadge';
import { useSearch } from '../../../context/SearchContext';
import { useUser } from '../../auth/hooks/useAuth';
import { formatToLocalTime } from '../../../utils/dateUtils';
import toast from 'react-hot-toast';

const EventCatalog = () => {
  const { data: user } = useUser();
  const { data: events, isLoading, error } = useEvents();
  const { data: categories } = useCategories();
  const { data: lieux } = useLieux();
  const { searchQuery } = useSearch();
  const { data: userInscriptions } = useMyInscriptions();
  const registerMutation = useRegisterForEvent();
  const cancelMutation = useCancelInscription();

  const isEtudiant = user?.role?.toLowerCase().trim() === 'etudiant' || user?.role?.toLowerCase().trim() === 'étudiant';

  const handleRegister = (eventId) => {
    if (!user) {
      toast.error('Vous devez être connecté pour vous inscrire');
      return;
    }

    if (!isEtudiant) {
      toast.error('Seuls les étudiants peuvent s\'inscrire aux événements');
      return;
    }

    registerMutation.mutate(eventId, {
      onSuccess: () => {
        toast.success('Inscription réussie !');
      },
      onError: (error) => {
        const message = error.response?.data?.detail || 'Erreur lors de l\'inscription';
        toast.error(message);
      }
    });
  };

  const handleCancel = (inscriptionId) => {
    if (window.confirm('Voulez-vous vraiment annuler votre inscription ?')) {
      cancelMutation.mutate(inscriptionId, {
        onSuccess: () => toast.success('Inscription annulée'),
        onError: (err) => toast.error(err.response?.data?.detail || 'Erreur lors de l\'annulation')
      });
    }
  };

  const getCategoryLabel = (id) => categories?.find(c => c.id_categorie === id)?.libelle || 'Inconnue';
  const getLieuLabel = (id) => {
    const lieu = lieux?.find(l => l.id_lieu === id);
    return lieu ? `${lieu.nom_lieu}, ${lieu.ville}` : 'Inconnu';
  };

  // Filter events: only 'Publie' status AND matching search query
  const publishedEvents = events?.filter(event => {
    const isPublished = event.statut_evenement === 'Publie';
    const matchesSearch = event.titre.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         event.description?.toLowerCase().includes(searchQuery.toLowerCase());
    return isPublished && matchesSearch;
  });

  if (error) return (
    <div className="p-8 bg-red-50 dark:bg-red-500/10 rounded-3xl border border-red-100 dark:border-red-500/20 text-red-600 dark:text-red-400 font-bold">
      Erreur lors du chargement des événements.
    </div>
  );

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-4xl font-black text-gray-900 dark:text-white tracking-tight mb-2">
            Catalogue des <span className="text-indigo-600">Événements</span>
          </h1>
          <p className="text-gray-500 dark:text-gray-400 font-medium">
            Découvrez tous les événements à venir et inscrivez-vous.
          </p>
        </div>
      </div>

      {/* Stats Bar */}
      <div className="flex justify-end bg-white dark:bg-[#1f2028] p-4 rounded-3xl border border-gray-100 dark:border-white/5 shadow-sm">
        <div className="px-6 py-3 bg-indigo-50 dark:bg-indigo-500/10 rounded-2xl border border-indigo-100 dark:border-indigo-500/20">
          <span className="text-sm font-black text-indigo-600 dark:text-indigo-400">
            {publishedEvents?.length || 0} ÉVÉNEMENTS DISPONIBLES
          </span>
        </div>
      </div>

      {/* Main Content */}
      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[1, 2, 3, 4].map(i => (
            <div key={i} className="h-64 bg-gray-100 dark:bg-white/5 rounded-3xl animate-pulse"></div>
          ))}
        </div>
      ) : !publishedEvents || publishedEvents.length === 0 ? (
        <div className="bg-white dark:bg-[#1f2028] p-12 rounded-3xl border border-dashed border-gray-200 dark:border-white/10 text-center">
          <p className="text-gray-500 dark:text-gray-400 font-medium">Aucun événement publié trouvé.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          {publishedEvents.map((event) => {
            const myInscription = userInscriptions?.find(ins => ins.id_evenement === event.id_evenement);
            const isRegistered = !!myInscription;

            return (
              <div key={event.id_evenement} className="bg-white dark:bg-[#1f2028] rounded-3xl p-6 border border-gray-100 dark:border-white/5 shadow-sm hover:shadow-xl transition-all group flex flex-col h-full">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <EventStatusBadge status={event.statut_evenement} />
                      <span className="text-[10px] font-black text-indigo-600 dark:text-indigo-400 uppercase tracking-widest bg-indigo-50 dark:bg-indigo-500/10 px-2 py-1 rounded-lg">
                        {getCategoryLabel(event.id_categorie)}
                      </span>
                      {isRegistered && (
                        <span className="text-[10px] font-black text-emerald-600 dark:text-emerald-400 uppercase tracking-widest bg-emerald-50 dark:bg-emerald-500/10 px-2 py-1 rounded-lg border border-emerald-100 dark:border-emerald-500/20">
                          Inscrit
                        </span>
                      )}
                    </div>
                    <h3 className="text-xl font-black text-gray-900 dark:text-white group-hover:text-indigo-600 transition-colors">
                      {event.titre}
                    </h3>
                  </div>
                </div>

                <div className="flex items-center gap-2 mb-4 text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest">
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                  Publié le {formatToLocalTime(event.date_creation)}
                </div>

                <p className="text-gray-500 dark:text-gray-400 text-sm mb-6 line-clamp-3">
                  {event.description}
                </p>

                <div className="grid grid-cols-2 gap-4 mb-6 mt-auto">
                  <div className="flex items-center gap-3 text-gray-500 dark:text-gray-400">
                    <div className="w-8 h-8 rounded-lg bg-gray-50 dark:bg-white/5 flex items-center justify-center">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                    </div>
                    <span className="text-xs font-bold">{formatToLocalTime(event.date_evenement)}</span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-500 dark:text-gray-400">
                    <div className="w-8 h-8 rounded-lg bg-gray-50 dark:bg-white/5 flex items-center justify-center">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                    </div>
                    <span className="text-xs font-bold truncate">{getLieuLabel(event.id_lieu)}</span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-500 dark:text-gray-400">
                    <div className="w-8 h-8 rounded-lg bg-gray-50 dark:bg-white/5 flex items-center justify-center">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                    </div>
                    <span className="text-xs font-bold">{event.prix.toLocaleString()} Ar</span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-500 dark:text-gray-400">
                    <div className="w-8 h-8 rounded-lg bg-gray-50 dark:bg-white/5 flex items-center justify-center">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
                    </div>
                    <span className="text-xs font-bold">{event.capacite_max} Places</span>
                  </div>
                </div>

                <div className="pt-4 border-t border-gray-100 dark:border-white/5">
                  {isEtudiant ? (
                    isRegistered ? (
                      <button
                        onClick={() => handleCancel(myInscription.id_inscription)}
                        disabled={cancelMutation.isPending}
                        className="w-full py-3 bg-red-50 dark:bg-red-500/10 text-red-600 dark:text-red-400 border border-red-100 dark:border-red-500/20 font-black rounded-xl transition-all active:scale-95 hover:bg-red-100 dark:hover:bg-red-500/20 disabled:opacity-70 flex items-center justify-center gap-2"
                      >
                        {cancelMutation.isPending && cancelMutation.variables === myInscription.id_inscription ? (
                          <div className="w-5 h-5 border-2 border-red-600 border-t-transparent rounded-full animate-spin"></div>
                        ) : (
                          'Annuler l\'inscription'
                        )}
                      </button>
                    ) : (
                      <button
                        onClick={() => handleRegister(event.id_evenement)}
                        disabled={registerMutation.isPending}
                        className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-black rounded-xl transition-all active:scale-95 shadow-lg shadow-indigo-500/20 disabled:opacity-70 flex items-center justify-center gap-2"
                      >
                        {registerMutation.isPending && registerMutation.variables === event.id_evenement ? (
                          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        ) : (
                          'S\'inscrire à l\'événement'
                        )}
                      </button>
                    )
                  ) : (
                    <div className="w-full py-3 bg-gray-100 dark:bg-white/5 text-gray-500 dark:text-gray-400 font-bold rounded-xl text-center text-xs">
                      Inscriptions réservées aux étudiants
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default EventCatalog;
