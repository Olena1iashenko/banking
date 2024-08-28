"use client";
import { useState } from "react";
import { account, ID } from "./appwrite";
import { Models } from "appwrite";

const signInPage = () => {
  const [loggedInUser, setLoggedInUser] = useState<
    Models.User<Models.Preferences> | undefined | null
  >(undefined);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const signIn = async (userData: SignUpParams) => {
    const { email, password } = userData;
    const session = await account.createEmailPasswordSession(email, password);
    setLoggedInUser(await account.get());
  };

  const signUp = async (userData: SignUpParams) => {
    const { email, password, firstName, lastName } = userData;
    await account.create(
      ID.unique(),
      email,
      password,
      `${firstName}
      ${lastName}`
    );
    signIn(userData);
  };

  const logout = async () => {
    await account.deleteSession("current");
    setLoggedInUser(null);
  };

  if (loggedInUser) {
    return (
      <div>
        <p>Logged in as {loggedInUser.name}</p>
        <button type="button" onClick={logout}>
          Logout
        </button>
      </div>
    );
  }

  return (
    <div>
      <p>Not logged in</p>
      <form>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
          type="text"
          placeholder="firstName"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
        <input
          type="text"
          placeholder="lastName"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
        <button type="button" onClick={() => signIn({ email, password })}>
          signIn
        </button>
        <button
          type="button"
          onClick={() => signUp({ email, password, firstName, lastName })}
        >
          signUp
        </button>
      </form>
    </div>
  );
};

export default signInPage;
