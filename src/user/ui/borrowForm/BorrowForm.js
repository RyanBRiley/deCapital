import React, { Component } from 'react'

class BorrowForm extends Component {
  constructor(props) {
    super(props)

    this.state = {
      amount: ''
    }
  }

  onInputChange(event) {
    this.setState({amount: event.target.value })
  }

  handleSubmit(event) {
    event.preventDefault()

    if (isNaN(this.state.amount))
    {
      return alert('Please enter an amount in Ether')
    }

    this.props.onBorrowFormSubmit(this.state.amount)
  }

  render() {
    return(
      <form className="pure-form pure-form-stacked" onSubmit={this.handleSubmit.bind(this)}>
        <fieldset>
          <label htmlFor="name">Amount in Ether</label>
          <input id="amount" type="text" value={this.state.amount} onChange={this.onInputChange.bind(this)} placeholder="Amount" />
          <span className="pure-form-message">This is a required field.</span>

          <br />

          <button type="submit" className="pure-button pure-button-primary">Apply</button>
        </fieldset>
        <p>By applying to a loan, you agree to repay the full amount</p>
        <p>and will be charged a simple interest rate between three and </p>
        <p>eight percent, which will be added to the balance of the loans </p>
      </form>
    )
  }
}

export default BorrowForm
