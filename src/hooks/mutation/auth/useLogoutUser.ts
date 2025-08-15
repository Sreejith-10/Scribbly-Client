import { logoutUser } from '@/controllers/auth';
import { queryClient } from '@/lib';
import { useMutation } from '@tanstack/react-query';

export const useLogoutUser = () => {
	return useMutation({
		mutationFn: logoutUser,
		onSettled: () => {
			queryClient.invalidateQueries();
		},
	});
};
