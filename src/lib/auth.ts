import { NextRequest } from 'next/server';
import { jwtVerify } from 'jose';
import connectDB from '@/lib/db/mongodb';
import User, { IUser } from '@/lib/db/models/User';

const JWT_SECRET = process.env.JWT_SECRET;

export interface AuthPayload {
  userId: string;
  email: string;
}

export async function getAuthUser(request: NextRequest): Promise<IUser | null> {
  if (!JWT_SECRET) {
    return null;
  }

  const token = request.cookies.get('user_token')?.value;
  if (!token) {
    return null;
  }

  try {
    const secret = new TextEncoder().encode(JWT_SECRET);
    const { payload } = await jwtVerify(token, secret);

    if (!payload.userId) {
      return null;
    }

    await connectDB();
    const user = await User.findById(payload.userId);
    return user;
  } catch {
    return null;
  }
}
