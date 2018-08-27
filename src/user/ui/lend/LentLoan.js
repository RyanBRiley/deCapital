import React, { Component } from 'react'
import store from '../../../store'
class LentLoan extends Component {
  

  render() {
    return(
        <tr>
            <th>{this.props.loan.borrower}</th>
            <th>{store.getState().web3.web3Instance.fromWei(this.props.loan.amount, 'ether')}</th> 
            <th>{this.props.loan.rate}</th>
            <th>{store.getState().web3.web3Instance.fromWei(this.props.loan.balance, 'ether')}</th>
            <th>{this.props.loan.id} </th>       
        </tr>
    )
  }
}

export default LentLoan
