import { json, type RequestHandler } from '@sveltejs/kit';

export const POST: RequestHandler = async ({ cookies }) => {
  // Clear the token cookie
  cookies.delete('token', { path: '/' });

  return json({ success: true });
};