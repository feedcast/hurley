import React, { Component } from 'react';


import feedcastApi from './../scripts/feedcastApi'
import Episodes from './../components/home/episodes'
import CategoriesSidebar from './../components/categoriesSidebar'
import './../styles/home.sass'


class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      categories : []
    }
  }


  componentDidMount() {
    feedcastApi
    .getCategories()
    .then( data => {
        this.setState({categories : data.categories })
    })
  }




  render() {
    const {params} = this.props
    return (
      <div className="feedcast__home">
        <CategoriesSidebar categories={this.state.categories} />
        <div className="feedcast__home-content-wrapper">
          <Episodes params={params}/>
        </div>
      </div>
    );
  }

}


export default Home;
