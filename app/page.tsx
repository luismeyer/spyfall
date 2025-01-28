import { logout } from "@/server/actions/logout";
import { getUser } from "@/server/lib/user";
import { Form } from "./form";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default async function Home() {
  const user = await getUser();
  return (
    <main className="min-h-screen bg-gradient-to-b from-purple-400 to-blue-500 p-4">
      <h1 className="text-4xl font-bold text-center mb-8 text-white drop-shadow-lg">
        Spyfall
      </h1>

      <Card className="bg-white/90 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-2xl text-center">
            Join the Mission {user?.name}
          </CardTitle>

          {user ? (
            <form action={logout}>
              <Button className="w-full" type="submit">
                logout
              </Button>
            </form>
          ) : undefined}
        </CardHeader>

        <Form user={user} />
      </Card>
    </main>
  );
}
