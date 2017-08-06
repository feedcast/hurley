import React, {Component} from 'react'
import ChannelCard from './channelCard'
import helpers from './../../scripts/helpers'

export default class CategoriesChannelList extends Component {

  constructor(props) {
    super(props);
    let { lc } = helpers.localize(this)
    this.state = { lc }
  }

  componentDidMount() {
    this._isMounted = true
  }

  componentWillUnmount(){
    this._isMounted = false
  }

  render(){

    let { categories } = this.props
    let { lc } = this.state

    let catEl = categories
      .filter(e => e.channels.length >= 5)
      .map((e, catI) => {
      let tempCards = e.channels
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
}
