import React, { Component } from 'react';

import Episodes from './../components/home/episodes'
import CategoriesSidebar from './../components/categoriesSidebar'
import './../styles/home.sass'


class Home extends Component {

  render() {
    const {params} = this.props
    return (
      <div className="feedcast__home">
        <CategoriesSidebar />
        <div className="feedcast__home-content-wrapper">
          <Episodes params={params}/>
        </div>
      </div>
    );
  }

}


export default Home;
