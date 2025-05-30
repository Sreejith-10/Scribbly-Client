import AxiosInstance from "@/lib/axios";
import axios, {AxiosError} from "axios";

const getBoard = async () => {
	try {
		const response = await AxiosInstance.get("/boards");
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

export {getBoard};
