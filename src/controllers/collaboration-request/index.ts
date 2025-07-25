import { AxiosInstance, handleAxiosError } from '@/lib';
import { ResponseDataType } from '@/types/api';

const getCollabReqByBoardId = async <T>(
  boardId: string,
): Promise<
  ResponseDataType & {
    requests: T;
  }
> => {
  try {
    const response = await AxiosInstance.get(
      `/collaboration-requests/${boardId}`,
    );
    return response.data;
  } catch (error) {
    handleAxiosError(error);
  }
};

const sendCollabReq = async (boardId: string): Promise<ResponseDataType> => {
  try {
    const response = await AxiosInstance.post('/collaboration-requests', {
      boardId,
    });
    return response.data;
  } catch (error) {
    handleAxiosError(error);
  }
};

const acceptRequest = async (boardId: string, userId: string) => {
  try {
    const response = await AxiosInstance.patch(
      `/collaboration-requests/${boardId}/${userId}/accept`,
    );
    return response.data;
  } catch (error) {
    handleAxiosError(error);
  }
};

const getCurrentUserCollaborationReuests = async <T>(
  userId: string,
): Promise<ResponseDataType & { requests: T }> => {
  try {
    const response = await AxiosInstance.get(
      `/collaboration-requests/${userId}/u`,
    );
    return response.data;
  } catch (error) {
    handleAxiosError(error);
  }
};

const getRequestStatus = async <T>(
  boardId: string,
  userId: string,
): Promise<ResponseDataType & { status: T }> => {
  try {
    const response = await AxiosInstance.get(
      `/collaboration-requests/${boardId}/${userId}/status`,
    );
    return response.data;
  } catch (error) {
    handleAxiosError(error);
  }
};

export {
  getCollabReqByBoardId,
  sendCollabReq,
  acceptRequest,
  getCurrentUserCollaborationReuests,
  getRequestStatus,
};
