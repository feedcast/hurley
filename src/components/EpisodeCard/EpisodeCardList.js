import React from 'react';
import EpisodeCard from './EpisodeCard';

export default function EpisodesCardList({episodes}) {
  if (!episodes || episodes.length === 0) return null;

  return (
    <div className="feedcast__episodes-list">
    {
      episodes.map(episode =>
              <EpisodeCard
                 key={episode.uuid}
                 episodes={episodes}
                 episode={episode} />
      )
    }
    </div>
  );
}
