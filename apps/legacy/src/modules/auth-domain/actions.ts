'use server';

import { cookies } from 'next/headers';
import { URLS } from '@crm/utils/constants/urls';

export async function setTokenCookie(token: string) {
  const cookieStore = await cookies();
  cookieStore.set('accessToken', token, {
    domain: URLS.TOKEN_DOMAIN || undefined,
    path: '/',
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
  });
}
