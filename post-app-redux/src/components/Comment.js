import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { handleDeleteCommentsThunk } from '../redux/actions/comments';
import { handleLikeCommentThunk } from '../redux/actions/comments';
import Modal from './Modal';

export class Comment extends Component {

  state = { 
    showModal: false,
    comment: ''
  }

  handleDelete = (e, id) => {
    const { handleDeleteCommentsThunk } = this.props;

    handleDeleteCommentsThunk(id);
  }

  handleEdit = (e, comment) => {
    this.setState({
      showModal: true,
      comment
    });
  }

  handleLike = (e, id) => {
    const { handleLikeCommentThunk, editLike, post } = this.props;

    if(e.target.getAttribute('name') === 'upVote'){
      handleLikeCommentThunk(id, 'upVote');

    }
    if(e.target.getAttribute('name') === 'downVote'){
      handleLikeCommentThunk(id, 'downVote');
    }
  }

  closeModal = (e) => {
    this.setState({
      showModal: false,
    });
  }

  toHumanDate = (s) => new Date(s).toLocaleDateString("pt-BR")

  render() {

    const { comment } = this.props;
    const { showModal } = this.state;

    console.log('commmments!', comment);

    const HumanDate = this.toHumanDate(comment.timestamp)

    return (
      <Fragment>
        <i className="far fa-trash-alt iconTop" onClick={(e,id) => this.handleDelete(e, comment.id)}></i><i className="fas fa-edit iconTop" onClick={(e, id) => this.handleEdit(e, comment)}></i>
        <p style={{textAlign: 'left'}}><b>Author: </b>{comment.author}</p>
        <p style={{textAlign: 'left'}}>{comment.body}</p>
        <div className="bottomComment">
        <i className="far fa-thumbs-up iconBottom" name="upVote" onClick={(e, id) => this.handleLike(e, comment.id)}></i><i name="downVote" className="far fa-thumbs-down iconBottom" onClick={(e, id) => this.handleLike(e, comment.id)}></i><span>{comment.voteScore}</span>
        <span className="dateIndicator" style={{position: 'relative', left: '75%'}}> {HumanDate}</span>
        </div>
        <Modal comment={comment} showModal={showModal} closeModal={this.closeModal}></Modal>
      </Fragment>
    )
  }
}

const mapDispatchToProps = (dispatch, state) => {
  return { 
    handleLikeCommentThunk: (id, likeType) => dispatch(handleLikeCommentThunk(id, likeType)),
    handleDeleteCommentsThunk: (id) => dispatch(handleDeleteCommentsThunk(id))
  }
}

export default connect(null, mapDispatchToProps)(Comment);
