import React, { ReactElement, useState, useRef } from 'react';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { createStyles, makeStyles, Theme } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '75ch',
      padding: '2ch',
    },
    textField: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
      width: '25ch',
    },
  })
);

interface Props {
  handleSubmit(artist: string, album: string): void;
}

export default function AddAlbum({ handleSubmit }: Props): ReactElement {
  const classes = useStyles();
  const [artist, setArtist] = useState('');
  const [title, setTitle] = useState('');
  const artistFieldRef = useRef<HTMLElement | null>(null);

  const handleSubmitThenClear = (event: any) => {
    handleSubmit(artist, title);
    setArtist('');
    setTitle('');
    if (artistFieldRef && artistFieldRef.current) {
      artistFieldRef.current.focus();
    }
  };
  return (
    <div className={classes.root}>
      <TextField
        required
        className={classes.textField}
        variant="outlined"
        helperText="Artist"
        value={artist}
        onChange={(event) => setArtist(event.target.value)}
        inputRef={artistFieldRef}
      ></TextField>
      <TextField
        required
        className={classes.textField}
        variant="outlined"
        helperText="Album"
        value={title}
        onChange={(event) => setTitle(event.target.value)}
        onKeyUp={(event) => {
          console.log(event);
          if (event.key === 'Enter') handleSubmitThenClear(event);
        }}
      ></TextField>
      <Button color="primary" onClick={handleSubmitThenClear}>
        Submit
      </Button>
    </div>
  );
}
