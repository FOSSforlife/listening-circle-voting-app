import React, { ReactElement } from 'react';
import AlbumCard from './AlbumCard';

interface Props {
  albums: Array<any>;
  handleToggleVote: (albumId: string, upvoted: boolean) => void;
  users: Array<any>;
}

const byVotes = (album1: any, album2: any) => {
  return album1.votes.length - album2.votes.length;
};

export default function AlbumList({
  albums,
  handleToggleVote,
  users,
}: Props): ReactElement {
  return (
    <div>
      {/* Search */}
      {/* Sorting */}
      {albums.sort(byVotes).map((album) => (
        <AlbumCard
          key={album.id}
          handleToggleVote={handleToggleVote}
          users={users}
          {...album}
        ></AlbumCard>
      ))}
    </div>
  );
}
