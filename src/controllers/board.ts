import {AxiosInstance, handleAxiosError} from "@/lib";
import {AccessMode, Shape} from "@/types";

const getBoard = async () => {
	try {
		const response = await AxiosInstance.get("/boards");
		return response.data;
	} catch (error) {
		handleAxiosError(error);
	}
};

const createBoard = async <T>(
	title: string,
	description: string = "",
	accessMode: AccessMode
): Promise<T> => {
	try {
		const response = await AxiosInstance.post("/boards/create", {
			title,
			description,
			accessMode,
		});
		return response.data;
	} catch (error) {
		handleAxiosError(error);
	}
};

const getBoardMetadata = async <T>(): Promise<T> => {
	try {
		const response = await AxiosInstance.get("/boards/metadata");
		return response.data;
	} catch (error) {
		handleAxiosError(error);
	}
};

const getBoardState = async <T>(boardId: string): Promise<T> => {
	try {
		const response = await AxiosInstance.get(`/boards/${boardId}/state`);
		return response.data;
	} catch (error) {
		handleAxiosError(error);
	}
};

const addShape = async (boardId: string, shape: Shape) => {
	try {
		const resposnse = await AxiosInstance.post(`/boards/${boardId}/shapes`, {
			shapeId: shape.id,
			data: shape,
		});
		return resposnse.data;
	} catch (error) {
		handleAxiosError(error);
	}
};

const updateShape = async (boardId: string, shape: Shape) => {
	try {
		const resposnse = await AxiosInstance.patch(
			`/boards/${boardId}/shapes/${shape.id}`,
			{
				data: shape,
			}
		);
		return resposnse.data;
	} catch (error) {
		handleAxiosError(error);
	}
};

const deleteShape = async (boardId: string, shapeId: string) => {
	try {
		const response = await AxiosInstance.delete(
			`/boards/${boardId}/shapes:/${shapeId}`
		);
		return response.data;
	} catch (error) {
		handleAxiosError(error);
	}
};

export {
	getBoard,
	createBoard,
	getBoardMetadata,
	getBoardState,
	addShape,
	updateShape,
	deleteShape,
};
