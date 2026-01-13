import { verifyToken } from '$lib/server/auth/utils';
import { authService } from '$lib/server/auth/service';
import type { Handle } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
  // Get the token from the cookie
  const token = event.cookies.get('token');

  if (token) {
    // Verify the token
    const decoded = verifyToken(token);

    if (decoded && decoded.userId) {
      // Get the user from the database
      const user = await authService.getUserById(decoded.userId);

      if (user) {
        // Attach the user to the event.locals object
        event.locals.user = {
          id: user.id,
          email: user.email
        };
      }
    }
  }

  // Continue with the request
  return resolve(event);
};