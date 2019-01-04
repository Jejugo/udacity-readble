import React, { Component } from 'react'
import { connect } from 'react-redux';

class Navbar extends Component {
  render() {
    const { categories, setBtnClicked } = this.props;

    return (
      <nav className="navBar">
      <ul>
        <li className="titleNav">Categories</li>
        {
          categories !== undefined && (
            categories.map(category => (
              <li><button className="listItem" onClick={(e) => setBtnClicked(e)} name={category.name}>{category.name.charAt(0).toUpperCase() + category.name.slice(1)}</button></li>
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