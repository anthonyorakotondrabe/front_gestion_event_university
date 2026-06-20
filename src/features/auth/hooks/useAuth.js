import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { authService } from '../api/authService';

export const useUser = () => {
  return useQuery({
    queryKey: ['user'],
    queryFn: authService.getMe,
    retry: false,
    staleTime: Infinity,
  });
};

export const useLogin = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ email, password }) => authService.login(email, password),
    onSuccess: (data) => {
      localStorage.setItem('token', data.access_token);
      queryClient.setQueryData(['user'], data.user);
    },
  });
};

export const useLogout = () => {
  const queryClient = useQueryClient();
  return () => {
    localStorage.removeItem('token');
    queryClient.setQueryData(['user'], null);
    queryClient.clear();
  };
};
