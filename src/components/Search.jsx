import React, { Component } from 'react';
import helpers from './../scripts/helpers'

import './../styles/search.sass';

class Search extends Component {
  constructor(props) {
    super(props);
    let { lc } = helpers.localize(this)

    this.state = { lc }
  }

  componentWillUnmount(){
    this._isMounted = false
  }

  componentDidMount() {
    this._isMounted = true
  }

  render() {
    let { lc } = this.state
    return (
      <div className="feedcast__search">
        <input type="text" className="feedcast__search-input" placeholder={lc.searchPlaceholder}/>
        <button className="feedcast__search-button">
          <i className="fa fa-search"></i>
        </button>
      </div>
    );
  }
}

export default Search;
