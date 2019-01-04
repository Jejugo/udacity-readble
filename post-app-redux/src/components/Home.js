import React, { Component } from 'react'
import Posts from './Posts';
import Navbar from './Navbar';
import Modal from './Modal';

class Home extends Component {

  state = {
    btnClicked: '',
    showModal: false
  }

  openModal = (e) => {
    this.setState({
      showModal: true
    });
  }

  closeModal = () => {
    this.setState({
      showModal: false
    });
  }

  setBtnClicked = (e) => {
    e.preventDefault();
    this.setState({
      btnClicked: e.target.name
    });
  }

  render() {
    const { btnClicked, showModal } = this.state;

    return (
      <div className="homePage">
         <Navbar setBtnClicked={this.setBtnClicked}></Navbar>
          <div className="mainPage">
            <div className="pageSecton">
                <Posts btnClicked={btnClicked}></Posts>
            </div>
            <div className="addBtn"> 
              <button onClick={this.openModal}> Add new Post!</button>
            </div>
            <Modal closeModal={this.closeModal} showModal={showModal}></Modal>
          </div>
      </div>
    )
  }
}



export default Home;