import { getIronSession, IronSession } from 'iron-session';
import { cookies } from 'next/headers';

export interface SessionData {
  name?: string;
  employeeId?: string;
  rowIndex?: number;
  department?: string;
  team?: string;
  title?: string;
  attendanceStatus?: string;
  passportStatus?: string;
}

export async function getSession(): Promise<IronSession<SessionData>> {
  const cookieStore = await cookies();
  return getIronSession<SessionData>(cookieStore, {
    password: process.env.SESSION_PASSWORD || 'fallback-password-at-least-32-characters-long!!',
    cookieName: 'ok-training-session',
    cookieOptions: {
      secure: process.env.NODE_ENV === 'production',
    },
  });
}
