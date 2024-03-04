import React, { createContext, useState, FC } from "react";
import { User as FirebaseUser } from "firebase/auth";

const contextDefaultValues: UserContextState = {
  user: null,
  addUser: (user: FirebaseUser | null) => {}
};

type UserContextState = {
    user: FirebaseUser | null,
    addUser: (user: FirebaseUser | null) => void
}

type Props = {
  children: JSX.Element | JSX.Element[]
}

export const UserContext = createContext<UserContextState>(
  contextDefaultValues
);

const UserProvider = ({ children }: Props) => {
  const [user, setUser] = useState<FirebaseUser | null>(contextDefaultValues.user);

  const addUser = (newUser: FirebaseUser | null) => setUser(newUser);

  return (
    <UserContext.Provider
      value={{
        user,
        addUser
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;