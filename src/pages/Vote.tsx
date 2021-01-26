import React, { ReactElement } from "react";
import {
  useFirestore,
  useFirestoreCollectionData,
  useUser,
  useAuth,
} from "reactfire";
import AlbumList from "../components/AlbumList";

interface Props {}

const signOut = (auth: any) =>
  auth.signOut().then(() => console.log("signed out"));

export default function Vote({}: Props): ReactElement {
  const auth = useAuth();
  // const { data: user }: any = useUser();

  const albumsRef = useFirestore().collection("albums");
  // const albumsQuery = albumsRef.orderBy('votes.length', 'desc');
  const albumsQuery = albumsRef;

  const albums: any = useFirestoreCollectionData(albumsQuery, {
    idField: "id",
  });
  return (
    <>
      {albums && <AlbumList albums={albums}></AlbumList>}

      <button onClick={() => signOut(auth)}>Sign out</button>
    </>
  );
}
