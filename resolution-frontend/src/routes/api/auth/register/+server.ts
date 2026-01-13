import { json, type RequestHandler } from '@sveltejs/kit';
import { ZodError } from 'zod';
import { registerSchema } from '$lib/server/validation';
import { authService } from '$lib/server/auth/service';

export const POST: RequestHandler = async ({ request, cookies }) => {
  try {
    const body = await request.json();
    const { email, password } = registerSchema.parse(body);

    const result = await authService.register({ email, password });

    if (!result.success) {
      return json({ error: result.error }, { status: 400 });
    }

    // Set the token as a cookie
    if (result.token) {
      cookies.set('token', result.token, {
        path: '/',
        httpOnly: true,
        sameSite: 'strict',
        secure: process.env.NODE_ENV === 'production',
        maxAge: 60 * 60 * 24 * 7 // 7 days
      });
    }

    return json({
      success: true,
      userId: result.userId
    });
  } catch (err) {
    if (err instanceof ZodError) {
      const firstError = err.issues[0]?.message ?? 'Validation failed';
      return json({ error: firstError }, { status: 400 });
    }

    if (err instanceof SyntaxError) {
      return json({ error: 'Invalid request body' }, { status: 400 });
    }

    console.error('Registration error:', err);
    return json({ error: 'Failed to register. Please try again.' }, { status: 500 });
  }
};