import React, { Component } from 'react'
import Post from './Post';
import { connect } from 'react-redux';
import { withRoute } from 'react-router-dom';
import { getPostsByCategory, orderPostByDate, orderPostByScore } from '../redux/actions/posts';
import { getAllPosts } from '../redux/actions/posts';

class Posts extends Component {

  state = {
    posts: [],
    radio: ''
  }

  componentDidUpdate(prevProps, prevState){
    const { dispatch, postsStore, btnClicked } = this.props;

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

  handleRadio = (e) => {
    this.setState({
      radio: e.target.value
    });

    const { dispatch } = this.props

    if (e.target.value === 'date') {
      this.props.dispatch(orderPostByDate())
    } else if (e.target.value === 'score') {
      this.props.dispatch(orderPostByScore())
    }

  }

  render() {
    const { posts, radio } = this.state;  
    const { btnClicked } = this.props;
    return (
      <div className="postsContainer">

        <input className="commentFilter" name="radio" value="date" checked={radio === 'date'} onChange={this.handleRadio} type="radio"/>
          <label>Date</label>
        <input className="commentFilter" name="radio" value="score" checked={radio === 'score'}  onChange={this.handleRadio} type="radio"/>
          <label>Score</label>
        {
          posts !== undefined && (
            posts.map(post => (
              <div className="postArea" key={post.id}>
                <Post key={post.id} post={post} btnClicked={btnClicked}></Post>
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
