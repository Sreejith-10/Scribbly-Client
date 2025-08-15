import { loginUser } from '@/controllers/auth';
import { queryClient } from '@/lib';
import { queryKeys } from '@/lib/query-keys';
import { loginSchema } from '@/schema';
import { IUser } from '@/types/user.type';
import { useMutation } from '@tanstack/react-query';
import * as z from 'zod';

export const useLoginUser = () => {
	return useMutation({
		mutationFn: (values: z.infer<typeof loginSchema>) =>
			loginUser<{ message: string; user: IUser }>(values),
		onSuccess: (data) => {
			queryClient.setQueryData(queryKeys.user.u, () => ({
				...data.user,
			}));
		},
	});
};
