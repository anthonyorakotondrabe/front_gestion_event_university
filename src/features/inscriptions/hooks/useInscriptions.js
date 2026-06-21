import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { inscriptionService } from '../api/inscriptionService';

export const useUserInscriptions = (userId) => {
  return useQuery({
    queryKey: ['inscriptions', userId],
    queryFn: () => inscriptionService.getUserInscriptions(userId),
    enabled: !!userId,
  });
};

export const useMyInscriptions = () => {
  return useQuery({
    queryKey: ['inscriptions', 'me'],
    queryFn: () => inscriptionService.getMyInscriptions(),
  });
};

export const useRegister = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data) => inscriptionService.registerToEvent(data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['inscriptions'] });
      queryClient.invalidateQueries({ queryKey: ['events'] });
    },
  });
};

export const useCancelInscription = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id) => inscriptionService.cancelInscription(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['inscriptions'] });
      queryClient.invalidateQueries({ queryKey: ['events'] });
    },
  });
};
