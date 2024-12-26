"use server";

import { redirect } from "next/navigation";
import { nanoid } from "nanoid";
import { getUser, setUser } from "../lib/user";
import { PARTYKIT_URL } from "@/app/env";

async function validateUser(formdata: FormData) {
  const user = await getUser();
  if (user) {
    return true;
  }

  const name = formdata.get("name");
  if (name) {
    setUser(name.toString());
    return true;
  }

  return false;
}

export async function createGame(formdata: FormData) {
  const validUser = await validateUser(formdata);
  if (!validUser) {
    throw new Error("Invalid user");
  }

  const gameId = nanoid();

  await fetch(`${PARTYKIT_URL}/parties/chatroom/${gameId}`, {
    method: "POST",
  });

  redirect(`/game/${gameId}`);
}
