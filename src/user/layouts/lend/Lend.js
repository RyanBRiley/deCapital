import React, { Component } from 'react'
import { connect } from 'react-redux';

import Loan from '../../ui/lend/Loan'
import LendFormContainer from '../../ui/lend/LendFormContainer';

class Lend extends Component {
  render() {
    return(
      <main className="container">
        <div className="pure-g">
          <div className="pure-u-1-1">
            <h1>Lend Capital</h1>
            <p>Want to earn interest on your Ethereum investment? Lend to a borrower in need</p>
            <LendFormContainer />
           
          </div>
        </div>
      </main>
    )
  }
}

export default Lend

