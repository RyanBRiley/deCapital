import React, { Component } from 'react'
import { connect } from 'react-redux'
import getOwedLoans from '../../../util/filters/getOwedLoans'
import OwedLoan from '../../ui/lend/OwedLoan.js'
import LentLoan from '../../ui/lend/LentLoan.js'
import getLentLoans from '../../../util/filters/getLentLoans';

class Dashboard extends Component {
  onLoanClick() {
    
  }
  handleSubmit(event) {
    event.preventDefault()

    
}
  borrowedLoans = getOwedLoans(this.props.loans, this.props.userAccount)
  lentLoans = getLentLoans(this.props.loans, this.props.userAccount)
  render() {
    return(
      <main className="container">
        <div className="pure-g">
          <div className="pure-u-1-1">
            <h1>deCapital dashboard</h1>
            <p>Here you can view loans you owe and loans you have lent</p>
            {
            this.props.userAccount && 
              <p>You are currently logged in as {this.props.userAccount}</p>
            }
            {this.borrowedLoans.length > 0 && 
            <div>
            <br /><br />
            <h3>Loans you owe</h3>
            <form className="pure-form pure-form-stacked" onSubmit={this.handleSubmit.bind(this)}>
            <table id="loans" style={{ width: '100%'}}>
              <tbody>
              <tr>
                <th>Payment Options</th>
                <th>Lender</th>
                <th>Original Amount in Ether</th>
                <th>Interest Rate</th>
                <th>Balance</th>
                <th>Loan id</th>
              </tr>
            {this.borrowedLoans.map((loan, i) => {
                  return (
                    loan.state === '1' &&
                    <OwedLoan key={i} loan={loan} />
                
                  )
                })
              }
              </tbody>
            </table>
            </form>
            </div>
            }
            {this.lentLoans.length > 0 && 
            <div>
            <br /><br />
            <h3>Loans you've lent</h3>
            <table id="loans" style={{ width: '100%'}}>
              <tbody>
              <tr>
                <th>Borrower</th>
                <th>Original Amount in Ether</th>
                <th>Interest Rate</th>
                <th>Balance</th>
                <th>Loan id</th>
              </tr>
            {this.lentLoans.map((loan, i) => {
                  return (
                    loan.state === '1' &&
                    <LentLoan key={i} loan={loan} />
                
                  )
                })
              }
              </tbody>
            </table>
            </div>
            }
          </div>
        </div>
      </main>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    userAccount: state.web3.userAccount,
    loans: state.web3.loans
  }
}

export default connect(mapStateToProps)(Dashboard)