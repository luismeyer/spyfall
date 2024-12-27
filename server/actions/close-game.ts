"use server";

import { PartyKitUrl } from "@/app/env";
import { redirect } from "next/navigation";
import { getUser } from "../lib/user";
import { requestGameApi } from "../lib/api";

export async function closeGame(formdata: FormData) {
  const gameId = formdata.get("gameId");
  if (!gameId) {
    throw new Error("Missing gameId");
  }

  const user = await getUser();
  if (!user) {
    throw new Error("Missing user");
  }

  await requestGameApi(gameId.toString(), {
    user,
    method: "DELETE",
  });
}
