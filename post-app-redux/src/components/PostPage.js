import React, { Component } from 'react';
import Post from '../components/Post';
import { connect } from 'react-redux';

export class PostPage extends Component {

  componentDidMount(){
    
  }

  render() {
    
    console.log(this.props.post);

    return (
      <div>teste
      </div>

      // <Post></Post>
    )
  }
}

const mapStateToProps = (state, ownProps) => {

  console.log('state!', state);

  return {
    post: state.posts.filter(post => post.id === ownProps.match.params.id)
  }
}

export default connect(mapStateToProps)(PostPage);
