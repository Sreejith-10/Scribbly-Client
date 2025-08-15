export interface ICollaborator {
	boardId: string;
	userId: string;
	role: 'view' | 'edit';
	status: 'active' | 'inactive';
	lastSeen: string;
}
