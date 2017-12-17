import React, {Component} from 'react'
import PropTypes from 'prop-types';

import ChannelCard from './ChannelCard'
import helpers from 'app/scripts/helpers'

function CategoriesChannelList({ categories, ...props}) {
  let { lc } = helpers.localize(this)

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
          <h4>{helpers.translate(e.title)}</h4>
          {tempCards}
        </div>
      )
  })

  return (
    <div className="feedcast__categories-channel-list">
      <h3>{lc.youMightEnjoy}</h3>
      {catEl}
    </div>
  )
}

CategoriesChannelList.defaultProps = {
  categories: []
}

CategoriesChannelList.propTypes = {
  categories: PropTypes.array
}

export default CategoriesChannelList;
