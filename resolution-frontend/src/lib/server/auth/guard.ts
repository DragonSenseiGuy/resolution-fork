import type { RequestEvent } from '@sveltejs/kit';
import { authService } from './service';

export interface AuthGuardOptions {
  redirectTo?: string;
  allowUnauthorized?: boolean;
}

/**
 * Auth guard for protecting routes
 * @param event The request event
 * @param options Options for the auth guard
 * @returns The user ID if authenticated, null otherwise
 */
export async function authGuard(
  event: RequestEvent,
  options: AuthGuardOptions = {}
): Promise<number | null> {
  const { request, cookies } = event;
  
  // Get the token from the Authorization header or cookies
  const authHeader = request.headers.get('Authorization');
  const token = authHeader ? authHeader.replace('Bearer ', '') : cookies.get('token');
  
  if (!token) {
    return null;
  }
  
  // Validate the token
  const decoded = authService.validateToken(token);
  
  if (!decoded) {
    return null;
  }
  
  return decoded.userId;
}

/**
 * Middleware for protecting API routes
 * @param event The request event
 * @returns An object with the user ID if authenticated, or a response if not
 */
export async function apiAuthGuard(event: RequestEvent) {
  const userId = await authGuard(event);
  
  if (!userId) {
    return {
      status: 401,
      body: { error: 'Unauthorized' }
    };
  }
  
  return { userId };
}