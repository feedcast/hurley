import React, { Component } from 'react';

import './../styles/search.sass';

class Search extends Component {

  render() {

    return (
      <div className="feedcast__search">
        <input type="text" className="feedcast__search-input" placeholder="Pesquise por um canal ou episódio"/>
        <button className="feedcast__search-button">
          <i className="fa fa-search"></i>
        </button>
      </div>
    );
  }
}

export default Search;
