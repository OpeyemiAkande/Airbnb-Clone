import {getServerSession} from "next-auth/next";

import {authOptions} from "@/pages/api/auth/[...nextauth]";
import prisma from "@/app/libs/prismadb";

export async function getSession() {
  return await getServerSession(authOptions);
}

export default async function getCurrentUser() {
  // console.log("here");
  try {
    const session = await getSession();
    // console.log("This is user session \n", session);

    if (!session?.user?.email) {
      // console.log("session");
      return null;
    }

    // console.log(session);

    const currentUser = await prisma.user.findUnique({
      where: {
        email: session.user.email as string,
      },
    });

    if (!currentUser) {
      // console.log("something");
      return null;
    }

    return {
      ...currentUser,
      createdAt: currentUser.createdAt.toISOString(),
      updatedAt: currentUser.updatedAt.toISOString(),
      emailVerified: currentUser.emailVerified?.toISOString(),
    };
  } catch (error: any) {
    // console.log("returning error", error);
    return null;
  }
}
