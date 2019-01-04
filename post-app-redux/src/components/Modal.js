import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux';
import { addPostThunk } from '../redux/actions/posts';
import { updatePostThunk } from '../redux/actions/posts';
import shortid from 'shortid';

class Modal extends Component {

  state = {
    id: '',
    title: '',
    author: '',
    category: '',
    body: ''
  }

  handleSubmit = (e) => {
    const { closeModal, addPostThunk, updatePostThunk, post } = this.props
    const { title, author, category, body } = this.state;

    e.preventDefault();

    if (post !== undefined){
      updatePostThunk(this.state);
      closeModal();
    }
    
    else{
      const postAdd = {
        id: shortid.generate(),
        title,
        author,
        category,
        body
      }
        addPostThunk(postAdd);
        closeModal();
      }
  }

  handleInput = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  componentDidMount(){
    const { post } = this.props;
    if (post !== undefined){
      this.setState({
        id: post.id,
        title: post.title,
        author: post.author,
        category: post.category,
        body: post.body
      });
    }
  };

  render() {
    const { showModal, closeModal } = this.props;
    const { title, author, category, body } = this.state
    return (
     <Fragment>
     { showModal === true && (
      <div className="modal">
      <span onClick={() => closeModal()} style={{margin: '5%', float: 'right', cursor: 'pointer', fontWeight: 'bold'}}>X</span>
      <h3 style={{clear: 'both', content:'""', display: 'block'}}>Adicione um Post!</h3>
        <form onSubmit={this.handleSubmit}>
          <div className="formModal">
              <input type="text" value={title} onChange={this.handleInput} name="title" placeholder="Type the Title"></input>
              <input type="text" value={author} onChange={this.handleInput} name="author" placeholder="Type the Author"></input>
              <input type="text" value={category} onChange={this.handleInput} name="category" placeholder="Type the Category"></input>
              <input type="text" value={body} onChange={this.handleInput} name="body" placeholder="Type the Content"></input> 
          </div>
          <button> Submit </button>
        </form>
     </div>
     )}
     </Fragment>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    addPostThunk: (post) => dispatch(addPostThunk(post)),
    updatePostThunk: (post) => dispatch(updatePostThunk(post))
  }
}

export default connect(null, mapDispatchToProps)(Modal);