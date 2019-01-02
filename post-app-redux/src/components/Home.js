import React, { Component } from 'react'
import Posts from './Posts';
import { connect } from 'react-redux';

class Home extends Component {

  state = {
    btnClicked: ''
  }

  setBtnClicked = (e) => {
    e.preventDefault();
    this.setState({
      btnClicked: e.target.name
    });
  }

  render() {
    const { categories } = this.props;
    const { btnClicked } = this.state;

    return (
      <div className="homePage">
          <nav className="navBar">
            <ul>
              <li className="titleNav">Categories</li>
              {
                categories !== undefined && (
                  categories.map(category => (
                    <li><button className="listItem" onClick={(e) => this.setBtnClicked(e)} name={category.name}>{category.name.charAt(0).toUpperCase() + category.name.slice(1)}</button></li>
                  ))
                )
              }
            </ul>
          </nav>
          <div className="pageSecton">
              <Posts btnClicked={btnClicked}></Posts>
          </div>
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    categories: state.categories
  }
}

export default connect(mapStateToProps)(Home);