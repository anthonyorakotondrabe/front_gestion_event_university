import React from 'react';
import { useEvents } from '../../events/hooks/useEvents';
import EventList from '../../events/components/EventList';
import { useSearch } from '../../../context/SearchContext';

const ModerationDashboard = () => {
  const { data: events, isLoading, error } = useEvents();
  const { searchQuery } = useSearch();

  // Admin sees ALL events, filtered only by search query
  const filteredEvents = events?.filter(event => {
    const matchesSearch =
      event.titre.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.createur_nom?.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSearch;
  });

  if (error) return (
    <div className="p-8 bg-red-50 dark:bg-red-500/10 rounded-3xl border border-red-100 dark:border-red-500/20 text-red-600 dark:text-red-400 font-bold">
      Erreur lors du chargement des événements pour modération.
    </div>
  );

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-4xl font-black text-gray-900 dark:text-white tracking-tight mb-2">
            Modération <span className="text-red-600">Globale</span>
          </h1>
          <p className="text-gray-500 dark:text-gray-400 font-medium">
            Surveillez tous les événements de la plateforme et intervenez si nécessaire.
          </p>
        </div>

        <div className="flex gap-4">
          <div className="px-6 py-4 bg-red-50 dark:bg-red-500/10 rounded-2xl border border-red-100 dark:border-red-500/20 text-center">
            <div className="text-2xl font-black text-red-600 dark:text-red-400">{events?.length || 0}</div>
            <div className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Total Événements</div>
          </div>
        </div>
      </div>

      {/* Stats Bar */}
      <div className="flex justify-between items-center bg-white dark:bg-[#1f2028] p-4 rounded-3xl border border-gray-100 dark:border-white/5 shadow-sm">
        <div className="flex items-center gap-2">
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
          </span>
          <span className="text-sm font-black text-gray-900 dark:text-white uppercase tracking-wider">
            Mode Surveillance Active
          </span>
        </div>
        <div className="px-6 py-3 bg-red-50 dark:bg-red-500/10 rounded-2xl border border-red-100 dark:border-red-500/20">
          <span className="text-sm font-black text-red-600 dark:text-red-400">
            {filteredEvents?.length || 0} RÉSULTATS
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
      ) : (
        <EventList
          events={filteredEvents}
          onEdit={() => {}} // No editing for moderator in this view, or we could allow it
          isModeration={true}
        />
      )}
    </div>
  );
};

export default ModerationDashboard;
