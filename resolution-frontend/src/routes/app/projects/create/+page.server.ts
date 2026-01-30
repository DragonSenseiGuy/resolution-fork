import { fail, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import { prisma } from '$lib/server/prisma';
import { z } from 'zod';

export const load: PageServerLoad = async () => {
	return {};
};

const createProjectSchema = z.object({
	name: z.string().min(1, 'Project name is required').max(30, 'Project name must be 30 characters or less'),
	description: z.string().min(1, 'Description is required').max(300, 'Description must be 300 characters or less')
});

export const actions: Actions = {
	default: async ({ request, locals }) => {
		if (!locals.user) {
			throw redirect(302, '/api/auth/login');
		}

		const formData = await request.formData();
		const name = formData.get('name')?.toString() || '';
		const description = formData.get('description')?.toString() || '';

		const result = createProjectSchema.safeParse({ name, description });

		if (!result.success) {
			return fail(400, {
				name,
				description,
				errors: result.error.flatten().fieldErrors
			});
		}

		const project = await prisma.project.create({
			data: {
				name: result.data.name,
				description: result.data.description,
				userId: locals.user.id
			}
		});

		throw redirect(303, `/app/projects/${project.id}`);
	}
};
