import { redirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';
import { prisma } from '$lib/server/prisma';

export const load: LayoutServerLoad = async ({ locals }) => {
	if (!locals.user || !locals.session) {
		throw redirect(302, '/api/auth/login');
	}

	const activeSeason = await prisma.programSeason.findFirst({
		where: { isActive: true }
	});

	const enrollment = activeSeason
		? await prisma.programEnrollment.findFirst({
				where: {
					userId: locals.user.id,
					seasonId: activeSeason.id,
					status: 'ACTIVE'
				}
			})
		: null;

	return {
		user: locals.user,
		season: activeSeason,
		enrollment
	};
};
