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

  const { data: albums }: any = useFirestoreCollectionData(albumsQuery, {
    idField: 'id',
  });

  function handleToggleVote(albumId: string, upvoted: boolean) {
    const albumRef = albumsRef.doc(albumId);
    albumRef.update({
      votes: [user.uid],
    });
    // albumRef.update({
    //   votes: upvoted
    //     ? firestore.FieldValue.arrayRemove(user.uid)
    //     : firestore.FieldValue.arrayUnion(user.uid),
    // });
  }

  return (
    <>
      {albums && (
        <AlbumList
          albums={albums}
          handleToggleVote={handleToggleVote}
        ></AlbumList>
      )}

      <button onClick={() => signOut(auth)}>Sign out</button>
    </>
  );
}
