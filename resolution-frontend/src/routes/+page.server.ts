import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals }) => {
  // If user is already logged in, redirect to app
  if (locals.user && locals.session) {
    throw redirect(302, '/app');
  }
};
