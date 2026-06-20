import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { eventService } from '../api/eventService';

export const useEvents = (params) => {
  return useQuery({
    queryKey: ['events', params],
    queryFn: () => eventService.getEvents(params),
  });
};

export const useEvent = (id) => {
  return useQuery({
    queryKey: ['events', id],
    queryFn: () => eventService.getEvent(id),
    enabled: !!id,
  });
};

export const useCreateEvent = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (newEvent) => eventService.createEvent(newEvent),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['events'] });
    },
  });
};
