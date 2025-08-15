import { AxiosInstance, handleAxiosError } from '@/lib';
import { ResponseDataType } from '@/types/api';

const getCollaboratorsByBoadId = async <T>(
	boardId: string,
): Promise<ResponseDataType & { collaborators: T }> => {
	try {
		const response = await AxiosInstance.get(`/collaborators/${boardId}`);
		return response.data;
	} catch (error) {
		handleAxiosError(error);
	}
};

const getCollborator = async <T>(
	boardId: string,
	userId: string,
): Promise<ResponseDataType & { collaborator: T }> => {
	try {
		const response = await AxiosInstance.get(
			`/collaborators/${boardId}/${userId}`,
		);
		return response.data;
	} catch (error) {
		handleAxiosError(error);
	}
};

const removeCollaborator = async <T>(
	boardId: string,
	userId: string,
): Promise<ResponseDataType & { collaborator: T }> => {
	try {
		const response = await AxiosInstance.delete(
			`/collaborators/${boardId}/${userId}`,
		);
		return response.data;
	} catch (error) {
		handleAxiosError(error);
	}
};

const updateCollaboratorRole = async <T>(
	boardId: string,
	userId: string,
	role: 'view' | 'edit',
): Promise<ResponseDataType & { collaborator: T }> => {
	try {
		const response = await AxiosInstance.patch(
			`collaborators/${boardId}/${userId}/role`,
			{ role },
		);
		return response.data;
	} catch (error) {
		handleAxiosError(error);
	}
};

export {
	getCollaboratorsByBoadId,
	getCollborator,
	removeCollaborator,
	updateCollaboratorRole,
};
