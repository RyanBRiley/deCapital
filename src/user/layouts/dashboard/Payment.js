import React, { Component } from 'react'
import PaymentFormContainer from '../../../user/ui/payment/PaymentFromContainer'

class Payment extends Component {
  render() {
    return(
      <main className="container">
        <div className="pure-g">
          <div className="pure-u-1-1">
            <h1>Make a Payment for loan {this.props.location.pathname.split('/')[2]}</h1>

            <PaymentFormContainer loanId={this.props.location.pathname.split('/')[2]} />
          </div>
        </div>
      </main>
    )
  }
}

export default Payment
