import React, { Component } from 'react'
import store from '../../../store'
class Loan extends Component {
  

//   onInputChange(event) {
//     this.setState({amount: event.target.value })
//   }

  handleClick(event) {
      this.props.onClick(this.props.loan.id, this.props.loan.amount)
  }

  render() {
    return(
        <tr>
            <th><button type="submit" onClick={this.handleClick.bind(this)} className="pure-button pure-button-primary">{this.props.buttonText}</button></th>
            <th>{this.props.loan.borrower}</th>
            <th>{store.getState().web3.web3Instance.fromWei(this.props.loan.amount, 'ether')}</th> 
            <th>{this.props.loan.rate}</th>
            <th>{this.props.loan.id} </th>       
        </tr>
    )
  }
}

export default Loan
