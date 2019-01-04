import React, { Component } from 'react';
import Post from '../components/Post';
import { connect } from 'react-redux';

export class PostPage extends Component {
  

  render() {
    const { post } = this.props;

    return (
      <div className="postsContainer">
        <div className="postArea" key={post.id}>
          <Post key={post[0].id} post={post[0]}></Post>
        </div>

        <button style={{fontSize: 40}}>Answer</button>
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    post: state.posts.filter(post => post.id === ownProps.match.params.id)
  }
}

export default connect(mapStateToProps)(PostPage);
