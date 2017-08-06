import React, { Component } from 'react';
import { Link } from 'react-router';
import Helmet from 'react-helmet';
import ChannelCard from './../components/ChannelCard'
import FeedcastLoader from './../components/FeedcastLoader'
import feedcastApi from './../scripts/feedcastApi'
import helpers from './../scripts/helpers'

class Category extends Component {

  constructor(props) {
    super(props);

    let { lc } = helpers.localize(this)

    this.state = {
      channels : [],
      icon: null,
      slug: null,
      title: null,
      populated: false,
      lc
    }
  }



  componentDidMount() {
    this.updatePage(this.props)
  }


  updatePage(props){
    const { page } = props.params
    const slug = page && page.length > 0 ? page : ''
    this.setState({ populated: false }, ()=>{
      feedcastApi
        .getEpisodesByCategory({slug})
        .then( data => {
          this.setState({
            populated: true,
            ...data
          });
        })
    });
  }



  listChannels(){
    let { channels } = this.state;
    return channels
            .filter(c => c.listed)
            .map( (c, n) => (<ChannelCard key={n} data={c}/>));
  }


  componentWillUpdate(nextProps) {
    if( this.props.params.page != nextProps.params.page)
      this.updatePage(nextProps);
  }



  render() {
    const channelList = this.listChannels()

    return this.state.populated ? (
      <div>
        <Helmet
          title={`Feedcast`}
          meta={[
            {property: 'og:title',
            content: `Feedcast ${ this.state.populated ? '| ' + this.state.title : '' }`},
          ]} />
        <h1>{helpers.translate(this.state.title)} </h1>
        <div className="feedcast__channel-list feedcast__channel-list--byCategory">
          {channelList}
        </div>
      </div>
    ) : (<FeedcastLoader/>);
  }
}

export default Category;
