import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { inscriptionService } from '../api/inscriptionService';

export const useUserInscriptions = (userId) => {
  return useQuery({
    queryKey: ['inscriptions', userId],
    queryFn: () => inscriptionService.getUserInscriptions(userId),
    enabled: !!userId,
  });
};

export const useRegister = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data) => inscriptionService.registerToEvent(data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['inscriptions', variables.id_utilisateur] });
      queryClient.invalidateQueries({ queryKey: ['events'] });
    },
  });
};
