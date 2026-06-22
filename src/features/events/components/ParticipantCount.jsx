import React from 'react';
import { useEventInscriptions } from '../../inscriptions/hooks/useInscriptions';

const ParticipantCount = ({ eventId, maxCapacity }) => {
  const { data: inscriptions, isLoading } = useEventInscriptions(eventId);

  if (isLoading) {
    return <span className="text-[10px] animate-pulse">Chargement...</span>;
  }

  const confirmedCount = inscriptions?.filter(ins =>
    ins.statut_inscription?.toLowerCase() === 'confirme'
  ).length || 0;

  const pendingCount = inscriptions?.filter(ins =>
    ins.statut_inscription === 'EnAttente' ||
    ins.statut_inscription?.toLowerCase() === 'en attente' ||
    !ins.statut_inscription
  ).length || 0;

  return (
    <div className="flex flex-col">
      <span className="text-xs font-bold text-gray-700 dark:text-gray-200">
        {confirmedCount} / {maxCapacity} Confirmé(s)
      </span>
      {pendingCount > 0 && (
        <span className="text-[10px] font-bold text-amber-500">
          {pendingCount} en attente
        </span>
      )}
    </div>
  );
};

export default ParticipantCount;
