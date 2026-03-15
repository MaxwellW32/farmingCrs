import { auth } from "@/auth/auth";
import ViewProfile from "@/components/users/ViewProfile";
import { getSpecificUser } from "@/serverFunctions/handleUsers";

export default async function Page() {
  //get user
  //get branches for user
  //show list

  const session = await auth()
  if (session === null) return (<p>not signed in</p>)

  const seenUser = await getSpecificUser(session.user.id)
  if (seenUser === undefined) return (<p>not seeing user</p>)

  return (
    <div>
      <ViewProfile seenUser={seenUser} />
    </div>
  );
}