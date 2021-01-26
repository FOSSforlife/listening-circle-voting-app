import React, { ReactElement } from "react";
import { useFirestore, useFirestoreDocData, useUser, useAuth } from "reactfire";

interface Props {}

const signOut = (auth: any) =>
  auth.signOut().then(() => console.log("signed out"));

export default function Vote({}: Props): ReactElement {
  const auth = useAuth();
  const { data: user }: any = useUser();
  const listRef = useFirestore()
    .collection("categories")
    .doc("s17H0wHgnMpVgG9LeWAC");
  const list: any = useFirestoreDocData(listRef);
  return (
    <>
      <h3>{list.title}</h3>
      <button onClick={() => signOut(auth)}>Sign out</button>
    </>
  );
}
