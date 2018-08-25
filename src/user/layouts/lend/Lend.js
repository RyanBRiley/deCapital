import React, { Component } from 'react'
import { connect } from 'react-redux';
import store from '../../../store'

class Lend extends Component {
  render() {
    return(
      <main className="container">
        <div className="pure-g">
          <div className="pure-u-1-1">
            <h1>Lend Capital</h1>
            <p>Want to earn interest on your Ethereum investment? Lend to a borrower in need</p>
            {this.props.loans && 
            <ul>
              {this.props.loans.map((loan, i) => {
                return (
                <li key={i}>
                  Loan id: {loan.id}, 
                  Requested Amount: {store.getState().web3.web3Instance.fromWei(loan.amount, 'ether')}
                </li>
                )
              })
            }
             </ul>
            }
           
          </div>
        </div>
      </main>
    )
  }
}
const mapStateToProps = (state) => {
  console.log('in lend.js, state: ', state.web3.loans)
    return {
        loans: state.web3.loans
    }
}

export default connect(mapStateToProps)(Lend)

