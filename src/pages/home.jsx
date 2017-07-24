import React, { Component } from 'react';

import EpisodesList from './../components/EpisodesList'
import CategoriesSidebar from './../components/categoriesSidebar'
import './../styles/home.sass'


class Home extends Component {

  render() {
    const {params} = this.props
    return (
      <div className="feedcast__home">
        <CategoriesSidebar />
        <div className="feedcast__home-content-wrapper">
          <EpisodesList params={params}/>
        </div>
      </div>
    );
  }

}


export default Home;
