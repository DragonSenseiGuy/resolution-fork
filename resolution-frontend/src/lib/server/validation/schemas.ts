import { z } from 'zod';

export const createShipSchema = z.object({
	seasonId: z.string().min(1, 'Season ID is required'),
	weekNumber: z.number().int().min(1).max(52),
	goalText: z
		.string()
		.min(3, 'Goal must be at least 3 characters')
		.max(500, 'Goal must be less than 500 characters'),
	workshopId: z.string().optional()
});

export const markShippedSchema = z.object({
	shipId: z.string().min(1, 'Ship ID is required'),
	proofUrl: z
		.string()
		.url('Proof URL must be a valid URL')
		.max(2000, 'URL is too long'),
	notes: z.string().max(1000, 'Notes must be less than 1000 characters').optional()
});

export const updateShipStatusSchema = z.object({
	shipId: z.string().min(1, 'Ship ID is required'),
	status: z.enum(['PLANNED', 'IN_PROGRESS', 'SHIPPED', 'MISSED'])
});

export const enrollSeasonSchema = z.object({
	seasonSlug: z
		.string()
		.min(1, 'Season slug is required')
		.max(50)
		.regex(/^[a-z0-9-]+$/, 'Invalid season slug format')
});

export const workshopIdSchema = z.object({
	workshopId: z.string().min(1, 'Workshop ID is required')
});

export type CreateShipInput = z.infer<typeof createShipSchema>;
export type MarkShippedInput = z.infer<typeof markShippedSchema>;
export type UpdateShipStatusInput = z.infer<typeof updateShipStatusSchema>;
export type EnrollSeasonInput = z.infer<typeof enrollSeasonSchema>;
