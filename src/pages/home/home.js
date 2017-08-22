import React, { Component } from 'react';
import Helmet from 'react-helmet';

import feedcastApi from 'feedcast-client';
import helpers from 'app/scripts/helpers'

import FeedcastLoader from 'app/components/FeedcastLoader'
import LatestEpisodes from './components/LatestEpisodes'
import CategoriesChannelList from './components/categoriesChannelList'
import 'app/styles/home.sass'

class Home extends Component {
  constructor(props) {
    super(props);

    let { lc } = helpers.localize(this)

    this.state = {
      categories : [],
      populated: false,
      lc
    }
  }

  componentDidMount() {
    this._isMounted = true
    feedcastApi
    .getCategories({per_page: 50})
    .then( data => {
        this.setState({
          categories : data.categories,
          populated: true
        })
    })
  }

  componentWillUnmount(){
    this._isMounted = false
  }

  render() {
    const {params} = this.props.match
    const {lc} = this.state
    return this.state.populated ? (
      <div className="feedcast__home">
        <Helmet
          title={`Feedcast | ${lc.home}`}
          meta={[
            {property: 'og:title',
            content: `Feedcast | ${lc.home}`},
          ]} />
        <div className="feedcast__section">
          <LatestEpisodes page={ params.page || '1' } per_page={ 12 } / >
          <CategoriesChannelList categories={this.state.categories}/>
        </div>
      </div>
    ) : (<FeedcastLoader />);
  }
}

export default Home;
