import { fetchUser } from '@/controllers/user';
import { queryKeys } from '@/lib/query-keys';
import { useQuery } from '@tanstack/react-query';

export const useUser = () => {
	return useQuery({
		queryKey: queryKeys.user.u,
		queryFn: fetchUser,
	});
};
