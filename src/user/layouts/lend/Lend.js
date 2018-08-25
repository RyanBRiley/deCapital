import React, { Component } from 'react'
import { connect } from 'react-redux';

import Loan from '../../ui/lend/Loan'

class Lend extends Component {
  render() {
    return(
      <main className="container">
        <div className="pure-g">
          <div className="pure-u-1-1">
            <h1>Lend Capital</h1>
            <p>Want to earn interest on your Ethereum investment? Lend to a borrower in need</p>
            {this.props.loans && 
            <table id="loans" style={{ width: '100%'}}>
              <tbody>
              <tr>
                <th>Lend</th>
                <th>Borrower</th>
                <th>Requested Amount in Ether</th>
                <th>Loan id</th>
              </tr>
                {this.props.loans.map((loan, i) => {
                  return (
                  
                    <Loan key={i} loan={loan} />
                
                  )
                })
              }
              </tbody>
            </table>
            }
           
          </div>
        </div>
      </main>
    )
  }
}
const mapStateToProps = (state) => {
    return {
        loans: state.web3.loans
    }
}

export default connect(mapStateToProps)(Lend)

