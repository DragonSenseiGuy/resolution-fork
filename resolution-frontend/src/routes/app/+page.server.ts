import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ parent }) => {
	const { user, season, enrollment } = await parent();

	return {
		user,
		season,
		enrollment
	};
};
