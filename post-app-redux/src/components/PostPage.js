import React, { Component, Fragment } from 'react';
import Post from '../components/Post';
import Comment from './Comment';
import AddCommentForm from './AddCommentForm';
import ModalFilter from './ModalFilter';
import { getPostByIdThunk } from '../redux/actions/posts';
import { getCommentsByPostThunk, orderCommentsByDate } from '../redux/actions/comments';
import { connect } from 'react-redux';

export class PostPage extends Component {

  state = {
    toggleWriteComment: false,
    radio: ''
  }

  handleToggleComment = (e) => {
    this.setState((previousState)=>({
      toggleWriteComment: !previousState.toggleWriteComment
    }));
  }

  goHome = (e) => {
    e.preventDefault();
    const { history } = this.props;
    history.push(`/`);
  }

  handleRadio = (e) => {
    this.setState({
      radio: e.target.value
    });

    if (e.target.value === 'date') {
      this.props.orderCommentsByDate()
    }

  }

  componentDidMount(){
    const { params } = this.props.match;
    const { getPostByIdThunk, getCommentsByPostThunk } = this.props;

    getPostByIdThunk(params.id);
    getCommentsByPostThunk(params.id);
  }

  render() {
    const { post, comments } = this.props;
    const { toggleWriteComment, toggleFilterModal, radio} = this.state;

    return (
      <div>
      {
        post[0] !== undefined && (
          <Fragment>
            <i class="fas fa-arrow-left" onClick={this.goHome}></i>
            <h3>Comment Page</h3>
            <div className="postsContainer">
              <div className="postArea" key={post.id}>
                <Post key={post[0].id} post={post[0]}></Post>
              </div>
            </div>
            {
              toggleWriteComment === false ? (
                <button className="btnComment" onClick={this.handleToggleComment}>Write a Comment!</button>
              ) : (
                <button className="btnComment" onClick={this.handleToggleComment}>Close</button>
              )
            }

            {
              toggleWriteComment === true && (
                <div>
                  <AddCommentForm/>
                  <hr></hr>
                </div>

              )
            }
            <hr></hr>
            <input className="commentFilter" name="radio" value="date" checked={radio === 'date'} onChange={this.handleRadio} type="radio"/>
              <label>Date</label>
            <input className="commentFilter" name="radio" value="score" checked={radio === 'score'}  onChange={this.handleRadio} type="radio"/>
              <label>Score</label>
            {
              comments !== undefined && (
              radio === 'score' ? (
                comments.sort(function(a,b) {return (a.voteScore < b.voteScore) ? 1 : ((b.voteScore < a.voteScore) ? -1 : 0);} ).map(comment => (
                  <div className="commentContainer">
                  <div className="commentArea" key={post.id}>
                    <Comment comment={comment}></Comment>
                  </div>
                </div>
                ))
              ) : (
                comments.map(comment => (
                  <div className="commentContainer">
                    <div className="commentArea" key={post.id}>
                      <Comment comment={comment}></Comment>
                    </div>
                  </div>
                ))
              ))
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
    getCommentsByPostThunk: (id) => dispatch(getCommentsByPostThunk(id)),
    orderCommentsByDate: () => dispatch(orderCommentsByDate())
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
