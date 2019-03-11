import React, { Component } from 'react'
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class Navbar extends Component {
  render() {
    const { categories } = this.props;

    return (
      <nav className="navBar">
      <ul>
        <li className="titleNav">Categories</li>
        {
          categories !== undefined && (
            categories.map(category => (
              <Link to={`/${category.name}`}><li><button Link to={`/${category.name}`} className="listItem" name={category.name}>{category.name.charAt(0).toUpperCase() + category.name.slice(1)}</button></li></Link>
            ))
          )
        }
      </ul>
    </nav>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    categories: state.categories
  }
}

export default connect(mapStateToProps)(Navbar);