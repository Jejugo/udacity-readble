import React, { Component } from 'react'

export class Post extends Component {
  render() {
    const { post } = this.props;
    return (
      <div className="postArea">
          <i className="iconTop">Icon1</i><i className="iconTop">Icon2</i>
          <p style={{textAlign: 'left'}}>{post.body}</p>
          <i className="iconBottom">Icon1</i><i className="iconBottom">Icon2</i>
          <span className="commentsIndicator"> Comments </span>
      </div>
    )
  }
}

export default Post
