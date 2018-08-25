import React, { Component } from 'react'
import store from '../../../store'

class Loan extends Component {
  

//   onInputChange(event) {
//     this.setState({amount: event.target.value })
//   }

//   handleSubmit(event) {
//     event.preventDefault()

//     if (this.state.amount.length < 2)
//     {
//       return alert('Please enter an amount in Ether')
//     }

//     this.props.onLoanSubmit(this.state.amount)
//   }

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
