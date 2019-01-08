import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';

export class Comment extends Component {

  render() {

    const { comment } = this.props;

    return (
      <Fragment>
        <i className="far fa-trash-alt iconTop"></i><i></i>
        <p style={{textAlign: 'left'}}>{comment.body}</p>
        <div className="bottomComment">
        <i className="far fa-thumbs-up iconBottom" name="upVote"></i><i name="downVote" className="far fa-thumbs-down iconBottom"></i><span>{comment.voteScore}</span>
        </div>
        {/* <Modal comment={comment} showModal={showModal} closeModal={this.closeModal}></Modal> */}
      </Fragment>
    )
  }
}

const mapStateToProps = state => {
  console.log(state);
  return {
    teste: 'teste'
  }
}

export default connect()(Comment);
