import React from 'react';
import { useEventInscriptions } from '../../inscriptions/hooks/useInscriptions';
import { formatToLocalTime } from '../../../utils/dateUtils';

const OrganisateurEventRow = ({ event }) => {
  const { data: inscriptions, isLoading } = useEventInscriptions(event.id_evenement);

  if (isLoading) {
    return (
      <div className="md:table-row border-b border-gray-50 dark:border-white/5 animate-pulse">
        <div className="md:table-cell px-6 py-6 h-24 bg-gray-50/50 dark:bg-white/[0.01] rounded-2xl md:rounded-none mb-4 md:mb-0"></div>
      </div>
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
    <>
      {/* Mobile Card Layout */}
      <div className="md:hidden bg-white dark:bg-white/[0.02] p-6 rounded-[2rem] border border-gray-100 dark:border-white/5 space-y-4 mb-4">
        <div className="flex justify-between items-start gap-4">
          <div className="min-w-0 flex-1">
            <h4 className="font-black text-gray-900 dark:text-white text-lg leading-tight truncate">
              {event.titre}
            </h4>
            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-1">
              {formatToLocalTime(event.date_evenement)}
            </p>
          </div>
          <div className="text-right">
             <div className="text-sm font-black text-emerald-600 dark:text-emerald-400">
              {potentialRevenue.toLocaleString()} Ar
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="bg-gray-50 dark:bg-white/[0.02] p-3 rounded-2xl border border-transparent">
            <div className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-1">Places</div>
            <span className={`text-xs font-black ${
              remainingPlaces === 0 ? 'text-red-600' : 'text-emerald-600'
            }`}>
              {remainingPlaces} / {event.capacite_max}
            </span>
          </div>
          <div className="bg-gray-50 dark:bg-white/[0.02] p-3 rounded-2xl border border-transparent">
            <div className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-1">En attente</div>
            <span className={`text-xs font-black ${pendingCount > 0 ? 'text-amber-500' : 'text-gray-400'}`}>
              {pendingCount}
            </span>
          </div>
        </div>
      </div>

      {/* Desktop Table Row */}
      <tr className="hidden md:table-row group hover:bg-gray-50 dark:hover:bg-white/[0.02] transition-colors border-b border-gray-50 dark:border-white/5 last:border-0">
        <td className="px-6 py-6">
          <div className="font-black text-gray-900 dark:text-white group-hover:text-emerald-600 transition-colors truncate max-w-[250px]">
            {event.titre}
          </div>
          <div className="text-[10px] text-gray-400 font-bold uppercase tracking-[0.15em] mt-0.5">
            {formatToLocalTime(event.date_evenement)}
          </div>
        </td>
        <td className="px-6 py-6 text-center">
          <span className={`inline-flex items-center px-4 py-1.5 rounded-full text-xs font-black ${
            remainingPlaces === 0
              ? 'bg-red-50 text-red-600 dark:bg-red-500/10 dark:text-red-400'
              : 'bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400'
          }`}>
            {remainingPlaces} / {event.capacite_max}
          </span>
        </td>
        <td className="px-6 py-6 text-center">
          <div className={`text-sm font-black ${pendingCount > 0 ? 'text-amber-500' : 'text-gray-400'}`}>
            {pendingCount}
          </div>
          <div className="text-[9px] text-gray-400 font-bold uppercase tracking-widest">Demandes</div>
        </td>
        <td className="px-6 py-6 text-right">
          <div className="text-base font-black text-emerald-600 dark:text-emerald-400">
            {potentialRevenue.toLocaleString()} Ar
          </div>
          <div className="text-[10px] text-gray-400 uppercase tracking-widest font-bold">
            {event.prix.toLocaleString()} Ar <span className="text-[8px] opacity-50">/ UNITÉ</span>
          </div>
        </td>
      </tr>
    </>
  );
};

const OrganisateurSyntheticView = ({ events }) => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between px-2">
        <div className="flex items-center gap-3">
          <div className="w-1.5 h-8 bg-emerald-500 rounded-full"></div>
          <h2 className="text-2xl font-black text-gray-900 dark:text-white uppercase tracking-tight">
            Vue <span className="text-emerald-600">Synthétique</span>
          </h2>
        </div>
      </div>

      <div className="md:bg-white md:dark:bg-[#1f2028] md:rounded-[2.5rem] md:border md:border-gray-100 md:dark:border-white/5 md:shadow-[0_10px_40px_rgba(0,0,0,0.02)] overflow-hidden">
        <table className="w-full text-left border-collapse hidden md:table">
          <thead>
            <tr className="border-b border-gray-100 dark:border-white/5 bg-gray-50/50 dark:bg-white/[0.01]">
              <th className="px-6 py-5 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Événement</th>
              <th className="px-6 py-5 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] text-center">Places</th>
              <th className="px-6 py-5 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] text-center">Attente</th>
              <th className="px-6 py-5 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] text-right">Revenu Potentiel</th>
            </tr>
          </thead>
          <tbody>
            {events.length === 0 ? (
              <tr>
                <td colSpan="4" className="px-6 py-20 text-center">
                  <div className="flex flex-col items-center gap-2">
                    <div className="w-12 h-12 rounded-2xl bg-gray-50 dark:bg-white/5 flex items-center justify-center text-gray-300">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" /></svg>
                    </div>
                    <span className="text-sm text-gray-400 font-bold uppercase tracking-widest">Aucun événement actif</span>
                  </div>
                </td>
              </tr>
            ) : (
              events.map(event => (
                <OrganisateurEventRow key={event.id_evenement} event={event} />
              ))
            )}
          </tbody>
        </table>

        {/* Mobile View Container */}
        <div className="md:hidden">
          {events.length === 0 ? (
            <div className="bg-white dark:bg-[#1f2028] p-12 rounded-[2.5rem] text-center border border-dashed border-gray-200 dark:border-white/10">
              <span className="text-sm text-gray-400 font-bold uppercase tracking-widest">Aucun événement actif</span>
            </div>
          ) : (
            events.map(event => (
              <OrganisateurEventRow key={event.id_evenement} event={event} />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default OrganisateurSyntheticView;
