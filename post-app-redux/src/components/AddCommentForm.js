import React, { Component } from 'react'
import { withRouter } from 'react-router-dom';
import { addCommentByPostThunk } from '../redux/actions/comments';
import { connect } from  'react-redux';

export class AddCommentForm extends Component {

  state = {
    author: '',
    body: ''
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const { addCommentByPostThunk } = this.props;
    const { author, body } = this.state; 
    const { params } = this.props.match;

    const comment = {
      parentId: params.id,
      author: author,
      body: body
    }

    addCommentByPostThunk(comment);
    this.setState({
      author: '',
      body: ''
    });
  }

  handleInput = (e) => {
    if (e.target.name === 'nameArea'){
      this.setState({
       author: e.target.value
      });
    }
    else{
      this.setState({
        body: e.target.value
      })
    }
  }


  render() {
    const { author, body } = this.state;
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
        <div>
          <input className="nameArea" id="nameArea" name="nameArea" value={author} onChange={this.handleInput} placeholder="What is your name?"></input>
        </div>
        <div>
          <textarea className="inputArea" id="inputArea" name="inputArea" value={body} onChange={this.handleInput} placeholder="Type your comment..."></textarea>
        </div>  
          <button type='submit' className="btnSend"> Send </button>
        </form>
    </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    addCommentByPostThunk: (comment) => dispatch(addCommentByPostThunk(comment))
  }
}

export default withRouter(connect(null, mapDispatchToProps)(AddCommentForm));
