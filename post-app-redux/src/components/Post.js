import React, { Component, Fragment } from 'react'
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux'; 
import { handleLikeThunk } from '../redux/actions/posts';
import { handleDeleteThunk } from '../redux/actions/posts';
import Modal from './Modal';

export class Post extends Component {

  state = {
    showModal: false,
    post: {}
  }

  handleLike = (e, id) => {
    const { handleLikeThunk, editLike, comment } = this.props;

    if(e.target.getAttribute('name') === 'upVote'){
      handleLikeThunk(id, 'upVote');

    }
    if(e.target.getAttribute('name') === 'downVote'){
      handleLikeThunk(id, 'downVote');
    }
  }

  handleDelete = (e, id) => {
    const { handleDeleteThunk } = this.props;

    handleDeleteThunk(id);
  }

  handleEdit = (e, post) => {
    this.setState({
      showModal: true,
      post
    });
  }

  closeModal = (e) => {
    this.setState({
      showModal: false,
    });
  }

  postPage = (e, id, btnClicked) => {
    e.preventDefault();
    const { history } = this.props;
    history.push(`/${btnClicked}/${id.toString()}`);
  }

  toHumanDate = (s) => new Date(s).toLocaleDateString("pt-BR")

  render() {
    const { post, btnClicked } = this.props;
    const { showModal } = this.state; 

    console.log('render filho', post);

    const HumanDate = this.toHumanDate(post.timestamp)

    return (
      <Fragment>
        <i className="far fa-trash-alt iconTop" onClick={(e,id) => this.handleDelete(e, post.id)}></i><i onClick={(e, id) => this.handleEdit(e, post)} className="fas fa-edit iconTop"></i>
        <p style={{textAlign: 'left'}} onClick={(e, id) => this.postPage(e, post.id, btnClicked)}><b>Author: </b>{post.author}</p>
        <p style={{textAlign: 'left'}} onClick={(e, id) => this.postPage(e, post.id, btnClicked)}>{post.title}</p>
        <div className="bottomPost">
        <i className="far fa-thumbs-up iconBottom" onClick={(e, id) => this.handleLike(e, post.id)} name="upVote"></i><i onClick={(e, id) => this.handleLike(e, post.id)} name="downVote" className="far fa-thumbs-down iconBottom"></i><span>{post.voteScore}</span>
        <span className="commentsIndicator" > {post.commentCount} Comments </span>
        <span className="dateIndicator" > {HumanDate}</span>
        </div>
        <Modal post={post} showModal={showModal} closeModal={this.closeModal} adding={false}></Modal>
      </Fragment>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return { 
    handleLikeThunk: (id, likeType) => dispatch(handleLikeThunk(id, likeType)),
    handleDeleteThunk: (id) => dispatch(handleDeleteThunk(id))
  }
}

export default withRouter(connect(null, mapDispatchToProps)(Post));
