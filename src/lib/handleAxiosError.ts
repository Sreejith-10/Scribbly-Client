import axios, {AxiosError} from "axios";

export function handleAxiosError(error: unknown): never {
	if (axios.isAxiosError(error)) {
		const axiosError = error as AxiosError<{message?: string}>;

		if (!axiosError.response) {
			throw new Error("Network error: Please check your internet connection.");
		}

		const message =
			axiosError.response?.data?.message || "Axios error occurred";

		throw new Error(message);
	}

	if (error instanceof Error) {
		throw error;
	}

	throw new Error("Unknown error occurred");
}
