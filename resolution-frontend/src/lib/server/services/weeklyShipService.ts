import { prisma } from '../prisma';
import type { WeeklyShip, WeeklyShipStatus } from '@prisma/client';

export const WeeklyShipService = {
	/**
	 * Create a new ship for a user in a specific week.
	 * Can optionally be tied to a workshop.
	 */
	async createShip(data: {
		userId: string;
		seasonId: string;
		weekNumber: number;
		goalText: string;
		workshopId?: string;
	}): Promise<WeeklyShip> {
		return prisma.weeklyShip.create({
			data: {
				userId: data.userId,
				seasonId: data.seasonId,
				weekNumber: data.weekNumber,
				goalText: data.goalText,
				workshopId: data.workshopId,
				status: 'PLANNED'
			}
		});
	},

	/**
	 * Mark a ship as shipped with proof.
	 * Requires userId to verify ownership.
	 */
	async markShipped(
		shipId: string,
		userId: string,
		proofUrl: string,
		notes?: string
	): Promise<WeeklyShip> {
		const ship = await prisma.weeklyShip.findUnique({ where: { id: shipId } });

		if (!ship || ship.userId !== userId) {
			throw new Error('Ship not found or access denied');
		}

		return prisma.weeklyShip.update({
			where: { id: shipId },
			data: {
				status: 'SHIPPED',
				proofUrl,
				notes,
				shippedAt: new Date()
			}
		});
	},

	/**
	 * Update ship status.
	 * Requires userId to verify ownership.
	 */
	async updateStatus(
		shipId: string,
		userId: string,
		status: WeeklyShipStatus
	): Promise<WeeklyShip> {
		const ship = await prisma.weeklyShip.findUnique({ where: { id: shipId } });

		if (!ship || ship.userId !== userId) {
			throw new Error('Ship not found or access denied');
		}

		return prisma.weeklyShip.update({
			where: { id: shipId },
			data: {
				status,
				shippedAt: status === 'SHIPPED' ? new Date() : undefined
			}
		});
	},

	/**
	 * Get all ships for a user in a specific week.
	 */
	async getUserShipsForWeek(
		userId: string,
		seasonId: string,
		weekNumber: number
	): Promise<WeeklyShip[]> {
		return prisma.weeklyShip.findMany({
			where: { userId, seasonId, weekNumber },
			include: { workshop: true },
			orderBy: { createdAt: 'asc' }
		});
	},

	/**
	 * Count shipped items for a user in a specific week.
	 */
	async countShippedForWeek(
		userId: string,
		seasonId: string,
		weekNumber: number
	): Promise<number> {
		return prisma.weeklyShip.count({
			where: { userId, seasonId, weekNumber, status: 'SHIPPED' }
		});
	},

	/**
	 * Get all ships for a user across the entire season.
	 */
	async getUserSeasonShips(userId: string, seasonId: string): Promise<WeeklyShip[]> {
		return prisma.weeklyShip.findMany({
			where: { userId, seasonId },
			include: { workshop: true },
			orderBy: [{ weekNumber: 'asc' }, { createdAt: 'asc' }]
		});
	},

	/**
	 * Get ship stats for a user in a season.
	 */
	async getUserShipStats(userId: string, seasonId: string) {
		const ships = await prisma.weeklyShip.groupBy({
			by: ['status'],
			where: { userId, seasonId },
			_count: true
		});

		const stats = {
			planned: 0,
			inProgress: 0,
			shipped: 0,
			missed: 0,
			total: 0
		};

		for (const s of ships) {
			const count = s._count;
			stats.total += count;
			switch (s.status) {
				case 'PLANNED':
					stats.planned = count;
					break;
				case 'IN_PROGRESS':
					stats.inProgress = count;
					break;
				case 'SHIPPED':
					stats.shipped = count;
					break;
				case 'MISSED':
					stats.missed = count;
					break;
			}
		}

		return stats;
	},

	/**
	 * Get ships tied to a specific workshop.
	 */
	async getWorkshopShips(workshopId: string): Promise<WeeklyShip[]> {
		return prisma.weeklyShip.findMany({
			where: { workshopId },
			include: { user: true },
			orderBy: { createdAt: 'desc' }
		});
	}
};
