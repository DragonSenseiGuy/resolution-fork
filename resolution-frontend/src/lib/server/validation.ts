import { z } from 'zod';

export const submitResolutionSchema = z.object({
	email: z
		.string()
		.min(1, 'Email is required')
		.max(254, 'Email is too long')
		.email('Invalid email format')
		.transform((val) => val.trim().toLowerCase())
});

export type SubmitResolutionInput = z.infer<typeof submitResolutionSchema>;
