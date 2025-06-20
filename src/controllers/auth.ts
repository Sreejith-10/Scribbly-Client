import {AxiosInstance, handleAxiosError} from "@/lib";
import {signupSchema} from "@/schema";
import * as z from "zod";

const loginUser = async <T>(email: string, password: string): Promise<T> => {
	try {
		const response = await AxiosInstance.post("/auth/login", {email, password});
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
