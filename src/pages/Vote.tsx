import React, { ReactElement } from 'react';
import {
  useFirestore,
  useFirestoreCollectionData,
  useUser,
  useAuth,
} from 'reactfire';
import AlbumList from '../components/AlbumList';

interface Props {}

const signOut = (auth: any) =>
  auth.signOut().then(() => console.log('signed out'));

export default function Vote({}: Props): ReactElement {
  const firestore = useFirestore;
  const auth = useAuth();
  const { data: user } = useUser();

  const albumsRef = useFirestore().collection('albums');
  // const albumsQuery = albumsRef.orderBy("artist", "desc"); // TODO: filter to 2021 releases
  const albumsQuery = albumsRef;

  const { data: albums } = useFirestoreCollectionData(albumsQuery, {
    idField: 'id',
  });

  const usersRef = useFirestore().collection('users');
  const { data: users } = useFirestoreCollectionData(usersRef, {
    idField: 'id',
  });

  const arrayRemove = firestore.FieldValue.arrayRemove;
  const arrayUnion = firestore.FieldValue.arrayUnion;

  // TODO: Cloud function to do this on register
  function createUserDoc() {
    const { uid, displayName, photoURL } = user;
    usersRef.doc(user.uid).set({ uid, displayName, photoURL });
  }

  function handleToggleVote(albumId: string, upvoted: boolean) {
    createUserDoc();
    const albumRef = albumsRef.doc(albumId);
    albumRef.update({
      votes: upvoted ? arrayRemove(user.uid) : arrayUnion(user.uid),
    });
  }

  return (
    <>
      {albums && (
        <AlbumList
          albums={albums}
          handleToggleVote={handleToggleVote}
          users={users}
        ></AlbumList>
      )}

      <button onClick={() => signOut(auth)}>Sign out</button>
    </>
  );
}
