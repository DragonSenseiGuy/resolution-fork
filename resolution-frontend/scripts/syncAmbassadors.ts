/**
 * Sync ambassadors from external source (Airtable/CSV) into the database.
 *
 * Usage:
 *   npx tsx scripts/syncAmbassadors.ts --season s1
 *
 * This script is idempotent - safe to run multiple times.
 */

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

interface AmbassadorInput {
	email: string;
	acceptedAt?: Date;
}

function computeStartingWeek(startsAt: Date, totalWeeks: number, refDate: Date): number {
	const msPerWeek = 7 * 24 * 60 * 60 * 1000;
	const diffMs = refDate.getTime() - startsAt.getTime();
	const rawWeek = Math.floor(diffMs / msPerWeek) + 1;
	return Math.min(totalWeeks, Math.max(1, rawWeek));
}

async function syncAmbassadors(seasonSlug: string, ambassadors: AmbassadorInput[]) {
	const season = await prisma.programSeason.findUnique({
		where: { slug: seasonSlug }
	});

	if (!season) {
		console.error(`Season "${seasonSlug}" not found`);
		process.exit(1);
	}

	console.log(`Syncing ${ambassadors.length} ambassadors to ${season.name}...`);

	let created = 0;
	let updated = 0;
	let skipped = 0;

	for (const amb of ambassadors) {
		const user = await prisma.user.findUnique({
			where: { email: amb.email }
		});

		if (!user) {
			console.warn(`  ⚠ User not found: ${amb.email} (skipping)`);
			skipped++;
			continue;
		}

		const acceptedAt = amb.acceptedAt ?? new Date();
		const startingWeek = computeStartingWeek(season.startsAt, season.totalWeeks, acceptedAt);

		const existing = await prisma.programEnrollment.findUnique({
			where: {
				userId_seasonId_role: {
					userId: user.id,
					seasonId: season.id,
					role: 'AMBASSADOR'
				}
			}
		});

		if (existing) {
			await prisma.programEnrollment.update({
				where: { id: existing.id },
				data: { status: 'ACTIVE' }
			});
			console.log(`  ✓ Updated: ${amb.email}`);
			updated++;
		} else {
			await prisma.programEnrollment.create({
				data: {
					userId: user.id,
					seasonId: season.id,
					role: 'AMBASSADOR',
					startingWeek,
					status: 'ACTIVE'
				}
			});
			console.log(`  ✓ Created: ${amb.email} (week ${startingWeek})`);
			created++;
		}
	}

	console.log(`\nDone! Created: ${created}, Updated: ${updated}, Skipped: ${skipped}`);
}

// ============================================================================
// MAIN - Edit this section to pull from your data source
// ============================================================================

async function main() {
	const args = process.argv.slice(2);
	const seasonIndex = args.indexOf('--season');

	if (seasonIndex === -1 || !args[seasonIndex + 1]) {
		console.error('Usage: npx tsx scripts/syncAmbassadors.ts --season <slug>');
		process.exit(1);
	}

	const seasonSlug = args[seasonIndex + 1];

	// TODO: Replace this with your actual data source
	// Options:
	//   1. Fetch from Airtable API
	//   2. Read from CSV file
	//   3. Hardcode for testing
	const ambassadors: AmbassadorInput[] = [
		// Example:
		// { email: 'ambassador@example.com', acceptedAt: new Date('2025-01-15') },
	];

	if (ambassadors.length === 0) {
		console.log('No ambassadors to sync. Edit the script to add your data source.');
		process.exit(0);
	}

	await syncAmbassadors(seasonSlug, ambassadors);
}

main()
	.catch((e) => {
		console.error(e);
		process.exit(1);
	})
	.finally(() => {
		prisma.$disconnect();
	});
