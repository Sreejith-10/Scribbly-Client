import {USER_STATE_QUERY_KEY} from "@/constant";
import {loginUser, registerUser} from "@/controllers/auth";
import {loginSchema, signupSchema} from "@/schema";
import {IUser} from "@/types/user.type";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import * as z from "zod";

export const useAuthMutations = () => {
	const queryClient = useQueryClient();

	const loginMutation = useMutation({
		mutationFn: (values: z.infer<typeof loginSchema>) =>
			loginUser<{message: string; user: IUser}>(values),
		onSuccess: (data) => {
			queryClient.setQueryData([USER_STATE_QUERY_KEY], () => ({
				...data.user,
			}));
		},
	});

	const reigsterMutation = useMutation({
		mutationFn: (values: z.infer<typeof signupSchema>) =>
			registerUser<{message: string}>(values),
	});

	return {loginMutation, reigsterMutation};
};
