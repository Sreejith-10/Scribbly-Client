import * as z from 'zod';

export const createBoardSchema = z.object({
	title: z.string().min(1, { message: 'title should not be empty' }),
	description: z.string().optional(),
	accessMode: z.enum(['private', 'public']),
});
