import React from 'react';

const statusConfig = {
  'Brouillon': {
    label: 'Brouillon',
    classes: 'bg-gray-100 text-gray-600 dark:bg-white/5 dark:text-gray-400 border-gray-200 dark:border-white/10'
  },
  'Publie': {
    label: 'Publié',
    classes: 'bg-emerald-100 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400 border-emerald-200 dark:border-emerald-500/20'
  },
  'Publié': {
    label: 'Publié',
    classes: 'bg-emerald-100 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400 border-emerald-200 dark:border-emerald-500/20'
  },
  'Annule': {
    label: 'Annulé',
    classes: 'bg-red-100 text-red-600 dark:bg-red-500/10 dark:text-red-400 border-red-200 dark:border-red-500/20'
  },
  'Annulé': {
    label: 'Annulé',
    classes: 'bg-red-100 text-red-600 dark:bg-red-500/10 dark:text-red-400 border-red-200 dark:border-red-500/20'
  },
  'Passe': {
    label: 'Passé',
    classes: 'bg-amber-100 text-amber-600 dark:bg-amber-500/10 dark:text-amber-400 border-amber-200 dark:border-amber-500/20'
  },
  'Passé': {
    label: 'Passé',
    classes: 'bg-amber-100 text-amber-600 dark:bg-amber-500/10 dark:text-amber-400 border-amber-200 dark:border-amber-500/20'
  }
};

const EventStatusBadge = ({ status }) => {
  const config = statusConfig[status] || statusConfig['Brouillon'];

  return (
    <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider border ${config.classes}`}>
      {config.label}
    </span>
  );
};

export default EventStatusBadge;
