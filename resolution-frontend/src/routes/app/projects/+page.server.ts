import type { PageServerLoad } from './$types';
import { prisma } from '$lib/server/prisma';

export const load: PageServerLoad = async ({ parent }) => {
	const { user, season } = await parent();

	const projects = await prisma.project.findMany({
		where: { userId: user.id },
		orderBy: { createdAt: 'desc' }
	});

	return {
		projects,
		season
	};
};
