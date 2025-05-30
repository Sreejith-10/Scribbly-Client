import AxiosInstance from "@/lib/axios";
import {signupSchema} from "@/schema";
import axios, {AxiosError} from "axios";
import * as z from "zod";

const loginUser = async <T>(email: string, password: string): Promise<T> => {
	try {
		const response = await AxiosInstance.post("/auth/login", {email, password});
		return response.data;
	} catch (error) {
		if (axios.isAxiosError(error)) {
			const axiosError = error as AxiosError<{message: string}>;
			throw new Error(
				axiosError.response?.data.message || "Unknown axios error"
			);
		} else {
			throw error;
		}
	}
};

const regiserUser = async <T>(
	values: z.infer<typeof signupSchema>
): Promise<T> => {
	try {
		const response = await AxiosInstance.post("/auth/register", values);
		return response.data;
	} catch (error) {
		if (axios.isAxiosError(error)) {
			const axiosError = error as AxiosError<{message: string}>;
			throw new Error(
				axiosError.response?.data.message || "Unknown axios error"
			);
		} else {
			throw error;
		}
	}
};

export {loginUser, regiserUser};
