import React, { Component } from 'react';
import { Link } from 'react-router';
import Helmet from 'react-helmet';
import './../styles/channelList.sass';

import feedcastApi from 'feedcast-client';
import helpers from './../scripts/helpers'

import Pagination from './../components/Pagination'
import ChannelCard from './../components/ChannelCard'
import FeedcastLoader from './../components/FeedcastLoader'



class ChannelList extends Component {

  constructor(){
    super();

    let { lc } = helpers.localize(this)

    this.state = {
      total:null,
      page: 1,
      per_page: 24,
      channels: [],
      populated: false,
      lc
    }

  }


  updateList(){
    let {page, per_page} = this.state

    feedcastApi
      .getChannels({page, per_page})
      .then(data => {
      this.setState({
        page: parseInt(page),
        channels: data.channels,
        total: data.total,
        populated: true
      })
    })
  }


  componentWillUpdate(nextProps) {
    if( this.props.params.page != nextProps.params.page)
      this.updatePage(nextProps);
  }

  componentWillMount(){
    this.updatePage(this.props)
  }


  componentWillUnmount(){
    this._isMounted = false
  }

  componentDidMount() {
    this._isMounted = true
  }


  updatePage(props){
    const { params } = props
    switch(!0){
      case params.page !== undefined &&
        parseInt(params.page) !== this.state.page &&
        parseInt(params.page) >= 0:

        this.setState({ page: parseInt(params.page) }, () => {
          this.updateList()
        });

      break;

      case Object.keys(params).length === 0:
        this.setState({ page: 1 }, () => {
          this.updateList()
        });
      break;

      case params.page !== undefined &&
        parseInt(params.page) == 1 &&
        parseInt(params.page) == this.state.page &&
        this.state.channels.length === 0:

        this.updateList();

      break;
    }
  }


  listChannels(){
    let { channels } = this.state;
    return channels
            .filter(c => c.listed)
            .map( (c, n) => (<ChannelCard key={n} data={c}/>));
  }


  render() {
    let { lc } = this.state
    let channelList = this.listChannels()
    return this.state.populated ? (
      <div className="feedcast__channel-list">
        <Helmet
          title={`Feedcast | ${lc.channels}`}
          meta={[
            {property: 'og:title',
            content: `Feedcast | ${lc.channels}`},
          ]} />
        {channelList}
        <Pagination
          url="/channels/"
          page={this.state.page}
          total={this.state.total}
          per_page={this.state.per_page}/>
      </div>
    ) : (
      <FeedcastLoader/>
    );
  }
}

export default ChannelList;
