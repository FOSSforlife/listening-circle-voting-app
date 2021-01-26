import React, { ReactElement } from "react";
import AlbumCard from "./AlbumCard";

interface Props {
  albums: Array<any>;
}

export default function AlbumList({ albums }: Props): ReactElement {
  return (
    <div>
      {/* Search */}
      {/* Sorting */}
      {albums.map((album) => (
        <AlbumCard key={album.id} {...album}></AlbumCard>
      ))}
    </div>
  );
}
