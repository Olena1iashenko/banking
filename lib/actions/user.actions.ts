// "use server";

import { useState } from "react";
import { account, ID } from "../../app/appwrite";
import { Models } from "appwrite";
import { encryptId, extractCustomerIdFromUrl, parseStringify } from "../utils";

export const getUserInfo = async ({ userId }: getUserInfoProps) => {
  const user = await account.get();
  console.log("user actual", user);

  return user;
};

export const getSession = async () => {
  const currentSession = await account.getSession("current");
  console.log(currentSession);

  return currentSession;
};

export const signIn = async (userData: SignUpParams) => {
  const { email, password } = userData;
  const session = await account.createEmailPasswordSession(email, password);
  console.log("user session", session);

  return parseStringify(session);
};

export const signUp = async (userData: SignUpParams) => {
  const { email, password, firstName, lastName } = userData;

  const createdUser = await account.create(
    ID.unique(),
    email,
    password,
    `${firstName} ${lastName}`
  );
  console.log(createdUser);
  const user = await signIn(userData);
  console.log("user register", user);

  return user;
};

export const logout = async () => {
  await account.deleteSession("current");
  // setUser(null);
};

// export const getUserInfo = async ({ userId }: getUserInfoProps) => {
//   try {
//     const { database } = await createAdminClient();

//     const user = await database.listDocuments(
//       DATABASE_ID!,
//       USER_COLLECTION_ID!,
//       [Query.equal("userId", [userId])]
//     );

//     return parseStringify(user.documents[0]);
//   } catch (error) {
//     console.log(error);
//   }
// };
