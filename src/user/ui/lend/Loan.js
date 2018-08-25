import React, { Component } from 'react'
import store from '../../../store'
import {lend} from '../../ui/lend/LoanActions'
class Loan extends Component {
  

//   onInputChange(event) {
//     this.setState({amount: event.target.value })
//   }

  handleClick(event) {
      console.log('this.props.onFundClicl: ', this.props.onFundClick)
      console.log(this.props.loan.id)
      lend(this.props.loan.id)
  }

  render() {
    return(
        <tr>
            <th><button type="submit" className="pure-button pure-button-primary">Fund this loan</button></th>
            <th>{this.props.loan.borrower}</th>
            <th>{store.getState().web3.web3Instance.fromWei(this.props.loan.amount, 'ether')}</th> 
            <th>{this.props.loan.id} </th>       
        </tr>
    )
  }
}

export default Loan
