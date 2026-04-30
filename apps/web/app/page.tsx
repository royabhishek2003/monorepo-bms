import { client } from "@repo/db/client"

export const dynamic = 'force-dynamic';

export default async function Home() {

  const user = await client.user.findFirst();
  return (
    <>
      <h1>Home</h1>
      {user && <div>{user.username}</div>}
      {user && <div>{user.password}</div>}
    </>
  );
}

