import { AxiosInstance, handleAxiosError } from '@/lib';
import { IUser } from '@/types/user.type';

const fetchUser = async (): Promise<IUser> => {
	try {
		const response = await AxiosInstance.get('users/u');
		return response.data.user;
	} catch (error) {
		handleAxiosError(error);
	}
};

export { fetchUser };
