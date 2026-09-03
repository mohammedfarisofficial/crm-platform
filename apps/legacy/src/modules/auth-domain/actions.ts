'use server';

import { cookies } from 'next/headers';
import { URLS } from '@crm/utils/constants/urls';

export async function setTokenCookie(token: string) {
  const cookieStore = await cookies();
  cookieStore.set('accessToken', token, {
    domain: URLS.TOKEN_DOMAIN || undefined,
    path: '/',
    maxAge: 14 * 60, // 14 minutes — slightly under the 15-min JWT lifetime
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
  });
}
