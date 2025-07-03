import {AxiosInstance, handleAxiosError} from "@/lib";
import {loginSchema, signupSchema} from "@/schema";
import * as z from "zod";

const loginUser = async <T>(
	values: z.infer<typeof loginSchema>
): Promise<T> => {
	try {
		const response = await AxiosInstance.post("/auth/login", values);
		return response.data;
	} catch (error) {
		handleAxiosError(error);
	}
};

const registerUser = async <T>(
	values: z.infer<typeof signupSchema>
): Promise<T> => {
	try {
		const response = await AxiosInstance.post("/auth/register", values);
		return response.data;
	} catch (error) {
		handleAxiosError(error);
	}
};

export {loginUser, registerUser};
