import type { PageServerLoad } from './$types';
import { prisma } from '$lib/server/prisma';

export const load: PageServerLoad = async ({ parent }) => {
	const { user, season, enrollment } = await parent();

	if (!season || !enrollment) {
		return {
			dashboard: null
		};
	}

	const [workshops, ships] = await Promise.all([
		prisma.workshop.findMany({
			where: { seasonId: season.id, published: true },
			include: { author: { select: { firstName: true, lastName: true } } },
			orderBy: { createdAt: 'desc' }
		}),
		prisma.weeklyShip.findMany({
			where: { userId: user.id, seasonId: season.id },
			include: { workshop: { select: { id: true, title: true } } },
			orderBy: [{ weekNumber: 'asc' }, { createdAt: 'asc' }]
		})
	]);

	const currentWeek = computeCurrentWeek(season.startsAt, season.totalWeeks);

	const shipsByWeek: Record<number, typeof ships> = {};
	for (let w = 1; w <= season.totalWeeks; w++) {
		shipsByWeek[w] = [];
	}
	for (const ship of ships) {
		shipsByWeek[ship.weekNumber]?.push(ship);
	}

	const shippedCount = ships.filter((s) => s.status === 'SHIPPED').length;
	const shippedThisWeek = ships.filter(
		(s) => s.weekNumber === currentWeek && s.status === 'SHIPPED'
	).length;

	return {
		dashboard: {
			currentWeek,
			totalWeeks: season.totalWeeks,
			workshops,
			shipsThisWeek: shipsByWeek[currentWeek] ?? [],
			shipsByWeek,
			stats: {
				totalShipped: shippedCount,
				shippedThisWeek
			}
		}
	};
};

function computeCurrentWeek(startsAt: Date, totalWeeks: number): number {
	const msPerWeek = 7 * 24 * 60 * 60 * 1000;
	const diffMs = Date.now() - startsAt.getTime();
	const rawWeek = Math.floor(diffMs / msPerWeek) + 1;
	return Math.min(totalWeeks, Math.max(1, rawWeek));
}
