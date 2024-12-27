import { PartyKitUrl } from "@/app/env";
import { issueToken, type User } from "./user";

type Options = {
  user: User;
  method: "POST" | "GET" | "DELETE";
};

export async function requestGameApi(gameId: string, os: Options) {
  const url = new URL(`${PartyKitUrl}/parties/main/${gameId}`);

  url.searchParams.set("token", await issueToken(os.user));

  const res = await fetch(url.toString(), {
    method: os.method,
  });

  return res;
}
