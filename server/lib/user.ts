import { nanoid } from "nanoid";
import { cookies } from "next/headers";

export const COOKIE_NAME = "spyfall-name";

export type User = {
  id: string;
  name: string;
};

export async function getUser() {
  const cookieStore = await cookies();
  const name = cookieStore.get(COOKIE_NAME);
  if (!name || !name.value) {
    return null;
  }

  return JSON.parse(name.value) as User;
}

export async function setUser(name: string) {
  const cookieStore = await cookies();

  const user: User = {
    id: nanoid(),
    name,
  };

  cookieStore.set(COOKIE_NAME, JSON.stringify(user));
}

export async function clearUser() {
  const cookieStore = await cookies();
  cookieStore.delete(COOKIE_NAME);
}
