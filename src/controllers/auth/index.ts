import { AxiosInstance, handleAxiosError } from '@/lib';
import { loginSchema, signupSchema } from '@/schema';
import * as z from 'zod';

const loginUser = async <T>(
	values: z.infer<typeof loginSchema>,
): Promise<T> => {
	try {
		const response = await AxiosInstance.post('/auth/login', values);
		return response.data;
	} catch (error) {
		handleAxiosError(error);
	}
};

const registerUser = async <T>(
	values: z.infer<typeof signupSchema>,
): Promise<T> => {
	try {
		const response = await AxiosInstance.post('/auth/register', values);
		return response.data;
	} catch (error) {
		handleAxiosError(error);
	}
};

const logoutUser = async () => {
	try {
		const response = await AxiosInstance.patch('/auth/logout');
		return response.data;
	} catch (error) {
		handleAxiosError(error);
	}
};

const fetchTokens = async () => {};

export { loginUser, registerUser, logoutUser };
