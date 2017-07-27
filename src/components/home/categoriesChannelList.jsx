import React, {Component} from 'react'
import ChannelCard from './channelCard'

export default class CategoriesChannelList extends Component {
  render(){

    let { categories } = this.props

    let catEl = categories
      .filter(e => e.channels.length >= 5)
      .map((e, catI) => {
      let tempCards = e.channels
        .filter( (item, index) => index < 5)
        .map((ec, i) => (<ChannelCard key={i} channel={ec}/>))
        return (
          <div className="feedcast__ccl-item" key={catI}>
            <h4>{e.title}</h4>
            {tempCards}
          </div>
        )
    })

    return (
      <div className="feedcast__categories-channel-list">
        <h3>Você pode gostar</h3>
        {catEl}
      </div>
    )
  }
}
