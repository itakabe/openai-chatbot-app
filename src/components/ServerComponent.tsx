import { authOptions } from '@/pages/api/auth/[...nextauth]'
import { getServerSession } from "next-auth/next"

const ServerComponent = async () => {
  const session = await getServerSession(authOptions);
  const user = session?.user;

  return <p>{JSON.stringify(user)}</p>;
};
