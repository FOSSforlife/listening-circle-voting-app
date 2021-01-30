import React, { ReactElement, useState } from 'react';
import {
  useFirestore,
  useFirestoreCollectionData,
  useUser,
  useAuth,
} from 'reactfire';
import { paramCase } from 'change-case';
import AlbumList from '../components/AlbumList';
import { createStyles, makeStyles, Theme, Typography } from '@material-ui/core';
import Fab from '@material-ui/core/Fab';
import Popover from '@material-ui/core/Popover';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import AddIcon from '@material-ui/icons/Add';
import AddAlbum from '../components/AddAlbum';
import Login from '../components/Login';

const capitalize = (input: string) => {
  const words = input.split(' ');
  let output = '';
  for (let word of words) {
    output += word[0].toUpperCase() + word.substring(1) + ' ';
  }
  return output.trim();
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    fab: {
      position: 'fixed',
      bottom: theme.spacing(5),
      right: theme.spacing(5),
    },
    errorText: {
      color: 'red',
    },
    signOutLink: {
      textDecoration: 'underline',
      color: 'blue',
      cursor: 'pointer'
    }
  })
);

interface Props {}

const signOut = (auth: any) =>
  auth.signOut().then(() => console.log('signed out'));

export default function Vote({}: Props): ReactElement {
  const classes = useStyles();
  const firestore = useFirestore;
  const auth = useAuth();
  const { data: user } = useUser();
  const [alertText, setAlertText] = useState('');
  const [alertOpen, setAlertOpen] = useState(false);

  const [popoverAnchorEl, setPopoverAnchorEl] = React.useState(null);
  const addAlbumPopoverOpen = Boolean(popoverAnchorEl);

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
    if (!user) {
      setAlertOpen(true);
      setAlertText('You are not logged in.');
      return;
    }
    createUserDoc();
    const albumRef = albumsRef.doc(albumId);
    albumRef.update({
      votes: upvoted ? arrayRemove(user.uid) : arrayUnion(user.uid),
    });
  }

  function handleAddAlbumIconClick(event: any) {
    setPopoverAnchorEl(event.currentTarget);
  }

  function handleAddAlbumClose(event: any) {
    setPopoverAnchorEl(null);
  }

  function handleAddAlbumSubmit(artist: string, title: string) {
    const albumId = paramCase(`${artist} $${title}`);
    albumsRef
      .doc(albumId)
      .set({ artist: capitalize(artist), title: capitalize(title), votes: [] });
  }

  return (
    <>
      <Snackbar
        open={alertOpen}
        onClose={() => {
          setAlertOpen(false);
        }}
        autoHideDuration={6000}
        anchorOrigin={{
          horizontal: 'center',
          vertical: 'bottom',
        }}
      >
        <MuiAlert severity="error">{alertText}</MuiAlert>
      </Snackbar>
      {user ? <div style={{textAlign: 'center'}}>Logged in as {user.displayName}.  <a className={classes.signOutLink} onClick={() => signOut(auth)}>Sign out</a></div> : <Login />}
      {albums && (
        <AlbumList
          albums={albums}
          handleToggleVote={handleToggleVote}
          users={users}
        ></AlbumList>
      )}

      <Popover
        id="add-album-popover"
        open={addAlbumPopoverOpen}
        anchorEl={popoverAnchorEl}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        onClose={handleAddAlbumClose}
      >
        <AddAlbum handleSubmit={handleAddAlbumSubmit} />
      </Popover>
      <Fab
        color="primary"
        aria-label="add"
        className={classes.fab}
        onClick={handleAddAlbumIconClick}
      >
        <AddIcon />
      </Fab>
      <div style={{textAlign: 'center'}}>View source code: <a href="https://github.com/FOSSforlife/listening-circle-voting-app" target="blank">GitHub</a></div>
    </>
  );
}
