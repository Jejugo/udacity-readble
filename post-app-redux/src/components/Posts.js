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
    const { dispatch, postsStore } = this.props
  
    dispatch(getAllPosts());

  }

  render() {
    const { posts } = this.state;

    console.log('render pai');

    return (
      <div>
        {
          posts !== undefined && (
            posts.map(post => (
              <Post key={post.id} post={post}></Post>
            ))
          )
        }
      </div>
    )
  }
}


const mapStateToProps = (state, ownProps) => {
  console.log('State!', state);
  return {
    postsStore: state.posts
  }
}

export default connect(mapStateToProps)(Posts);
