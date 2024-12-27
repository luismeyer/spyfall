import { PartyKitHost, PartyKitUrl } from "@/app/env";
import { closeGame } from "@/server/actions/close-game";
import type { SyncGameMessage } from "@/server/lib/messages";
import { getUser, issueToken } from "@/server/lib/user";
import { redirect } from "next/navigation";
import { Room } from "./room";
import { requestGameApi } from "@/server/lib/api";
import Link from "next/link";

type GameProps = {
  params: Promise<{
    gameId: string;
  }>;
};

export default async function GamePage({ params }: GameProps) {
  const user = await getUser();

  if (!user) {
    redirect("/");
  }

  const { gameId } = await params;

  const res = await requestGameApi(gameId, {
    method: "GET",
    user,
  });

  if (!res.ok) {
    redirect("/");
  }

  const room: SyncGameMessage = await res.json();
  const isHost = room.game.hostId === user.id;

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <h1>
          hallo {user.name}, hier ist das spiel mit nummer {room.game.id}
        </h1>

        {isHost ? (
          <form action={closeGame}>
            <input type="hidden" name="gameId" defaultValue={gameId} />
            <button type="submit">close</button>
          </form>
        ) : (
          <Link href="/">leave</Link>
        )}

        <Room
          host={PartyKitHost}
          defaultGame={room.game}
          token={await issueToken(user)}
        />
      </main>
    </div>
  );
}
