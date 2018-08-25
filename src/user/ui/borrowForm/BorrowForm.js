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

    if (this.state.amount.length < 2)
    {
      return alert('Please enter an amount in Ether')
    }

    this.props.onBorrowFormSubmit(this.state.amount)
  }

  render() {
    return(
      <form className="pure-form pure-form-stacked" onSubmit={this.handleSubmit.bind(this)}>
        <fieldset>
          <label htmlFor="name">Amount in Eth</label>
          <input id="amount" type="text" value={this.state.amount} onChange={this.onInputChange.bind(this)} placeholder="Amount" />
          <span className="pure-form-message">This is a required field.</span>

          <br />

          <button type="submit" className="pure-button pure-button-primary">Apply</button>
        </fieldset>
      </form>
    )
  }
}

export default BorrowForm
