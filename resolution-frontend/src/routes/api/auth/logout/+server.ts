import { lucia } from '$lib/server/auth';
import { redirect } from '@sveltejs/kit';

export const POST = async ({ locals, cookies }) => {
  if (!locals.session) {
    throw redirect(302, '/');
  }

  await lucia.invalidateSession(locals.session.id);
  const sessionCookie = lucia.createBlankSessionCookie();

  cookies.set(sessionCookie.name, sessionCookie.value, {
    path: '.',
    ...sessionCookie.attributes
  });

  throw redirect(302, '/');
};
