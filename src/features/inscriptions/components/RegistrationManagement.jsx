import { useState, useMemo } from 'react';
import { useUpdateInscriptionStatus } from '../hooks/useInscriptions';
import { useEvents } from '../../events/hooks/useEvents';
import { useFilieres } from '../../catalog/hooks/useCatalog';
import { useUser } from '../../auth/hooks/useAuth';
import { userService } from '../../users/api/userService';
import { useSearch } from '../../../context/SearchContext';
import { formatToLocalTime } from '../../../utils/dateUtils';
import { inscriptionService } from '../api/inscriptionService';
import { useQueries } from '@tanstack/react-query';
import toast from 'react-hot-toast';

const InscriptionStatusBadge = ({ status }) => {
  const statusConfig = {
    'En attente': {
      label: 'En attente',
      classes: 'bg-amber-100 text-amber-600 dark:bg-amber-500/10 dark:text-amber-400 border-amber-200 dark:border-amber-500/20'
    },
    'Confirme': {
      label: 'Confirmé',
      classes: 'bg-emerald-100 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400 border-emerald-200 dark:border-emerald-500/20'
    },
    'Confirmé': {
      label: 'Confirmé',
      classes: 'bg-emerald-100 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400 border-emerald-200 dark:border-emerald-500/20'
    },
    'Annule': {
      label: 'Annulé',
      classes: 'bg-red-100 text-red-600 dark:bg-red-500/10 dark:text-red-400 border-red-200 dark:border-red-500/20'
    },
    'Annulé': {
      label: 'Annulé',
      classes: 'bg-red-100 text-red-600 dark:bg-red-500/10 dark:text-red-400 border-red-200 dark:border-red-500/20'
    }
  };

  const config = statusConfig[status] || statusConfig['En attente'];

  return (
    <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider border ${config.classes}`}>
      {config.label}
    </span>
  );
};

const RegistrationCard = ({ ins, event, participant, isLoadingUser, getFiliereName, isUpdating, handleStatusChange }) => {
  return (
    <div className="bg-white dark:bg-[#1f2028] p-5 rounded-3xl border border-gray-100 dark:border-white/5 shadow-sm space-y-4 md:hidden">
      <div className="flex justify-between items-start gap-3">
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-white font-black shadow-lg shadow-indigo-500/20 shrink-0">
            {isLoadingUser ? '...' : (participant?.nom || 'U').charAt(0).toUpperCase()}
          </div>
          <div className="min-w-0">
            <div className="text-sm font-black text-gray-900 dark:text-white truncate">
              {isLoadingUser ? 'Chargement...' : (participant?.nom || 'Utilisateur inconnu')}
            </div>
            <div className="text-[10px] font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-tight">
              {isLoadingUser ? '...' : getFiliereName(participant?.id_filiere, participant)}
            </div>
          </div>
        </div>
        <InscriptionStatusBadge status={ins.statut_inscription} />
      </div>

      <div className="space-y-1">
        <div className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Événement</div>
        <div className="text-xs font-bold text-gray-700 dark:text-gray-300 truncate">
          {event?.titre}
        </div>
      </div>

      <div className="flex items-center justify-between py-3 border-y border-gray-50 dark:border-white/5">
        <div className="space-y-1">
          <div className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Inscrit le</div>
          <div className="text-xs font-medium text-gray-500 dark:text-gray-400">
            {formatToLocalTime(ins.date_inscription)}
          </div>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => handleStatusChange(ins.id_inscription, 'Confirme')}
            disabled={isUpdating || ins.statut_inscription === 'Confirme' || ins.statut_inscription === 'Confirmé'}
            className="p-3 text-emerald-600 bg-emerald-50 dark:bg-emerald-500/10 rounded-xl transition-all active:scale-95 disabled:opacity-30"
            title="Confirmer"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
            </svg>
          </button>
          <button
            onClick={() => handleStatusChange(ins.id_inscription, 'Annule')}
            disabled={isUpdating || ins.statut_inscription === 'Annule' || ins.statut_inscription === 'Annulé'}
            className="p-3 text-red-600 bg-red-50 dark:bg-red-500/10 rounded-xl transition-all active:scale-95 disabled:opacity-30"
            title="Annuler"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

const RegistrationRow = ({ ins, events, filieres, searchQuery, updatingId, handleStatusChange }) => {
  const { data: participant, isLoading: isLoadingUser } = useQueries({
    queries: [{
      queryKey: ['users', ins.id_utilisateur],
      queryFn: () => userService.getUser(ins.id_utilisateur),
      staleTime: 1000 * 60 * 30,
    }]
  })[0];

  const event = events?.find(e => e.id_evenement === ins.id_evenement);
  const isUpdating = updatingId === ins.id_inscription;

  const getFiliereName = (filiereId, user) => {
    if (user?.filiere?.nom_filiere) return user.filiere.nom_filiere;
    const foundFiliere = filieres?.find(f => f.id_filiere === filiereId);
    if (foundFiliere) return foundFiliere.nom_filiere;
    return 'Filière inconnue';
  };

  const participantName = participant?.nom || 'Chargement...';
  const matchesSearch =
    event?.titre?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    participantName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    ins.statut_inscription?.toLowerCase().includes(searchQuery.toLowerCase());

  if (!matchesSearch) return null;

  return (
    <>
      {/* Mobile Card */}
      <RegistrationCard
        ins={ins}
        event={event}
        participant={participant}
        isLoadingUser={isLoadingUser}
        getFiliereName={getFiliereName}
        isUpdating={isUpdating}
        handleStatusChange={handleStatusChange}
      />

      {/* Desktop Row */}
      <tr className="hidden md:table-row hover:bg-gray-50 dark:hover:bg-white/5 transition-colors group">
        <td className="px-6 py-5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-white font-black shadow-lg shadow-indigo-500/20">
              {isLoadingUser ? '...' : (participant?.nom || 'U').charAt(0).toUpperCase()}
            </div>
            <div>
              <div className="text-sm font-black text-gray-900 dark:text-white">
                {isLoadingUser ? 'Chargement...' : (participant?.nom || 'Utilisateur inconnu')}
              </div>
              <div className="text-[10px] font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-tight">
                {isLoadingUser ? '...' : getFiliereName(participant?.id_filiere, participant)}
              </div>
              <div className="text-[10px] font-bold text-gray-400 uppercase tracking-tight">
                {isLoadingUser ? '...' : (participant?.email || 'Email non renseigné')}
              </div>
            </div>
          </div>
        </td>
        <td className="px-6 py-5">
          <div className="text-sm font-bold text-gray-700 dark:text-gray-300 max-w-xs truncate">
            {event?.titre}
          </div>
        </td>
        <td className="px-6 py-5 text-sm font-medium text-gray-500 dark:text-gray-400">
          {formatToLocalTime(ins.date_inscription)}
        </td>
        <td className="px-6 py-5 text-center">
          <InscriptionStatusBadge status={ins.statut_inscription} />
        </td>
        <td className="px-6 py-5">
          <div className="flex items-center justify-end gap-2">
            <button
              onClick={() => handleStatusChange(ins.id_inscription, 'Confirme')}
              disabled={isUpdating || ins.statut_inscription === 'Confirme' || ins.statut_inscription === 'Confirmé'}
              className="p-2 text-emerald-600 hover:bg-emerald-50 dark:hover:bg-emerald-500/10 rounded-xl transition-all disabled:opacity-30"
              title="Confirmer"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
              </svg>
            </button>
            <button
              onClick={() => handleStatusChange(ins.id_inscription, 'Annule')}
              disabled={isUpdating || ins.statut_inscription === 'Annule' || ins.statut_inscription === 'Annulé'}
              className="p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-xl transition-all disabled:opacity-30"
              title="Annuler"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </td>
      </tr>
    </>
  );
};

const RegistrationManagement = () => {
  const { data: currentUser } = useUser();
  const { data: events, isLoading: isLoadingEvents } = useEvents();
  const { data: filieres, isLoading: isLoadingFilieres } = useFilieres();
  const updateStatusMutation = useUpdateInscriptionStatus();
  const { searchQuery } = useSearch();

  const [updatingId, setUpdatingId] = useState(null);

  const organizerEvents = useMemo(() =>
    events?.filter(event => event.createur_id === currentUser?.id_utilisateur) || []
  , [events, currentUser]);

  const inscriptionsQueries = useQueries({
    queries: organizerEvents.map(event => ({
      queryKey: ['inscriptions', 'event', event.id_evenement],
      queryFn: () => inscriptionService.getEventInscriptions(event.id_evenement),
    })),
  });

  const isLoadingInscriptions = inscriptionsQueries.some(query => query.isLoading);

  const allInscriptions = useMemo(() => {
    return inscriptionsQueries
      .filter(query => query.data)
      .flatMap(query => query.data);
  }, [inscriptionsQueries]);

  const handleStatusChange = (id, newStatus) => {
    setUpdatingId(id);
    updateStatusMutation.mutate({ id, status: newStatus }, {
      onSuccess: () => {
        toast.success(`Statut mis à jour : ${newStatus === 'Confirme' ? 'Confirmé' : 'Annulé'}`);
        setUpdatingId(null);
      },
      onError: (err) => {
        toast.error(err.response?.data?.detail || 'Erreur lors de la mise à jour du statut');
        setUpdatingId(null);
      }
    });
  };

  const isLoading = isLoadingEvents || isLoadingInscriptions || isLoadingFilieres;

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="h-20 bg-gray-100 dark:bg-white/5 rounded-3xl animate-pulse"></div>
        <div className="h-96 bg-gray-100 dark:bg-white/5 rounded-3xl animate-pulse"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6 md:space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 md:gap-6">
        <div>
          <h1 className="text-3xl md:text-4xl font-black text-gray-900 dark:text-white tracking-tight mb-2">
            Gestion des <span className="text-indigo-600">Inscriptions</span>
          </h1>
          <p className="text-sm md:text-base text-gray-500 dark:text-gray-400 font-medium">
            Acceptez ou refusez les inscriptions à vos événements.
          </p>
        </div>
        <div className="flex items-center bg-indigo-50 dark:bg-indigo-500/10 px-4 py-2 rounded-2xl border border-indigo-100 dark:border-indigo-500/20 w-fit">
          <span className="text-xs font-black text-indigo-600 dark:text-indigo-400 uppercase">
            {allInscriptions?.length || 0} Inscriptions
          </span>
        </div>
      </div>

      <div className="md:bg-white md:dark:bg-[#1f2028] md:rounded-3xl md:border md:border-gray-100 md:dark:border-white/5 md:shadow-sm md:overflow-hidden">
        <div className="overflow-x-auto">
          <div className="grid grid-cols-1 gap-4 md:hidden">
            {!allInscriptions || allInscriptions.length === 0 ? (
              <div className="bg-white dark:bg-[#1f2028] p-8 rounded-3xl border border-dashed border-gray-200 dark:border-white/10 text-center">
                <p className="text-gray-500 dark:text-gray-400 font-medium text-sm">Aucune inscription trouvée.</p>
              </div>
            ) : (
              allInscriptions.map((ins) => (
                <RegistrationRow
                  key={ins.id_inscription}
                  ins={ins}
                  events={events}
                  filieres={filieres}
                  searchQuery={searchQuery}
                  updatingId={updatingId}
                  handleStatusChange={handleStatusChange}
                />
              ))
            )}
          </div>

          <table className="hidden md:table w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-gray-100 dark:border-white/5">
                <th className="px-6 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest">Participant</th>
                <th className="px-6 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest">Événement</th>
                <th className="px-6 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest">Date Inscription</th>
                <th className="px-6 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest text-center">Statut</th>
                <th className="px-6 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-white/5">
              {!allInscriptions || allInscriptions.length === 0 ? (
                <tr>
                  <td colSpan="5" className="px-6 py-12 text-center text-gray-500 dark:text-gray-400 font-medium">
                    Aucune inscription trouvée.
                  </td>
                </tr>
              ) : (
                allInscriptions.map((ins) => (
                  <RegistrationRow
                    key={ins.id_inscription}
                    ins={ins}
                    events={events}
                    filieres={filieres}
                    searchQuery={searchQuery}
                    updatingId={updatingId}
                    handleStatusChange={handleStatusChange}
                  />
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default RegistrationManagement;
