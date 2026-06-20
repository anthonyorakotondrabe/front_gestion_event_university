import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { catalogService } from '../api/catalogService';
import toast from 'react-hot-toast';

export const useFilieres = () => {
  return useQuery({
    queryKey: ['filieres'],
    queryFn: catalogService.getFilieres,
  });
};

export const useCreateFiliere = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: catalogService.createFiliere,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['filieres'] });
      toast.success('Filière créée avec succès');
    },
    onError: (error) => {
      const message = error.response?.data?.detail || "Erreur lors de la création";
      toast.error(message);
    }
  });
};

export const useUpdateFiliere = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }) => catalogService.updateFiliere(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['filieres'] });
      toast.success('Filière mise à jour avec succès');
    },
    onError: (error) => {
      const message = error.response?.data?.detail || "Erreur lors de la mise à jour";
      toast.error(message);
    }
  });
};

export const useDeleteFiliere = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: catalogService.deleteFiliere,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['filieres'] });
      toast.success('Filière supprimée avec succès');
    },
    onError: (error) => {
      const message = error.response?.data?.detail || "Erreur lors de la suppression";
      toast.error(message);
    }
  });
};

export const useCategories = () => {
  return useQuery({
    queryKey: ['categories'],
    queryFn: catalogService.getCategories,
  });
};

export const useCreateCategory = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: catalogService.createCategory,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categories'] });
      toast.success('Catégorie créée avec succès');
    },
    onError: (error) => {
      const message = error.response?.data?.detail || "Erreur lors de la création";
      toast.error(message);
    }
  });
};

export const useUpdateCategory = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }) => catalogService.updateCategory(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categories'] });
      toast.success('Catégorie mise à jour avec succès');
    },
    onError: (error) => {
      const message = error.response?.data?.detail || "Erreur lors de la mise à jour";
      toast.error(message);
    }
  });
};

export const useDeleteCategory = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: catalogService.deleteCategory,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categories'] });
      toast.success('Catégorie supprimée avec succès');
    },
    onError: (error) => {
      const message = error.response?.data?.detail || "Erreur lors de la suppression";
      toast.error(message);
    }
  });
};

export const useLieux = () => {
  return useQuery({
    queryKey: ['lieux'],
    queryFn: catalogService.getLieux,
    staleTime: Infinity,
  });
};
