import React, { Component } from 'react'
import { connect } from 'react-redux';

import Loan from '../../ui/lend/Loan'


class LendForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      selectedLoan: '',
      selectedLoanAmt: ''
    }
  }
  onLoanClick(loanId, amt) {
    this.setState(
      {
        selectedLoan: loanId,
        selectedLoanAmt: amt
      })
  }
  handleSubmit(event) {
    event.preventDefault()

    this.props.onLoanSubmit(this.state.selectedLoan, this.state.selectedLoanAmt)
}
  render() {
    return(
      <main className="container">
        <div className="pure-g">
          <div className="pure-u-1-1">
            {this.props.loans && 
            <form className="pure-form pure-form-stacked" onSubmit={this.handleSubmit.bind(this)}>
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
                  
                    <Loan key={i} loan={loan} onClick={this.onLoanClick.bind(this)} />
                
                  )
                })
              }
              </tbody>
            </table>
            </form>
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

export default connect(mapStateToProps)(LendForm)