import { simpleOAuth2 } from 'simple-oauth2';
import { env } from '$env/dynamic/private';

export const hackClubAuth = new simpleOAuth2.AuthorizationCode({
	client: {
		id: env.HACK_CLUB_CLIENT_ID,
		secret: env.HACK_CLUB_CLIENT_SECRET
	},
	auth: {
		tokenHost: 'https://auth.hackclub.com',
		tokenPath: '/api/v1/token',
		authorizePath: '/auth'
	}
});
