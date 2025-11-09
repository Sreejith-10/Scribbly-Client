export type CollaborationRequestStatusType =
  | 'pending'
  | 'accepted'
  | 'rejected';
export interface ICollaborationRequest {
  boardId: string;
  userId: string;
  status: CollaborationRequestStatusType;
  requestedAt: string;
  expiresAt: string;
  requestCount: number;
  updatedAt: string;
}
