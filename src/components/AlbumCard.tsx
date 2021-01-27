import React, { ReactElement, useEffect, useState } from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Grid from '@material-ui/core/Grid';
import CardMedia from '@material-ui/core/CardMedia';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import {
  createStyles,
  makeStyles,
  Theme,
  useMediaQuery,
  useTheme,
} from '@material-ui/core';
import { useUser } from 'reactfire';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {},
    upvoteButton: {
      color: (props: { upvoted: boolean }) =>
        props.upvoted ? 'orange' : 'inherit',
    },
    albumArt: {
      height: '100%',
    },
  })
);

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
  users: Array<any>;
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
  users,
}: Props): ReactElement {
  const [upvoted, setUpvoted] = useState(false);
  const styleProps = { upvoted };
  const classes = useStyles(styleProps);
  const { data: user }: any = useUser();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('xs'));

  useEffect(() => {
    if (votes.indexOf(user.uid) !== -1) {
      setUpvoted(true);
    } else {
      setUpvoted(false);
    }
  }, [votes]);

  return (
    <div>
      {
        <Card className={classes.root}>
          <CardContent>
            <div></div>
            <Grid container>
              <Grid item xs={6} sm={5}>
                <Typography variant="h4" component="h2">
                  {title}
                </Typography>
                <Typography variant="h5" component="h3">
                  {artist}
                </Typography>
                <Typography variant="subtitle1" component="h4">
                  Doom Metal, Psychedelic Rock
                </Typography>
              </Grid>
              {!isMobile && (
                <Grid item xs={6} sm={4}>
                  <Typography variant="body1">
                    Release Date: <br />
                    Singles:
                  </Typography>
                </Grid>
              )}
              <Grid item xs={6} sm={3}>
                <CardMedia
                  className={classes.albumArt}
                  image={albumArt}
                  title={`Album art for ${title}`}
                ></CardMedia>
              </Grid>
            </Grid>
            <div>
              <IconButton
                className={classes.upvoteButton}
                disableFocusRipple
                onClick={() => handleToggleVote(id, upvoted)}
              >
                <ExpandLessIcon />
              </IconButton>
            </div>
          </CardContent>
        </Card>
      }
    </div>
  );
}
