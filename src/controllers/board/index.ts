import { AxiosInstance, handleAxiosError } from '@/lib';
import { AccessMode, IBoardState, Shape } from '@/types';
import { ResponseDataType } from '@/types/api';

const getBoard = async <T>(): Promise<ResponseDataType & { boards: T }> => {
	try {
		const response = await AxiosInstance.get('/boards');
		return response.data;
	} catch (error) {
		handleAxiosError(error);
	}
};

const createBoard = async <T>(
	title: string,
	description: string = '',
	accessMode: AccessMode,
): Promise<ResponseDataType & { board: T }> => {
	try {
		const response = await AxiosInstance.post('/boards', {
			title,
			description,
			accessMode,
		});
		return response.data;
	} catch (error) {
		handleAxiosError(error);
	}
};

const getBoardMetadata = async <T>(
	query: string,
): Promise<ResponseDataType & { boardMetadatas: T }> => {
	try {
		const response = await AxiosInstance.get(
			`/board-metadata?query=${query}`,
		);
		return response.data;
	} catch (error) {
		handleAxiosError(error);
	}
};

const getBoardState = async <T>(
	boardId: string,
): Promise<ResponseDataType & T> => {
	try {
		const response = await AxiosInstance.get(`/boards/${boardId}/state`);
		return response.data;
	} catch (error) {
		handleAxiosError(error);
	}
};

const addShape = async (
	boardId: string,
	shape: Shape,
): Promise<IBoardState> => {
	try {
		const resposnse = await AxiosInstance.post(
			`/boards/${boardId}/shapes`,
			{
				shapeId: shape.id,
				data: shape,
			},
		);
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
			},
		);
		return resposnse.data;
	} catch (error) {
		handleAxiosError(error);
	}
};

const deleteShape = async (boardId: string, shapeId: string) => {
	try {
		const response = await AxiosInstance.delete(
			`/boards/${boardId}/shapes/${shapeId}`,
		);
		return response.data;
	} catch (error) {
		handleAxiosError(error);
	}
};

const createSnapShot = async (boardId: string) => {
	try {
		const response = await AxiosInstance.patch(
			`/boards/${boardId}/snapshot`,
		);
		return response.data;
	} catch (error) {
		handleAxiosError(error);
	}
};

const getBoardMetadataByBoardId = async <T>(
	boardId: string,
): Promise<
	ResponseDataType & {
		boardMetadata: T;
	}
> => {
	try {
		const response = await AxiosInstance.get(`/board-metadata/${boardId}`);
		return response.data;
	} catch (error) {
		handleAxiosError(error);
	}
};

const undoShape = async <T>(id: string): Promise<ResponseDataType & T> => {
	try {
		const response = await AxiosInstance.patch(`/boards/${id}/undo`);
		return response.data;
	} catch (error) {
		handleAxiosError(error);
	}
};

const redoShape = async <T>(id: string): Promise<ResponseDataType & T> => {
	try {
		const response = await AxiosInstance.patch(`/boards/${id}/redo`);
		return response.data;
	} catch (error) {
		handleAxiosError(error);
	}
};

const resetBoard = async <T>(id: string): Promise<ResponseDataType & T> => {
	try {
		const response = await AxiosInstance.patch(`/boards/${id}/reset`);
		return response.data;
	} catch (error) {
		handleAxiosError(error);
	}
};

const deleteBoard = async <T>(id: string): Promise<ResponseDataType & T> => {
	try {
		const response = await AxiosInstance.delete(`/boards/${id}`);
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
	createSnapShot,
	getBoardMetadataByBoardId,
	undoShape,
	redoShape,
	resetBoard,
	deleteBoard,
};
