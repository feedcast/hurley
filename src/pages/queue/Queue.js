import React from 'react';
import PropTypes from 'prop-types';
import { connect } from  'react-redux';
import { translate } from 'react-i18next';

import QueueEpisodes from 'app/components/QueueEpisodes';

import 'app/styles/queue.sass'

export function EmptyQueue({t, ...props}) {
  return (
    <h3>{t('player.empty-episodes-queue')}</h3>
  );
}

export function Queue({t, ...props}) {
  const { playedEpisodes : pe, episodes : es, episode : e, } = props;
  const isEmpty = (pe.length === 0 && es.length === 0 && e === null);

  return (
    <div className="feedcast__section feedcast__queue">
      { isEmpty ? <EmptyQueue t={t} /> : <QueueEpisodes {...props} /> }
    </div>
  );
}

Queue.defaultProps = {
  playedEpisodes: [],
  episodes: [],
  episode: null,
}

Queue.propTypes = {
  playedEpisodes: PropTypes.array,
  episodes: PropTypes.array,
  episode: PropTypes.object,
  t: PropTypes.func,
}

export default translate()(Queue);
