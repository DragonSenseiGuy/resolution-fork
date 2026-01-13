import { json, type RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = async ({ locals }) => {
  // If user is not authenticated, return 401
  if (!locals.user) {
    return json({ error: 'Unauthorized' }, { status: 401 });
  }

  // Return the user data
  return json({
    id: locals.user.id,
    email: locals.user.email
  });
};