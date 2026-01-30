import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { prisma } from '$lib/server/prisma';

export const load: PageServerLoad = async ({ params, parent }) => {
	const { user } = await parent();

	const project = await prisma.project.findUnique({
		where: { id: params.id }
	});

	if (!project) {
		throw error(404, 'Project not found');
	}

	if (project.userId !== user.id) {
		throw error(403, 'You do not have access to this project');
	}

	return {
		project
	};
};
