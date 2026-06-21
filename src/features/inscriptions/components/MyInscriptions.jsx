import { useMyInscriptions, useCancelInscription } from '../hooks/useInscriptions';
import { useEvents } from '../../events/hooks/useEvents';
import { useLieux } from '../../catalog/hooks/useCatalog';
import { useSearch } from '../../../context/SearchContext';
import { formatToLocalTime } from '../../../utils/dateUtils';
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

const MyInscriptions = () => {
  const { data: inscriptions, isLoading: isLoadingInscriptions } = useMyInscriptions();
  const { data: events, isLoading: isLoadingEvents } = useEvents();
  const { data: lieux } = useLieux();
  const { searchQuery } = useSearch();
  const cancelMutation = useCancelInscription();

  const handleCancel = (id) => {
    if (window.confirm('Voulez-vous vraiment annuler cette inscription ?')) {
      cancelMutation.mutate(id, {
        onSuccess: () => {
          toast.success('Inscription annulée avec succès');
        },
        onError: (err) => {
          toast.error(err.response?.data?.detail || 'Erreur lors de l\'annulation');
        }
      });
    }
  };

  const getEventDetails = (eventId) => {
    return events?.find(e => e.id_evenement === eventId);
  };

  const getLieuLabel = (id) => {
    const lieu = lieux?.find(l => l.id_lieu === id);
    return lieu ? `${lieu.nom_lieu}, ${lieu.ville}` : 'Inconnu';
  };

  const filteredInscriptions = inscriptions?.filter(ins => {
    const event = getEventDetails(ins.id_evenement);
    const matchesSearch =
      event?.titre?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ins.statut_inscription?.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSearch;
  });

  const isLoading = isLoadingInscriptions || isLoadingEvents;

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="h-20 bg-gray-100 dark:bg-white/5 rounded-3xl animate-pulse"></div>
        <div className="h-96 bg-gray-100 dark:bg-white/5 rounded-3xl animate-pulse"></div>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-4xl font-black text-gray-900 dark:text-white tracking-tight mb-2">
            Mes <span className="text-indigo-600">Inscriptions</span>
          </h1>
          <p className="text-gray-500 dark:text-gray-400 font-medium">
            Retrouvez tous les événements auxquels vous participez.
          </p>
        </div>
      </div>

      {/* Stats Bar */}
      <div className="flex justify-end bg-white dark:bg-[#1f2028] p-4 rounded-3xl border border-gray-100 dark:border-white/5 shadow-sm">
        <div className="px-6 py-3 bg-indigo-50 dark:bg-indigo-500/10 rounded-2xl border border-indigo-100 dark:border-indigo-500/20">
          <span className="text-sm font-black text-indigo-600 dark:text-indigo-400 uppercase">
            {filteredInscriptions?.length || 0} Inscriptions
          </span>
        </div>
      </div>

      {/* Main Content */}
      <div className="bg-white dark:bg-[#1f2028] rounded-3xl border border-gray-100 dark:border-white/5 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-gray-100 dark:border-white/5">
                <th className="px-6 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest">Événement</th>
                <th className="px-6 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest">Date & Lieu</th>
                <th className="px-6 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest">Date Inscription</th>
                <th className="px-6 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest text-center">Statut</th>
                <th className="px-6 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-white/5">
              {!filteredInscriptions || filteredInscriptions.length === 0 ? (
                <tr>
                  <td colSpan="5" className="px-6 py-12 text-center text-gray-500 dark:text-gray-400 font-medium">
                    Vous n'avez aucune inscription pour le moment.
                  </td>
                </tr>
              ) : (
                filteredInscriptions.map((ins) => {
                  const event = getEventDetails(ins.id_evenement);
                  return (
                    <tr key={ins.id_inscription} className="hover:bg-gray-50 dark:hover:bg-white/5 transition-colors group">
                      <td className="px-6 py-5">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-white font-black shadow-lg shadow-indigo-500/20 shrink-0">
                            {event?.titre?.charAt(0).toUpperCase() || 'E'}
                          </div>
                          <div className="min-w-0">
                            <div className="text-sm font-black text-gray-900 dark:text-white truncate max-w-[200px]">
                              {event?.titre || 'Événement inconnu'}
                            </div>
                            <div className="text-[10px] font-bold text-gray-400 uppercase tracking-tight">
                              ID: {ins.id_inscription}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-5">
                        <div className="text-sm font-bold text-gray-700 dark:text-gray-300">
                          {event ? formatToLocalTime(event.date_evenement) : '---'}
                        </div>
                        <div className="text-[10px] font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-tight">
                          {event ? getLieuLabel(event.id_lieu) : '---'}
                        </div>
                      </td>
                      <td className="px-6 py-5 text-sm font-medium text-gray-500 dark:text-gray-400">
                        {formatToLocalTime(ins.date_inscription)}
                      </td>
                      <td className="px-6 py-5 text-center">
                        <InscriptionStatusBadge status={ins.statut_inscription} />
                      </td>
                      <td className="px-6 py-5 text-right">
                        <button
                          onClick={() => handleCancel(ins.id_inscription)}
                          disabled={cancelMutation.isPending || ins.statut_inscription === 'Annule' || ins.statut_inscription === 'Annulé'}
                          className="p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-xl transition-all disabled:opacity-30 group/btn"
                          title="Annuler l'inscription"
                        >
                          <svg className="w-5 h-5 group-hover/btn:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default MyInscriptions;
