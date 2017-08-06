import React, { Component } from 'react';
import Helmet from 'react-helmet';

import feedcastApi from './../scripts/feedcastApi'
import helpers from './../scripts/helpers'

import FeedcastLoader from './../components/FeedcastLoader'
import Episodes from './../components/home/episodes'
import CategoriesSidebar from './../components/home/categoriesSidebar'
import CategoriesChannelList from './../components/home/categoriesChannelList'
import './../styles/home.sass'


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
    feedcastApi
    .getCategories()
    .then( data => {
        this.setState({
          categories : data.categories,
          populated: true
        })
    })
  }



  render() {
    const {params} = this.props
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
          <Episodes params={params}/>
          <CategoriesChannelList categories={this.state.categories}/>
        </div>
      </div>
    ) : (<FeedcastLoader />);
  }

}


export default Home;
