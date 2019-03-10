import React, { Component, Fragment } from 'react'

export class ModalFilter extends Component {

  state = {
    date: false,
    score: false
  }

  render(){
    const { toggleFilterModal, closeFilterModal } = this.props;
    const { date, score } = this.state;
    return (
      <Fragment>
      {
        toggleFilterModal === true && (
          <div className="modal">
          <span onClick={(e) => closeFilterModal(e)} style={{margin: '5%', float: 'right', cursor: 'pointer', fontWeight: 'bold'}}>X</span>
            <div>
              <input className="commentFilter" name="radio" value="date" checked={date} onChange={this.handleRadio} type="radio"/>
              <label>Date</label>
          
            
              <input className="commentFilter" name="radio" value="score" checked={date}  onChange={this.handleRadio} type="radio"/>
              <label>Date</label>
            </div>
          </div>
        )
      }
      </Fragment>
    )
  }

}

export default ModalFilter
