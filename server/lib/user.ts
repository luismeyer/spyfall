import { nanoid } from "nanoid";
import { cookies } from "next/headers";
import * as jose from "jose";

export const CookieName = "spyfall-name";

const { JWT_SECRET } = process.env;
if (!JWT_SECRET) {
  throw new Error("Missing JWT_SECRET");
}
const secret = new TextEncoder().encode(JWT_SECRET);

export type User = {
  id: string;
  name: string;
};

export async function getUser() {
  const cookieStore = await cookies();
  const cookie = cookieStore.get(CookieName);
  if (!cookie || !cookie.value) {
    return;
  }

  return verifyToken(cookie.value);
}

export async function setUser(name: string) {
  const cookieStore = await cookies();

  const user: User = {
    id: nanoid(),
    name,
  };

  const token = await issueToken(user);

  cookieStore.set(CookieName, token);

  return user;
}

export async function clearUser() {
  const cookieStore = await cookies();
  cookieStore.delete(CookieName);
}

export async function issueToken(user: User) {
  return new jose.SignJWT({ name: user.name })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setIssuer("spyfall")
    .setSubject(user.id)
    .sign(secret);
}

export async function verifyToken(token: string) {
  const result = await jose.jwtVerify(token, secret);

  if (!result.payload.name || !result.payload.sub) {
    throw new Error("Invalid token");
  }

  const user: User = {
    id: result.payload.sub,
    name: result.payload.name as string,
  };

  return user;
}
