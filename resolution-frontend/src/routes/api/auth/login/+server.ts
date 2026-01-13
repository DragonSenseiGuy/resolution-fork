import { redirect } from '@sveltejs/kit';
import { hackClubAuth } from '$lib/server/auth';
import { env } from '$env/dynamic/private';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ locals }) => {
  // If user already has a valid session, skip OAuth and go straight to app
  if (locals.user && locals.session) {
    throw redirect(302, '/app');
  }

  const authorizationUri = hackClubAuth.authorizeURL({
    redirect_uri: `${env.BASE_URL}/api/auth/callback`,
    scope: 'openid profile email name slack_id verification_status'
  });

  throw redirect(302, authorizationUri);
};
