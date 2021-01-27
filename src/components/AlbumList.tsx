import React, { ReactElement } from 'react';
import AlbumCard from './AlbumCard';

interface Props {
  albums: Array<any>;
  handleToggleVote: (albumId: string, upvoted: boolean) => void;
}

export default function AlbumList({
  albums,
  handleToggleVote,
}: Props): ReactElement {
  return (
    <div>
      {/* Search */}
      {/* Sorting */}
      {albums.map((album) => (
        <AlbumCard
          key={album.id}
          handleToggleVote={handleToggleVote}
          {...album}
        ></AlbumCard>
      ))}
    </div>
  );
}
