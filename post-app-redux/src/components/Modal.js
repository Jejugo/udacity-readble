import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux';
import { addPostThunk } from '../redux/actions/posts';
import { updatePostThunk } from '../redux/actions/posts';
import { updateCommentThunk } from '../redux/actions/comments';
import shortid from 'shortid';

class Modal extends Component {

  state = {
    id: '',
    title: '',
    author: '',
    category: 'react',
    body: '',
    voteScore: 0
  }

  handleSubmit = (e) => {
    const { closeModal, addPostThunk, updatePostThunk, post, comment, updateCommentThunk, adding } = this.props
    const { title, author, category, body, voteScore } = this.state;

    e.preventDefault();
    if (comment !== undefined){
      let objToUpdate = this.state;
      objToUpdate.id = comment.id;
      objToUpdate.parentId = comment.parentId;
      updateCommentThunk(objToUpdate);
      closeModal();
    }
    if (post !== undefined){
      updatePostThunk(this.state);
      closeModal();
    }
    
    if (adding === true){
      const postAdd = {
        id: shortid.generate(),
        title,
        author,
        category,
        body,
        voteScore,
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

  selectCategory = (e) => {
    this.setState({
      category: e.target.value
    });
  }

  componentDidMount(){
    const { post, comment } = this.props;
    if (post !== undefined){
      this.setState({
        id: post.id,
        title: post.title,
        author: post.author,
        category: post.category,
        body: post.body
      });
    }
    if(comment !== undefined){
      this.setState({
        id: comment.id,
        title: comment.title,
        author: comment.author,
        body: comment.body
      });
    }
  };

  render() {
    const { showModal, closeModal, comment, post } = this.props;
    const { title, author, category, body } = this.state
    return (
     <Fragment>
     { showModal === true && (
       comment !== undefined ? (
        <div className="modal">
        <span onClick={() => closeModal()} style={{margin: '5%', float: 'right', cursor: 'pointer', fontWeight: 'bold'}}>X</span>
          <h3 style={{clear: 'both', content:'""', display: 'block'}}>Add a Comment!</h3>
          <form onSubmit={this.handleSubmit}>
            <div className="formModal">
                <input type="text" value={body} onChange={this.handleInput} name="body" placeholder="Type the Title"></input>
                <input type="text" value={author} onChange={this.handleInput} name="author" placeholder="Type the Author"></input>
            </div>
            <button> Submit </button>
          </form>
       </div>
       ) : (
        <div className="modal">
        <span onClick={() => closeModal()} style={{margin: '5%', float: 'right', cursor: 'pointer', fontWeight: 'bold'}}>X</span>
          <h3 style={{clear: 'both', content:'""', display: 'block'}}>Add a Post!</h3>
          <form onSubmit={this.handleSubmit}>
            <div className="formModal">
                <input type="text" value={title} onChange={this.handleInput} name="title" placeholder="Type the Title"></input>
                <input type="text" value={author} onChange={this.handleInput} name="author" placeholder="Type the Author"></input>
                <input type="text" value={body} onChange={this.handleInput} name="body" placeholder="Type the Content"></input> 
                <select onChange={this.selectCategory} value={category}>
                  <option value="react">React</option>
                  <option value="redux">Redux</option>
                  <option value="udacity">Udacity</option>
                </select>
                {/*<input type="text" value={category} onChange={this.handleInput} name="category" placeholder="Type the Category"></input>*/}
            </div>
            <button> Submit </button>
          </form>
       </div>
       )
     )}
     </Fragment>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    addPostThunk: (post) => dispatch(addPostThunk(post)),
    updatePostThunk: (post) => dispatch(updatePostThunk(post)),
    updateCommentThunk: (comment) => dispatch(updateCommentThunk(comment))
  }
}

export default connect(null, mapDispatchToProps)(Modal);