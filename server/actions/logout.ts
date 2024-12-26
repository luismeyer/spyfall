"use server";

import { revalidatePath } from "next/cache";
import { clearUser } from "../lib/user";

export async function logout() {
  await clearUser();

  revalidatePath("/");
}
