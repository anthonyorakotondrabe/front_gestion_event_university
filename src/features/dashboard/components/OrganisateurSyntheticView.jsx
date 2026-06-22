import React from 'react';
import { useEventInscriptions } from '../../inscriptions/hooks/useInscriptions';
import { formatToLocalTime } from '../../../utils/dateUtils';

const OrganisateurEventRow = ({ event }) => {
  const { data: inscriptions, isLoading } = useEventInscriptions(event.id_evenement);

  if (isLoading) {
    return (
      <tr className="border-b border-gray-50 dark:border-white/5 animate-pulse">
        <td colSpan="4" className="px-6 py-4 h-16 bg-gray-50/50 dark:bg-white/[0.01]"></td>
      </tr>
    );
  }

  const confirmedCount = inscriptions?.filter(ins => ins.statut_inscription?.toLowerCase() === 'confirme').length || 0;
  const pendingCount = inscriptions?.filter(ins =>
    ins.statut_inscription === 'EnAttente' ||
    ins.statut_inscription?.toLowerCase() === 'en attente' ||
    !ins.statut_inscription
  ).length || 0;

  const remainingPlaces = Math.max(0, event.capacite_max - confirmedCount);
  const potentialRevenue = confirmedCount * event.prix;

  return (
    <tr className="group hover:bg-gray-50 dark:hover:bg-white/[0.02] transition-colors border-b border-gray-50 dark:border-white/5 last:border-0">
      <td className="px-6 py-4">
        <div className="font-bold text-gray-900 dark:text-white group-hover:text-emerald-600 transition-colors truncate max-w-[200px]">
          {event.titre}
        </div>
        <div className="text-[10px] text-gray-400 font-medium">
          {formatToLocalTime(event.date_evenement)}
        </div>
      </td>
      <td className="px-6 py-4 text-center">
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-black ${
          remainingPlaces === 0 ? 'bg-red-50 text-red-600 dark:bg-red-500/10 dark:text-red-400' : 'bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400'
        }`}>
          {remainingPlaces} / {event.capacite_max}
        </span>
      </td>
      <td className="px-6 py-4 text-center">
        <span className={`text-sm font-bold ${pendingCount > 0 ? 'text-amber-500' : 'text-gray-400'}`}>
          {pendingCount}
        </span>
      </td>
      <td className="px-6 py-4 text-right">
        <div className="text-sm font-black text-emerald-600 dark:text-emerald-400">
          {potentialRevenue.toLocaleString()} Ar
        </div>
        <div className="text-[10px] text-gray-400 uppercase tracking-widest font-bold">
          {event.prix.toLocaleString()} Ar / place
        </div>
      </td>
    </tr>
  );
};

const OrganisateurSyntheticView = ({ events }) => {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between px-2">
        <h2 className="text-xl font-black text-gray-900 dark:text-white uppercase tracking-tight">
          Vue <span className="text-emerald-600">Synthétique</span> des Événements
        </h2>
      </div>

      <div className="overflow-x-auto bg-white dark:bg-[#1f2028] rounded-[2rem] border border-gray-100 dark:border-white/5 shadow-sm">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-gray-100 dark:border-white/5">
              <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">Événement</th>
              <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest text-center">Places Restantes</th>
              <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest text-center">En attente</th>
              <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest text-right">Revenu Potentiel</th>
            </tr>
          </thead>
          <tbody>
            {events.length === 0 ? (
              <tr>
                <td colSpan="4" className="px-6 py-10 text-center text-sm text-gray-500 italic">
                  Aucun événement à afficher.
                </td>
              </tr>
            ) : (
              events.map(event => (
                <OrganisateurEventRow key={event.id_evenement} event={event} />
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrganisateurSyntheticView;
