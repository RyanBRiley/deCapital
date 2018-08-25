import React, { Component } from 'react'
import BorrowFormContainer from '../../ui/borrowForm/BorrowFormContainer'

class Apply extends Component {
  render() {
    return(
      <main className="container">
        <div className="pure-g">
          <div className="pure-u-1-1">
            <h1>Borrow Capital</h1>
            <p>Need Capital? Apply today for a crowd-sourced Ethereum loan</p>
            <BorrowFormContainer />
          </div>
        </div>
      </main>
    )
  }
}

export default Apply
