"use server";

import { PARTYKIT_URL } from "@/app/env";
import { redirect } from "next/navigation";
import { getUser } from "../lib/user";

export async function closeGame(formdata: FormData) {
  const gameId = formdata.get("gameId");
  if (!gameId) {
    throw new Error("Missing gameId");
  }

  const user = await getUser();
  if (!user) {
    throw new Error("Missing user");
  }

  await fetch(`${PARTYKIT_URL}/parties/chatroom/${gameId}`, {
    method: "DELETE",
  });

  redirect("/");
}
