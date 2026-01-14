import { json, error } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { requireAuth } from '$lib/server/auth/guard';
import { WeeklyShipService } from '$lib/server/services';
import { validateJson, createShipSchema } from '$lib/server/validation';

export const POST: RequestHandler = async (event) => {
	const { user } = requireAuth(event);

	const data = await validateJson(createShipSchema, event.request);

	const ship = await WeeklyShipService.createShip({
		userId: user.id,
		seasonId: data.seasonId,
		weekNumber: data.weekNumber,
		goalText: data.goalText,
		workshopId: data.workshopId
	});

	return json(ship, { status: 201 });
};
