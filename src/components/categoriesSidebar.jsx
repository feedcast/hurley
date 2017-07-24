import React from 'react';
import { Link } from 'react-router';


import feedcastApi from './../scripts/feedcastApi'


export default class CategoriesSidebar extends React.Component {

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




  render(){
    return (
      <div className="feedcast__categories-sidebar">
        { this.state.categories.map((c, i)=>(
          <Link key={i} to={`/category/${c.slug}`}>
            <i className={`fa fa-${c.icon}`}></i> {c.title}
          </Link>)) }
      </div>
    )
  }
}
