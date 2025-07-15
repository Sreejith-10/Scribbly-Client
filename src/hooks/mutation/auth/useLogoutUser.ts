import {logoutUser} from "@/controllers/auth";
import {useMutation} from "@tanstack/react-query";

export const useLogoutUser = () => {
	return useMutation({
		mutationFn: logoutUser,
	});
};
