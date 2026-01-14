import { prisma } from '../prisma';
import type { ProgramEnrollment, ProgramRole } from '@prisma/client';

function computeStartingWeek(
	startsAt: Date,
	totalWeeks: number,
	refDate: Date = new Date()
): number {
	const msPerWeek = 7 * 24 * 60 * 60 * 1000;
	const diffMs = refDate.getTime() - startsAt.getTime();
	const rawWeek = Math.floor(diffMs / msPerWeek) + 1;
	return Math.min(totalWeeks, Math.max(1, rawWeek));
}

function getCurrentWeek(startsAt: Date, totalWeeks: number): number {
	return computeStartingWeek(startsAt, totalWeeks, new Date());
}

export const EnrollmentService = {
	/**
	 * Self-enroll a user as a PARTICIPANT in a season.
	 * Computes startingWeek based on when they join.
	 */
	async enrollParticipant(userId: string, seasonSlug: string): Promise<ProgramEnrollment> {
		const season = await prisma.programSeason.findUniqueOrThrow({
			where: { slug: seasonSlug }
		});

		const startingWeek = computeStartingWeek(season.startsAt, season.totalWeeks);

		return prisma.programEnrollment.upsert({
			where: {
				userId_seasonId_role: {
					userId,
					seasonId: season.id,
					role: 'PARTICIPANT'
				}
			},
			update: { status: 'ACTIVE' },
			create: {
				userId,
				seasonId: season.id,
				role: 'PARTICIPANT',
				startingWeek
			}
		});
	},

	/**
	 * Add or reactivate an AMBASSADOR for a season.
	 * Called by admin script after application is accepted.
	 */
	async upsertAmbassador(
		email: string,
		seasonSlug: string,
		acceptedAt: Date = new Date()
	): Promise<ProgramEnrollment> {
		const [user, season] = await Promise.all([
			prisma.user.findUniqueOrThrow({ where: { email } }),
			prisma.programSeason.findUniqueOrThrow({ where: { slug: seasonSlug } })
		]);

		const startingWeek = computeStartingWeek(season.startsAt, season.totalWeeks, acceptedAt);

		return prisma.programEnrollment.upsert({
			where: {
				userId_seasonId_role: {
					userId: user.id,
					seasonId: season.id,
					role: 'AMBASSADOR'
				}
			},
			update: { status: 'ACTIVE' },
			create: {
				userId: user.id,
				seasonId: season.id,
				role: 'AMBASSADOR',
				startingWeek
			}
		});
	},

	/**
	 * Get all enrollments for a user in a specific season.
	 */
	async getUserSeasonEnrollments(userId: string, seasonSlug: string): Promise<ProgramEnrollment[]> {
		const season = await prisma.programSeason.findUniqueOrThrow({
			where: { slug: seasonSlug }
		});

		return prisma.programEnrollment.findMany({
			where: { userId, seasonId: season.id }
		});
	},

	/**
	 * Check if user has a specific role in a season.
	 * Single indexed lookup - very fast.
	 */
	async hasRole(userId: string, seasonId: string, role: ProgramRole): Promise<boolean> {
		const enrollment = await prisma.programEnrollment.findUnique({
			where: {
				userId_seasonId_role: { userId, seasonId, role }
			},
			select: { status: true }
		});

		return !!enrollment && enrollment.status === 'ACTIVE';
	},

	/**
	 * Convenience: check if user is an active ambassador.
	 */
	async isAmbassador(userId: string, seasonId: string): Promise<boolean> {
		return this.hasRole(userId, seasonId, 'AMBASSADOR');
	},

	/**
	 * Convenience: check if user is an active participant.
	 */
	async isParticipant(userId: string, seasonId: string): Promise<boolean> {
		return this.hasRole(userId, seasonId, 'PARTICIPANT');
	},

	/**
	 * Get current week number for a season.
	 */
	async getCurrentSeasonWeek(seasonSlug: string): Promise<number> {
		const season = await prisma.programSeason.findUniqueOrThrow({
			where: { slug: seasonSlug }
		});

		return getCurrentWeek(season.startsAt, season.totalWeeks);
	},

	/**
	 * Drop a user from a season (set status to DROPPED).
	 */
	async dropEnrollment(
		userId: string,
		seasonId: string,
		role: ProgramRole
	): Promise<ProgramEnrollment | null> {
		return prisma.programEnrollment.update({
			where: {
				userId_seasonId_role: { userId, seasonId, role }
			},
			data: { status: 'DROPPED' }
		});
	}
};
