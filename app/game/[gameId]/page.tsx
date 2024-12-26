import { PARTYKIT_URL } from "@/app/env";
import { closeGame } from "@/server/actions/close-game";
import { GAME_PARTY_ID } from "@/server/game";
import { getUser } from "@/server/lib/user";
import { redirect } from "next/navigation";

type GameProps = {
  params: Promise<{
    gameId: string;
  }>;
};

export default async function Game({ params }: GameProps) {
  const user = await getUser();

  if (!user) {
    redirect("/");
  }

  const { gameId } = await params;

  const url = `${PARTYKIT_URL}/parties/${GAME_PARTY_ID}/${gameId}`;
  const res = await fetch(url);
  const room = res.status === 404 ? undefined : await res.json();

  console.log(room);

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <h1>
          hier ist das spiel {user.name} mit nummer {gameId}
        </h1>

        <form action={closeGame}>
          <input type="hidden" name="gameId" defaultValue={gameId} />
          <button type="submit">Close Game</button>
        </form>
      </main>
    </div>
  );
}
