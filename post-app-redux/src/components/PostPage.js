import React, { Component, Fragment } from 'react';
import Post from '../components/Post';
import Comment from './Comment';
import AddCommentForm from './AddCommentForm';
import { getPostByIdThunk } from '../redux/actions/posts';
import { getCommentsByPostThunk } from '../redux/actions/comments';
import { connect } from 'react-redux';

export class PostPage extends Component {

  state = {
    toggleWriteComment: false
  }

  handleToggleComment = (e) => {
    this.setState((previousState)=>({
      toggleWriteComment: !previousState.toggleWriteComment
    }));
  }


  componentDidMount(){
    const { params } = this.props.match;
    const { getPostByIdThunk, getCommentsByPostThunk } = this.props;

    getPostByIdThunk(params.id);
    getCommentsByPostThunk(params.id);
  }

  render() {
    const { post, comments } = this.props;
    const { toggleWriteComment } = this.state;

    return (
      <div>
      {
        post[0] !== undefined && (
          <Fragment>
            <h3>Comment Page</h3>
            <div className="postsContainer">
              <div className="postArea" key={post.id}>
                <Post key={post[0].id} post={post[0]}></Post>
              </div>
            </div>
            <button className="btnComment" onClick={this.handleToggleComment}>Write a Comment!</button>
            {
              toggleWriteComment === true && (
                <div>
                  <AddCommentForm/>
                </div>
              )
            }
            <hr></hr>
            {
              comments !== undefined && (
              comments.map(comment => (
                <div className="commentContainer">
                  <div className="commentArea" key={post.id}>
                    <Comment comment={comment}></Comment>
                  </div>
                </div>
              ))
              )
            }
          </Fragment>
        )
      }
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getPostByIdThunk: (id) => dispatch(getPostByIdThunk(id)),
    getCommentsByPostThunk: (id) => dispatch(getCommentsByPostThunk(id))
  }
}

const mapStateToProps = (state, ownPost) => {
  console.log(state.comments);
  return {
    post: state.posts.filter(post => ownPost.match.params.id === post.id),
    comments: state.comments
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PostPage);