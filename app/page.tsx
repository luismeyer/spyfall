import { logout } from "@/server/actions/logout";
import { getUser } from "@/server/lib/user";
import { Form } from "./form";

export default async function Home() {
  const user = await getUser();

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="grid gap-8 row-start-2 items-center sm:items-start">
        {user ? (
          <form action={logout} className="flex gap-4">
            <h1>Hallo {user.name}</h1>
            <button type="submit">ausloggen?</button>
          </form>
        ) : undefined}

        <Form user={user} />
      </main>
    </div>
  );
}
