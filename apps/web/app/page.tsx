
import { client} from "@repo/db/client";

export default function Home() {
  const user = client.user.FindFirst();
  return (
    <>
    { user?.username}
    {user?.password}
    </>
  );
}
