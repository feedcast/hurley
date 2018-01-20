import React, {Component} from 'react'
import PropTypes from 'prop-types';

import ChannelCard from './ChannelCard'

function CategoriesChannelList({ categories, t, ...props}) {
  let catEl = categories
    .filter(cat => cat.channels && cat.channels.length >= 5)
    .filter((e,n) => n < 6)
    .map((e, catI) => {
    let tempCards = e.channels
      .filter(c => c.listed)
      .filter( (item, index) => index < 5)
      .map((ec, i) => (<ChannelCard key={i} channel={ec}/>))
      return (
        <div className="feedcast__ccl-item" key={catI}>
          <h4>{t(e.title)}</h4>
          {tempCards}
        </div>
      )
  })

  return (
    <div className="feedcast__categories-channel-list">
      <h3>{t('channels.you_might_enjoy')}</h3>
      {catEl}
    </div>
  )
}

CategoriesChannelList.defaultProps = {
  categories: []
}

CategoriesChannelList.propTypes = {
  categories: PropTypes.array,
  t: PropTypes.func
}

export default CategoriesChannelList;
