import { NextResponse } from 'next/server';
import { randomBytes } from 'crypto';

export async function GET() {
  const csrfToken = randomBytes(32).toString('hex');

  // Save the CSRF token in a cookie
  const response = NextResponse.json({ csrfToken });
  response.cookies.set('csrfToken', csrfToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    path: '/',
  });

  return response;
}