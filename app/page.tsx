import { createGame } from "@/server/actions/create-game";
import { logout } from "@/server/actions/logout";
import { getUser } from "@/server/lib/user";

export default async function Home() {
  const user = await getUser();

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        {user ? (
          <form action={logout} className="flex gap-4">
            <h1>Hallo {user.name}</h1>
            <button type="submit">ausloggen?</button>
          </form>
        ) : undefined}

        <form action={createGame} className="grid">
          {!user && (
            <input
              type="text"
              name="name"
              placeholder="Name"
              className="text-black p-2"
            />
          )}

          <button type="submit">Create Game</button>
        </form>
      </main>
    </div>
  );
}
