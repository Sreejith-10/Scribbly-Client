export interface ICollaborationRequest {
  boardId: string;
  userId: string;
  status: 'pending' | 'accepted' | 'rejected';
  requestedAt: string;
  expiresAt: string;
  requestCount: number;
  updatedAt: string;
}
