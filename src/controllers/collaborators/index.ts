import {AxiosInstance, handleAxiosError} from "@/lib";
import {ResponseDataType} from "@/types/api";

const getCollaboratorsByBoadId = async <T>(
	boardId: string
): Promise<ResponseDataType & {collaborators: T}> => {
	try {
		const response = await AxiosInstance.get(`/collaborators/${boardId}`);
		return response.data;
	} catch (error) {
		handleAxiosError(error);
	}
};

const getCollborator = async <T>(
	boardId: string,
	userId: string
): Promise<ResponseDataType & {collaborator: T}> => {
	try {
		const response = await AxiosInstance.get(
			`/collaborators/${boardId}/${userId}`
		);
		return response.data;
	} catch (error) {
		handleAxiosError(error);
	}
};

const removeCollaborator = async <T>(
	boardId: string,
	userId: string
): Promise<ResponseDataType & {collaborator: T}> => {
	try {
		const response = await AxiosInstance.delete(
			`/collaborators/${boardId}/${userId}`
		);
		return response.data;
	} catch (error) {
		handleAxiosError(error);
	}
};

export {getCollaboratorsByBoadId, getCollborator, removeCollaborator};
