import React, { Component } from 'react';
import Helmet from 'react-helmet';

import helpers from 'app/scripts/helpers'

import LatestEpisodes from './components/LatestEpisodes'
import CategoriesChannelList from './components/categoriesChannelList'

import 'app/styles/home.sass'

const Home = ({page, per_page, categories, ...props}) => {
  const { lc } = helpers.localize(this);
  const title = "Feedcast | " + lc.home;

  return (
    <div className="feedcast__home">
      <Helmet title={title} meta={[ {property: 'og:title', content: title} ]} />

      <div className="feedcast__section">
        <LatestEpisodes page={ page } per_page={ 12 } episodes={[]} / >
        <CategoriesChannelList categories={categories}/>
      </div>
    </div>
  );
}

export default Home;
