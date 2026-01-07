import { env } from '$env/dynamic/private';
import Airtable from 'airtable';
import { json, type RequestHandler } from '@sveltejs/kit';
import { submitResolutionSchema } from '$lib/server/validation';
import { ZodError } from 'zod';

export const POST: RequestHandler = async ({ request, getClientAddress }) => {
	try {
		const body = await request.json();
		const { email } = submitResolutionSchema.parse(body);
		const ip = getClientAddress();

		if (!env.AIRTABLE_API_TOKEN || !env.AIRTABLE_BASE_ID || !env.AIRTABLE_TABLE_ID) {
			console.error('Missing Airtable configuration');
			return json({ error: 'Server configuration error' }, { status: 500 });
		}

		const base = new Airtable({ apiKey: env.AIRTABLE_API_TOKEN }).base(env.AIRTABLE_BASE_ID);

		await base(env.AIRTABLE_TABLE_ID).create([
			{
				fields: {
					Email: email,
					'IP-Addres': ip
				}
			}
		]);

		return json({ success: true });
	} catch (err) {
		if (err instanceof ZodError) {
			const firstError = err.issues[0]?.message ?? 'Validation failed';
			return json({ error: firstError }, { status: 400 });
		}

		if (err instanceof SyntaxError) {
			return json({ error: 'Invalid request body' }, { status: 400 });
		}

		console.error('Airtable submission error:', err);
		return json({ error: 'Failed to submit application. Please try again.' }, { status: 500 });
	}
};
