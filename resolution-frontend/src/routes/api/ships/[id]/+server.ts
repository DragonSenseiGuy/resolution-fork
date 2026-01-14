import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { requireAuth } from '$lib/server/auth/guard';
import { WeeklyShipService } from '$lib/server/services';
import {
	validateJson,
	markShippedSchema,
	updateShipStatusSchema
} from '$lib/server/validation';

export const PATCH: RequestHandler = async (event) => {
	const { user } = requireAuth(event);
	const shipId = event.params.id;

	const body = await event.request.json();

	if ('proofUrl' in body) {
		const data = await validateJson(
			markShippedSchema,
			new Request('http://localhost', {
				method: 'POST',
				body: JSON.stringify({ shipId, ...body })
			})
		);

		const ship = await WeeklyShipService.markShipped(
			shipId,
			user.id,
			data.proofUrl,
			data.notes
		);

		return json(ship);
	}

	if ('status' in body) {
		const data = await validateJson(
			updateShipStatusSchema,
			new Request('http://localhost', {
				method: 'POST',
				body: JSON.stringify({ shipId, ...body })
			})
		);

		const ship = await WeeklyShipService.updateStatus(shipId, user.id, data.status);

		return json(ship);
	}

	return json({ error: 'Invalid request body' }, { status: 400 });
};
