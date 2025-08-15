export const queryKeys = {
	user: {
		u: ['user'],
	},
	boards: {
		all: ['boards'],
		detail: (boardId: string) => [
			...queryKeys.boards.all,
			'board',
			boardId,
		],
		user: (userId: string) => [...queryKeys.boards.all, 'user', userId],
	},
	boardMetadatas: {
		all: ['boardMetadatas'],
		query: (q: string) => [...queryKeys.boardMetadatas.all, 'query', q],
		byBoard: (boardId: string) => [
			...queryKeys.boardMetadatas.all,
			'board',
			boardId,
		],
	},
	collaborators: {
		all: ['collaborators'],
		byBoard: (boardId: string) => [
			...queryKeys.collaborators.all,
			'board',
			boardId,
		],
		byUserBoard: (boardId: string, userId: string) => [
			...queryKeys.collaborators.all,
			'board',
			boardId,
			'user',
			userId,
		],
	},
	collaborationRequests: {
		all: ['collaborationRequests'],
		byBoard: (boardId: string) => [
			...queryKeys.collaborationRequests.all,
			'board',
			boardId,
		],
		byUserBoard: (boardId: string, userId: string) => [
			...queryKeys.collaborationRequests.all,
			'board',
			boardId,
			'user',
			userId,
		],
		byUser: (userId: string) => [
			...queryKeys.collaborationRequests.all,
			'user',
			userId,
		],
		status: (boardId: string, userId: string) => [
			...queryKeys.collaborationRequests.byUserBoard(boardId, userId),
			'status',
			boardId,
		],
	},
} as const;
