import { redirect } from '@sveltejs/kit';
import { hackClubAuth } from '$lib/server/auth';
import { env } from '$env/dynamic/private';

export const GET = () => {
	const authorizationUri = hackClubAuth.authorizeURL({
		redirect_uri: `${env.BASE_URL}/api/auth/callback`,
		scope: 'email'
	});

	throw redirect(302, authorizationUri);
};
