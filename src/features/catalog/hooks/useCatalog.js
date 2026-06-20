import { useQuery } from '@tanstack/react-query';
import { catalogService } from '../api/catalogService';

export const useFilieres = () => {
  return useQuery({
    queryKey: ['filieres'],
    queryFn: catalogService.getFilieres,
    staleTime: Infinity,
  });
};

export const useCategories = () => {
  return useQuery({
    queryKey: ['categories'],
    queryFn: catalogService.getCategories,
    staleTime: Infinity,
  });
};

export const useLieux = () => {
  return useQuery({
    queryKey: ['lieux'],
    queryFn: catalogService.getLieux,
    staleTime: Infinity,
  });
};
