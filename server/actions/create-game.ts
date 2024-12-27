"use server";

import { redirect } from "next/navigation";
import { nanoid } from "nanoid";
import { getUser, setUser } from "../lib/user";
import { requestGameApi } from "../lib/api";

async function validateUser(formdata: FormData) {
  const user = await getUser();
  if (user) {
    return user;
  }

  const name = formdata.get("name");
  if (name) {
    return setUser(name.toString());
  }
}

export async function createOrJoinGame(formdata: FormData) {
  const user = await validateUser(formdata);
  if (!user) {
    throw new Error("Invalid user");
  }

  let gameId = formdata.get("gameId")?.toString();
  if (gameId) {
    return redirect(`/game/${gameId}`);
  }

  gameId = nanoid();

  await requestGameApi(gameId, {
    method: "POST",
    user,
  });

  redirect(`/game/${gameId}`);
}
