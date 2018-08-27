import React, { Component } from 'react'
import { connect } from 'react-redux'
import store from '../../../store'
import getOwedLoans from '../../../util/filters/getOwedLoans'
import Loan from '../../ui/lend/Loan'
import getLentLoans from '../../../util/filters/getLentLoans';

class Dashboard extends Component {
  onLoanClick() {
    alert('Payment Made')
  }
  handleSubmit(event) {
    event.preventDefault()

    alert('payment made')
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
            {this.borrowedLoans && 
            <div>
            <br /><br />
            <h3>Loans you owe</h3>
            <form className="pure-form pure-form-stacked" onSubmit={this.handleSubmit.bind(this)}>
            <table id="loans" style={{ width: '100%'}}>
              <tbody>
              <tr>
                <th>Lend</th>
                <th>Lender</th>
                <th>Amount in Ether</th>
                <th>Loan id</th>
              </tr>
            {this.borrowedLoans.map((loan, i) => {
                  return (
                  
                    <Loan key={i} loan={loan} buttonText="Make Payment" onClick={this.onLoanClick.bind(this)} />
                
                  )
                })
              }
              </tbody>
            </table>
            </form>
            </div>
            }
            {this.lentLoans && 
            <div>
            <br /><br />
            <h3>Loans you've lent</h3>
            <form className="pure-form pure-form-stacked" onSubmit={this.handleSubmit.bind(this)}>
            <table id="loans" style={{ width: '100%'}}>
              <tbody>
              <tr>
                <th>Lend</th>
                <th>Lender</th>
                <th>Amount in Ether</th>
                <th>Loan id</th>
              </tr>
            {this.lentLoans.map((loan, i) => {
                  return (
                  
                    <Loan key={i} loan={loan} buttonText="Check Status" onClick={this.onLoanClick.bind(this)} />
                
                  )
                })
              }
              </tbody>
            </table>
            </form>
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