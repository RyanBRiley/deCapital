import React, { Component } from 'react'
import store from '../../../store'
import {Link} from 'react-router'
class OwedLoan extends Component {
  

//   onInputChange(event) {
//     this.setState({amount: event.target.value })
//   }

  handleClick(event) {
      this.props.onClick(this.props.loan.id, this.props.loan.amount)
  }

  render() {
    return(
        <tr>
            <th><Link to={`/payment/${this.props.loan.id}`} className="pure-menu-heading pure-menu-link">Make Payment</Link></th>
            <th>{this.props.loan.lender}</th>
            <th>{store.getState().web3.web3Instance.fromWei(this.props.loan.amount, 'ether')}</th> 
            <th>{this.props.loan.rate}</th>
            <th>{store.getState().web3.web3Instance.fromWei(this.props.loan.balance, 'ether')}</th>
            <th>{this.props.loan.id} </th>       
        </tr>
    )
  }
}

export default OwedLoan
