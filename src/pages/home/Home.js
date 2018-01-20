import React, { Component } from 'react';
import Helmet from 'react-helmet';

import { translate } from 'react-i18next';

import LatestEpisodes from './components/LatestEpisodes'
import CategoriesChannelList from './components/categoriesChannelList'

import 'app/styles/home.sass'

export function Home({page, per_page, categories, t, ...props}) {
  const title = "Feedcast | " + t('home.title');

  return (
    <div className="feedcast__home">
      <Helmet title={title} meta={[ {property: 'og:title', content: title} ]} />

      <div className="feedcast__section">
        <LatestEpisodes page={ page } per_page={ 12 } episodes={[]} t={t} / >
        <CategoriesChannelList categories={categories} t={t} />
      </div>
    </div>
  );
}

export default translate()(Home);
