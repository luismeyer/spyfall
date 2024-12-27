import { PartyKitHost } from "@/app/env";
import { requestGameApi } from "@/server/lib/api";
import type { SyncGameMessage } from "@/server/lib/messages";
import { getUser, issueToken } from "@/server/lib/user";
import { redirect } from "next/navigation";
import { GameProvider } from "./provider";
import { Meta } from "./meta";
import { Room } from "./room";

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

  const token = await issueToken(user);

  return (
    <GameProvider defaultGame={room.game} host={PartyKitHost} token={token}>
      <main className="p-16 flex flex-col gap-8">
        <h1>
          hallo {user.name}, hier ist das spiel mit nummer {room.game.id}
        </h1>

        <Meta isHost={isHost} />

        <Room />
      </main>
    </GameProvider>
  );
}
