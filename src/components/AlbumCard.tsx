import React, { ReactElement, useEffect, useState } from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import { makeStyles } from '@material-ui/core';
import { useUser } from 'reactfire';

const useStyles = makeStyles({
  root: {},
});

interface Props {
  id: string;
  albumArt: string;
  artist: string;
  links: {
    spotify?: string;
    appleMusic?: string;
    youtube?: string;
    bandcamp?: string;
  };
  releaseDate: Date;
  reviewEpisode: number;
  title: string;
  votes: Array<string>;
  handleToggleVote: (albumId: string, upvoted: boolean) => void;
}

export default function AlbumCard({
  id,
  albumArt,
  artist,
  links,
  releaseDate,
  reviewEpisode,
  title,
  votes,
  handleToggleVote,
}: Props): ReactElement {
  const classes = useStyles();
  const [upvoted, setUpvoted] = useState(false);
  const { data: user }: any = useUser();

  useEffect(() => {
    if (votes.indexOf(user.uid) !== -1) {
      setUpvoted(true);
    }
  }, [votes]);

  return (
    <div>
      {
        <Card className={classes.root}>
          <CardContent>
            <Typography variant="h5" component="h2">
              {artist} - {title}
            </Typography>
            <IconButton onClick={() => handleToggleVote(id, upvoted)}>
              <ExpandLessIcon />
            </IconButton>
          </CardContent>
        </Card>
      }
    </div>
  );
}
