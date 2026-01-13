import { redirect } from '@sveltejs/kit';
import { hackClubAuth, lucia } from '$lib/server/auth';
import { prisma } from '$lib/server/prisma';
import { env } from '$env/dynamic/private';
import { generateIdFromEntropySize } from 'lucia';

export const GET = async ({ url, cookies }) => {
  const code = url.searchParams.get('code');
  if (!code) {
    throw redirect(302, '/');
  }

  try {
    const { token } = await hackClubAuth.getToken({
      code,
      redirect_uri: `${env.BASE_URL}/api/auth/callback`
    });

    const accessToken = token.access_token as string;

    const response = await fetch('https://auth.hackclub.com/api/v1/me', {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    });
    const data = await response.json();
    const hackClubUser = data.identity;

    const userData = {
      email: hackClubUser.primary_email,
      firstName: hackClubUser.first_name || null,
      lastName: hackClubUser.last_name || null,
      slackId: hackClubUser.slack_id || null,
      verificationStatus: hackClubUser.verification_status || null,
      yswsEligible: hackClubUser.ysws_eligible || false
    };

    let user = await prisma.user.findUnique({
      where: {
        hackClubId: hackClubUser.id
      }
    });

    if (!user) {
      user = await prisma.user.create({
        data: {
          id: generateIdFromEntropySize(10),
          hackClubId: hackClubUser.id,
          ...userData
        }
      });
    } else {
      user = await prisma.user.update({
        where: { hackClubId: hackClubUser.id },
        data: userData
      });
    }

    const session = await lucia.createSession(user.id, {});
    const sessionCookie = lucia.createSessionCookie(session.id);

    cookies.set(sessionCookie.name, sessionCookie.value, {
      path: '.',
      ...sessionCookie.attributes
    });

    throw redirect(302, '/app');
  } catch (error) {
    if (error instanceof Response || (error as any)?.status === 302) {
      throw error;
    }
    console.error('Auth callback error:', error);
    throw redirect(302, '/?error=auth_failed');
  }
};
