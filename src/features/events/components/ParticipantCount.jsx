import React from 'react';
import { useEventInscriptions } from '../../inscriptions/hooks/useInscriptions';

const ParticipantCount = ({ eventId, maxCapacity }) => {
  const { data: inscriptions, isLoading } = useEventInscriptions(eventId);

  if (isLoading) {
    return <span className="text-[10px] animate-pulse">Chargement...</span>;
  }

  const count = inscriptions?.filter(ins =>
    ins.statut_inscription?.toLowerCase() === 'confirme'
  ).length || 0;

  return (
    <span className="text-xs font-bold">
      {count} / {maxCapacity} Inscrit(s)
    </span>
  );
};

export default ParticipantCount;
