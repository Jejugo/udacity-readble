import React, { Component } from 'react'
import Post from './Post';
import { connect } from 'react-redux';
import { getPostsByCategory } from '../redux/actions/posts';

class Posts extends Component {


  componentDidUpdate(prevProps, prevState){
    const { btnClicked, dispatch, posts } = this.props;
    console.log('hello1');
    
    if (btnClicked !== '' && prevProps.btnClicked !== btnClicked){
      dispatch(getPostsByCategory(btnClicked));
    }

  }

  render() {
    const { posts, btnClicked } = this.props;
    console.log('the btn that was clicked was: ', btnClicked);

    return (
      <div>
        {
          posts !== undefined && (
            posts.map(post => (
              <Post post={post}></Post>
            ))
          )
        }
      </div>
    )
  }
}


const mapStateToProps = (state, ownProps) => {
  return {
    posts: state.posts
  }
}

export default connect(mapStateToProps)(Posts);
