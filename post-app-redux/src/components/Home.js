import React, { Component, Fragment } from 'react'
import Posts from './Posts';
import Navbar from './Navbar';
import Modal from './Modal';

class Home extends Component {

  state = {
    showModal: false,
    adding: false
  }

  openModal = () => {
    this.setState({
      showModal: true,
      adding: true
    });
  }

  closeModal = () => {
    this.setState({
      showModal: false
    });
  }

  componentDidUpdate(){
    console.log('updated!', this.props.match.params.category);
  }

  render() {
    const { showModal, adding } = this.state;

    return (
      <div className="homePage">
         <Navbar></Navbar>
          <div className="mainPage">
           { 
            <Fragment>
              <div className="pageSecton">
                <Posts btnClicked={this.props.match.params.category}></Posts>
              </div>
              <div className="addBtn"> 
                <button onClick={this.openModal}> Add new Post! </button>
              </div>
              <Modal closeModal={this.closeModal} showModal={showModal} adding={adding}></Modal>
            </Fragment>
            }
          </div>
      </div>
    )
  }
}



export default Home;