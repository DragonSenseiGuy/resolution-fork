import type { RequestEvent } from '@sveltejs/kit';
import { error } from '@sveltejs/kit';

/**
 * Require authentication - throws 401 if not authenticated
 */
export function requireAuth(event: RequestEvent) {
  if (!event.locals.user || !event.locals.session) {
    throw error(401, 'Unauthorized');
  }
  return {
    user: event.locals.user,
    session: event.locals.session
  };
}

/**
 * Get current user if authenticated, null otherwise
 */
export function getUser(event: RequestEvent) {
  return event.locals.user;
}
