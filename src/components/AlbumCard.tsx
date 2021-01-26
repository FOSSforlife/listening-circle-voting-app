import React, { ReactElement } from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core";

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
  votes: [];
}

export default function AlbumCard({
  albumArt,
  artist,
  links,
  releaseDate,
  reviewEpisode,
  title,
  votes,
}: Props): ReactElement {
  const classes = useStyles();
  return (
    <div>
      {
        <Card className={classes.root}>
          <CardContent>
            <Typography variant="h5" component="h2">
              {artist} - {title}
            </Typography>
          </CardContent>
          {/* votes (profile pics) */}
          {/* vote buttons */}
        </Card>
      }
    </div>
  );
}
