import React, { Component } from 'react'
import Post from './Post';
import { connect } from 'react-redux';
import { getPostsByCategory } from '../redux/actions/posts';
import { getAllPosts } from '../redux/actions/posts';

class Posts extends Component {

  state = {
    posts: []
  }


  componentDidUpdate(prevProps, prevState){
    const { btnClicked, dispatch, postsStore } = this.props;

    console.log('atualizou! ', this.state);

    if(prevProps.postsStore !== postsStore){
      this.setState({
        posts: postsStore
      });
    }
    
    if (btnClicked !== '' && (prevProps.btnClicked !== btnClicked)){
      dispatch(getPostsByCategory(btnClicked));
      this.setState({
        posts: postsStore
      });
    }

  }

  componentDidMount(){
    const { dispatch } = this.props
  
    dispatch(getAllPosts());

  }

  render() {
    const { posts } = this.state;

    console.log('render pai');

    return (
      <div className="postsContainer">
        {
          posts !== undefined && (
            posts.map(post => (
              <div className="postArea" key={post.id}>
                <Post key={post.id} post={post}></Post>
              </div>
            ))
          )
        }
      </div>
    )
  }
}


const mapStateToProps = (state, ownProps) => {
  return {
    postsStore: state.posts
  }
}

export default connect(mapStateToProps)(Posts);
