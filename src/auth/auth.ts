import { DecodedIdToken, getAuth } from "firebase-admin/auth";
import { User } from "@prisma/client";
import { prismaClient } from "../lib/db";

async function getDecodedIdToken(
  idToken: string
): Promise<DecodedIdToken | null> {
  try {
    return await getAuth().verifyIdToken(idToken);
  } catch (err) {
    return null;
  }
}

export async function authenticate(authField?: string) {
  let decodedIdToken: DecodedIdToken | null = null;
  let currentUser: User | null = null;

  if (!authField) {
    return { decodedIdToken, currentUser };
  }
  const authFieldParts = authField.split("Bearer ");

  const idToken = authFieldParts.at(1);
  if (idToken) {
    decodedIdToken = await getDecodedIdToken(idToken);

    if (decodedIdToken) {
      currentUser = await prismaClient.user.findUnique({
        where: { id: decodedIdToken.uid },
      });
    }
  }

  return { decodedIdToken, currentUser };
}
