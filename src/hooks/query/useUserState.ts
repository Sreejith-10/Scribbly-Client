import {USER_STATE_QUERY_KEY} from "@/constant";
import {fetchUser} from "@/controllers/user";
import {useQuery} from "@tanstack/react-query";

export const useUserQuery = () => {
	return useQuery({
		queryKey: [USER_STATE_QUERY_KEY],
		queryFn: fetchUser,
	});
};
